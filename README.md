# 📚 BOOKSTORE

# 🔗 API 설계

<details>
    <summary style="font-size: 1.5em;"> 회원 API 설계 </summary>
    <div markdown="1">

### 1. 회원 가입

-   Method
    -   POST
-   URI
    -   /join
-   HTTP status code
    -   성공 201
-   Request Body
    ```javascript
    {
        email: "사용자가 입력한 이메일",
        password: "사용자가 입력한 비밀번호"
    }
    ```
-   Response Body

### 2. 로그인

-   Method
    -   POST
-   URI
    -   /login
-   HTTP status code
    -   성공 200
-   Request Body
    ```javascript
    {
        email: "사용자가 입력한 이메일",
        password: "사용자가 입력한 비밀번호"
    }
    ```
-   Response Body
    -   JWT Token

### 3. 비밀번호 초기화 요청

-   Method
    -   POST
-   URI
    -   /reset
-   HTTP status code
    -   성공 200
-   Request Body
    ```javascript
    {
        email: '사용자가 입력한 이메일',
    }
    ```
-   Response Body

### 4. 비밀번호 초기화 (수정)

-   Method
    -   PUT
-   URI
    -   /reset
-   HTTP status code
    -   성공 200
-   Request Body
    ```javascript
    {
        password: '사용자가 입력한 비밀번호',
    }
    ```
-   Response Body

        </div>

</details>
<details>
    <summary style="font-size: 1.5em;"> 도서 API 설계 </summary>
    <div markdown="2">

### 1. 전체 도서 조회

-   추가 고려 사항
    -   이미지 경로
    -   8개씩 보내주기
-   Method
    -   GET
-   URI
    -   /books
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

    ```javascript
    [
        {
            bookId: 도서 id,
            title: "도서 제목",
            author: "도서 작가",
            summary: "도서 요약 설명",
            price: 가격,
            likes: 좋아요 수,
            pubDate: "출간일"
        },
        {
            bookId: 도서 id,
            title: "도서 제목",
            author: "도서 작가",
            summary: "도서 요약 설명",
            price: 가격,
            likes: 좋아요 수,
            pubDate: "출간일"
        }
        ...
    ]

    ```

### 2. 개별 도서 조회

-   추가 고려 사항
    -   이미지 경로
-   Method
    -   GET
-   URI
    -   /books/{bookId}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

    ```javascript
    {
        bookId: 도서 id,
        likeId: 좋아요 id,
        title: "도서 제목",
        category: "도서 카테고리",
        format: "도서 포맷",
        author: "도서 작가",
        isbn: "isbn",
        pages: "쪽 수",
        summary: "도서 요약 설명",
        description: "도서 상세 설명",
        index: "목차",
        price: 가격,
        likes: 좋아요 수,
        liked: boolean,
        pubDate: "출간일"
    }

    ```

### 3. 카테고리별 도서 목록 조회

-   고려 사항
    -   new: true => 신간 조회(기준: 출간일 30일 이내)(완료)
    -   이미지 경로
    -   카테고리 id 설정 방법
-   Method
    -   GET
-   URI
    -   /books?categoryId={categoryId}&new={boolean}
-   HTTP status code
    -   성공 200
-   Request Body
-   Response Body

    ```javascript
    [
        {
            bookId: 도서 id,
            title: "도서 제목",
            category: "도서 카테고리",
            author: "도서 작가",
            summary: "도서 요약 설명",
            price: 가격,
            likes: 좋아요 수,
            pubDate: "출간일"
        },
        {
            bookId: 도서 id,
            title: "도서 제목",
            category: "도서 카테고리",
            author: "도서 작가",
            summary: "도서 요약 설명",
            price: 가격,
            likes: 좋아요 수,
            pubDate: "출간일"
        }
        ...
    ]

    ```

    </div>

</details>

<details>
    <summary style="font-size: 1.5em;"> 좋아요 API 설계 </summary>
    <div markdown="3">

### 1. 좋아요 추가/취소

-   Method
    -   PUT
-   URI
    -   /likes/{bookId}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

    ```javascript
    {
        likeId: 좋아요 id,
        userId: 유저 id,
        bookId: 도서 id,
        likes: 좋아요 수,
        liked: boolean,
    }
    ```

    </div>

</details>

<details>
    <summary style="font-size: 1.5em;"> 장바구니 API 설계 </summary>
    <div markdown="4">

### 1. 장바구니 담기

-   Method
    -   POST
-   URI
    -   /cart
-   HTTP status code
    -   성공 201
-   Request Body

    ```javascript
    {
        bookId: 도서 id,
        count: 수량
    }
    ```

-   Response Body

### 2. 장바구니 조회

-   Method
    -   GET
-   URI
    -   /cart
-   HTTP status code
    -   성공 200
-   Request Body
-   Response Body

    ```javascript
    [
        {
            bookId: 도서 id,
            title: "도서 제목",
            summary: "도서 요약",
            count: 수량,
            price: 가격
        },
        {
            bookId: 도서 id,
            title: "도서 제목",
            summary: "도서 요약",
            count: 수량,
            price: 가격
        },
        ...
    ]
    ```

### 3. 장바구니 삭제

-   Method
    -   DELETE
-   URI
    -   /cart/{bookId}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body
    </div>

</details>

<details>
    <summary style="font-size: 1.5em;"> 주문 API 설계 </summary>
    <div markdown="5">

### 1. 장바구니에서 선택한 주문 상품 목록 조회

-   Method
    -   GET
-   URI
    -   /cart/items
-   HTTP status code
    -   성공 200
-   Request Body

    ```javascript
    [
        {
            cartItemId: 장바구니 도서 id,
            bookId: 도서 id,
            title: "도서 제목",
            summary: "도서 요약",
            count: 수량,
            price: 가격
        },
        {
            cartItemId: 장바구니 도서 id,
            bookId: 도서 id,
            title: "도서 제목",
            summary: "도서 요약",
            count: 수량,
            price: 가격
        },
        ...
    ]
    ```

-   Response Body

    </div>

</details>
