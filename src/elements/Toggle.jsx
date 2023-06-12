import { useState } from 'react';
import styled from 'styled-components';

export const Toggle = () => {
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    setisOn(!isOn);
  };

  return (
    <>
      <ToggleContainer onClick={toggleHandler}>
        <div className={`toggle-container ${isOn ? 'toggle--checked' : null}`} />
        <div className={`toggle-circle ${isOn ? 'toggle--checked' : null}`} />
      </ToggleContainer>
    </>
  );
};

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;

  > .toggle-container {
    width: 38.57px;
    height: 24px;

    background: #d0d5dd;
    border-radius: 200px;
  }

  > .toggle--checked {
    background-color: #f63d68;
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    left: 8.89%;
    right: 46.66%;
    top: 14.29%;
    bottom: 14.29%;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  }

  > .toggle--checked {
    left: 46.67%;
    right: 8.89%;
    top: 14.29%;
    bottom: 14.29%;
    transition: 0.5s;
  }
`;

const Desc = styled.div`
  //설명 부분의 CSS를 구현
  text-align: center;
`;
