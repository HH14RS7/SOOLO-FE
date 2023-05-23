import { styled } from 'styled-components';

const PartyItem = ({ party }) => {
  return (
    <PartyItemWrapper>
      <div key={party.partyId}>
        <p>제목 : {party.title}</p>
        <p>내용 : {party.content}</p>
        <p>모임장 : {party.memberName}</p>
        <p>장소 : {party.address}</p>
        <p>
          모집인원 : {party.currentCount} / {party.totalCount}명
        </p>
        <p>모집상태 : {party.processing ? '모집중' : '모집마감'}</p>
        <p>모임시간 : {party.date}</p>
      </div>
    </PartyItemWrapper>
  );
};

const PartyItemWrapper = styled.div`
  border: 1px solid black;
`;

export default PartyItem;
