import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_URL, PARTIES_URL, MEMBER_URL } from '../../shared/constants';
import { dDayConvertor } from '../../shared/dDayConvertor';
import { partyStatus } from '../../shared/partyStatus';
import { deleteAPI, getAPI, postAPI } from '../../api/api';
import { useMutation } from 'react-query';
import { styled } from 'styled-components';
import SojuRoom from '../../assets/sojuroomimg.webp';
import { Link } from 'react-router-dom';
import { formmatedDate } from '../../shared/formattedDate';
import PartyDetailMap from '../map/PartyDetailMap';

// 이미지 import
import { ReactComponent as LeftBack } from '../../assets/chating/LeftBack.svg';
import { ReactComponent as Location } from '../../assets/map/location-line.svg';
import { ReactComponent as Subway } from '../../assets/map/subway.svg';
import { ReactComponent as People } from '../../assets/footer/mypage.svg';
import { ReactComponent as Slash } from '../../assets/map/slash.svg';
import { ReactComponent as Information } from '../../assets/common/information.svg';

export const PartyDetailInfo = () => {
  const location = useLocation();
  const partyId = location.pathname.split('/')[3];
  const navigate = useNavigate();
  const [data, setData] = useState();

  const locationIcon = '/img/map-location.png';
  const defaultImg = '/img/default-image.png';

  // 모임 상세 조회
  useEffect(() => {
    getAPI(`${PARTIES_URL.DETAIL}/${partyId}`)
      .then(response => {
        if (response.status === 200) {
          setData(response.data.data);
        }
      })
      .catch(error => {
        console.log('API 요청 중 에러 발생', error);
      });
  }, [partyId]);

  // 모임 취소
  const ApplicationButtonHandler = () => {
    postAPI(`${PARTIES_URL.PARTIES_APPLICATION}/${partyId}`).then(response => {
      window.location.replace(`/party/detail/${partyId}`);
      alert(response.data.msg);
    });
  };

  // 모임 수정
  const updateParty = partyId => {
    navigate(`${PATH_URL.PARTY_CREATE}?partyId=${partyId}`, { state: data });
  };

  // 모임 삭제
  const deletePartyMutation = useMutation(
    () => deleteAPI(`${PARTIES_URL.PARTIES_STATUS_CHANGE}/${partyId}`),
    {
      onSuccess: response => {
        alert(response.data.msg);
        navigate(PATH_URL.MAIN);
      },
      onError: error => {
        alert(error.message);
      },
    },
  );

  const deleteParty = partyId => {
    deletePartyMutation.mutate(partyId);
  };

  // 모임 신청 , 수정 , 삭제 조건부 버튼 렌더링
  // toString 을 쓰지 않을 경우에 조건부 핸들에 에러가 생김
  const memberIdData = data?.memberInfo[0].memberId.toString();
  const userIdData = localStorage?.memberId.toString();

  // 참여자
  const isfulled = data?.currentCount === data?.totalCount;

  // 디데이
  const dDay = dDayConvertor(data?.partyDate);
  const isdday = dDay === 0;

  // 주변역과의 거리 정보
  const distanceInfo =
    data?.distance === 0
      ? '1m 이내'
      : data?.distance <= 1000
      ? `${data?.distance}m`
      : `${data?.distance / 1000}km`;

  console.log('data ::', data);

  // 가게 정보 더보기
  const handleDetailClick = url => {
    window.open(url, '_blank');
  };

  return (
    <>
      <Background>
        <Container>
          <Contents>
            <Topbar>
              <TopBackDiv
                style={{
                  position: 'absolute',
                }}
              >
                <Link to={'/home'}>
                  <LeftBack />
                </Link>
              </TopBackDiv>
              <TopbarName>모임 정보</TopbarName>
            </Topbar>
            <PartyDetailImg>
              <img
                src={data?.imageUrl || defaultImg}
                alt="partydetail"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </PartyDetailImg>
            <PartyInfo>
              <div
                style={{
                  marginLeft: '17px',
                }}
              >
                <DdayTag isdday={isdday ? 1 : 0}>
                  <Dday>D-{isdday ? 0 : dDay}</Dday>
                </DdayTag>
                <PartyName>{data?.title}</PartyName>
                <Addresses>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    {data?.stationName ? (
                      <Subway style={{ marginRight: '4px' }} />
                    ) : (
                      <Location
                        style={{
                          marginRight: '4px',
                        }}
                      />
                    )}
                    {data?.stationName ? data?.stationName.split(' ')[0] : data?.regionName}
                  </div>
                  <PeopleCountInfo isfulled={isfulled ? 1 : 0}>
                    <PeopleIcon isfulled={isfulled ? 1 : 0} />
                    <PeopleCount>{data?.currentCount} </PeopleCount>
                    <SlashIcon isfulled={isfulled ? 1 : 0} />
                    <PeopleCount> {data?.totalCount} </PeopleCount>
                  </PeopleCountInfo>
                </Addresses>
                <TimePromise>{formmatedDate(data?.partyDate, 'MM.DD (ddd) · a h:mm')}</TimePromise>
              </div>
            </PartyInfo>
            <LineBar></LineBar>
            <PartyContents>
              <PartyInfoText>모임 정보</PartyInfoText>
              <div>{data?.content}</div>
            </PartyContents>
            <MapSection>
              <PartyInfoText>모임 장소 정보</PartyInfoText>
              <MapImage>
                {data && data.latitude && data.longitude && (
                  <PartyDetailMap latitude={data.latitude} longitude={data.longitude} />
                )}
              </MapImage>
              <PlaceSection>
                <PlaceInfo onClick={() => handleDetailClick(data?.placeUrl)}>
                  <LocationIcon src={locationIcon} alt="location" />
                  <PlaceDetail>
                    <TopInfo>
                      <PlaceName>{data?.placeName}</PlaceName>
                      <Category>{data?.categoryName}</Category>
                    </TopInfo>
                    <PlaceAddress>{data?.placeAddress}</PlaceAddress>
                    {data?.stationName && (
                      <PlaceAddress>
                        {data?.stationName}에서 {distanceInfo}
                      </PlaceAddress>
                    )}
                  </PlaceDetail>
                </PlaceInfo>
              </PlaceSection>
            </MapSection>
            <PartyHostContainer>
              <PartyHostInfoText>모임 주최자 정보</PartyHostInfoText>
              <PartyHostInfo>
                <PartyHostImg>
                  <Link to={`${MEMBER_URL.TARGET_PAGE_GET}/${memberIdData}`}>
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '100%',
                        objectFit: 'cover',
                      }}
                      src={data?.memberInfo[0].profileImage}
                      alt="hostimg"
                    />
                  </Link>
                </PartyHostImg>
                <HostDetailInfo>
                  <HostName>{data?.memberInfo[0].memberName}</HostName>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <HostStatus>
                      {data?.memberInfo[0].gender === 'female' ? '여자' : '남자'}
                    </HostStatus>
                    <HostStatus>{data?.memberInfo[0].age}대</HostStatus>
                  </div>
                  <HostIntroduceDiv>자기소개</HostIntroduceDiv>
                  <HostIntroduce>
                    {data?.memberInfo[0].introduce || '안녕하세요. 저희 모임과 함께하시겠어요?'}
                  </HostIntroduce>
                </HostDetailInfo>
              </PartyHostInfo>
            </PartyHostContainer>
            <PartyMemberContainer>
              <PartyMemberInfoText>참여자 정보</PartyMemberInfoText>
              <PartyMemberInfo>
                {data?.memberInfo.slice(1).map((member, i) => (
                  <PartyMemberInfoBox key={i}>
                    <PartyMemberImg>
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '100%',
                        }}
                        src={member.profileImage}
                        alt="partymemberimg"
                      />
                    </PartyMemberImg>
                    <div>
                      <PartyMemberName>{member.memberName}</PartyMemberName>
                      <PartyMemberIntroduce>
                        {member.introduce || '안녕하세요. 반갑습니다.'}
                      </PartyMemberIntroduce>
                    </div>
                  </PartyMemberInfoBox>
                ))}
              </PartyMemberInfo>
            </PartyMemberContainer>
            <div
              style={{
                display: 'flex',
                background: '#f2f4f7',
                paddingBottom: '8px',
                justifyContent: 'space-evenly',
              }}
            >
              {(memberIdData === userIdData) === true ? (
                <>
                  {memberIdData === userIdData && data?.recruitmentStatus === false ? (
                    ''
                  ) : (
                    <PartyModifyBtn
                      onClick={() => {
                        updateParty(partyId);
                      }}
                    >
                      모임수정
                    </PartyModifyBtn>
                  )}
                  <PartyDeleteBtn
                    onClick={() => {
                      deleteParty(partyId);
                    }}
                  >
                    모임삭제
                  </PartyDeleteBtn>
                </>
              ) : data?.state === partyStatus.승인거절 || data?.recruitmentStatus === false ? (
                ''
              ) : (
                <>
                  {data?.state === partyStatus.신청전 ? (
                    <Link to={`${PATH_URL.PARTY_APPROVE}?partyId=${data?.partyId}`}>
                      <PartyRequestBtn id="saveBtn">모임 신청</PartyRequestBtn>
                    </Link>
                  ) : (
                    <PartyRequestBtn
                      id="saveBtn"
                      onClick={() => {
                        ApplicationButtonHandler();
                      }}
                    >
                      신청 취소
                    </PartyRequestBtn>
                  )}
                </>
              )}
            </div>
          </Contents>
        </Container>
      </Background>
    </>
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

