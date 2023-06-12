import moment from 'moment';

export const dDayConvertor = data => {
  const targetDate = moment(data).startOf('day');
  const currentDate = moment().startOf('day');
  let dDay = 0;

  if (targetDate.isSameOrAfter(currentDate)) {
    const daysDiff = targetDate.diff(currentDate, 'days');
    dDay = daysDiff;
  }

  return dDay;
};
