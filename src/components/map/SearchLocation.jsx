import React, { useRef, useState } from 'react';

function SearchLocation({ onPlaceChange }) {
  const [inputText, setInputText] = useState('');
  const formRef = useRef(null);

  const handleChange = e => {
    setInputText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onPlaceChange(inputText);
    setInputText('');
    formRef.current.reset();
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input placeholder="지역을 입력해주세요" value={inputText} onChange={handleChange} />
      </form>
    </>
  );
}

export default SearchLocation;
