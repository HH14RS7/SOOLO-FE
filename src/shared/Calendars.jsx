import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import './Calendars.css';
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
import { ReactComponent as AroowLeft } from '../assets/common/arrow-left.svg';
import { ReactComponent as AroowRight } from '../assets/common/arrow-right.svg';

const Calendars = ({ selectedDate, setSelectedDate }) => {
  const now = new Date();

  // 현시각 기준 +10 분부터 등록 가능
  // 2주 이내로만 등록 가능
  const minTime =
    selectedDate && isSameDay(selectedDate, now) ? addMinutes(now, 10) : startOfDay(now);
  const maxTime = setMinutes(setHours(endOfDay(now), 23), 59);
  const maxDate = addWeeks(now, 2);

  return (
    <StDatePicker
      selected={selectedDate}
      onChange={date => setSelectedDate(date)}
      // showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={10}
      timeCaption="시각"
      dateFormat="yyyy년 MM월 dd일 a h시 mm분"
      locale={ko}
      minDate={now}
      maxDate={maxDate}
      minTime={minTime}
      maxTime={maxTime}
      inline
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="custom-header">
          <div className="current-month">
            {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          <div className="icons">
            <AroowLeft
              className="icon"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            />
            <AroowRight
              className="icon"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            />
          </div>
        </div>
      )}
    />
  );
};

const StDatePicker = styled(DatePicker)`
  width: 300px;
`;

export default Calendars;
