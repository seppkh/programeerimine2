# RESTAPI Tunniplaan

Use this API to find or update Lessons and/or single Courses, Subjects, Teachers or Rooms.

## Setup in local server

* git clone https://github.com/seppkh/programmeerimine2.git
* cd programmeerimine2
* npm install
* add database structure and dummy data to local database using ./docs/modelAndSeed.sql
* create config.ts file with local database connection info
* npm start
* Go to http://localhost:3006/ping

## API documentation in Swagger:
* Start project - npm start
* Go to http://localhost:3006/api-docs/



# API documentation in github:

## Open Endpoints

Open endpoints require no Authentication.

| Action | Endpoint |
| ---- | ---- |
| Login | `POST /login` |
| Create a user | `POST /users` |


## Closed Endpoints

Closed endpoints require Authentication.

`POST`, `PUT` and `DELETE` endpoints are available only for Admins.
`GET /users` is also available only for Admins.


## Users related
Endpoints for viewing and manipulating Users.

| Action | Endpoint |
| ---- | ---- |
| Show all users | `GET /users` |
| Show a selected user | `GET /users/:id` |
| Update a selected user | `PUT /users/:id` |
| Delete a selected user | `DELETE /users/:id` |


## Courses related
Endpoints for viewing and manipulating Courses.

| Action | Endpoint |
| ---- | ---- |
| Show all courses | `GET /courses` |
| Show a selected course | `GET /courses/:id` |
| Add a course | `POST /courses` |
| Update a selected course | `PUT /courses/:id` |
| Delete a selected course | `DELETE /courses/:id` |


**Data example**

`GET /courses/1`
```json
{
    "course": [
        {
            "id": 1,
            "name": "Rakendusinformaatika 1",
            "dateCreated": "2022-01-04T17:47:10.000Z",
            "dateUpdated": null,
            "dateDeleted": null,
            "createdBy": "admin@admin.ee"
        }
    ]
}
```


## Subjects related
Endpoints for viewing and manipulating Subjects.

| Action | Endpoint |
| ---- | ---- |
| Show all subjects | `GET /subjects` |
| Show a selected subject | `GET /subjects/:id` |
| Add a subject | `POST /subjects` |
| Update a selected subject | `PUT /subjects/:id` |
| Delete a selected subject | `DELETE /subjects/:id` |


**Data example**

`GET /subjects/1`
```json
{
    "subject": [
        {
            "id": 1,
            "name": "Programmeerimine 2",
            "EAP": 3,
            "dateCreated": "2022-01-04T17:47:10.000Z",
            "dateUpdated": null,
            "dateDeleted": null,
            "createdBy": "admin@admin.ee"
        }
    ]
}
```


## Teachers related
Endpoints for viewing and manipulating Teachers.

| Action | Endpoint |
| ---- | ---- |
| Show all teachers | `GET /teachers` |
| Show a selected teacher | `GET /teachers/:id` |
| Add a teacher | `POST /teachers` |
| Update a selected teacher | `PUT /teachers/:id` |
| Delete a selected teacher | `DELETE /teachers/:id` |


**Data example**

`GET /teachers/1`
```json
{
    "teacher": [
        {
            "id": 1,
            "name": "Martti Raavel",
            "dateCreated": "2022-01-04T17:47:10.000Z",
            "dateUpdated": null,
            "dateDeleted": null,
            "createdBy": "admin@admin.ee"
        }
    ]
}
```


## Rooms related
Endpoints for viewing and manipulating Rooms.

| Action | Endpoint |
| ---- | ---- |
| Show all rooms | `GET /rooms` |
| Show a selected room | `GET /rooms/:id` |
| Add a room | `POST /rooms` |
| Update a selected room | `PUT /rooms/:id` |
| Delete a selected room | `DELETE /rooms/:id` |


**Data example**

`GET /rooms/1`
```json
{
    "room": [
        {
            "id": 1,
            "name": "Arvutilabor 203",
            "dateCreated": "2022-01-04T17:47:10.000Z",
            "dateUpdated": null,
            "dateDeleted": null,
            "createdBy": "admin@admin.ee"
        }
    ]
}
```


## Lessons related
Endpoints for viewing and manipulating Lessons.

| Action | Endpoint |
| ---- | ---- |
| Show all lessons | `GET /lessons` |
| Show a selected lesson | `GET /lessons/:id` |
| Add a lesson | `POST /lessons` |
| Update a selected lesson | `PUT /lessons/:id` |
| Delete a selected lesson | `DELETE /lessons/:id` |
| Show lessons with a selected course | `GET /lessons/course/:id` |
| Show lessons with a selected teacher | `GET /lessons/teacher/:id` |
| Show lessons with a selected subject | `GET /lessons/subject/:id` |
| Show lessons with a selected room | `GET /lessons/room/:id` |




**Data example**

`GET /lessons/1`
```json
{
    "lesson": [
        {
            "id": 1,
            "startTime": "2021-12-16T08:00:00.000Z",
            "endTime": "2021-12-16T11:15:00.000Z",
            "duration": 4,
            "course": "Rakendusinformaatika 2",
            "subject": "Programmeerimine 2",
            "teacher": "Martti Raavel",
            "room": "Auditoorium 207",
            "comment": null,
            "dateCreated": "2022-01-04T17:47:10.000Z",
            "dateUpdated": null,
            "dateDeleted": null,
            "createdBy": "admin@admin.ee"
        }
    ]
}
```
