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
| GET | `/api/user/history` | To edit the details of a user history activity | yes | ✅
| GET | `/api/user/refreshtoken` | Get Refresh Expired Token | yes | ✅
| POST | `/api/user/register` | To sign up a new user account | no | ✅
| POST | `/api/user/login` | To login an existing user account | no | ✅
| PUT | `/api/user/profile` | To update an existing user profile | yes | ❌

### 2. Forum Activity
| Methods | Endpoints | Action | Authorization | Status |
| --- | --- | --- | --- | --- |
| POST | `/api/forum/user/posts` | To create user  post | yes | ✅
| GET |  `/api/forum/posts` | To get all post of forum | no | ✅
| GET | `/api/forum/:id/posts` | To get the post by id | no | ✅ 
| PUT | `/api/forum/user/:id/posts` | To update user post | yes | ✅
| DELETE | `/api/forum/user/:id/posts` | To delete user  post | yes | ✅

### 3. Image Predict
| Methods | Endpoints | Action | Authorization | Status |
| --- | --- | --- | --- | --- |
| POST | `/api/predict` | send data image to models predict | yes | ✅

### 4. Articles
| Methods | Endpoints | Action | Authorization | Status |
| --- | --- | --- | --- | --- | 
| GET | `/api/articles` | Get Articles | no | ✅

## IP
34.101.58.0

### 1. Refresh Token
**Endpoint**        : `/api/user/refreshtoken` <br>
**Body Request**    : - <br>
***Authorization*** : Bearer Token  <br>
**Method**          : POST <br>
**Response** :
```JSON
{
    "refreshToken" : "token"
}
```

### 2. Register
**Endpoint**        : `/api/user/register` <br>
**Body Request**    : username, email, password <br>
***Authorization*** : -  <br>
**Method**          : POST <br>
**Response** :
```JSON
{
    "status"  : 201,
    "message" : "username ditambahkan !"
}
```

### 3. Login
**Endpoint**        : `/api/user/login` <br>
**Body Request**    : email, password <br>
***Authorization*** : -  <br>
**Method**          : POST <br>
**Response** :
```JSON
{
    "message" : "Login success ! ",
    "status"  : 200,
    "user"   : [
      {
        "userId": "id",
        "email" : "mail@mail.com",
        "token" : "token"
      }
    ]
}
```

