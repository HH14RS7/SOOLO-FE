import { PartyDetailInfo } from '../components/party/PartyDetailInfo';
import Cookies from 'js-cookie';
import LoginModal from '../components/LoginModal';

export const PartyDetail = () => {
  const token = Cookies.get('Access_key');

  return <>{!token ? <LoginModal /> : <PartyDetailInfo />}</>;
};
