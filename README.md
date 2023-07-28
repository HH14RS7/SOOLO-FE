<br>

<img src="https://github.com/HH14RS7/SOOLO-FE/assets/128359222/ff19bfbb-1288-44ab-8d09-f79e83c26343" alt="이미지 설명" style="width:100%;">

<h2>
 <a href="https://im-soolo.com">나는 Soolo</a>
</h2>
술과 사람을 좋아하는 당신을 위한 번개 모임 서비스를 제공합니다.

<br><br>

<h2>나는 Soolo?</h2>

### 같이 술 먹을 사람이 없어서 외롭다고요? 그렇지 않을걸요? 나는 Soolo와 함께라면 🍷
<br>
술은 먹고 싶지만 술 먹을 친구가 없어서 혼자 드신 적이 있나요?<br>
힘든 하루를 보낸 우리들. 술과 사람을 좋아하는 당신을 위한 번개 모임 서비스를 제공합니다!<br>
고민은 시간만 늦출 뿐! 지금 바로 시작해 보세요!

<br> <br>

- 📆 프로젝트 기간 : 2023.05.19 ~ 2023.06.30 (6주)
- [📕 나는 Soolo 노션](https://www.notion.so/Soolo-892498dcfca94515b5219fd4b12c144d)
- [📄 나는 Soolo 원페이지 노션](https://www.notion.so/SOOLO-b1933d6109504c6199df60bb14b881a4)

<br><br>

## 🐨 Team

|최하나|김종범|이승현|조우필|최세준|김수진|정선우|이효림|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|[@chana](https://github.com/chana73)|[@JayB202](https://github.com/JayB202)|[@SHyun](https://github.com/seungheyon)|[@feeljoy](https://github.com/Cho-woo-pil)|[@Haribboo](https://github.com/Sejun0910)|[@jjin](https://github.com/devjjin)|[@sunwoo](https://github.com/Jeongsunwoo)|[@chloe_lee](https://glacier-lark-1e3.notion.site/79e5c03b671d4e19889b3d98f1def652?pvs=4)|
|TL / BE|BE|BE|BE|VL / FE|FE|FE|DE|

<br><br>

## 🎮 기술 스택 선정 이유
|요구사항|선택|선정 이유|
|:------|:---|:---|
|서버 데이터 관리|React Query|클라이언트 상태를 분리하여 관리할 수 있기 때문에 직관적이고 효율적으로 비동기 데이터를 관리하며 자동으로 데이터 캐싱에 대한 컨트롤이 가능|
|클라이언트 데이터 전역 상태 관리|Recoil|전역 상태 관리 라이브러리 중 비교적 소규모 프로젝트에 사용하기 적합하며 간결함|
|css library/framework|Styled Component|컴포넌트 기반의 CSS-in-JS로 컴포넌트의 재사용성을 높이고, 안정적임|
|Web socket을 활용한 채팅 기능|Stomp client|메시지 중심의 실시간 통신을 위한 가벼운 프로토콜이며, 다양한 플랫폼과 언어에서 사용할 수 있으며, 다양한 메시징 시스템과의 통합이 가능하다는 장점|
|클라이언트 서버 배포를 위한 도구|Vercel|github와 통합한 자동화된 CI/CD를 지원하며 자동배포 및 비용적인 측면과 환경설정 등에 있어 우수함|
|알림 기능|SSE|경량화된 폴리필로서 필요한 최소한의 기능만을 제공하여 불필요한 코드의 부담을 줄이고 웹 애플리케이션의 성능을 향상시킴|
|소셜 로그인|kakao, naver|온라인 서비스 이용 시 불편했던 회원 가입 및 로그인 과정을 대폭 간소화 시켜줘 간단하고 편리하게 회원가입 가능|
|지도 API|kakao map|키워드, 카테고리, 행정구역 등 다양한 검색 기능 제공<br>도로, 건물, 지리적 특징 등 다양한 정보가 포함되어 있어 사용자에게 실용적인 지도 서비스를 제공함|


<br><br>

## 🕹️ 프로젝트 기능

### 🛡 소셜로그인 (kakao, naver)

> * Kakao와 Naver계정을 통한 간편 로그인
> * Access token 만료시 Refresh token을 활용하여 Access token을 재발급

|                                                             로그인                                                             |
|:------------------------------------------------------------------------------------------------------------------------------:|
| <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/128359222/2a92de94-0c62-45cd-bac7-f3f0f809a495"/> |

<br>

### 🧭 지도 API를 활용한 정보 제공 및 모임 조회 / 참여

> * 위치 정보를 기준으로 편리한 모임 생성
> * 사용자 위치 정보를 기반으로 주변 모임 정보 제공
> * 키워드, 카테고리, 행정구역 등 다양한 검색 기능 제공
> * 모임 장소 내 주변 역과의 거리 정보 제공
> * 주변 모임을 확인하여 참여 신청

|                                                             모임 생성                                                             |                                                            모임 상세보기                                                             |                                                                        모임 신청                                                             |
|:------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------:|
| <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/755cef08-65b1-499d-a1b3-754721e8fa6d"/> | <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/ffcf26e0-eb0c-4566-bd15-33c591ec24e3"/> |   <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/39a1ae38-18ad-4ae5-935a-3456755c1d3e"/> |  
|                                                           키워드로 모임 찾기                                                           |                                                           현재 위치로 모임 찾기                                                           | 마커 선택 후 모임 조회하기
| <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/fcf97c07-5dd7-4ecf-a347-c7bcf074fff0"/> | <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/d877205d-565b-4739-b312-6bea3def8964"/> |  <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/98ddbca0-963f-4023-9f20-dc8c16d5bdaa"/> |  

<br>

### 🧑🏻‍💻👩🏻‍💻 마이페이지 기능
 
> * 내가 신청한 모임, 개설한 모임, 계정정보 조회
> * 들어온 승인 요청에서 요청 정보 확인 후 승인 / 거절
> * 자기소개 및 프로필 이미지 수정

|                                                             내가 신청한 모임                                                             |                                                            내가 개설한 모임                                                             |                                                                        계정 정보                                                             |
|:------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------:|
| <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/f71880d0-8d4b-4140-8d6f-80cf706fb52b"/> | <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/6290d293-55a7-44f0-95cf-22cbaa3a4838"/> |   <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/ca8c1a4a-6cbf-4f5c-9cff-979d66d64339"/> |  
|                                                           들어온 승인 요청                                                           |                                                           마이페이지 수정                                                           |상대 프로필 조회
| <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/8d92c751-99b4-4859-bfad-170608be7270"/> | <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/b89d64e8-6a6b-4735-8b53-833b8e04beae"/> |  <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/40594fad-2f5a-4a90-8c29-5acd96a95a1b"/> |  

<br>

### 🚨 악성 사용자 신고 기능
 
> * 다양한 신고유형을 선택 후 간편한 신고 기능
> * 신고된 내용을 바탕으로 운영자가 판단하여 사용자를 제재

|                                                             신고 기능                                                            |
|:------------------------------------------------------------------------------------------------------------------------------:|
| <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/a0616030-9811-482e-93b3-87a33d39c56e"/> |

<br>

### 💬 WebSocket을 활용한 실시간 채팅

> * 실시간 채팅을 웹소켓을 통해 빠르고 효과적인 채팅 경험
> * 대화 내용을 보존하여 잠재적인 사건 / 사고 증빙자료로 활용

|                                                             참여중인 채팅방                                                             |                                                            채팅룸                                                             |                       
|:------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------:|
| <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/e7a82b7f-cd3a-4dc0-a802-dd3b09838b8a" /> |  <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/128359222/7e58b786-6961-4822-9602-c6244e537937"/>

<br>

### 🔔 SSE를 활용한 실시간 / 부재중 알림

> * 모임 승인요청 / 승인여부 정보를 실시간으로 사용자에게 전달
> * 불필요한 요청과 서버의 응답을 줄여 효율적인 통신과 네트워크 리소스 절약

|                                                             실시간 알림                                                            |                                                             [주최자] 승인 요청 알림                                                            |                                                             [신청자] 승인 거절 알림 확인                                                            |
|:------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------:|
| <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/c631ec01-edb9-4fc3-ab40-e8342a848d57"/> | <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/bf0d72b6-e9a9-4949-aae9-6fa3bb692502"/> | <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/7c6e79f5-99e8-4393-9341-bc2b8e8c7d16"/> |

<br><br>

### 📃 무한스크롤

> * 페이지 이동없이 원활한 스크롤 경험

|                                                             무한스크롤                                                            |
|:------------------------------------------------------------------------------------------------------------------------------:|
| <img width="180" src="https://github.com/HH14RS7/SOOLO-FE/assets/38846447/a05aab6f-5cbc-4dcb-818c-e7f8c6bd0eb8"/> |

<br>

## 🛠️ Trouble Shooting

#### 실시간 채팅 리렌더링 [WIKI보기](https://github.com/HH14RS7/SOOLO-FE/wiki/%5BTrouble-Shooting%5D-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%B1%84%ED%8C%85-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)

#### 모임 검색 기능 리렌더링 [WIKI보기](https://github.com/HH14RS7/SOOLO-FE/wiki/%5BTrouble-Shooting%5D-%EB%AA%A8%EC%9E%84-%EC%A0%95%EB%B3%B4-%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)

<br><br>

## 📐 Architecture

![나는 Soolo](https://github.com/HH14RS7/SOOLO-BE/assets/127104678/21cbb996-464b-42fc-a611-e1950ea95e72)

<br>

## 🎮 Tools
<h3>Design</h3>
<div>
 <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>
 <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/>
</div>

<br>
<h3>Frontend</h3>
<div>
 <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black"/>
 <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
 <img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white"/>
 <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white"/>
 <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white"/>
 <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/><br>
 <img src="https://img.shields.io/badge/RECOIL-000000?style=for-the-badge&logo=&logoColor=white"/>
 <img src="https://img.shields.io/badge/Stomp-000000?style=for-the-badge&logo=&logoColor=white"/>
 <img src="https://img.shields.io/badge/SSE-000000?style=for-the-badge&logo=&logoColor=white"/>
 <img src="https://img.shields.io/badge/WEBSOCKET-000000?style=for-the-badge&logo=&logoColor=white"/>
 <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/>
</div>

<br>

<h3>Dev tools</h3>
<div>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
  <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"/>
  <img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"/>
</div>

<br>

<h3>Communication</h3>
<div>
 <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/>
 <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"/>
</div>

<br><br><br><br>

<div align=center>

</div>

<br>

Email : soolo.official7@gmail.com<br>
Instagram : @soolo_official_

<br>

◻ Copyright ©2022 Hang-Hae99 14th team 7 all rights reserved.
