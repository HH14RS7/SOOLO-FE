import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import {
  setHours,
  setMinutes,
  startOfDay,
  endOfDay,
  addMinutes,
  isSameDay,
  addWeeks,
} from 'date-fns';
import { styled } from 'styled-components';

const Calendars = ({ selectedDate, setSelectedDate }) => {
  const now = new Date();

  const minTime =
    selectedDate && isSameDay(selectedDate, now) ? addMinutes(now, 1) : startOfDay(now);
  const maxTime = setMinutes(setHours(endOfDay(now), 23), 59);
  const maxDate = addWeeks(now, 2);

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
      minDate={now}
      maxDate={maxDate}
      minTime={minTime}
      maxTime={maxTime}
    />
  );
};

const StDatePicker = styled(DatePicker)`
  width: 300px;
`;

export default Calendars;