const Contents = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const PartyDetailImg = styled.div`
  width: 360px;
  height: 260px;
  margin-top: 52px;
`;

// 파티 관련 스타일

const PartyName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

// TopBar 스타일
const Topbar = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  // margin-top: 51px;
  align-items: center;
  justify-content: space-between;
  width: 360px;
  height: 52px;
  border-bottom: 1px solid #f2f4f7;
  background: #fff;
  z-index: 10;
`;

const TopBackDiv = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  width: 40px;
  height: 24px;
  cursor: pointer;
`;

const TopbarName = styled.div`
  color: #1d2939;
  font-size: 16px;
  text-align: center;
  flex-grow: 1;
`;

// 리메이크
const PartyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 359px;
  height: 104px;
  background: #fff;
  margin-top: 14px;
`;

const DdayDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 40px;
  height: 22px;
  background: #f63d68;
  border-radius: 20px;
  font-size: 14px;
  color: #fff;
  margin-bottom: 12px;
`;

const Addresses = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 400;
`;

const TimePromise = styled.div`
  font-size: 14px;
  color: #667085;
  font-weight: 400;
`;

const LineBar = styled.div`
  margin-top: 32px;
  width: 360px;
  height: 8px;
  background: #f2f4f7;
`;

const PartyContents = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  font-size: 16px;
  font-weight: 400;
  color: #1d2939;
`;

