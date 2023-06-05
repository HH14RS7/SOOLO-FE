import React, { useState } from 'react';

function SearchLocation({ onPlaceChange }) {
  const [inputText, setInputText] = useState('');

  const handleChange = e => {
    setInputText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onPlaceChange(inputText);
    setInputText('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input placeholder="지역을 입력해주세요" value={inputText} onChange={handleChange} />
      </form>
    </>
  );
}

export default SearchLocation;
