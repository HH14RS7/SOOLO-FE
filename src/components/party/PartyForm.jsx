import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { PATH_URL, PARTIES_URL } from '../../shared/constants';
import { useMutation } from 'react-query';
import { putAPI, postAPI } from '../../api/api';
import Calendars from '../../shared/Calendars';
import moment from 'moment';

const CreateForm = () => {
  const PARTICIPANT_COUNT = Array.from({ length: 10 }, (_, i) => ({ value: Number(i + 1) }));
  const navigator = useNavigate();
  const location = useLocation();
  const partyId = parseInt(new URLSearchParams(location.search).get('partyId'));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const party = location.state || {};
  const isEdit = !!partyId;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const INPUT_MESSAGE = {
    title: '제목을 입력해주세요',
    content: '내용을 입력해주세요',
  };

  const TITLE_VALIDATE = {
    required: INPUT_MESSAGE.title,
    minLength: {
      value: 5,
      message: '최소 5자 이상 입력해주세요.',
    },
    maxLength: {
      value: 20,
      message: '최대 20자까지 입력해주세요.',
    },
    validate: value => value.trim().length > 0 || INPUT_MESSAGE.title,
  };

  const CONTENT_VALIDATE = {
    required: INPUT_MESSAGE.content,
    maxLength: {
      value: 255,
      message: '최대 255자까지 입력해주세요.',
    },
    validate: value => value.trim().length > 0 || INPUT_MESSAGE.content,
  };

  // 수정모드일때 가져온 값
  useEffect(() => {
    if (isEdit) {
      const partyDate = moment(party.partyDate).format('YYYY-MM-DD HH:mm');
      setSelectedDate(new Date(partyDate));
      reset({
        title: party.title,
        content: party.content,
        totalCount: party.totalCount,
        partyDate,
      });
    }
  }, []);

  // 수정
  const updateMutation = useMutation(
    data => putAPI(`${PARTIES_URL.PARTIES_STATUS_CHANGE}/${partyId}`, data),
    {
      onSuccess: response => {
        alert(response.data.msg);
      },
      onError: error => {
        alert(error.message);
      },
    },
  );
  // 등록
  const createMutation = useMutation(data => postAPI(`${PARTIES_URL.PARTIES_ADD}`, data), {
    onSuccess: response => {
      alert(response.data.msg);
    },
    onError: error => {
      alert(error.message);
    },
  });
  const handlePartySubmit = data => {
    data.title = data.title.trim();
    data.content = data.content.trim();
    data.partyDate = moment(selectedDate).format('YYYY-MM-DD HH:mm');
    if (isEdit) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
    reset();
    navigator(PATH_URL.MAIN);
  };

  return (
    <FormWrapper>
      <FormContainer onSubmit={handleSubmit(handlePartySubmit)}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          placeholder={INPUT_MESSAGE.title}
          {...register('title', TITLE_VALIDATE)}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          type="text"
          placeholder={INPUT_MESSAGE.content}
          {...register('content', CONTENT_VALIDATE)}
        ></textarea>
        {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
        <label htmlFor="totalCount">모집인원</label>
        <select id="totalCount" {...register('totalCount')}>
          {PARTICIPANT_COUNT.map(option => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        <label htmlFor="partyDate">모임일시</label>
        <input type="hidden" {...register('partyDate', { value: selectedDate })} />
        <Calendars id="partyDate" selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div>
          <Link to={PATH_URL.MAIN}>
            <button>취소하기</button>
          </Link>
          <button type="submit">{isEdit ? '수정하기' : '등록하기'}</button>
        </div>
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
