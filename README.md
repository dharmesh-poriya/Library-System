Here's the enhanced version of the documentation with emojis and additional features section:

---

# 📚 Library Management API Documentation

Welcome to the Library Management API. This documentation provides detailed information about the endpoints available for managing users, books, librarians, and administrative tasks.

### Built With

## Use To Code

![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![Typescript](https://img.shields.io/badge/Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-092749?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&labelColor=000000)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)
![VSCode](https://img.shields.io/badge/Visual_Studio-0078d7?style=for-the-badge&logo=visual%20studio&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## Table of Contents

- [Features](#features)
- [User Authentication](#user-authentication)
  - [Sign Up](#sign-up)
  - [Login](#login)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
  - [Get Public User Data](#get-public-user-data)
- [Public Endpoints](#public-endpoints)
  - [Get Trending Books](#get-trending-books)
  - [Get New Arrival Books](#get-new-arrival-books)
  - [Search Books](#search-books)
  - [Get Book by ID](#get-book-by-id)
- [Admin Book Routes](#admin-book-routes)
  - [Add Book](#add-book)
  - [Edit Book](#edit-book)
  - [Delete Book](#delete-book)
- [Admin Librarian Routes](#admin-librarian-routes)
  - [Add Librarian](#add-librarian)
  - [Edit Librarian](#edit-librarian)
  - [Delete Librarian](#delete-librarian)
- [Librarian Routes](#librarian-routes)
  - [Assign Book](#assign-book)
  - [Return Book](#return-book)
  - [Send Notification](#send-notification)

---

## Features ✨

- 📖 **Book Management**: Add, edit, and delete books.
- 👥 **User Management**: Register, login, and update user profiles.
- 🔍 **Search**: Search for books by title, author, or category.
- 📈 **Trending & New Arrivals**: Get lists of trending and newly arrived books.
- 📚 **Librarian Management**: Assign and return books, send notifications for due books.
- 🔐 **Admin Controls**: Manage librarians and books with admin privileges.

---

## User Authentication

### Sign Up 📝

**Endpoint:** `POST /auth/signup`

**Description:** Registers a new user.

**Request Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

- `201 Created`: User registered successfully.
- `400 Bad Request`: Validation error.

### Login 🔑

**Endpoint:** `POST /auth/login`

**Description:** Authenticates a user.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

- `200 OK`: User authenticated successfully.
- `401 Unauthorized`: Invalid credentials.

### Update User 🔄

**Endpoint:** `PUT /users`

**Description:** Updates user information.

**Request Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "username": "string",
  "email": "string"
}
```

**Response:**

- `200 OK`: User updated successfully.
- `400 Bad Request`: Validation error.

### Delete User ❌

**Endpoint:** `DELETE /users`

**Description:** Deletes a user account.

**Request Headers:**

- `Authorization: Bearer <token>`

**Response:**

- `200 OK`: User deleted successfully.
- `401 Unauthorized`: Invalid token or user not authenticated.

### Get Public User Data 👥

**Endpoint:** `GET /users`

**Description:** Retrieves public user data.

**Request Headers:**

- `Authorization: Bearer <token>`

**Response:**

- `200 OK`: Public user data retrieved successfully.
- `401 Unauthorized`: Invalid token or user not authenticated.

---

## Public Endpoints

### Get Trending Books 📈

**Endpoint:** `GET /books/trending`

**Description:** Retrieves a list of trending books.

**Response:**

- `200 OK`: Trending books retrieved successfully.

### Get New Arrival Books 🆕

**Endpoint:** `GET /books/newArrivals`

**Description:** Retrieves a list of newly arrived books.

**Response:**

- `200 OK`: New arrival books retrieved successfully.

### Search Books 🔍

**Endpoint:** `GET /books`

**Description:** Searches for books based on query parameters.

**Query Parameters:**

- `title`: Book title (optional)
- `author`: Book author (optional)
- `category`: Book category (optional)

**Response:**

- `200 OK`: Books matching search criteria retrieved successfully.

### Get Book by ID 📚

**Endpoint:** `GET /books/:id`

**Description:** Retrieves book details by book ID.

**Path Parameters:**

- `id`: Book ID

**Response:**

- `200 OK`: Book details retrieved successfully.
- `404 Not Found`: Book not found.

---

## Admin Book Routes

### Add Book ➕

**Endpoint:** `POST /admin/books`

**Description:** Adds a new book to the library.

**Request Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "isbn": "string",
  "title": "string",
  "author": "string",
  "publisher": "string",
  "date": "date",
  "genre": "string",
  "quantity": "number",
  "available": "number",
  "categories": "string",
  "thumbnail": "string",
  "previewLink": "string",
  "rating": "number",
  "addedBy": "string"
}
```

**Response:**

- `201 Created`: Book added successfully.
- `400 Bad Request`: Validation error.
- `401 Unauthorized`: Invalid token or user not authenticated.
- `403 Forbidden`: User not authorized.

### Edit Book ✏️

**Endpoint:** `PUT /admin/books/:id`

**Description:** Edits an existing book.

**Request Headers:**

- `Authorization: Bearer <token>`

**Path Parameters:**

- `id`: Book ID

**Request Body:**

```json
{
  "isbn": "string",
  "title": "string",
  "author": "string",
  "publisher": "string",
  "date": "date",
  "genre": "string",
  "quantity": "number",
  "available": "number",
  "categories": "string",
  "thumbnail": "string",
  "previewLink": "string",
  "rating": "number",
  "addedBy": "string"
}
```

**Response:**

- `200 OK`: Book updated successfully.
- `400 Bad Request`: Validation error.
- `401 Unauthorized`: Invalid token or user not authenticated.
- `403 Forbidden`: User not authorized.
- `404 Not Found`: Book not found.

### Delete Book 🗑️

**Endpoint:** `DELETE /admin/books/:id`

**Description:** Deletes a book from the library.

**Request Headers:**

- `Authorization: Bearer <token>`

**Path Parameters:**

- `id`: Book ID

**Response:**

- `200 OK`: Book deleted successfully.
- `401 Unauthorized`: Invalid token or user not authenticated.
- `403 Forbidden`: User not authorized.
- `404 Not Found`: Book not found.

---

## Admin Librarian Routes

### Add Librarian ➕

**Endpoint:** `POST /admin/librarian`

**Description:** Adds a new librarian.

**Request Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

- `201 Created`: Librarian added successfully.
- `400 Bad Request`: Validation error.
- `401 Unauthorized`: Invalid token or user not authenticated.
- `403 Forbidden`: User not authorized.

### Edit Librarian ✏️

**Endpoint:** `PUT /admin/librarian/:id`

**Description:** Edits an existing librarian.

**Request Headers:**

- `Authorization: Bearer <token>`

**Path Parameters:**

- `id`: Librarian ID

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

- `200 OK`: Librarian updated successfully.
- `400 Bad Request`: Validation error.
- `401 Unauthorized`: Invalid token or user not authenticated.
- `403 Forbidden`: User not authorized.
- `404 Not Found`: Librarian not found.

### Delete Librarian 🗑️

**Endpoint:** `DELETE /admin/librarian/:id`

**Description:** Deletes a librarian.

**Request Headers:**

- `Authorization: Bearer <token>`

**Path Parameters:**

- `id`: Librarian ID

**Response:**

- `200 OK`: Librarian deleted successfully.
- `401 Unauthorized`: Invalid token or user not authenticated.
- `403 Forbidden`: User not authorized.
- `404 Not Found`: Librarian not found.

---

## Librarian Routes

### Assign Book 📚

**Endpoint:** `POST /librarian/assignBook`

**Description:** Assigns a book to a user.

**Request Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "userId": "string",
  "bookId": "string",
  "dueDate": "date"
}
```

**Response:**

- `201 Created`: Book assigned successfully.
- `400 Bad Request`: Validation error.
- `401 Unauthorized`: Invalid token or user not authenticated.
- `403 Forbidden`: User not authorized.

### Return Book 🔙

**Endpoint:** `POST /librarian/returnBook`

**Description:** Marks a book as returned by the user.

**Request Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "userId": "string",
  "bookId": "string"
}
```

**Response:**

- `200 OK`: Book returned successfully.
- `400 Bad Request`: Validation error.
- `401 Unauthorized`: Invalid token or user not authenticated.
- `403 Forbidden`: User not authorized.

### Send Notification 📧

**Endpoint:** `POST /librarian/sendNotification`

**Description:** Sends a notification to a user about a due book.

**Request Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "userId": "string",
  "bookId": "string",
  "message": "string"
}
```

**Response:**

- `201 Created`: Notification sent successfully.
- `400 Bad Request`: Validation error.
- `401 Unauthorized`: Invalid token or user not authenticated.
- `403 Forbidden`: User not authorized.

---

This documentation provides a comprehensive overview of the available API endpoints, their purposes, request structures, and responses. For any further questions or issues, please refer to the support team.
