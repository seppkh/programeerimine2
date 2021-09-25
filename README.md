# RESTAPI Tunniplaan

Use this API to find or update Lessons and/or single Courses, Subjects, Teachers or Rooms.

All single objects consist of a name. For Subjects, EAP value is also included.

Lesson's information consists of start_time, end_time, course_id, subject_id, teacher_id, room_id, comment.

## Open Endpoints

Open endpoints require no Authentication.

### Courses related
Endpoints for viewing and manipulating Courses.

**Data example**
```json
{
    "course": {
        "id": 1,
        "name": "Liikluskorraldus1"
    }
}
```

* [Show all courses] : `GET /courses`
* [Show a selected course] : `GET /courses/:id`
* [Add a course] : `POST /courses`
* [Update a course] : `PUT /courses/:id`
* [Delete a course] : `DELETE /courses/:id`

### Subjects related
Endpoints for viewing and manipulating Subjects.

**Data example**
```json
{
    "subject": {
        "id": 1,
        "name": "Erialane inglise keel",
        "EAP": 6
    }
}
```

* [Show all subjects] : `GET /subjects`
* [Show a selected subject] : `GET /subjects/:id`
* [Add a subject] : `POST /subjects`
* [Update a subject] : `PUT /subjects/:id`
* [Delete a subject] : `DELETE /subjects/:id`

### Teachers related
Endpoints for viewing and manipulating Teachers.

**Data example**
```json
{
    "teacher": {
        "id": 1,
        "name": "Mari Kuli"
    }
}
```

* [Show all teachers] : `GET /teachers`
* [Show a selected teacher] : `GET /teachers/:id`
* [Add a teacher] : `POST /teachers`
* [Update a teacher] : `PUT /teachers/:id`
* [Delete a teacher] : `DELETE /teachers/:id`

### Rooms related
Endpoints for viewing and manipulating Rooms.

**Data example**
```json
{
    "room": {
        "id": 1,
        "name": "Arvutiklass 203"
    }
}
```

* [Show all rooms] : `GET /rooms`
* [Show a selected room] : `GET /rooms/:id`
* [Add a room] : `POST /rooms`
* [Update a room] : `PUT /rooms/:id`
* [Delete a room] : `DELETE /rooms/:id`

### Lessons related
Endpoints for viewing and manipulating Lessons.

**Data example**
```json
{
    "lesson": 1,
    "start_time": "2021-09-30 10:00",
    "end_time": "2021-09-30 13:15",
    "course": {
        "id": 2,
        "name": "Rakendusinformaatika2"
    },
    "subject": {
        "id": 1,
        "name": "Erialane inglise keel",
        "EAP": 6
    },
    "teacher": {
        "id": 1,
        "name": "Mari Kuli"
    },
    "room_id": {
        "id": 2,
        "name": "Auditoorium 307"
    },
    "comment": "Eksam: suuline ja kirjalik osa"
}
```

* [Show all lessons] : `GET /lessons`
* [Show a selected lesson] : `GET /lessons/:id`
* [Add a lesson] : `POST /lessons`
* [Update a lesson] : `PUT /lessons/:id`
* [Delete a lesson] : `DELETE /lessons/:id`

