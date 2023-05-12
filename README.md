# Backend API

### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [Firebase](https://firebase.google.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.


# Endpoint
### 1. Users Activity
| Methods | Endpoints | Action | Authorization |
| --- | --- | --- | --- |
| GET | /api/user/profile | To get the details of user profile | yes
| GET | /api/user/history | To edit the details of a user history activity | yes
| POST | /api/user/register | To sign up a new user account | no
| POST | /api/user/login | To login an existing user account | no
| POST | /api/user/logout | To logout an existing user activity | no
| PUT | /api/user/profile | To update an existing user profile | yes


## ```POST```
### 1.  ```/api/user/register``` <br>
**Body Request**    : username, email, password <br>
***Authorization*** : -  <br>
**Response** :
```JSON
{
    "status"  : 201,
    "message" : "Register success ! "
}
```
### 2.  ```/api/user/login``` <br>
**Body Request**    : email, password <br>
***Authorization*** : -  <br>
**Response** :
```JSON
{
    "status"  : 200,
    "message" : "Login success ! ",
    "user"   : [
      {
        "username": "username",
        "token" : "token"
      }
    ]
}
```
### 3.  ```/api/user/logout``` <br>
**Body Request**    : email <br>
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

