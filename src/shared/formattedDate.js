import moment from 'moment';
import 'moment/locale/ko';

export const formmatedDate = (partyDate, format) => {
  const formattedDateTime = moment(partyDate).format(format);
  return formattedDateTime;
};
