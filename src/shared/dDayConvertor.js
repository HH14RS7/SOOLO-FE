import moment from 'moment';

export const dDayConvertor = data => {
  const targetDate = moment(data);
  const currentDate = moment();
  const dDay = targetDate.diff(currentDate, 'days');
  return dDay;
};
