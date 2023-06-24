import React, { useCallback, useEffect, useRef, useState } from 'react';
import SearchPlaceItem from './SearchPlaceItem';
import { styled } from 'styled-components';
import { ReactComponent as SearchInfo } from '../../assets/map/search-info.svg';
import { ReactComponent as NoSearchInfo } from '../../assets/common/no-search-info.svg';

export default function SearchPlcaeList({ searchPlace, currentLocation }) {
  const [placeList, setPlaceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { kakao } = window;
  const FOOD_CATEGORY_CODE = 'FD6'; // 음식점 카테고리 코드

  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasResult, setHasResults] = useState(true);

  // 키워드 검색 함수
  const placesSearchCB = useCallback((data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      setPlaceList(data);
      setIsLoading(false);
      setHasResults(true);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      setHasResults(false);
      // alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      setHasResults(false);
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    kakao.maps.load(() => {
      const ps = new kakao.maps.services.Places();
      setPlaceList([]);

      const searchOptions = {
        size: 12,
        page: 1,
        category_group_code: FOOD_CATEGORY_CODE,
      };

      if (searchPlace) {
        setIsLoading(true);
        if (currentLocation) {
          searchOptions.location = new kakao.maps.LatLng(
            currentLocation.latitude,
            currentLocation.longitude,
          );
          searchOptions.radius = 5000;
        } else {
          searchOptions.radius = 20000;
          searchOptions.location = null;
          searchOptions.radius = null;
        }
        ps.keywordSearch(searchPlace, placesSearchCB, searchOptions);
      } else {
        setIsLoading(false);
      }
    });
  }, [searchPlace, currentLocation, placesSearchCB, currentPage]);

  // 검색결과 목록 하단에 페이지 번호 표시
  function displayPagination(pagination) {
    const paginationEl = document.getElementById('pagination');

    if (!paginationEl) {
      return; // 오류 방지: paginationEl이 null인 경우 함수 종료
    }

    let fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지 번호 삭제
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  useEffect(() => {
    if (placeList.length === currentPage * 3) {
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
            {!searchPlace && (
              <>
                <SearchInfo />
                <InfoMsg>장소를 검색해주세요!</InfoMsg>
              </>
            )}
            {searchPlace && (
              <>
                <NoSearchInfo />
                <InfoMsg>검색 결과가 없습니다.</InfoMsg>
                <InfoMsg>다른 단어로 검색해보세요.</InfoMsg>
              </>
            )}
          </DefaultContainer>
        )}
        {hasResult && <Pagination id="pagination"></Pagination>}
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

const InfoMsg = styled.h4`
  color: var(--color-gray-700);
`;

const Pagination = styled.div`
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: var(--font-weight-400);
  font-size: var(--font-regular);
  line-height: 100%;
  letter-spacing: -0.015em;
  border-radius: 999px;

  a {
    font-size: var(--font-regular);
    color: var(--color-primary-500);
    background: white;
    border: 1px solid var(--color-primary-300);
    text-decoration: none;
    margin: 0 12px;
    padding: 16px 20px;
    border-radius: 999px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: var(--color-primary-300);
    }

    &.on {
      color: white;
      font-weight: bold;
      background-color: var(--color-primary-500);
    }
  }
`;
