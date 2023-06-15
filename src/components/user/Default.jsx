import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as Backicon } from '../../assets/userprofile/back.svg';

const Default = ({ title, image }) => {
  const navigate = useNavigate();

  return (
    <>
      <Background>
        <Topbar>
          <IconCon>
            <StyledBackicon
              onClick={() => {
                navigate(-1);
              }}
            />
          </IconCon>
          {title}
          <IconCon />
        </Topbar>
        <ImgCon>{image}</ImgCon>
      </Background>
    </>
  );
};

export default Default;

// 기본 스타일
const Background = styled.div`
  position: relative;
  width: 360px;
  height: 100%;
  margin: 0 auto;
  background: #f2f4f7;
`;

const Topbar = styled.div`
  box-sizing: border-box;
  width: 360px;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #f2f4f7;
`;

const IconCon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 0px 16px;
  width: 40px;
  height: 24px;
  left: 0px;
  top: calc(50% - 24px / 2);
`;

const ImgCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
  gap: 8px;
  width: 360px;
  height: calc(100% - 52px);
`;

const StyledBackicon = styled(Backicon)`
  cursor: pointer;
`;
