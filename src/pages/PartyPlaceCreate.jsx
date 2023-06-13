import React from 'react';
import SearchPlaceForm from '../components/map/SearchPlaceForm';
import Cookies from 'js-cookie';
import LoginModal from '../components/LoginModal';

export default function PartyPlaceCreate() {
  const token = Cookies.get('Access_key');
  return <> {!token ? <LoginModal /> : <SearchPlaceForm />}</>;
}
