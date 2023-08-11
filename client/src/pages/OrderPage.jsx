import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import OrderDetails from '../components/order/Orderdetail';
import OrderQuantityForm from '../components/order/OrderQuanityForm';
import OrderCountdown from '../components/order/OrderCountDown';

const OrderPage = () => {
  const { eventId, ticketId } = useParams();
  const [orderInfo, setOrderInfo] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [showModal, setShowModal] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');

  const handleTicketQuantityChange = (event) => {
    setTicketQuantity(event.target.value);
  };

  const handleOrderClick = async () => {
    try {
      const response = await api.post(
        `/orders/events/${eventId}/tickets/${ticketId}`,
        {
          quantity: ticketQuantity,
          paymentMethod: selectedPaymentMethod
        },
        { withCredentials: true }
      );
      setOrderInfo(response.data.order);
      setShowModal(false);
    } catch (error) {
      console.error('Error fetching order information:', error);
    }
  };

  const proceedToPayment = () => {
    console.log(`Proceeding to ${selectedPaymentMethod} payment...`);
  };

  const openModal = () => {
    setShowModal(true);
    setOrderInfo(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {orderInfo && <OrderCountdown expiredAt={orderInfo.expiredAt} />}

      {showModal && (
        <OrderQuantityForm
          ticketQuantity={ticketQuantity}
          handleTicketQuantityChange={handleTicketQuantityChange}
          handleOrderClick={handleOrderClick}
        />
      )}

      {orderInfo && !showModal && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
          <OrderDetails orderInfo={orderInfo} />

          <div className="flex items-center justify-between mt-4">
            <p className="text-mediumGray">Selected Tickets: {ticketQuantity}</p>
            <button onClick={openModal} className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Change Quantity
            </button>
          </div>

          <button onClick={proceedToPayment} className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 w-full">
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
