import React from 'react';
import styled from 'styled-components';
import { formmatedDate } from './formattedDate';

const TimeSlotPicker = ({ selectedTime, onTimeSelect, isEdit, selectedDate }) => {
  const now = new Date();
  const startTime = 13;
  const endTime = 24;
  const interval = 30;

  const isDatePassed = formmatedDate(now, 'YYYYMMDD') >= formmatedDate(selectedDate, 'YYYYMMDD');

  const handleTimeSelect = time => {
    onTimeSelect(time);
  };

  const renderTimeBoxes = () => {
    return Array.from({ length: (endTime - startTime) * (60 / interval) }, (_, index) => {
      const hour = Math.floor(index / (60 / interval)) + startTime;
      const minute = (index % (60 / interval)) * interval;
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      const isSelected = selectedTime === time;
      const isButtonActive = isEdit && selectedTime === time;

      const isTimePassed = isDatePassed && formmatedDate(now, 'HH:mm') >= time;

      return (
        <TimeBox
          key={time}
          onClick={() => handleTimeSelect(time)}
          isselected={isSelected ? 1 : 0}
          isactive={isButtonActive ? 1 : 0}
          ispassed={isTimePassed ? 1 : 0}
        >
          <Time>{time}</Time>
        </TimeBox>
      );
    });
  };

  return <TimePickerContainer>{renderTimeBoxes()}</TimePickerContainer>;
};

const TimePickerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
  width: 328px;
`;

const TimeBox = styled.div`
  padding: 0.75rem 1rem;
  gap: 0.5rem;
  width: 76px;
  height: 38px;
  border: 1px solid #d0d5dd;
  border-radius: 12px;
  color: ${({ isselected, isactive }) => (isselected || isactive ? '#ffffff' : '#667085')};
  cursor: ${({ ispassed }) => (ispassed ? 'not-allowed' : 'pointer')};
  background-color: ${({ isselected, isactive, ispassed }) =>
    isselected ? '#F63D68' : isactive ? '#F63D68' : ispassed ? '#E4E7EC' : 'ffffff'};
  pointer-events: ${({ ispassed }) => (ispassed ? 'none' : 'auto')};
`;

const Time = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
`;

export default TimeSlotPicker;
