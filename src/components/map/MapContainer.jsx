import React, { useEffect, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  const [Places, setPlaces] = useState([]);
  const loaction = useGeolocation();
  const [map, setMap] = useState(null);

  const latitude = loaction.coordinates.latitude; // 위도
  const longtitude = loaction.coordinates.longtitude; // 경도

  useEffect(() => {
    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const container = document.getElementById('map'); // 지도를 표시할 div
    const centerCoordinate = new kakao.maps.LatLng(37.496777, 127.028185); // 중심 좌표(강남역)
    // const centerCoordinate = new kakao.maps.LatLng(latitude, longtitude); // 현재위치 중심 좌표

    const options = {
      center: centerCoordinate, // 중심 좌표 설정
      // location: centerCoordinate, // 특정지역 기준 검색
      level: 3,
      radius: 10000, // 중심좌표로부터 반경(거리) 필터링값 10000m
      sort: kakao.maps.services.SortBy.DISTANCE, //정렬 가까운거리순
    };
    // 지도 생성
    const map = new kakao.maps.Map(container, options);
    setMap(map);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 장소 검색 객체 생성
    const ps = new kakao.maps.services.Places();

    // 키워드 검색 요청 함수
    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    };

    // 검색키워드 함수 호출
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB);
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    const displayPagination = pagination => {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
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
    };

    const displayMarker = place => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>',
        );
        infowindow.open(map, marker);
      });
    };
  }, [searchPlace]);

  const handlePlaceClick = item => {
    console.log(item);
  };

  //
  const handleCurrentLocation = () => {
    const currentLocation = new kakao.maps.LatLng(latitude, longtitude);
    map.panTo(currentLocation);
  };

  return (
    <div>
      <div
        id="map"
        style={{
          width: '300px',
          height: '300px',
        }}
      ></div>
      <button onClick={handleCurrentLocation}>현재 위치로 찾기</button>
      <div id="result-list">
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }} onClick={() => handlePlaceClick(item)}>
            <div>
              <p>{item.place_name}</p>
              {item.road_address_name ? (
                <div>
                  <p>{item.road_address_name}</p>
                </div>
              ) : (
                <p>{item.address_name}</p>
              )}
              <p>{item.phone}</p>
              <a href={item.place_url}>정보 상세보기</a>
              <p>경도:{item.x}</p>
              <p>위도:{item.y}</p>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default MapContainer;
