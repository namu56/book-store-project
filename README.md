# BOOKSTORE

# API 설계

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
            book_id: 도서 id,
            title: "도서 제목",
            author: "도서 작가",
            summary: "도서 요약 설명",
            price: 가격,
            likes: 좋아요 수,
            published_date: "출간일"
        },
        {
            book_id: 도서 id,
            title: "도서 제목",
            author: "도서 작가",
            summary: "도서 요약 설명",
            price: 가격,
            likes: 좋아요 수,
            published_date: "출간일"
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
        book_id: 도서 id,
        like_id: 좋아요 id,
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
        published_date: "출간일"
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
            book_id: 도서 id,
            title: "도서 제목",
            category: "도서 카테고리",
            author: "도서 작가",
            summary: "도서 요약 설명",
            price: 가격,
            likes: 좋아요 수,
            published_date: "출간일"
        },
        {
            book_id: 도서 id,
            title: "도서 제목",
            category: "도서 카테고리",
            author: "도서 작가",
            summary: "도서 요약 설명",
            price: 가격,
            likes: 좋아요 수,
            published_date: "출간일"
        }
        ...
    ]

    ```

    </div>

</details>

<details>
    <summary style="font-size: 1.5em;"> 좋아요 API 설계 </summary>
    <div markdown="3">

### 1. 좋아요 추가

-   Method
    -   POST
-   URI
    -   /likes/{book_id}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

### 2. 좋아요 취소

-   Method
    -   DELETE
-   URI
    -   /likes/{book_id}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body
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
    -   /carts
-   HTTP status code
    -   성공 200
-   Request Body
-   Response Body

    ```javascript
    [
        {
            book_id: 도서 id,
            title: "도서 제목",
            summary: "도서 요약",
            quantity: 수량,
            price: 가격
        },
        {
            book_id: 도서 id,
            title: "도서 제목",
            summary: "도서 요약",
            quantity: 수량,
            price: 가격
        },
        ...
    ]
    ```

### 3. 장바구니 삭제

-   Method
    -   DELETE
-   URI
    -   /carts/{book_id}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

### 4. (장바구니에서 선택한) 주문 "예상" 상품 목록 조회

-   Method
    -   GET
-   URI
    -   /carts
-   HTTP status code
    -   성공 200
-   Request Body

    ```javascript
    [
        {cart_item_id: 장바구니 도서 id},
        {cart_item_id: 장바구니 도서 id},
        ...
    ]
    ```

-   Response Body

    ```javascript
    [
        {
            cart_item_id: 장바구니 도서 id,
            book_id: 도서 id,
            title: "도서 제목",
            summary: "도서 요약",
            quantity: 수량,
            price: 가격
        },
        {
            cart_item_id: 장바구니 도서 id,
            book_id: 도서 id,
            title: "도서 제목",
            summary: "도서 요약",
            quantity: 수량,
            price: 가격
        },
        ...
    ]
    ```

    </div>

</details>

<details>
    <summary style="font-size: 1.5em;"> 주문 API 설계 </summary>
    <div markdown="5">

### 1. 주문하기

-   고려 사항

    -   주문하기 = 주문 등록(INSERT)
    -   장바구니 테이블에서 주문된 상품(DELETE)

-   Method
    -   POST
-   URI
    -   /orders
-   HTTP status code
    -   성공 201
-   Request Body

    ```javascript
    {
        items:
        [
            {
                cart_item_id: 장바구니 도서 id,
                book_id: 도서 id,
                quantity: 수량
            },
            {
                cart_item_id: 장바구니 도서 id,
                book_id: 도서 id,
                quantity: 수량
            }
            ...
        ]
        delivery: {
            adress: "주소",
            receiver: "받는 사람",
            contact: "010-0000-0000",
        }
        total_price: "총 금액"
    }
    ```

-   Response Body

### 2. 주문 내역 조회

-   Method
    -   GET
-   URI
    -   /orders
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body
    ```javascript
    [
        {
            order_id: "주문 id",
            created_at: "주문 일자",
            delivery: {
                adress: "배송지 주소",
                receiver: "받는 사람 이름",
                contact: "010-0000-0000",
            },
            bookTitle: "대표 책 제목",
            total_price: "총 결제 금액",
            total_count: "총 수량"
        },
        {
            order_id: "주문 id",
            created_at: "주문 일자",
            delivery: {
                adress: "배송지 주소",
                receiver: "받는 사람 이름",
                contact: "010-0000-0000",
            },
            bookTitle: "대표 책 제목",
            total_price: "총 결제 금액",
            total_count: "총 수량"
        }
        ...
    ]
    ```

### 3. 주문 상세 상품 조회

-   Method
    -   GET
-   URI
    -   /orders/{order_id}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

    ```javascript
    [
        {
            book_id: "도서 id",
            book_title: "도서 제목",
            author: "작가명",
            price: 가격,
            quantity: 수량,
        },
        {
            book_id: "도서 id",
            book_title: "도서 제목",
            author: "작가명",
            price: 가격,
            quantity: 수량,
        }
        ...
    ]
    ```

    </div>

</details>

<br>

## ERD (초안)

<details>
<summary> 펼쳐보기 </summary>
<div markdown="1">

![image](https://github.com/namu56/book-store-project/assets/107787137/86991f16-e601-4016-af06-9427846a5361)

</div>
</details>
