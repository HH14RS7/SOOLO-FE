import React, { useState } from 'react';
import { ReactComponent as Search } from '../../assets/common/search.svg';
import { styled } from 'styled-components';

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
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <SearchBarContainer>
          <Search />
          <SearchInput
            type="text"
            placeholder="장소, 음식점, 지역을 입력해주세요"
            value={inputText}
            onChange={handleChange}
          />
        </SearchBarContainer>
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  padding: 1rem 1rem;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: var(--color-tabbar);
  border-radius: 1.5rem;
  width: 350px;
  padding: 0.75rem 1rem;
  gap: 1rem;
  width: 328px;
  height: 40px;
  margin: 0 auto;s
`;

const SearchInput = styled.input`
  border: none;
  width: 280px;
  background-color: var(--color-tabbar);
`;

export default SearchLocation;
