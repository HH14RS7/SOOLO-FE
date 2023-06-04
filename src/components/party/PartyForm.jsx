import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { PATH_URL, PARTIES_URL } from '../../shared/constants';
import { useMutation } from 'react-query';
import Calendars from '../../shared/Calendars';
import moment from 'moment';
import { putUpdateAPI, postImageAPI } from '../../api/api';
import useGetRegionName from '../../hooks/useGetRegionName';
import useGetNearbyStation from '../../hooks/useGetNearbyStation';

const CreateForm = ({ party }) => {
  const { regionName, getRegionName } = useGetRegionName();
  const { stationName, distance, getStationInfo } = useGetNearbyStation();
  const location = useLocation();
  const place = location.state || {};
  // const PARTICIPANT_COUNT = Array.from({ length: 9 }, (_, i) => ({ value: Number(i + 2) }));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [previewImage, setPreviewImage] = useState(party.imgUrl || null);

  const imgRef = useRef();
  const noImg = '/img/no-img.jpg';
  const [img, setImg] = useState(noImg);
  const isEdit = !!party.partyId;
  const navigate = useNavigate();

  const latitude = isEdit ? party.latitude : place.y;
  const longitude = isEdit ? party.longitude : place.x;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const INPUT_MESSAGE = {
    title: '모임 이름을 적어주세요',
    content: '모임 내용을 적어주세요',
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

  useEffect(() => {
    if (isEdit) {
      const partyDate = moment(party.partyDate).format('YYYY-MM-DD HH:mm');
      setSelectedDate(new Date(partyDate));
      // 수정모드일때 가져온 값
      reset({
        title: party.title,
        content: party.content,
        totalCount: party.totalCount,
        partyDate,
        img: party.imageUrl,
      });
    } else {
      // 등록모드
      reset({
        title: '',
        content: '',
        totalCount: 2,
        img: '',
      });
    }
  }, []);

  // 수정
  const updateMutation = useMutation(
    formData => putUpdateAPI(`${PARTIES_URL.PARTIES_STATUS_CHANGE}/${party.partyId}`, formData),
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

  useEffect(() => {
    getRegionName(latitude, longitude);
    getStationInfo(latitude, longitude);
  }, [latitude, longitude]);

  // 모임 등록
  const handlePartySubmit = item => {
    const formData = new FormData();

    const data = {
      title: item.title.trim(),
      content: item.content.trim(),
      partyDate: moment(selectedDate).format('YYYY-MM-DD HH:mm'),
      totalCount: 3,
      latitude: isEdit ? party.latitude : place.y,
      longitude: isEdit ? party.longitude : place.x,
      placeName: isEdit ? party.placeName : place.place_name,
      placeAddress: isEdit ? party.placeAddress : place.road_address_name,
      placeUrl: isEdit ? party.placeUrl : place.place_url,
      stationName: isEdit ? party.stationName : stationName,
      distance: isEdit ? party.distance : distance,
      regionName: isEdit ? party.regionName : regionName,
    };

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    const img = imgRef.current.files[0];
    img && formData.append('image', img);

    if (isEdit) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
    reset();
    navigate(PATH_URL.MAIN);
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

  const handlePrevClick = () => {
    if (!isEdit) {
      navigate(PATH_URL.PARTY_MAP_CREATE, { state: place });
    } else {
      navigate(PATH_URL.MAIN);
    }
  };

  const goSearchPlace = () => {
    navigate(PATH_URL.PARTY_PLACE_CREATE);
  };

  return (
    <div>
      <PlaceWrapper>
        <PlaceHeader>
          <label htmlFor="mapData">모임 장소</label>
          <ModifyButton onClick={goSearchPlace}>수정하기</ModifyButton>
        </PlaceHeader>
        <div>
          <div>{isEdit ? party.placeName : place.place_name}</div>
          <div>{isEdit ? party.placeAddress : place.road_address_name}</div>
        </div>
      </PlaceWrapper>
      <FormWrapper>
        <FormContainer onSubmit={handleSubmit(handlePartySubmit)}>
          <label htmlFor="title">모임 이름</label>
          <input
            id="title"
            type="text"
            placeholder={INPUT_MESSAGE.title}
            {...register('title', TITLE_VALIDATE)}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <label htmlFor="content">모임 정보</label>
          <textarea
            id="content"
            type="text"
            placeholder={INPUT_MESSAGE.content}
            {...register('content', CONTENT_VALIDATE)}
          ></textarea>
          {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
          <label htmlFor="totalCount">모임 인원</label>
          <button>-</button>
          <button>+</button>
          {/* <select id="totalCount" {...register('totalCount')}>
          {PARTICIPANT_COUNT.map(option => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select> */}
          <label htmlFor="partyDate">모임 날짜</label>
          <input type="hidden" {...register('partyDate', { value: selectedDate })} />
          <Calendars id="partyDate" selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <label htmlFor="img">이미지 업로드</label>
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
          <div>
            <button onClick={handlePrevClick}>취소하기</button>
            <button type="submit">업로드하기</button>
          </div>
        </FormContainer>
      </FormWrapper>
    </div>
  );
};

const PlaceWrapper = styled.div`
  border: 2px solid black;
  margin-bottom: 10px;
`;

const PlaceHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModifyButton = styled.div`
  width: 75px;
  height: 36px;
  background-color: pink;
`;

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
