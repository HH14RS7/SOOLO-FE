import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const isEdit = !!party.partyId;
  const initialTotalCount = isEdit ? party.totalCount : 2;
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  const locationIcon = '/img/map-location.png';
  const imgRef = useRef();
  const noImg = '/img/no-img.jpg';

  const [img, setImg] = useState(noImg);
  const navigate = useNavigate();

  const latitude = isEdit ? party.latitude : place.y;
  const longitude = isEdit ? party.longitude : place.x;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const title = watch('title', '');
  const content = watch('content', '');

  const INPUT_MESSAGE = {
    title: '모임 이름을 적어주세요.(공백 제외 최소 5글자)',
    content: '모임 내용을 적어주세요.',
  };

  const TITLE_VALIDATE = {
    required: INPUT_MESSAGE.title,
    minLength: { value: 5 },
    maxLength: { value: 20 },
    validate: value => {
      const trimmedValue = value.trim();
      return (
        (trimmedValue.length > 0 &&
          trimmedValue.length >= 5 &&
          trimmedValue.replace(/\s/g, '') !== '') ||
        INPUT_MESSAGE.title
      );
    },
  };

  const CONTENT_VALIDATE = {
    required: INPUT_MESSAGE.content,
    maxLength: { value: 255 },
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
        totalCount,
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

  // 지하철, 행정구역 정보 조회
  useEffect(() => {
    getRegionName(latitude, longitude);
    getStationInfo(latitude, longitude);
  }, [latitude, longitude]);

  // 모임 등록 및 수정
  const handlePartySubmit = item => {
    const formData = new FormData();

    const data = {
      title: item.title.trim(),
      content: item.content.trim(),
      partyDate: moment(selectedDate).format('YYYY-MM-DD HH:mm'),
      totalCount,
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
    if (isEdit) {
      navigate(PATH_URL.MAIN);
    } else {
      navigate(PATH_URL.PARTY_MAP_CREATE, { state: place });
    }
  };
  // 장소 검색 리스트로 이동
  const goSearchPlace = () => {
    navigate(PATH_URL.PARTY_PLACE_CREATE);
  };

  const handleIncreaseCount = e => {
    e.preventDefault();
    setTotalCount(totalCount => Math.min(totalCount + 1, 15));
  };

  const handleDecreaseCount = e => {
    e.preventDefault();
    setTotalCount(totalCount => Math.max(totalCount - 1, 2));
  };

  return (
    <Wrapper>
      <PlaceSection>
        <PlaceHeader>
          <h6 htmlFor="mapData">모임 장소</h6>
          {!isEdit && <ModifyButton onClick={goSearchPlace}>장소 변경하기</ModifyButton>}
        </PlaceHeader>
        <PlaceInfo>
          <LocationIcon src={locationIcon} alt="location" />
          <PlaceDetail>
            <TopInfo>
              <h4>{isEdit ? party.placeName : place.place_name}</h4>
              <Category> {place.category_name.split('>').reverse()[0]}</Category>
              {/* <Category>
                {isEdit ? party.categoryName : place.category_name.split('>').reverse()[0]}
              </Category> */}
            </TopInfo>
            <PlaceAddress>{isEdit ? party.placeAddress : place.road_address_name}</PlaceAddress>
          </PlaceDetail>
        </PlaceInfo>
      </PlaceSection>
      <FormSection>
        <FormContainer onSubmit={handleSubmit(handlePartySubmit)}>
          <h6 htmlFor="title">모임 이름</h6>
          <input
            id="title"
            type="text"
            placeholder={INPUT_MESSAGE.title}
            maxLength="20"
            {...register('title', TITLE_VALIDATE)}
          />
          <div>
            {title.length}/{TITLE_VALIDATE.maxLength.value}
          </div>
          {/* {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>} */}
          <label htmlFor="content">모임 정보</label>
          <textarea
            id="content"
            type="text"
            placeholder={INPUT_MESSAGE.content}
            maxLength="255"
            {...register('content', CONTENT_VALIDATE)}
          ></textarea>
          <div>
            {content.length}/{CONTENT_VALIDATE.maxLength.value}
          </div>
          {/* {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>} */}
          <label htmlFor="totalCount">모임 인원</label>
          <div>
            <div>{totalCount}</div>
            <button onClick={handleDecreaseCount}>-</button>
            <button onClick={handleIncreaseCount}>+</button>
          </div>
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
            <button type="submit" disabled={!isValid}>
              업로드하기
            </button>
          </div>
        </FormContainer>
      </FormSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 360px;
  height: 100%;
  margin: 0 auto;
`;

/* PlaceSection */
const PlaceSection = styled.section`
  padding: 1.5rem 1rem;
  height: 80px;
  margin-bottom: 50px;
`;

const PlaceHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const ModifyButton = styled.h6`
  cursor: pointer;
`;

const PlaceInfo = styled.div`
  display: flex;
  height: 80px;
  background: var(--color-gray-50);
  border: var(--color-gray-200);
  border-radius: 1rem;
  padding: 21px 1rem;
  gap: 0.5rem;
`;

const LocationIcon = styled.img`
  width: 38px;
  height: 38px;
`;

const PlaceDetail = styled.div`
  display: flex;
  flex-direction: column;
  height: 36px;
  align-items: flex-start;
  gap: 0.5rem;
`;

const TopInfo = styled.div`
  display: flex;
  flex-direction: row;
  height: 16px;
  align-items: flex-center;
  gap: 0.5rem;
`;

const Category = styled.h5`
  color: var(--color-gray-500);
`;

const PlaceAddress = styled.h5`
  color: var(--color-gray-500);
`;
const FormSection = styled.section`
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
