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
import { ReactComponent as Check } from '../../assets/common/check.svg';
import TimeSlotPicker from '../../shared/TimeSlotPicker';
// import { ReactComponent as Upload } from '../../assets/common/upload.svg';

const CreateForm = ({ party }) => {
  const { regionName, getRegionName } = useGetRegionName();
  const { stationName, distance, getStationInfo } = useGetNearbyStation();
  const location = useLocation();
  const place = location.state || {};

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const [previewImage, setPreviewImage] = useState(party.imgUrl || null);
  const isEdit = !!party.partyId;

  const initialTotalCount = isEdit ? party.totalCount : 2;
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  const locationIcon = '/img/map-location.png';
  const addIcon = '/img/add.png';
  const minusIcon = '/img/minus.png';
  const imgRef = useRef();
  // const noImg = '/img/no-img.jpg';
  const defaultImg = '/img/default-image.png';
  const uploadImg = '/img/upload-image.png';

  const [img, setImg] = useState(defaultImg);

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
    title: '모임 이름을 적어주세요.',
    content: '모임 정보가 자세할수록 모임에 참여하는 사람들의\n성향이 나와 맞을 수 있습니다.',
    errortitle: '최소 5자 이상 적어주세요',
    errorContent: '모임 정보를 적어주세요.',
  };

  const TITLE_VALIDATE = {
    required: INPUT_MESSAGE.errortitle,
    minLength: { value: 5, message: INPUT_MESSAGE.errortitle }, // 에러 메시지 추가
    maxLength: { value: 20, message: '최대 20자까지 입력할 수 있습니다.' }, // 최대 길이 에러 메시지 추가
    validate: value => {
      const trimmedValue = value.trim();
      return (
        (trimmedValue.length > 0 &&
          trimmedValue.length >= 5 &&
          trimmedValue.replace(/\s/g, '') !== '') ||
        INPUT_MESSAGE.errortitle
      );
    },
  };

  const CONTENT_VALIDATE = {
    required: INPUT_MESSAGE.errorContent,
    maxLength: { value: 255, message: '최대 255자까지 입력할 수 있습니다.' }, // 최대 길이 에러 메시지 추가
    validate: value => value.trim().length > 0 || INPUT_MESSAGE.errorContent,
  };

  useEffect(() => {
    if (isEdit) {
      const partyDate = moment(party.partyDate).format('YYYY-MM-DD HH:mm');
      setSelectedDate(new Date(partyDate));
      setSelectedTime(partyDate.split(' ')[1]);

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
    const formatDate = moment(selectedDate).format('YYYY-MM-DD') + ' ' + selectedTime;

    const data = {
      title: item.title.trim(),
      content: item.content.trim(),
      partyDate: formatDate,
      totalCount,
      latitude: isEdit ? party.latitude : place.y,
      longitude: isEdit ? party.longitude : place.x,
      placeName: isEdit ? party.placeName : place.place_name,
      placeAddress: isEdit ? party.placeAddress : place.road_address_name,
      placeUrl: isEdit ? party.placeUrl : place.place_url,
      stationName: isEdit ? party.stationName : stationName,
      distance: isEdit ? party.distance : distance,
      regionName: isEdit ? party.regionName : regionName,
      categoryName: isEdit ? party.categoryName : place.category_name?.split('>').reverse()[0],
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
    // navigate(PATH_URL.MAIN);
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
  const handleTimeSelect = time => {
    setSelectedTime(time);
  };
  return (
    <Wrapper>
      <PlaceSection>
        <PlaceHeader>
          <Label htmlFor="mapData">모임 장소</Label>
          {/* {!isEdit && <ModifyButton onClick={goSearchPlace}>장소 변경하기</ModifyButton>} */}
          <ModifyButton onClick={goSearchPlace}>장소 변경하기</ModifyButton>
        </PlaceHeader>
        <PlaceInfo>
          <LocationIcon src={locationIcon} alt="location" />
          <PlaceDetail>
            <TopInfo>
              <PlaceName>{isEdit ? party.placeName : place.place_name}</PlaceName>
              <Category>
                {isEdit ? party.categoryName : place.category_name?.split('>').reverse()[0]}
              </Category>
            </TopInfo>
            <PlaceAddress>{isEdit ? party.placeAddress : place.road_address_name}</PlaceAddress>
          </PlaceDetail>
        </PlaceInfo>
      </PlaceSection>
      <FormContainer onSubmit={handleSubmit(handlePartySubmit)}>
        <PlaceNameSection>
          <Label htmlFor="title">모임 이름</Label>
          <InputField
            id="title"
            type="text"
            placeholder={INPUT_MESSAGE.title}
            maxLength="20"
            {...register('title', TITLE_VALIDATE)}
          />
          <FieldValidate>
            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
            <ChaValidate>
              {title.length}/{TITLE_VALIDATE.maxLength.value}
            </ChaValidate>
          </FieldValidate>
        </PlaceNameSection>
        <PlaceContentSection>
          <Label htmlFor="content">모임 정보</Label>
          <TextAreaField
            id="content"
            type="text"
            placeholder={INPUT_MESSAGE.content}
            maxLength="255"
            {...register('content', CONTENT_VALIDATE)}
          ></TextAreaField>
          <FieldValidate>
            {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
            <ChaValidate>
              {content.length}/{CONTENT_VALIDATE.maxLength.value}
            </ChaValidate>
          </FieldValidate>
        </PlaceContentSection>
        <InfoSection>
          <InfoHeader>
            <CheckIcon />
            <Infotitle>모임 정보 작성 가이드</Infotitle>
          </InfoHeader>
          <InfoMessage>
            <InfoContent>
              모임의 목적, 마실 주류, 먹을 안주류, 예정된 종료시간 등 모임에 관한
            </InfoContent>
            <InfoContent>자세한 정보를 적어보세요. </InfoContent>
          </InfoMessage>
        </InfoSection>
        <PeopleCountSection>
          <Label htmlFor="totalCount">모임 인원</Label>
          <Count>
            <button onClick={handleDecreaseCount}>
              <img src={minusIcon} alt="minusIcon" />
            </button>
            <TotalCount>{totalCount}</TotalCount>
            <button onClick={handleIncreaseCount}>
              <img src={addIcon} alt="addIcon" />
            </button>
          </Count>
        </PeopleCountSection>
        <DateContainer>
          <Label htmlFor="partyDate">모임 날짜</Label>
          {/* <input type="hidden" {...register('partyDate', { value: selectedDate })} /> */}
          <Calendars id="partyDate" selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <TimeSlotPicker
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
            isEdit={isEdit}
          />
        </DateContainer>
        <ImageUplaodSection>
          <Label htmlFor="img">이미지 업로드</Label>
          <PlaceImageWrapper>
            <PlaceImage src={previewImage || party.imageUrl || defaultImg} alt="PlaceImage" />
            <UploadButton>
              <PlaceImage src={uploadImg} alt="PlaceImage" />
            </UploadButton>
          </PlaceImageWrapper>
        </ImageUplaodSection>
        <FileInput
          type="file"
          accept="image/*"
          id="img"
          name="img"
          ref={imgRef}
          onChange={handleFileChange}
        />
        <ImageInfoSection>
          <CheckIcon />
          <InfoMessage>
            <Infotitle>이미지 업로드 가이드</Infotitle>
            <InfoContent>
              업로드 되는 이미지는 모임 게시할 때 맨 처음 소개됩니다. 불쾌한 이미지,
            </InfoContent>
            {/* <InfoContent> */}
            {/* 논란의 여지가 있는 이미지를 업로드시 서비스 가이드 위반으로 이용 */}
            {/* <InfoContent>제제가 들어갈 수 있습니다.</InfoContent> */}
            {/* </InfoContent> */}
          </InfoMessage>
        </ImageInfoSection>
        <ButtonWrapper>
          {/* <button onClick={handlePrevClick}>취소하기</button> */}
          <PlaceButton type="submit">{isEdit ? '모임글 수정하기' : '모임글 게시하기'}</PlaceButton>
        </ButtonWrapper>
      </FormContainer>
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
`;

const PlaceHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
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
  margin-top: 0.5rem;
`;

const TopInfo = styled.div`
  display: flex;
  flex-direction: row;
  height: 16px;
  align-items: flex-center;
  gap: 0.5rem;
  width: auto;
  width: 440px;
`;
const PlaceName = styled.h4`
  white-space: no-wrap;
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

const Category = styled.h5`
  color: var(--color-gray-500);
`;

const PlaceAddress = styled.h5`
  color: var(--color-gray-500);
`;

/* PartySection */
const PlaceNameSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: 4rem;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: var(--font-weight-700);
  font-size: 0.75rem;
  line-height: 100%;
  letter-spacing: -0.015em;
  color: var(--color-netural-dark);
  // margin-bottom: 0.5rem;
`;

const InputField = styled.input`
  width: 328px;
  height: 48px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  margin-top: 0.5rem;

  &::placeholder {
    color: var(--color-netural-dark-lightest);
    font-style: normal;
    font-weight: var(--font-weight-400);
    font-size: 0.875rem;
    line-height: 100%;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
  }
`;

const FieldValidate = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
`;

const ChaValidate = styled.p`
  font-style: normal;
  font-weight: 
  font-size: 10px;
  line-height: 100%;
  letter-spacing: -0.015em;
  color: var(--color-gray-500);
`;

const ErrorMessage = styled.p`
  color: var(--color-error-500);
`;

/* PlaceContentSection */
const PlaceContentSection = styled.section`
  width: 320px;
`;

const TextAreaField = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1rem;
  gap: 0.5rem;
  width: 328px;
  height: 100px;
  border: 1px solid #c5c6cc;
  border-radius: 12px;
  margin-top: 0.5rem;
  // background: yellow;

  &::placeholder {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    /* or 14px */
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    /* Neutral/Dark/Lightest */
    color: #8f9098;
  }
`;

/* InfoSection */
const InfoSection = styled.section`
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  height: 74px;
  // height: 100%;
  background: var(--color-gray-100);
  padding: 1rem 0px 1rem 1rem;
  border-radius: 0.5rem;
  width: 328px;
`;

const InfoHeader = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 4px;
`;

const CheckIcon = styled(Check)`
  width: 10px;
  height: 10px;
  fill: var(--color-gray-600);
`;

const InfoMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 1rem;
`;

const Infotitle = styled.p`
  font-family: 'Inter';
  font-weight: var(--font-weight-600);
  color: var(--color-gray-600);
`;

const InfoContent = styled.p`
  color: var(--color-gray-400);
  font-weight: var(--font-weight-400);
  letter-spacing: 0.015em;
  white-space: pre-wrap;
`;

/* PeopleCountSection */
const PeopleCountSection = styled.div`
  width: 328px;
  padding: 0 1rem 0 0;
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Count = styled.div`
  display: flex;
  gap: 6px;
  height: 26px;
  width: 77px;
  white-space: nowrap;
`;

const TotalCount = styled.div`
  // align-items: center;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-netural-dark);
  flex-shrink: 0;
`;

const DateContainer = styled.div``;

/* ImageInfoSection */
const ImageInfoSection = styled.div`
  margin-top: 0.25rem;
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  height: 90px;
  // height: 100%;
  background: var(--color-gray-100);
  padding: 1rem 0px 1rem 1rem;
  border-radius: 0.5rem;
  width: 328px;
`;

/* ImageUploadSection */
const ImageUplaodSection = styled.section``;

const PlaceImageWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: flex-start;
  padding: 0px;
  gap: 0.5rem;
  height: 94px;
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  width: 160px;
  height: 94px;
  /* Primary/500 */
  background: #f63d68;
  border-radius: 16px;
`;

const UploadButton = styled.button`
  border-radius: 16px;
  display: flex;
  justify-content: center;
  width: 160px;
  height: 94px;
`;

const FileInput = styled.input`
  position: relative;
  background-color: #ffffff;
  width: 150px;
  height: auto;
  cursor: pointer;
`;

/* ButtonWrapper */
const ButtonWrapper = styled.div`
  margin-bottom: 70px; // 임시
  // margin-top: 4rem;
  // bottom: 0;
  // position: fixed;
`;

/* PlaceButton */
const PlaceButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 328px;
  height: 48px;
  background: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);
  border-radius: 0.75rem;

  font-family: 'Inter';
  font-style: normal;
  font-weight: var(--font-weight-600);
  font-size: 0.75rem;
  line-height: 15px;
  color: var(--color-gray-25);
`;

export default CreateForm;
