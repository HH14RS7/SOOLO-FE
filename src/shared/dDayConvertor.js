import moment from 'moment';

export const dDayConvertor = data => {
  const targetDate = moment(data);
  const currentDate = moment();
  const hoursDiff = targetDate.diff(currentDate, 'hours');
  let dDay = 0;

  if (hoursDiff <= 24) {
    const daysDiff = moment.duration(targetDate.diff(currentDate)).asDays();
    if (daysDiff < 1) {
      dDay = 0;
    } else {
      dDay = Math.ceil(daysDiff);
    }
  } else {
    dDay = targetDate.diff(currentDate, 'days');
  }

  return dDay;
};
