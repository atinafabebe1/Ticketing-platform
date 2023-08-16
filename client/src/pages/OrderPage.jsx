import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import OrderDetails from '../components/order/Orderdetail';
import OrderQuantityForm from '../components/order/OrderQuanityForm';
import OrderCountdown from '../components/order/OrderCountDown';

const OrderPage = () => {
  const { eventId, ticketId } = useParams();
  const [orderInfo, setOrderInfo] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [showModal, setShowModal] = useState(true);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  const fetchPaymentOptions = async () => {
    try {
      const response = await api.get('/paymentOption');
      setPaymentOptions(response.data.data);
    } catch (error) {
      console.error('Error fetching payment options:', error);
    }
  };

  const handleTicketQuantityChange = (event) => {
    setTicketQuantity(event.target.value);
  };

  const handleOrderClick = async () => {
    try {
      const response = await api.post(
        `/orders/events/${eventId}/tickets/${ticketId}`,
        {
          quantity: ticketQuantity
        },
        { withCredentials: true }
      );
      setOrderInfo(response.data.order);
      setShowModal(false);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  const proceedToPayment = async (paymentOptionId, orderId) => {
    const rawPaymentData = {
      amount: orderInfo.totalAmount.toString(), // Use the totalAmount from orderInfo
      currency: 'ETB',
      email: 'abebech_bekele@gmail.com',
      first_name: 'Bilen',
      last_name: 'Gizachew',
      phone_number: '0912345678',
      tx_ref: `chewatsdsdsdsdsasdsdest-6669${Date.now()}`,
      callback_url: 'http://localhost:3500/api/payment/process-payment',
      return_url: 'http://localhost:5173/',
      'customization[title]': 'Payment for my favourite merchant',
      'customization[description]': 'I love online payments'
    };
    console.log(orderInfo);
    try {
      const response = await api.post('/payment/process-payment', {
        orderId: orderId, // Pass the order ID
        paymentOptionId: paymentOptionId, // Pass the selected payment option ID
        raw: JSON.stringify(rawPaymentData)
      });
      console.log(response);

      // Handle success response if needed
      const checkoutUrl = response.data.checkoutUrl;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.log('error', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setOrderInfo(null);
    setError(null);
  };

  const goHome = () => {
    navigate(-1);
  };

  const renderOrderCountdown = () => {
    return orderInfo && <OrderCountdown expiredAt={orderInfo.expiredAt} />;
  };

  const renderOrderQuantityForm = () => {
    return (
      showModal && (
        <OrderQuantityForm
          ticketQuantity={ticketQuantity}
          handleTicketQuantityChange={handleTicketQuantityChange}
          handleOrderClick={handleOrderClick}
        />
      )
    );
  };

  const renderOrderDetails = () => {
    return (
      orderInfo &&
      !showModal && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
          <OrderDetails orderInfo={orderInfo} />

          <div className="flex items-center justify-between mt-4">
            <p className="text-mediumGray">Selected Tickets: {ticketQuantity}</p>
            <button onClick={openModal} className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Change Quantity
            </button>
          </div>

          {paymentOptions.map((paymentOption, index) => (
            <>
              <button
                key={index}
                onClick={() => proceedToPayment(paymentOption._id, orderInfo._id)}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 w-full"
              >
                Pay via {paymentOption.gateway}
              </button>
            </>
          ))}
        </div>
      )
    );
  };

  const renderErrorModal = () => {
    return (
      error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-red-500 text-lg mb-2">{error}</p>
            <button onClick={goHome} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600">
              Go Back
            </button>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {renderOrderCountdown()}
      {renderOrderQuantityForm()}
      {renderOrderDetails()}
      {renderErrorModal()}
    </div>
  );
};

export default OrderPage;
