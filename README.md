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
| GET | `/api/user/profile` | To get the details of user profile | yes | ✅
| GET | `/api/user/history` | To edit the details of a user history activity | yes | ❌
| GET | `/api/user/refreshtoken` | Get Refresh Expired Token | yes | ✅
| POST | `/api/user/register` | To sign up a new user account | no | ✅
| POST | `/api/user/login` | To login an existing user account | no | ✅
| PUT | `/api/user/profile` | To update an existing user profile | yes | ❌

### 2. Forum Activity
| Methods | Endpoints | Action | Authorization | Status |
| --- | --- | --- | --- | --- |
| GET | `/api/forum/:id/posts` | To get the post by id | no | ❌ 
| GET |  `/api/forum/posts` | To get all post of forum | no | ❌
| POST | `/api/forum/user/posts` | To create user  post | yes | ❌
| PUT | `/api/forum/user/posts` | To update user post | yes | ❌
| DELETE | `/api/forum/user/posts` | To delete user  post | yes | ❌

### 3. Image Predict
| Methods | Endpoints | Action | Authorization | Status |
| --- | --- | --- | --- | --- |
| POST | `/api/predict` | send data image to models predict | yes | 🕑

### 4. Articles
| Methods | Endpoints | Action | Authorization | Status |
| --- | --- | --- | --- | --- | 
| GET | `/api/articles` | Get Articles | no | ✅

## `GET`
#### 1.  `/api/user/refreshtoken` <br>
**Body Request**    : - <br>
***Authorization*** : Bearer Token  <br>
**Response** :
```JSON
{
    "refreshToken" : "token"
}
```

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
#### 3.  `/api/predict` <br>
**Body Request**    : form-data images

***Authorization*** : Bearer Token  <br>
**Response** :
```JSON
{
    "success": true,
    "data": {
        "message": "Image received and processed successfully.",
        "predicted_class": 5
    },
    "status": 200
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

## How to Use

1. Make an update.
    ```
    sudo apt-get update
    ```
2. Clone this repository.
    ```
    git clone https://github.com/rosfandy/backend-bangkit-2023-fp.git
    ```
3. Install nodejs, python, and packages.
    ```
    sudo apt install nodejs && sudo apt install npm
    sudo apt install python3 && sudo apt install python3-pip
    ```
4. Check instalation.
    ```
    node --version
    npm --version
    python3 --version
    pip3 --version
    ```
5. Install packages.
    ```
    npm i
    pip install Flask tensorflow requests Image numpy
    ```
6. Run backend and model.
    ```
    TERMINAL 1
    npm run start
    TERMINAL 2
    cd Flask/
    python3 main.py
    ```
