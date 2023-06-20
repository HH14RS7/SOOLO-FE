import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATH_URL, PARTIES_URL } from '../../shared/constants';
import { useMutation } from 'react-query';
import { putUpdateAPI, postImageAPI } from '../../api/api';
import Calendars from '../../shared/Calendars';
import TimeSlotPicker from '../../shared/TimeSlotPicker';
import moment from 'moment';
import useGetRegionName from '../../hooks/useGetRegionName';
import useGetNearbyStation from '../../hooks/useGetNearbyStation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReactComponent as Information } from '../../assets/common/information.svg';
import { ReactComponent as Check } from '../../assets/common/check.svg';
import { ReactComponent as Upload } from '../../assets/common/upload.svg';
import { ReactComponent as Close } from '../../assets/common/close.svg';
import { ReactComponent as LeftBack } from '../../assets/chating/LeftBack.svg';
// import { Modal } from '../../elements/Modal';
import { tempPartyData } from '../../atoms';

const CreateForm = ({ party }) => {
  const location = useLocation();
  const { regionName, getRegionName } = useGetRegionName();
  const { stationName, distance, getStationInfo } = useGetNearbyStation();
  const setTempPartyData = useSetRecoilState(tempPartyData);
  const partyData = useRecoilValue(tempPartyData);

  const place = location.state || {};
  const isEdit = !!party.partyId;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [previewImage, setPreviewImage] = useState(party.imgUrl || null);
  const [errorMessage, setErrorMessage] = useState('');

  const initialTotalCount = isEdit ? party.totalCount : 2;
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  const imgRef = useRef();
  const locationIcon = '/img/map-location.png';
  const addIcon = '/img/add.png';
  const minusIcon = '/img/minus.png';
  const defaultImg = '/img/default-image.png';
  const [img, setImg] = useState(defaultImg);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const latitude = isEdit ? party.latitude : place.y;
  const longitude = isEdit ? party.longitude : place.x;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
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
      reset({
        title: party.title,
        content: party.content,
      });
      const partyDate = moment(party.partyDate).format('YYYY-MM-DD HH:mm');
      setSelectedDate(new Date(partyDate));
      setSelectedTime(partyDate.split(' ')[1]);
    } else {
      // 등록모드
      reset({
        title: partyData ? partyData.title : '',
        content: partyData ? partyData.content : '',
      });
      if (partyData) {
        const partyDate = moment(partyData.selectedDate).format('YYYY-MM-DD');
        setTotalCount(partyData.totalCount);
        setSelectedTime(partyData.selectedTime);
        setSelectedDate(new Date(partyDate));
        console.log(img);
      }
    }
  }, [partyData]);

  // 수정
  const updateMutation = useMutation(
    formData => putUpdateAPI(`${PARTIES_URL.PARTIES_STATUS_CHANGE}/${party.partyId}`, formData),
    {
      onSuccess: response => {
        // setIsModalOpen(true);
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
        // setIsModalOpen(true);
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

    if (!timeValidate()) {
      return;
    }

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
    img && formData.append('image', img);

    if (isEdit) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
    reset();
    setTempPartyData(null);
    navigate(PATH_URL.MAIN);
  };

  const timeValidate = () => {
    if (!selectedDate || !selectedTime) {
      alert('시간을 선택해주세요');
      return false;
    }
    const currentDate = new Date();
    const currentDateTime = currentDate.getHours() * 100 + currentDate.getMinutes();

    const formatSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
    const formattTodayDate = moment(currentDate).format('YYYY-MM-DD');
    // 현재일 선택시
    if (
      formatSelectedDate === formattTodayDate &&
      parseInt(selectedTime.replace(':', '')) < currentDateTime
    ) {
      alert('현재 시간 이후로 선택해주세요');
      return false;
    }
    return true;
  };
  // 파일 선택
  const handleUploadClick = () => {
    imgRef.current.click();
  };

  const handleFileChange = e => {
    setErrorMessage('');

    const file = e.target.files[0];
    if (file) {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
      const fileExtension = file.name.toLowerCase().split('.').pop();
      const maxSizeInBytes = 10 * 1024 * 1024;

      if (!allowedExtensions.includes(fileExtension)) {
        setErrorMessage(`${fileExtension}은(는) 업로드가 허용되지 않는 확장자입니다.`);
        return;
      }

      if (file.size > maxSizeInBytes) {
        setErrorMessage('10MB 이내 파일을 업로드해주세요.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setImg(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrevClick = () => {
    if (isEdit) {
      navigate(PATH_URL.MAIN);
    } else {
      const tempData = {
        selectedDate: moment(selectedDate).format('YYYY-MM-DD'),
        selectedTime,
        title,
        content,
        totalCount,
      };
      setTempPartyData(tempData);
      console.log(previewImage);

      navigate(PATH_URL.PARTY_MAP_CREATE, { state: place });
    }
  };

  // 장소 검색 리스트로 이동
  const goSearchPlace = () => {
    const isConfirm = window.confirm('확인시 업로드하신 이미지는 초기화됩니다.');
    if (isConfirm) {
      const tempData = {
        selectedDate: moment(selectedDate).format('YYYY-MM-DD'),
        selectedTime,
        title,
        content,
        totalCount,
      };
      setTempPartyData(tempData);
      navigate(PATH_URL.PARTY_PLACE_CREATE);
    }
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

  const ExitopenModal = () => {
    setIsExitModalOpen(true);
  };

  const ExitcloseModal = () => {
    setIsExitModalOpen(false);
  };

  const handleModalButtonClick = () => {
    setIsModalOpen(false);
    navigate(PATH_URL.MAIN);
  };

  return (
    <Background>
      {/* {isModalOpen && (
        <Modal
          title="모임글이 수정되었습니다."
          subTitle="모달 부제목"
          text1="확인"
          onClick={handleModalButtonClick}
        />
      )} */}
      <Container>
        <Topbar>
          <TopBackDiv>
            <button onClick={handlePrevClick}>
              <LeftBack />
            </button>
          </TopBackDiv>
          <TopbarName>{isEdit ? '모임 수정하기' : '모임 생성하기'}</TopbarName>
        </Topbar>
        <Contents>
          <PlaceSection>
            <PlaceHeader>
              <Label htmlFor="place">모임 장소</Label>
              {!isEdit && <ModifyButton onClick={goSearchPlace}>장소 변경하기</ModifyButton>}
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
            {isEdit && (
              <ModifyInfo>
                <InfoIcon /> <InfoMsg>모임 장소 수정은 불가합니다.</InfoMsg>
              </ModifyInfo>
            )}
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
              <Calendars
                id="partyDate"
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <TimeSection>
                <Label htmlFor="partyTime">모임이 시작되는 시간</Label>
                <TimeHeader>오후</TimeHeader>
                <TimeSlotPicker
                  selectedTime={selectedTime}
                  selectedDate={selectedDate}
                  onTimeSelect={handleTimeSelect}
                  isEdit={isEdit}
                />
              </TimeSection>
            </DateContainer>
            <ImageUplaodSection>
              <Label htmlFor="img">이미지 업로드(선택)</Label>
              <PlaceImageWrapper>
                <PlaceImage src={previewImage || party.imageUrl || defaultImg} alt="PlaceImage" />
                {/* 업로드버튼 */}
                <UploadButton onClick={handleUploadClick}>
                  <UploadIcon />
                  <FileInput
                    type="file"
                    accept=".jpg, .jpeg, .png, .gif, .bmp, .webp, .svg"
                    id="img"
                    name="img"
                    ref={imgRef}
                    onChange={handleFileChange}
                  />
                  <UploadMsg>
                    {isEdit && party?.imageUrl
                      ? '이미지 변경하기'
                      : !previewImage
                      ? '이미지 업로드하기'
                      : '이미지 변경하기'}
                  </UploadMsg>
                </UploadButton>
                {/* <ButtonContainer>
                  <ImgModifyButton onClick={handleUploadClick}>
                    <UploadIcon />
                    <FileInput
                      type="file"
                      accept="image/*"
                      id="img"
                      name="img"
                      ref={imgRef}
                      onChange={handleFileChange}
                    />
                    <UploadMsg>이미지 변경하기</UploadMsg>
                  </ImgModifyButton>
                  <ImgModifyButton onClick={handleDeleteClick}>
                    <CloseIcon />
                    <FileInput
                      type="file"
                      accept="image/*"
                      id="img"
                      name="img"
                      ref={imgRef}
                      onChange={handleFileChange}
                    />
                    <UploadMsg>이미지 삭제하기</UploadMsg>
                  </ImgModifyButton>
                </ButtonContainer> */}
              </PlaceImageWrapper>
              <ModifyInfo>
                <InfoMsg> {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}</InfoMsg>
              </ModifyInfo>
            </ImageUplaodSection>
            <ImageInfoSection>
              <InfoHeader>
                <CheckIcon />
                <Infotitle>이미지 업로드 가이드</Infotitle>
              </InfoHeader>
              <ImageInfo>
                <InfoContent>
                  업로드 되는 이미지는 모임을 게시할 때 맨 처음 소개됩니다. 불쾌한 이미지,
                </InfoContent>
                <InfoContent>
                  논란의 여지가 있는 이미지를 업로드시 서비스 가이드 위반으로 이용
                </InfoContent>
                <InfoContent>제재가 들어갈 수 있습니다.</InfoContent>
              </ImageInfo>
            </ImageInfoSection>
            <ButtonWrapper>
              {/* <button onClick={handlePrevClick}>취소하기</button> */}
              <PostButton type="submit">
                {isEdit ? '모임글 수정하기' : '모임글 게시하기'}
              </PostButton>
            </ButtonWrapper>
          </FormContainer>
        </Contents>
      </Container>
    </Background>
  );
};

// 기본 스타일
const Background = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 360px;
  height: 100%;
  background: #fff;
  margin: 0 auto;
`;

// TopBar 스타일
const Topbar = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: space-between; /* 변경된 부분 */
  width: 360px;
  height: 52px;
  border-bottom: 1px solid #f2f4f7;
  background: #fff;
  z-index: 10;
`;

const TopBackDiv = styled.div`
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const TopbarName = styled.div`
  color: #1d2939;
  font-size: 16px;
  text-align: center;
  flex-grow: 1;
  left: calc(50% - 360px / 2);
`;

const Contents = styled.div`
  width: 100%;
  margin: 0 auto;
`;

/* PlaceSection */
const PlaceSection = styled.section`
  padding: 1.5rem 1rem;
  margin-top: 51px;
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

const ModifyInfo = styled.div`
  padding-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;

const InfoIcon = styled(Information)``;

const InfoMsg = styled.p`
  color: var(--color-error-500);
`;

const PlaceInfo = styled.div`
  display: flex;
  height: 80px;
  background: var(--color-gray-50);
  border: var(--color-gray-200);
  border-radius: 1rem;
  padding: 21px 1rem;
  width: auto;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TopInfo = styled.div`
  display: flex;
  flex-direction: row;
  height: 16px;
  align-items: flex-center;
  gap: 0.5rem;
`;

const PlaceName = styled.h4`
  // white-space: nowrap;
  overflow: hidden;
  // text-overflow: ellipsis;
`;

const LocationIcon = styled.img`
  width: 38px;
  height: 38px;
`;

const PlaceDetail = styled.div`
  display: flex;
  flex-direction: column;
  height: 36px;
  justify-content: center;
  gap: 0.5rem;
`;

const Category = styled.h5`
  color: var(--color-gray-500);
  margin: auto 0;
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
  margin-left: 0.5rem;
  padding: 0.5rem 0 0 0.5rem;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: var(--font-weight-700);
  font-size: 0.75rem;
  line-height: 100%;
  letter-spacing: -0.015em;
  color: var(--color-netural-dark);
  margin-left: 0.25rem;
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
  width: 328px;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
`;

const ChaValidate = styled.p`
  font-style: normal;
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

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.2;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    color: #8f9098;
  }
`;

/* InfoSection */
const InfoSection = styled.section`
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  height: 74px;
  background: var(--color-gray-100);
  padding: 1rem 0px 1rem 1rem;
  border-radius: 0.5rem;
  width: 328px;
  gap: 8px;
`;

const InfoHeader = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

const CheckIcon = styled(Check)`
  width: 10px;
  height: 10px;
  fill: var(--color-gray-600);
`;

const Infotitle = styled.p`
  font-weight: var(--font-weight-600);
  padding-top: 1px;
  color: var(--color-gray-600);
`;

const InfoMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 0.9rem;
`;

const InfoContent = styled.p`
  color: var(--color-gray-600);
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
  margin-top: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  // padding: 0px;
  // gap: 10px;
  flex-direction: column;
  display: flex;
  height: 90px;
  width: 328px;
  background: var(--color-gray-100);
  padding-top: 1rem;
  padding-left: 1rem;
  border-radius: 0.5rem;
`;

const ImageInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
`;

/* TimeSection */
const TimeSection = styled.section`
  margin-top: 3rem;
`;

const TimeHeader = styled.p`
  margin-top: 0.5rem;
  margin-left: 0.25rem;
  font-weight: var(--font-weight-700);
  font-size: 0.75rem;
  color: var(--color-primary-500);
`;

/* ImageUploadSection */
const ImageUplaodSection = styled.section`
  margin-top: 3rem;
`;

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
  // background: var(--color-primary-500);
  border-radius: 1rem;
`;

const UploadButton = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // padding: 2rem 0;
  gap: 10px;
  width: 160px;
  height: 94px;
  background: var(--color-gray-50);
  border: 1px dashed var(--color-gray-200);
  border-radius: 1rem;
`;

const UploadIcon = styled(Upload)`
  width: 16px;
  height: 16px;
`;

const UploadMsg = styled.p`
  color: var(--color-gray-600);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

/* 이미지 변경삭제 */
const ImgModifyButton = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  // padding: 32px 0px;
  gap: 10px;
  cursor: pointer;
  width: 160px;
  height: 43px;
  background: #f9fafb;

  border: 1px dashed #e4e7ec;
  border-radius: 16px;
`;

const CloseIcon = styled(Close)`
  width: 16px;
  height: 16px;
`;

const FileInput = styled.input`
  position: relative;
  background-color: #ffffff;
  width: 150px;
  height: auto;
  // cursor: pointer;
  &[type='file'] {
    display: none;
  }
`;

/* ButtonWrapper */
const ButtonWrapper = styled.div`
  margin-top: 4rem;
  // position: fixed;
  // bottom: 24px;
  margin-bottom: 24px;
`;

/* PostButton */
const PostButton = styled.button`
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
