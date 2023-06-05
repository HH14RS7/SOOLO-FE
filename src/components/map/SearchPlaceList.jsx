import React, { useCallback, useEffect, useRef, useState } from 'react';
import SearchPlaceItem from './SearchPlaceItem';
import { styled } from 'styled-components';

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
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
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
      <ListContainer ref={containerRef}>
        {placeList.length > 0 ? (
          placeList.map(place => <SearchPlaceItem key={place.id} place={place} />)
        ) : (
          <div>장소를 검색해주세요!</div>
        )}
        {isLoading && <div>로딩중입니다</div>}
      </ListContainer>
    </div>
  );
}

const ListContainer = styled.div`
  background-color: pink;
  overflow-y: scroll;
  height: 400px;
`;
