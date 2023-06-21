import React from 'react';
import { ReactComponent as NoSearchInfo } from '../assets/common/no-search-info.svg';
import { styled } from 'styled-components';

export const NotFoundPage = () => {
  return (
    <>
      <ListWrapper>
        <NoSearchInfo />
        <InfoMsg>404 Error</InfoMsg>
        <InfoMsg>페이지를 찾을 수 없습니다.</InfoMsg>
      </ListWrapper>
    </>
  );
};

const ListWrapper = styled.div`
  width: 360px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoMsg = styled.h4`
  color: var(--color-gray-700);
`;
