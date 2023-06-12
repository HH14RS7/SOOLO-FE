import React, { useCallback, useEffect, useRef, useState } from 'react';
import SearchPlaceItem from './SearchPlaceItem';
import { styled } from 'styled-components';
import { ReactComponent as SearchInfo } from '../../assets/map/search-info.svg';

export default function SearchPlcaeList({ searchPlace, currentLocation, isChecked }) {
  const [placeList, setPlaceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { kakao } = window;
  const FOOD_CATEGORY_CODE = 'FD6'; // 음식점 카테고리 코드
  const ps = new kakao.maps.services.Places();
  const containerRef = useRef(null);

  // 키워드 검색 함수
  const placesSearchCB = useCallback((data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setPlaceList(prevList => [...prevList, ...data]);
      setIsLoading(false);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      // alert('검색 결과 중 오류가 발생했습니다.');
    }
  }, []);

  useEffect(() => {
    setPlaceList([]);

    // 검색 옵션
    const searchOptions = {
      size: 15,
      level: 3,
      category_group_code: FOOD_CATEGORY_CODE,
    };

    // 현재위치로 검색
    if (currentLocation && isChecked) {
      searchOptions.location = new kakao.maps.LatLng(
        currentLocation.latitude,
        currentLocation.longitude,
      );
      searchOptions.radius = 20000;
    }

    // 검색키워드 함수 호출
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB, searchOptions);
    }
  }, [searchPlace, currentLocation, isChecked, placesSearchCB]);

  // 다음 페이지 불러오기 함수
  const loadNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 300 && !isLoading) {
        loadNextPage();
      }
    }

    // containerRef.current.addEventListener('scroll', handleScroll);
    return () => {
      // containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  // 현재 페이지의 검색 결과를 모두 불러왔을 때만 isLoading 상태를 false로 설정합니다.
  useEffect(() => {
    if (placeList.length === currentPage * 15) {
      setIsLoading(false);
    }
  }, [placeList, currentPage]);

  return (
    <div>
      <ListWrapper ref={containerRef}>
        {placeList.length > 0 ? (
          placeList.map((place, index) => <SearchPlaceItem key={index} place={place} />)
        ) : (
          <DefaultContainer>
            {/* <DefaultImage src={searchInfoImg} alt="noSearchImg" /> */}
            <SearchInfoIcon />
            <InfoMsg>장소를 검색해주세요!</InfoMsg>
          </DefaultContainer>
        )}
        {isLoading && <div>로딩중입니다</div>}
      </ListWrapper>
    </div>
  );
}

const ListWrapper = styled.div`
  width: 360px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: calc(100vh - 270px);
`;

const SearchInfoIcon = styled(SearchInfo)`
  width: 48px;
  height: 48px;
`;

const InfoMsg = styled.h4`
  color: var(--color-gray-700);
`;
