<br>

# 🍻 로고 🍻

### [ 전국 술모임 커뮤니티 ](https://im-soolo.com/) 

<br><br>

## 💩 Team

|최하나|김종범|이승현|조우필|최세준|김수진|정선우|이효림|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|[@chana](https://github.com/chana73)|[@JayB202](https://github.com/JayB202)|[@SHyun](https://github.com/seungheyon)|[@feeljoy](https://github.com/Cho-woo-pil)|[@Haribboo](https://github.com/Sejun0910)|[@jjin](https://github.com/devjjin)|[@sunwoo](https://github.com/Jeongsunwoo)|[@Hyo](https://github.com/HH14RS7)|
|TL / BE|BE|BE|BE|VL / FE|FE|FE|DS|

<br>

### [💩 프로젝트 노션 바로가기](https://www.notion.so/SOOLO-892498dcfca94515b5219fd4b12c144d?pvs=4)


<br><br>




## 프로젝트 기능

### 🍻 소셜로그인 (kakao, naver)

> * Kakao와 Naver계정을 통한 간편 로그인이 가능합니다.
> * Refresh Token을 추가로 적용하여 보안성을 높였습니다.
> * 회원 탈퇴 혹은 정지 시에도 아이디는 삭제 되지 않고 2년간 그 기록이 DB에 유지됩니다. (Soft Delete)

<details>
<summary>미리보기</summary>
<div markdown="1">

![로그인1](이미지 스냅샷 찍어서 주소 넣을 자리)

 <br>
</div>
</details>


### 🍻 지도 정보를 바탕으로 모임을 생성/참여 
 
> * 위치 정보를 기준으로 모임을 생성하고, 주변 모임을 확인하여 참여 신청을 할수 있습니다.
> * 지도에 마커를 보여줌으로써 좀 더 직관적으로 모임의 위치를 알 수 있습니다. 
> * 지도의 줌 인/아웃 을 통해 거리를 자유롭게 조절 할 수 있습니다.
> * 모임 생성시 이미지를 삽입 할 수 있습니다.

<details>
<summary>미리보기</summary>
<div markdown="1">

![데이터 보여주기](이미지 스냅샷 찍어서 주소 넣을 자리)

 <br>
</div>
</details>

### 🍻 검색 기능

> * JPA를 활용하여 모임에 대해 검색 할수 있도록 구현하였습니다.
> * 모임의 컨셉, 지역, 제목, 근처역 등을 검색 할 수 있습니다.

<details>
<summary>미리보기</summary>
<div markdown="1">

![검색기능](이미지 스냅샷 찍어서 주소 넣을 자리)

 <br>
</div>
</details>

### 🍻 마이페이지 기능
 
> * 마이페이지에서 내가 신청한 모임, 개설한 모임, 계정정보 등ㅇ르 볼 수 있습니다.
> * 자기소개와 프로필 이미지 변경이 가능합니다.

<details>
<summary>미리보기</summary>
<div markdown="1">

![마이페이지](이미지 스냅샷 찍어서 주소 넣을 자리)

 <br>
</div>
</details>

### 🍻 신고 기능 (사용자, 닉네임, 게시글, 댓글)
 
> * 악성 사용자, 불건전한 닉네임, 채팅, 모임 내용과 함께 신고할 수 있습니다.
> * 본인은 본인을 신고할 수 없으며 같은 유저의 신고에 대해서는 계정 하나당 1회로 제한됩니다.
> * 신고 된 내용을 바탕으로 운영자가 판단하여 사용자를 제제할 수 있습니다.

<details>
<summary>미리보기</summary>
<div markdown="1">

![신고기능](이미지 스냅샷 찍어서 주소 넣을 자리)

 <br>
</div>
</details>

### ☑ 무한스크롤

<details>
<summary>미리보기</summary>
<div markdown="1">

![무한스크롤](이미지 스냅샷 찍어서 주소 넣을 자리)

 <br>
</div>
</details>


### 🍻 WebSocket을 활용한 실시간 채팅

> * 모임에 참여한 사람들과 실시간 채팅이 가능합니다.
> * 최근에 대화가 이루어진 순서대로 채팅방이 보여집니다.
> * 채팅방이 삭제 된 이후에도 대화 내용은 서버내에 저장되어 후에 있을수 있는 사건/사고에 대한 증빙 자료로 보존됩니다.


<details>
<summary>미리보기</summary>
<div markdown="1">

![실시간채팅1](이미지 스냅샷 찍어서 주소 넣을 자리)

![실시간채팅2](이미지 스냅샷 찍어서 주소 넣을 자리)


 <br>
</div>
</details>


## 적용 기술

### ◻ Swagger

> 프론트엔드와 정확하고 원활한 소통을 위하여 스웨거를 도입하여 적용하였습니다.         
> [Im Soolo Swagger](스웨거 주소 넣을 자리)




### ◻ Github Actions (CI/CD)

> 자동 빌드/배포를 위하여 깃허브 액션을 활용하여 CI/CD 를 구축했습니다.         


### ◻ Nginx (무중단배포)

> 서비스 운영중 업데이트를 위한 재배포시 중단없는 서비스 제공을 위하여 Nginx 와 Shell Script를 활용해 무중단배포를 구현하였습니다.       


### ◻ Redis

> RefreshToken 등 소멸기간이 존재하는 데이터의 TimeToLive 관리를 용이하게 할 수 있도록 Redis를 도입하였습니다.
> 채팅을 사용할 때 모든 메세지를 순간적으로 저장하지 않고 redis를 통해 일정량의 데이터가 쌓일때 저장을 해줌으로서 DB와의 트래픽 숫자를 줄여주었습니다.

<br><br>




## 🚨 Trouble Shooting

#### 이건 같이 씁시다.

<br><br>


## :raising_hand::thought_balloon: Concern

#### Access Token and Refresh Token Reissue Process [WIKI보기](https://github.com/HH9C4/BBBB-BE/wiki/%5BConcern%5D-Access-Token-and-Refresh-Token-Reissue-Process)

#### Comment & Like Table Structure [WIKI보기](https://github.com/HH9C4/BBBB-BE/wiki/%5BConcern%5D-Comment-&-Like-Table-Structure)

#### S3 Image Upload Control [WIKI보기](https://github.com/HH9C4/BBBB-BE/wiki/%5BConcern%5D-S3-Image-Upload-Control)


<br><br>

## 🍻 Architecture

![hh99_14_7_MVP](아키텍쳐 주소 넣을 )

<br>

## [🍻 ERD Diagram](ERD 주소 넣을곳 ( 채팅 관련 ERD도 함께 넣어야 할듯 ))


<br>

## 📝 Technologies & Tools (FE) 📝

<div>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
  <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"/>
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white"/>
  <img src="https://img.shields.io/badge/Stomp-000000?style=for-the-badge&logo=&logoColor=white"/>
  <img src="https://img.shields.io/badge/WEBSOCKET-000000?style=for-the-badge&logo=&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white"/>
  <img src="https://img.shields.io/badge/RECOIL-000000?style=for-the-badge&logo=&logoColor=white"/>
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>
  <img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"/>
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>
</div>

<br><br><br><br>

<div align=center>

</div>

Email : soolo.official7@gmail.com
Instagram : @soolo_official_

<br>

◻ Copyright ©2022 Hang-Hae99 14th team 7 all rights reserved.
