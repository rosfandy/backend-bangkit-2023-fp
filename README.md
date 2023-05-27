# Backend API

### Technologies Used
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)


* [NodeJS](https://nodejs.org/) : This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) : This is a NodeJS web application framework.
* [Firebase](https://firebase.google.com/) : This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.


## Endpoint
### 1. Users Activity
| Methods | Endpoints | Action | Authorization | status
| --- | --- | --- | --- | --- |
| GET | `/api/user/profile` | To get the details of user profile | yes | done
| GET | `/api/user/history` | To edit the details of a user history activity | yes | ongoing
| GET | `/api/user/refreshtoken` | Get Refresh invalid token | yes | done
| POST | `/api/user/register` | To sign up a new user account | no | done
| POST | `/api/user/login` | To login an existing user account | no | done
| PUT | `/api/user/profile` | To update an existing user profile | yes | ongoing

### 2. Forum Activity
| Methods | Endpoints | Action | Authorization | Status |
| --- | --- | --- | --- | --- |
| GET | `/api/forum/:id/posts` | To get the post by id | no | ongoing 
| GET |  `/api/forum/posts` | To get all post of forum | no | ongoing
| POST | `/api/forum/user/posts` | To create user  post | yes | ongoing
| PUT | `/api/forum/user/posts` | To update user post | yes | ongoing
| DELETE | `/api/forum/user/posts` | To delete user  post | yes | ongoing

### 2. Image Predict
| Methods | Endpoints | Action | Authorization | Status |
| --- | --- | --- | --- | --- |
| POST | `/api/predict` | send data image to models predict | yes | ongoing

### 2. Articles
| Methods | Endpoints | Action | Authorization | Status |
| --- | --- | --- | --- | --- | 
| GET | `/api/articles` | Get Articles | no | ongoing

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
        "email" : "mail@mail.com",
        "username": "username",
        "token" : "token"
      }
    ]
}
```
#### 3.  `/api/user/logout` <br>
**Body Request**    : user_id <br>
***Authorization*** : bearer token  <br>
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

