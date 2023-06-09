import React from 'react';
import styled from 'styled-components';

const TimeSlotPicker = ({ selectedTime, onTimeSelect, isEdit }) => {
  const startTime = 16;
  const endTime = 24;
  const interval = 30;

  const handleTimeSelect = time => {
    onTimeSelect(time);
  };

  const renderTimeBoxes = () => {
    return Array.from({ length: (endTime - startTime) * (60 / interval) }, (_, index) => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const hour = Math.floor(index / (60 / interval)) + startTime;
      const minute = (index % (60 / interval)) * interval;
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      const isSelected = selectedTime === time;
      // 수정 모드에서 선택된 시간일 때 버튼 스타일 변경
      const isButtonActive = isEdit && selectedTime === time;
      // 지난 시간 체크
      const isTimePassed = hour < currentHour || (hour === currentHour && minute < currentMinute);

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
  // opacity: ${({ ispassed }) => (ispassed ? 0.5 : 1)};
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
