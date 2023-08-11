import React, { useEffect, useState } from 'react';

const OrderCountdown = ({ expiredAt }) => {
  const calculateRemainingTime = () => {
    const currentTime = new Date().getTime();
    const expirationTime = new Date(expiredAt).getTime();
    return Math.max(0, Math.floor((expirationTime - currentTime) / 1000));
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      if (newRemainingTime >= 0) {
        setRemainingTime(newRemainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  };

  return (
    <div className="text-center py-4">
      {remainingTime > 0 ? (
        <p className="text-lg">
          You have <span className="font-semibold">{formatTime(remainingTime)}</span> left to complete the payment.
        </p>
      ) : (
        <p className="text-lg text-red-500">Your order has expired.</p>
      )}
    </div>
  );
};

export default OrderCountdown;
