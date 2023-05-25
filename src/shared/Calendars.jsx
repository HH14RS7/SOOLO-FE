import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { setHours, setMinutes } from 'date-fns';
import { styled } from 'styled-components';

const Calendars = ({ selectedDate, setSelectedDate }) => {
  const now = new Date();
  const minTime = setHours(setMinutes(now, now.getMinutes() + 1), now.getHours());
  const maxTime = setHours(setMinutes(new Date(), 59), 23);

  return (
    <StDatePicker
      selected={selectedDate}
      onChange={date => setSelectedDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={10}
      timeCaption="시각"
      dateFormat="yyyy년 MM월 dd일 a h시 mm분"
      locale={ko}
      minTime={minTime}
      maxTime={maxTime}
      minDate={now}
    />
  );
};

const StDatePicker = styled(DatePicker)`
  width: 300px;
`;

export default Calendars;
