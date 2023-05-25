import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { PATH_URL, PARTIES_URL } from '../../shared/constants';
import { useMutation } from 'react-query';
import { postAPI } from '../../api/api';
import Calendars from '../../shared/Calendars';
import moment from 'moment';

const CreateForm = () => {
  const PARTICIPANT_COUNT = Array.from({ length: 10 }, (_, i) => ({ value: i + 1 }));
  const navigator = useNavigate();
  const location = useLocation();
  const partyId = parseInt(new URLSearchParams(location.search).get('partyId'));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { party } = location.state || {};
  const isEdit = !!partyId;

  console.log('partyId::', partyId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (isEdit) {
    // 수정
    // const updateMutation = useMutation(putAPI(`${PARTIES_URL.PARTY}/${partyId}`), {
    //   onSuccess: response => {
    //     console.log(response);
    //   },
    //   onError: error => {
    // alert(error.message);
    // },
    // });
    // } else {
    // 등록
    // const createMutation = useMutation(postAPI(`${PARTIES_URL.PARTY}/${partyId}`), {
    //   onSuccess: response => {
    //     console.log(response);
    //   },
    //   onError: error => { alert(error.message);},
    // });
  }

  const handlePartySubmit = data => {
    data.date = moment(data.date).format('YYYY-MM-DD HH:mm:ss');
    if (isEdit) {
      // updateMutate.mutate(data);
    } else {
      // createMutation.mutate(data);
    }
    navigator(PATH_URL.MAIN);
  };

  // memberName은 token완료 후 가져오면 될 듯, 지도 추후 구현
  return (
    <FormWrapper>
      <FormContainer onSubmit={handleSubmit(handlePartySubmit)}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          placeholder="제목을 입력하세요"
          {...register('title', {
            required: '제목을 입력해주세요.',
          })}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          type="text"
          placeholder="내용을 입력하세요"
          {...register('content', {
            required: '내용을 입력해주세요.',
          })}
        ></textarea>
        {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
        <label htmlFor="totalCount">모집인원</label>
        <select
          id="totalCount"
          {...register('totalCount', {
            required: '모집인원을 선택해주세요.',
          })}
        >
          {PARTICIPANT_COUNT.map(option => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        {errors.totalCount && <ErrorMessage>{errors.totalCount.message}</ErrorMessage>}
        <label htmlFor="date">모임일시</label>
        <input type="hidden" {...register('date', { value: selectedDate })} />
        <Calendars id="date" selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <Link to={PATH_URL.MAIN}>
          <button>취소하기</button>
        </Link>
        <button type="submit">{isEdit ? '수정하기' : '등록하기'}</button>
      </FormContainer>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default CreateForm;
