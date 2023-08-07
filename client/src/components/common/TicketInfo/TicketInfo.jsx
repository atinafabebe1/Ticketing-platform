import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { closeInfo } from '../../../redux/informationSlice';

const TicketInfo = () => {
  const showTicketInfo = useSelector((state) => state.offInformation.showTicketInfo);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeInfo());
  };

  return (
    <>
      {showTicketInfo && (
        <div className="relative bg-lightOrange text-mediumGray p-2 md:p-1 md:px-2 text-center shadow-lg">
          <div className="flex items-center justify-center">
            <p className="text-sm md:text-base">
              Yeneticket is the best place to buy and sell tickets for any event.{' '}
              <span className="font-bold">You can find tickets at different prices than the original cost.</span>
            </p>
            <button className="p-1 text-mediumGray hover:text-red-600" onClick={handleClose}>
              <AiOutlineCloseCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketInfo;