const PartyInfoText = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #667085;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const PartyHostContainer = styled.div`
  width: 360px;
  height: 254px;
  display: flex;
  flex-direction: column;
  background: #f2f4f7;
`;

const PartyHostInfoText = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #667085;
  margin: 24px 0px 8px 16px;
`;

const PartyHostInfo = styled.div`
  width: 328px;
  height: 162px;
  background: #fff;
  display: flex;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 6px 4px 16px rgba(0, 0, 0, 0.05);
`;

const PartyHostImg = styled.div`
  width: 48px;
  height: 48px;
  margin-top: 24px;
  margin-left: 16px;
  margin-right: 16px;
`;

const HostDetailInfo = styled.div`
  margin-top: 24px;
`;

const HostName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1d2939;
  margin-bottom: 8px;
`;

const HostStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 22px;
  background: #e4e7ec;
  border-radius: 20px;
  font-size: 14px;
  margin-right: 4px;
  margin-bottom: 16px;
`;

const HostIntroduceDiv = styled.div`
  font-size: 10px;
  color: #667085;
  margin-bottom: 8px;
`;

const HostIntroduce = styled.div`
  font-size: 14px;
  max-width: 200px;
  font-weight: 400;
  color: #1d2939;
`;

// 참여자 스타일
const PartyMemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 100%;
  background: #f2f4f7;
  padding-bottom: 8px;
