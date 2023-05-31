import React, { useRef, useState } from 'react';
import MapContainer from './MapContainer';

function LandingPage() {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');
  const formRef = useRef(null);

  const handleChange = e => {
    setInputText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setPlace(inputText);
    setInputText('');
    formRef.current.reset();
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input placeholder="지역을 입력해주세요" value={inputText} onChange={handleChange} />
      </form>
      <MapContainer searchPlace={place} />
    </>
  );
}

export default LandingPage;
