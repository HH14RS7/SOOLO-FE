import moment from 'moment';

export const dDayConvertor = data => {
  const targetDate = moment(data);
  const currentDate = moment();
  const hoursDiff = targetDate.diff(currentDate, 'hours');
  let dDay = 0;

  if (hoursDiff <= 24) {
    dDay = Math.ceil(moment.duration(targetDate.diff(currentDate)).asDays());
  } else {
    dDay = targetDate.diff(currentDate, 'days');
  }
  return dDay;
};