`;

const PartyMemberInfoText = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #667085;
  margin-left: 16px;
  margin-bottom: 8px;
`;

const PartyMemberInfo = styled.div`
  width: 328px;
  height: 100%;
  margin: 0 auto;
  background: #fff;
`;

const PartyMemberInfoBox = styled.div`
  display: flex;
  align-items: center;
  width: 328px;
  height: 72px;
  background: #f2f4f7;
`;

const PartyMemberImg = styled.div`
  display: inline-block;
  width: 48px;
  height: 48px;
  margin: 12px 16px 12px 16px;
`;

const PartyMemberName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8px;
`;

const PartyMemberIntroduce = styled.div`
  font-size: 14px;
  font-weight: 400;
  max-width: 200px;
  color: #667085;
`;

// 모임 버튼

const PartyRequestBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  width: 328px;
  height: 48px;
  margin: 0 auto;
  background-color: #f63d68;
  border: 1px solid #f63d68;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const PartyModifyBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f63d68;
  font-size: 12px;
  font-weight: 600;
  width: 156px;
  height: 48px;
  background-color: #fff;
  border: 1px solid #f63d68;
  border-radius: 12px;
  cursor: pointer;
`;

const PartyDeleteBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  width: 156px;
  height: 48px;
  background-color: #f63d68;
  border: 1px solid #f63d68;
  border-radius: 12px;
  cursor: pointer;
`;

// 참여자 인원수 스타일
const PeopleCountInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  align-items: center;
  color: ${props => (props.isfulled ? 'var(--color-error-500)' : 'inherit')};
`;

const PeopleIcon = styled(People)`
  width: 14px;
  height: 14px;
  fill: ${props => (props.isfulled ? 'var(--color-error-500)' : 'inherit')};
`;

const SlashIcon = styled(Slash)`
  fill: ${props => (props.isfulled ? 'var(--color-error-500)' : 'inherit')};
`;

const PeopleCount = styled.h5``;

// 디데이 스타일
const DdayTag = styled.div`
  top: 6px;
  left: 6px;
  align-items: flex-start;
  padding: 0.25rem 0.5rem;
  width: 40px;
  height: 22px;
  background: ${props => (props.isdday ? 'var(--color-primary-500)' : 'var(--color-primary-300)')};
  border-radius: 999px;
  margin-bottom: 12px;
`;

const Dday = styled.h5`
  color: var(--color-white);
  border-bottom: var(--color-gray-100);
  white-space: nowrap;
`;

/* MapSection */
const MapSection = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  position: relative;
  margin-bottom: 52px;
`;

const MapImage = styled.div`
  width: 328px;
`;

const PlaceSection = styled.section`
  position: absolute;
  overflow: hidden;
  top: 180px;
  width: 328px;
  z-index: 4;
`;

const PlaceInfo = styled.div`
  display: flex;
  height: 100px;
  background: var(--color-gray-50);
  border: var(--color-gray-200);
  border-radius: 1rem;
  padding: 21px 1rem;
  gap: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
`;

const TopInfo = styled.div`
  display: flex;
  flex-direction: row;
  height: 16px;
  align-items: center;
  gap: 0.5rem;
`;

const PlaceName = styled.h4`
  white-space: no-wrap;
`;

const LocationIcon = styled.img`
  width: 38px;
  height: 38px;
  margin: auto 0;
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

const PlaceNameSection = styled.section`
  display: flex;
  flex-direction: column;
`;
