import React, { useCallback, useEffect, useRef, useState } from 'react';
import SearchPlaceItem from './SearchPlaceItem';
import { styled } from 'styled-components';
import { ReactComponent as SearchInfo } from '../../assets/map/search-info.svg';
import { ReactComponent as NoSearchInfo } from '../../assets/map/no-search-info.svg';

export default function SearchPlcaeList({ searchPlace, currentLocation }) {
  const [placeList, setPlaceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { kakao } = window;
  const FOOD_CATEGORY_CODE = 'FD6'; // 음식점 카테고리 코드
  const ps = new kakao.maps.services.Places();
  const containerRef = useRef(null);
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

    setPlaceList([]);

    const searchOptions = {
      size: 10,
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
        searchOptions.radius = 2000;
      } else {
        searchOptions.radius = 50000;
        searchOptions.location = null;
        searchOptions.radius = null;
      }
      ps.keywordSearch(searchPlace, placesSearchCB, searchOptions);
    } else {
      setIsLoading(false);
    }
  }, [searchPlace, currentLocation, placesSearchCB, currentPage]);

  // 검색결과 목록 하단에 페이지 번호 표시
  // 검색결과 목록 하단에 페이지 번호 표시
  function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination');

    if (!paginationEl) {
      return; // 오류 방지: paginationEl이 null인 경우 함수 종료
    }

    var fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지 번호 삭제
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement('a');
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

  console.log(placeList.length);
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

const SearchInfoIcon = styled(SearchInfo)`
  width: 48px;
  height: 48px;
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
  font-size: var(--font-small);
  line-height: 100%;
  letter-spacing: -0.015em;
  border-radius: 999px;

  a {
    color: white;
    font-size: var(--font-small);
    text-decoration: none;
    background: var(--color-primary-100);
    margin: 0 5px;
    padding: 8px 12px;

    border-radius: 999px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: var(--color-primary-300);
    }

    &.on {
      font-weight: bold;
      background-color: var(--color-primary-500);
    }
  }
`;

// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { useQuery } from 'react-query';
// import { styled } from 'styled-components';
// import SearchPlaceItem from './SearchPlaceItem';
// import Loading from '../Loading';
// import { ReactComponent as SearchInfo } from '../../assets/map/search-info.svg';
// import { ReactComponent as NoSearchInfo } from '../../assets/map/no-search-info.svg';
// import useIntersectionObserver from '../../hooks/useIntersectionObserver';
// // 페이지네이션 하기전
// export default function SearchPlaceList({ searchPlace, currentLocation }) {
//   // 닿았으니 증가하는거까지 함페이지 늘려서 다시 조회해야함
//   const MAX_PAGES = 5;
//   const containerRef = useRef(null);
//   const [isLastPage, setIsLastPage] = useState(true); // 초기 진입 시 마지막 페이지로 설정
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const currentPageRef = useRef(currentPage);

//   const { kakao } = window;
//   const FOOD_CATEGORY_CODE = 'FD6'; // 음식점 카테고리 코드
//   const ps = new kakao.maps.services.Places();

//   const searchOptions = useRef({
//     size: 10,
//     page: currentPageRef.current,
//     category_group_code: FOOD_CATEGORY_CODE, // 음식 카테고리 코드
//     location: null,
//     radius: 10000, // 기본 검색 반경 설정 (미터 단위)
//   });

//   if (currentLocation) {
//     searchOptions.current.location = new window.kakao.maps.LatLng(
//       currentLocation.latitude,
//       currentLocation.longitude,
//     );
//     searchOptions.current.radius = 2000; // 검색 반경 설정 (미터 단위)
//   }

//   const fetchSearchResults = async (keyword, options) => {
//     if (!keyword) {
//       return []; // 검색어가 없는 경우 빈 배열 반환
//     }

