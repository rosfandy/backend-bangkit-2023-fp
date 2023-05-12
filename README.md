# Backend API

### Technologies Used
<p align="center">
  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://nodejs.org/static/images/logo.svg" alt="Node.js logo">
  </a>
  <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://expressjs.com/images/express-facebook-share.png" alt="Express.js logo">
  </a>
  <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-built_white.png" alt="Firebase logo">
  </a>
</p>



* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [Firebase](https://firebase.google.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.


## Endpoint
### 1. Users Activity
| Methods | Endpoints | Action | Authorization |
| --- | --- | --- | --- |
| GET | `/api/user/:id/profile` | To get the details of user profile | yes
| GET | `/api/user/:id/history` | To edit the details of a user history activity | yes
| POST | `/api/user/register` | To sign up a new user account | no
| POST | `/api/user/login` | To login an existing user account | no
| POST | `/api/user/logout` | To logout an existing user activity | no
| PUT | `/api/user/:id/profile` | To update an existing user profile | yes

### 2. Forum Activity
| Methods | Endpoints | Action | Authorization |
| --- | --- | --- | --- |
| GET | `/api/forum/:id/posts` | To get the post by id | no
| GET |  `/api/forum/posts` | To get all post of forum | no
| POST | `/api/forum/user/posts` | To create user  post | yes
| PUT | `/api/forum/user/posts` | To update user post | yes
| DELETE | `/api/forum/user/posts` | To delete user  post | yes

### 2. Image Predict
| Methods | Endpoints | Action | Authorization |
| --- | --- | --- | --- |
| POST | `/api/predict` | send data image to models predict | yes

## `POST`
#### 1.  `/api/user/register` <br>
**Body Request**    : username, email, password <br>
***Authorization*** : -  <br>
**Response** :
```JSON
{
    "status"  : 201,
    "message" : "Register success ! "
}
```
#### 2.  `/api/user/login` <br>
**Body Request**    : email, password <br>
***Authorization*** : -  <br>
**Response** :
```JSON
{
    "status"  : 200,
    "message" : "Login success ! ",
    "user"   : [
      {
        "user_id" : 123,
        "username": "username",
        "token" : "token"
      }
    ]
}
```
#### 3.  `/api/user/logout` <br>
**Body Request**    : user_id <br>
***Authorization*** : -  <br>
**Response** :
```JSON
{
    "status"  : 200,
    "message" : "Logout success ! ",
}
```



## Status Codes

Api returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

