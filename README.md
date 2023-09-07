# Recipes-Club
Find your recipes

And make delicious food


# Database Schema
![Database Schema](https://github.com/sandriirawan/Be-task/assets/80002249/1616770a-0c10-4555-92fa-e488a0ed0d5d)

## Built with

- NodeJS
- ExpressJS
- PostgreSQL

## Packages used

  - bcryptjs: ^2.4.3,
  - cloudinary: ^1.37.3,
  - cors: ^2.8.5,
  - dotenv": ^16.3.1,
  - express": ^4.18.2,
  - http-errors": ^2.0.0,
  - joi": ^17.9.2",
  - jsonwebtoken": ^9.0.1,
  - multer": "1.4.5-lts.1,
  - nodemon": ^3.0.1,
  - pg": ^8.11.1,
  - uuid": ^9.0.0,
  - xss-clean": ^0.1.4

# ENV Keys
```bash
DB_USER = 
DB_NAME = 
DB_PASS = 
DB_PORT = 
DB_HOST = 

JWT_TOKEN =

CLOUD_NAME = 
CLOUD_KEY = 
CLOUD_SECRET = 
```

# Installation
Clone the project

```bash
  git clone https://github.com/vineas11/team-project_kelompok1_pijar_backend.git
```

Go to the project directory

```bash
  cd team-project_kelompok1_pijar_backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon
```

# Api documentation
- users
- recipes
- comments
- likeds
- bookmarks

---
### Register users
```http
  POST /users/register
```
Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |
| `name` | **Required**. name |
| `phone` | **Required**. phone |
| `photo` | **Required**. photo |
| `password` | **Required**. password |
| `confirmpasswordHash` | **Required**. confirmpasswordHash |


---

### Login
```http
  POST /users/login
```
Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `email` | **Required**. email |
| `password` | **Required**. password |


---
### Get all Recipes + Query

```http
  GET /recipes?search=''&searchBy=name&sortBy=created_at&sort=ASC
```
Query Params: 
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `search` | search query  |null
| `searchBy` | search name |name
| `sortBy`| sort created_at |created_at
| `sort`| sort query |asc

---

### Get recipes by Id

```http
  GET /recipes/:id
```


---

### Get recipes by Name

```http
  GET /recipes/name/:title
```

---


### Input Recipes 

```http
  POST /recipes/
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |
Req Form-Data:
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `title` | Burger  | ''
| `Ingredients` | Patty, Meat | ''
| `video` |New video | ''
| `photo`| New Photo | ''
| `users_id`| Payload Bearer token | ''
---


### Update Recipes 

```http
  PUT /recipes/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |
Req Form-Data:
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `title` | Burger  | ''
| `Ingredients` | Patty, Meat | ''
| `video` |New video | ''
| `photo`| New Photo | ''
---


### Delete Recipes

```http
  DELETE /recipes/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

---

### Get Users Payload

```http
  GET /users
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

---

### Update Users
```http
  PUT /users/profile/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `name` | Nama|
| `phone` | 0812 |
| `photo` | image jpeg/png|

---


### Get likeds by users_id

```http
  GET /likeds/:users_id
```


---
### Input likeds 

```http
  POST /likeds/
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `recipes_id` | 1| ''
| `users_id` |2| ''
---


### Delete likeds 

```http
  DELETE /likeds/:id
```

---
### Get Bookmarks by users_id

```http
  GET /bookmarks /:users_id
```


---
### Input Bookmarks 

```http
  POST /bookmarks /
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `recipes_id` | 1| ''
| `users_id` |2| ''
---


### Delete Bookmarks 

```http
  DELETE /bookmarks/:id
```

---
### Get Comments  by recipes_id

```http
  GET /comments/:recipes_id
```


---
### Input Comments 

```http
  POST /comments
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `recipes_id` | 1| ''
| `users_id` |2| ''
| `comment_text` |Lorem ipsum| ''
---


### Delete Comments 

```http
  DELETE /comments /:id
```

---

## Documentation

Documentation files are provided in the [docs](./docs) folder

- [Postman API colletion]()
- [PostgreSQL database query](./query.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman]()

## Related Project

:rocket: [`Backend Blanja`](https://github.com/vineas11/team-project_kelompok1_pijar_backend)

:rocket: [`Frontend Blanja`](https://github.com/vineas/team-project_kelompok1_pijar_frontend)

:rocket: [`Demo Blanja`](https://team-project-kelompok1-pijar-frontend.vercel.app/home)

Project link : [https://github.com/sandriirawan/Fe_Blanja_React](https://github.com/vineas/team-project_kelompok1_pijar_frontend)]

