### Q1. If you had chosen to spend more time on this test, what would you have done differently?

- 서비스 로직 함수의 재사용성 확대
- DTO를 활용한 엄격한 타입 지정과 ValidationPipe를 이용한 자동 타입 형변환 
- Swagger를 이용한 API 문서 자동화

### Q2. What part did you find the hardest? What part are you most proud of? In both cases, why?
- 가장 어려웠던 점은, 특정 지역에서 일정한 범위 내 상점을 찾을때,  api 응답으로 받은 정보들의 리스트를 정렬해서 리턴해야 할지, 응답받은 정보들 중 더미 데이터와 일치하는 상점 정보를 정렬해서 리턴해야 하는지 판단이 잘 안됬습니다.
`postcodes.io`  를 사용하면 최대 100개의 우편 정보만 받을 수 있는데, 이 중 더미 데이터와 일치하는 우편 번호가 거의 없었기 때문입니다.
 
- 가장 뿌듯 했던 점은 서버 성능 개선입니다. 특정 지역에서 일정한 범위 내 상점을 찾는 API를 구현할 때, `postcodes.io` API를 통해 받은 우편번호 목록 중 DB에 있는 우편 번호만 필터링을 했습니다.
처음에는 filter 메소드안에 find 메소드를 사용해서 시간복잡도 O(n^2)이었지만, 기존 더미 데이터를 Set 테이블로 새로 생성하여 전역 스코프로 두고 filter안에 has 메소드를 사용해 시간복잡도 O(n)으로 성능을 개선했기 때문입니다.


### Q3. What is one thing we could do to improve this test?
- 더미 데이터의 규모가 작다고 느꼈다습니다. 실제로 사용되는 데이터와 비슷한 규모를 가지고 테스트를 해보면 더 좋을것이라 생각합니다.