### 4. Profile
**Endpoint**        : `/api/user/profile` <br>
**Body Request**    : - <br>
***Authorization*** : Bearer Token  <br>
**Method**          : GET <br>
**Response** :
```JSON
{
    "status": 200,
    "message": "Data found",
    "data": {
        "username": "username",
        "email": "mail@mail.com",
        "userId": "id",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### 5. History
**Endpoint**        : `/api/user/history` <br>
**Body Request**    : email <br>
***Authorization*** : Bearer Token  <br>
**Method**          : GET <br>
**Response** :
```JSON
{
    "status": 200,
    "message": "Success",
    "data": [
        {
            "diseaseName": "diseaseName",
            "createdAt": "date",
            "historyId": "id",
            "imageUrl": "https://example.jpg",
            "diseaseSolution": "lorem ipsum",
            "diseaseDescription": "lorem ipsum",
            "email": "mail@mail.com",
            "_id": "id"
        }
    ]
}
```

### 6. Predict
**Endpoint**        : `/api/predict` <br>
**Body Request**    : form-data image <br>
***Authorization*** : Bearer Token  <br>
**Method**          : POST <br>
**Response** :
```JSON
{
    "status": 200,
    "data": {
        "label": "labelName",
        "message": "Image received and processed successfully.",
        "predictedAt": "date",
        "predicted_class": 8,
        "diseaseName": "diseaseName",
        "diseaseSolution": "diseaseSolution",
        "diseaseDescription": "diseaseDescription"
    }
}
```

### 7. Articles
**Endpoint**        : `/api/articles` <br>
**Body Request**    : - <br>
***Authorization*** : -  <br>
**Method**          : GET <br>
**Response** :
```JSON
{
    "total": "totalArticles",
    "data": [
        {
            "articleType": [
                {
                    "length": "length",
                    "data": [
                        {
                            "id": "id",
                            "title": "titleName",
                            "gambar": "https://example.jpg",
                            "url": "https://example.jpg",
                            "_id": "id"
                        },
                        {
                            "id": "id",
                            "title": "titleName",
                            "gambar": "https://example.jpg",
                            "url": "https://example.jpg",
                            "_id": "id"
                        },
                        ...
                    ]
                }
            ],
            "articleType": [
                {
                    "length": "length",
                    "data": [
                        {
                            "id": "id",
                            "title": "titleName",
                            "gambar": "https://example.jpg",
                            "url": "https://example.jpg",
                            "_id": "id"
                        },
                        {
                            "id": "id",
                            "title": "titleName",
                            "gambar": "https://example.jpg",
                            "url": "https://example.jpg",
                            "_id": "id"
                        },
                        ...
                    ]
                }
            ],
            ...
        }
    ]
}
```

### 8. Create Post Forum
**Endpoint**        : `/api/forum/user/posts` <br>
**Body Request**    : form-data email, description, image <br>
***Authorization*** : Bearer Token  <br>
**Method**          : POST <br>
**Response** :
```JSON
{
    "status": 200,
    "message": "success to post",
    "forumData": {
        "email": "mail@mail.com",
        "description": "description",
        "imageUrl": "https://example.jpg",
        "createdAt": "date"
    }
}
```

### 9. Get All Post Forum
**Endpoint**        : `/api/forum/posts` <br>
**Body Request**    : - <br>
***Authorization*** : -  <br>
**Method**          : GET <br>
**Response** :
```JSON
{
    "status": 200,
    "message": "success",
    "allPost": [
        {
            "createdAt": "date",
            "imageUrl": "https://example.jpg",
            "description": "description",
            "email": "mail@mail.com",
            "_id": "id"
        },
        {
            "createdAt": "date",
            "imageUrl": "https://example.jpg",
            "email": "mail@mail.com",
            "description": "description",
            "modified": "date",
            "_id": "id"
        },
        {
            "createdAt": "date",
            "imageUrl": "https://example.jpg",
            "description": "description",
            "email": "mail@mail.com",
            "_id": "id"
        }
    ]
}
```

### 10. Get Post by Id
**Endpoint**        : `/api/forum/:id/posts` <br>
**Body Request**    : - <br>
***Authorization*** : -  <br>
**Method**          : GET <br>
**Response** :
```JSON
{
    "status": 200,
    "message": "success",
    "allPost": {
            "createdAt": "date",
            "imageUrl": "https://example.jpg",
            "description": "description",
            "email": "mail@mail.com",
            "_id": "id"
        }
}
```

### 11. Get Post by Email
**Endpoint**        : `/api/forum/userposts` <br>
**Body Request**    : - <br>
***Authorization*** : Bearer Token  <br>
**Method**          : GET <br>
**Response** :
```JSON
{
    "status": 200,
    "message": "Data found",
    "postsForum": [
        {
            "createdAt": "date",
            "imageUrl": "https://example.jpg",
            "description": "description",
            "email": "mail@mail.com",
            "_id": "id"
        },
        {
            "createdAt": "date",
            "description": "description",
            "email": "mail@mail.com",
            "_id": "id"
        },
        {
            "createdAt": "date",
            "description": "description",
            "email": "mail@mail.com",
            "_id": "id"
        }
    ]
}
```

### 12. Update Post
**Endpoint**        : `/api/forum/user/:id/posts` <br>
**Body Request**    : descript <br>
***Authorization*** : Bearer Token  <br>
**Method**          : PUT <br>
**Response** :
```JSON
{
    "status": 200,
    "message": "success update"
}
```

### 13. Delete Post
**Endpoint**        : `/api/forum/user/:id/posts` <br>
**Body Request**    : - <br>
***Authorization*** : Bearer Token  <br>
**Method**          : DELETE <br>
**Response** :
```JSON
{
    "status": 200,
    "message": "success delete"
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
