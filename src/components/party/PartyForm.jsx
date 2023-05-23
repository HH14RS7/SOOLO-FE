import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PATH_URL, PARTIES_URL } from '../../shared/constants';
import { useMutation } from 'react-query';
import { postAPI } from '../../api/api';
import Calendars from '../../shared/Calendars';
import { formatDate } from '../../shared/formatDate';

const CreateForm = () => {
  const PARTICIPANT_COUNT = Array.from({ length: 10 }, (_, i) => ({ value: i + 1 }));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const mutation = useMutation(postAPI(PARTIES_URL.PARTIES_ADD), {
  //   onSuccess: response => {
  //     console.log(response);
  //     alert('모임이 등록되었습니다');
  //   },
  //   onError: error => {
  // },
  // });

  const handlePartySubmit = data => {
    console.log(data);
    data.date = formatDate(data.date);
    try {
      // mutation.mutate(data);
      navigator(PATH_URL.MAIN);
    } catch (error) {}
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
        <button type="submit">모임 만들기</button>
      </FormContainer>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;s
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default CreateForm;