//     try {
//       const { data, status } = await new Promise((resolve, reject) => {
//         ps.keywordSearch(
//           keyword,
//           (data, status) => {
//             if (status === kakao.maps.services.Status.OK) {
//               console.log('data', data);
//               if (data.length > 0) {
//                 setIsLastPage(false); // 데이터가 존재하는 경우 마지막 페이지가 아님
//               } else {
//                 setIsLastPage(true); // 데이터가 없는 경우 마지막 페이지임
//               }
//               resolve({ data, status });
//             } else {
//               reject(new Error('검색에 실패했습니다.'));
//             }
//           },
//           options,
//         );
//       });

//       return data;
//     } catch (error) {
//       console.log('검색에 실패했습니다.', error);
//       return [];
//     }
//   };

//   const {
//     data: placeList,
//     isError,
//     refetch,
//   } = useQuery(['searchPlace', searchPlace, searchOptions.current], () =>
//     searchPlace ? fetchSearchResults(searchPlace, searchOptions.current) : [],
//   );

//   const loadNextPage = useCallback(() => {
//     // 초기에 값이 없을때나 list없을때 페이지 증가하지 않음
//     // if (!placeList || placeList.length === 0) {
//     //   return;
//     // }
//     console.log('여기는 있니', placeList);
//     if (currentPage < MAX_PAGES && !isLoading && !isLastPage) {
//       console.log('닿았으니 호출할까');
//       setCurrentPage(prevPage => prevPage + 1);
//     }
//   }, [isLoading, currentPage, placeList, isLastPage]);

//   // 여기서 page가 증가하게 해줘야한다.

//   useEffect(() => {
//     console.log('Current Page:', currentPage);
//     // console.log('isLastPage:', isLastPage);
//     console.log('Total Place List:', placeList);
//   }, [currentPage, placeList, isLastPage]);

//   // 마지막 페이지일때 로딩되지 않도록
//   useEffect(() => {
//     if (currentPage >= MAX_PAGES) {
//       setIsLastPage(true);
//     }
//   }, [currentPage]);

//   // observer 감지
//   const options = { threshold: 0.2 };
//   const [observe, unobserve] = useIntersectionObserver(loadNextPage, options);

//   useEffect(() => {
//     if (containerRef.current && !isLastPage) {
//       observe(containerRef.current);
//     }

//     return () => {
//       if (containerRef.current) {
//         unobserve(containerRef.current);
//       }
//     };
//   }, [observe, unobserve]); // observe와 unobserve를 의존성 배열에 추가

//   const lastItem = placeList && placeList.length > 0 ? placeList[placeList.length - 1] : null;

//   return (
//     <div>
//       <ListWrapper>
//         {placeList && placeList.length > 0 ? (
//           <>
//             {placeList.map((place, index) => (
//               <SearchPlaceItem key={index} place={place} />
//             ))}
//           </>
//         ) : (
//           <DefaultContainer>
//             {!searchPlace && (
//               <>
//                 <SearchInfoIcon />
//                 <InfoMsg>장소를 검색해주세요!</InfoMsg>
//               </>
//             )}
//             {searchPlace && (
//               <>
//                 <NoSearchInfo />
//                 <InfoMsg>검색 결과가 없습니다.</InfoMsg>
//                 <InfoMsg>다른 단어로 검색해보세요.</InfoMsg>
//               </>
//             )}
//           </DefaultContainer>
//         )}
//         {isLoading && <Loading />}
//       </ListWrapper>
//       <ObserverContainer ref={containerRef} />
//     </div>
//   );
// }

// const ListWrapper = styled.div`
//   width: 360px;
//   height: 100%;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
// `;

// const DefaultContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 7px;
//   height: calc(100vh - 270px);
// `;

// const SearchInfoIcon = styled(SearchInfo)`
//   width: 48px;
//   height: 48px;
// `;

// const InfoMsg = styled.h4`
//   color: var(--color-gray-700);
// `;

// const ObserverContainer = styled.div`
//   // position: fixed;
//   bottom: 100px;
//   height: 36px;
//   // background: yellow;
// `;
