# Capa backend coding test

## About this task

Think of this as an open source project. How would this have to look in order for you to be impressed with it.

Please spend at least 90 minutes on this test. Feel free to take more time if you wish - make sure you are happy with your submission!

_Hint_: we are looking for a high-quality submission with great application architecture. Not a "get it done" approach.

Remember that this test is your opportunity to show us how you think. Be clear about how you make decisions in your code, whether that is with comments, tests, or how you name things.

## What to do

### First

* Create a new Javascript-based api service (any framework is fine)
  * TypeScript would be good, too.

### Make your API consumer happy

Let API consumer

* can get the list of stores in `stores.json`
* can get the specific item of stores in `stores.json`
  * Your API consumer can identify the item with its name
* can get the latitude and longitude for each postcode.
  * You can use postcodes.io to get the latitude and longitudefor each postcode.
* can get the functionality that allows you to return a list of stores in a given radius of a given postcode in the UK. The list must be ordered from north to south.

### Finally

* Send the link of your repository.
* Provide answers for the following questions with your submission:
  1. If you had chosen to spend more time on this test, what would you have done differently?
  2. What part did you find the hardest? What part are you most proud of? In both cases, why?
  3. What is one thing we could do to improve this test?

## Result

### API Docs

---
> 모든 상점 조회
* can get the list of stores in `stores.json`
  ```markdown
  GET https://localhost:3000/
  ```
  
  - 결과 예시
  ```js
  [
     {
        name: "St_Albans",
        postcode: "AL1 2RJ"
     },
     {
        name: "Hatfield",
        postcode: "AL9 5JP"
     },
     {
        name: "Worthing",
        postcode: "BN14 9GB"
     },
     ...
  ]
  ```
  <br>
> 특정 상점 조회 (by name)
* can get the specific item of stores in `stores.json`
  * Your API consumer can identify the item with its name
  ```markdown
  GET https://localhost:3000/:name
  ```
  - 입력예시
  ```markdown
  GET https://localhost:3000/Rustington
  ```
  - 결과 예시
  ```js
  {
     name: "Rustington",
     postcode: "BN16 3RT"
  }
  ```
  <br>
> 상점 좌표 조회
* can get the latitude and longitude for each postcode.
  * You can use postcodes.io to get the latitude and longitudefor each postcode.
  ```markdown
  GET http://localhost:3000/coordinates/postcodes?postcode=[query]
  ```
  - `query (optional)` `postcode(string)` 영국 우편번호
  - 입력 예시 by postcode 
  ```markdown
  GET http://localhost:3000/coordinates/postcodes?postcode=AL1%202RJ
  ```
  - 결과 예시 (1)
  ```js
  {
     postcode: "AL1 2RJ",
     latitude: 51.741753,
     longitude: -0.341337
  }
  ```
  - 입력 예시 (상점 전체 좌표 조회)
   ```markdown
  GET http://localhost:3000/coordinates/postcodes
  ```
  - 결과 예시 (2)
  ```js
  [
    {
      postcode: "AL1 2RJ",
      longitude: -0.341337,
      latitude: 51.741753
    },
    {
      postcode: "AL9 5JP",
      longitude: -0.222034,
      latitude: 51.776142
    },
    {
      postcode: "BN14 9GB",
      longitude: -0.366858,
      latitude: 50.834431
    },
     ...
  ]
  ```
  <br>
> 주변 상점 조회
* can get the functionality that allows you to return a list of stores in a given radius of a given postcode in the UK. The list must be ordered from north to south.
  ```markdown
  GET https://localhost:3000/near/:postcode/:radius
  ```
  - `postcode (required, string)`
  - `radius (required, number)`
  - 입력 예시
  ```markdown
  GET https://localhost:3000/near/AL95JP/200
  ```
  - 결과 예시
  ```js
  // 범위 내에 상점이 있을때
  {
     status: 200,
     result: [
        {
           postcode: "AL9 5JP",
           latitude: 51.776142,
           longitude: -0.222034
        },
        {
           postcode: "AL9 1KJ",
           latitude: 51.462127,
           longitude: -0.151934
        },
        ...
     ],
     message: "입력한 위치와 거리 내 상점 목록을 조회했습니다."
  }
  
  // 범위 내에 상점이 없을떼
  {
     status: 200,
     result: null,
     message: "입력한 위치와 거리 내 상점이 없습니다."
  }
  ```
---