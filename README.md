# RESTAPI Tunniplaan

Use this API to find or update Lessons and/or single Courses, Subjects, Teachers or Rooms.

All single objects consist of a name. For Subjects, EAP value is also included.

Lesson's information consists of start_time, end_time, course_id, subject_id, teacher_id, room_id, comment.

## Open Endpoints

Open endpoints require no Authentication.

### Courses related
Endpoints for viewing and manipulating Courses.

| Action | Endpoint |
| --- | --- |
| Show all courses | `GET /courses` |
| Show a selected course | `GET /courses/:id` |
| Add a course | `POST /courses` |
| Update a course | `PUT /courses/:id` |
| Delete a course | `DELETE /courses/:id` |

**Data example**

`GET /courses/1`
```json
{
    "course": {
        "id": 1,
        "name": "Liikluskorraldus1"
    }
}
```

### Subjects related
Endpoints for viewing and manipulating Subjects.

| Action | Endpoint |
| --- | --- |
| Show all subjects | `GET /subjects` |
| Show a selected subject | `GET /subjects/:id` |
| Add a subject | `POST /subjects` |
| Update a subject | `PUT /subjects/:id` |
| Delete a subject | `DELETE /subjects/:id` |

**Data example**

`GET /subjects/1`
```json
{
    "subject": {
        "id": 1,
        "name": "Erialane inglise keel",
        "EAP": 6
    }
}
```

### Teachers related
Endpoints for viewing and manipulating Teachers.

| Action | Endpoint |
| --- | --- |
| Show all teachers | `GET /teachers` |
| Show a selected teacher | `GET /teachers/:id` |
| Add a teacher | `POST /teachers` |
| Update a teacher | `PUT /teachers/:id` |
| Delete a teacher | `DELETE /teachers/:id` |

**Data example**

`GET /teachers/1`
```json
{
    "teacher": {
        "id": 1,
        "name": "Mari Kuli"
    }
}
```

### Rooms related
Endpoints for viewing and manipulating Rooms.

| Action | Endpoint |
| --- | --- |
| Show all rooms | `GET /rooms` |
| Show a selected room | `GET /rooms/:id` |
| Add a room | `POST /rooms` |
| Update a room | `PUT /rooms/:id` |
| Delete a room | `DELETE /rooms/:id` |

**Data example**

`GET /rooms/1`
```json
{
    "room": {
        "id": 1,
        "name": "Arvutiklass 203"
    }
}
```

### Lessons related
Endpoints for viewing and manipulating Lessons.

| Action | Endpoint |
| --- | --- |
| Show all lessons | `GET /lessons` |
| Show a selected lesson | `GET /lessons/:id` |
| Add a lesson | `POST /lessons` |
| Update a lesson | `PUT /lessons/:id` |
| Delete a lesson | `DELETE /lessons/:id` |

**Data example**

`GET /lessons/1`
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
