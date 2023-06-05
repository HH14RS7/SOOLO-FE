import PartyForm from '../components/party/PartyForm';
import { useLocation } from 'react-router-dom';

const PartyCreate = () => {
  const location = useLocation();
  const party = location.state || {};

  return (
    <>
      <PartyForm party={party} />
    </>
  );
};

export default PartyCreate;
