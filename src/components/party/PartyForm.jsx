/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { PATH_URL, PARTIES_URL } from '../../shared/constants';
import { useMutation } from 'react-query';
import Calendars from '../../shared/Calendars';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { mapDataState, stationDataState } from '../../atoms';
import { putUpdateAPI, postImageAPI } from '../../api/api';

const CreateForm = () => {
  const mapData = useRecoilValue(mapDataState);
  const stationData = useRecoilValue(stationDataState);

  const PARTICIPANT_COUNT = Array.from({ length: 9 }, (_, i) => ({ value: Number(i + 2) }));
  const navigator = useNavigate();
  const location = useLocation();
  const partyId = parseInt(new URLSearchParams(location.search).get('partyId'));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const party = location.state || {};
  party.imageUrl =
    'https://walkingpuppy7.s3.ap-northeast-2.amazonaws.com/S39e3918e3-a1f8-4ccc-ba8e-9cc70797c6d2.jpeg';
  const [previewImage, setPreviewImage] = useState(party.imgUrl || null);
  const isEdit = !!partyId;
  const imgRef = useRef();
  const noImg = '/img/no-img.jpg';
  const [img, setImg] = useState(noImg);

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
        longitude: party.longitude,
        placeName: party.placeName,
        placeAddress: party.placeAddress,
        placeUrl: party.placeUrl,
        stationName: party.stationName,
        distance: party.distance,
        img: party.imageUrl,
      });
    }
  }, []);

  // 수정
  const updateMutation = useMutation(
    formData => putUpdateAPI(`${PARTIES_URL.PARTIES_STATUS_CHANGE}/${partyId}`, formData),
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
  const createMutation = useMutation(
    formData => postImageAPI(`${PARTIES_URL.PARTIES_ADD}`, formData),
    {
      onSuccess: response => {
        alert(response.data.msg);
      },
      onError: error => {
        alert(error.message);
      },
    },
  );

  const handlePartySubmit = item => {
    const img = imgRef.current.files[0];
    const formData = new FormData();

    const { latitude, longitude, placeName, placeAddress, placeUrl } = mapData;
    const { stationName, distance } = stationData;

    const data = {
      title: item.title.trim(),
      content: item.content.trim(),
      partyDate: moment(selectedDate).format('YYYY-MM-DD HH:mm'),
      totalCount: item.totalCount,
      latitude,
      longitude,
      placeName,
      placeAddress,
      placeUrl,
      stationName,
      distance,
    };

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    img && formData.append('image', img);
    if (isEdit) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
    reset();
    navigator(PATH_URL.MAIN);
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImg(file);
    }
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
        <PlaceImageWrapper>
          <PlaceImage src={previewImage || party.imageUrl || noImg} alt="PlaceImage" />
        </PlaceImageWrapper>
        <FileInput
          type="file"
          accept="image/*"
          id="img"
          name="img"
          ref={imgRef}
          onChange={handleFileChange}
        />
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

const PlaceImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
`;
const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileInput = styled.input`
  position: relative;
  background-color: #ffffff;
  width: 150px;
  height: auto;
  cursor: pointer;
`;
export default CreateForm;
