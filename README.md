# 프로젝트 소개

`React`와 `mobx`로 구현한 장바구니 시스템 입니다.

## 무엇을 사용했나요

- 라이브러리 : `React`
- 언어 : `typescript`
- 상태관리 라이브러리 : `mobx`
- UI 라이브러리 : `material-ui`, `react-toastify`
- http 요청 : `axios`

# 실행방법
`npm run start` 커맨드로 결과물을 확인하시기 전에 `npm install`을 통해 node_module 설치하세요. 

```bash
npm install
npm run start
```
혹은
```bash
yarn
yarn start
```
커맨드를 입력하시면 [localhost:3000](http://localhost:3000/) 에서 확인하실 수 있습니다.

# 프로젝트 구조
- api : client에서 사용할 API들을 모아둔 폴더로, 상품리스트 제어에 사용하였습니다.
- data : gist에 생성해둔 데이터를 가져오거나, 쿠폰 데이터를 저장합니다.
- models : typescript에서 사용할 interface들을 정의합니다.
- store : mobx 로직이 존재합니다. 장바구니를 관리하고, 정렬상태를 관리합니다.
- views : view단을 모아둔 폴더입니다.
    - components : view에서 사용될 컴포넌트들을 배치했습니다.
    - pages : 상품리스트, 위시리스트를 분리하여 배치했습니다.

# 스크린샷
## 상품 리스트
- 화면 크기에 따른 grid 배치
- 아이콘 클릭하여 장바구니로
- 아래로 스크롤 시 더 불러오기
- 가격기준 정렬   


<img width="1172" alt="스크린샷 2020-03-24 오전 10 33 43" src="https://user-images.githubusercontent.com/26399025/77379124-3264cc00-6dbb-11ea-8ecf-c9abdfce19f3.png">
<img width="794" alt="스크린샷 2020-03-24 오전 10 33 22" src="https://user-images.githubusercontent.com/26399025/77379131-3690e980-6dbb-11ea-9ede-465a69f26c80.png">
<img width="478" alt="스크린샷 2020-03-24 오전 10 33 31" src="https://user-images.githubusercontent.com/26399025/77379135-385aad00-6dbb-11ea-8509-e10f7e2cc2ca.png">

## 장바구니 리스트
- 체크박스 적용 가능
- 수량 적용 가능
- 쿠폰 적용
- 장바구니가 비었을 때 화면 별도 존재



<img width="898" alt="스크린샷 2020-03-24 오전 10 34 11" src="https://user-images.githubusercontent.com/26399025/77379163-4b6d7d00-6dbb-11ea-9f02-114a381f270e.png">
