
import { countReset } from "console";
import express, { Request, Response, Application } from "express";
import { request } from "http";

const app: Application = express();
app.use(express.json()); //Selleks, et Express API-le saaks saata request bodys andmeid, peab kõigepealt olema Express API-s registreeritud app.json() middleware, mis tekitab express req-objekti sisse omakorda body objekti, mis sisaldab kliendist body-s kaasa saadetud JSON objekti (vastasel korral on req-objekti sees body lihtsalt ei ole)

// app.use(bodyParser.json());

const port: number = 3000;
const ok: number = 200;
const created: number = 201;
// const ok_no_content: number = 204;

const db = {
    "users": [
        {
            id: 1,
            firstName: 'Juku',
            lastName: 'Juurikas'
        },
        {
            id: 2,
            firstName: 'Mari',
            lastName: 'Maasikas'
        }
    ],
    "courses": [
        {
            id: 1,
            name: "Liikluskorraldus1"
        },
        {
            id: 2,
            name: "Rakendusinformaatika2"
        },
        {
            id: 3,
            name: "Käsitöö1"
        }
    ],
    "subjects": [
        {
            id: 1,
            name: "Erialane inglise keel",
            EAP: 6
        },
        {
            id: 2,
            name: "Programmeerimine",
            EAP: 3
        },
        {
            id: 3,
            name: "IT ja Õigus",
            EAP: 4
        }
    ],
    "teachers": [
        {
            id: 1,
            name: "Mari Kuli"
        },
        {
            id: 2,
            name: "Laura Hein"
        },
        {
            id: 3,
            name: "Martti Raavel"
        }
    ],
    "rooms": [
        {
            id: 1,
            name: "Arvutiklass 203"
        },
        {
            id: 2,
            name: "Auditoorium 307"
        }
    ],
    "lessons": [
        {
            id: 1,
            start_time: null,
            end_time: null,
            course_id: 2,
            subject_id: 1,
            teacher_id: 1,
            room_id: 1,
            comment: null
        },
        {
            id: 2,
            start_time: null,
            end_time: null,
            course_id: 2,
            subject_id: 3,
            teacher_id: 3,
            room_id: 2,
            comment: null
        }
    ]
};

app.get('/ping', (req: Request, res: Response) => { // jutumärkide vahel on teekond, millel app GET päringut ootab; võime lisada alamkausta nt /ping
    res.status(ok).json({
        message: 'Hello world!',
    });
});

// USERS ENDPOINTS - TEST
app.get('/users', (req: Request, res: Response) => {

    res.status(ok).json({
        users: db.users
    });
});

app.get('/users/:id', (req: Request, res: Response) => {
    // console.log(req.params);
    const id: number = parseInt(req.params.id); // siin ei kasuta Objekti destruktureerist, kuna tahan numbrit, mitte stringi
    const user = db.users.find((element) => element.id === id);
    res.status(ok).json({
        // users: id,
        user
    });
});

app.post('/users', (req: Request, res: Response ) => {
    // console.log(req.method);
    // const firstName = req.body.firstName;
    const { firstName, lastName } = req.body; // Objekti destruktureerimine: otsin req.body seest sama nimega muutujat ja määran selle sama nimega muutujale
    const id = db.users.length + 1;

    db.users.push({
        id,
        firstName,
        lastName
    });

    // console.log(req.body);
    // console.log(firstName, lastName);
    res.status(created).json({
        //message: "post users",
        id
    })
});

// COURSES ENDPOINTS with comments
app.get('/courses', (req: Request, res: Response) => {
    res.status(ok).json({
        courses: db.courses
    });
});

app.get('/courses/:id', (req: Request, res: Response) => {
    // console.log(req.params);
    const id: number = parseInt(req.params.id); // siin ei kasuta Objekti destruktureerist, kuna tahan numbrit, mitte stringi
    const course = db.courses.find((element) => element.id === id);
    res.status(ok).json({
        // users: id,
        course
    });
});

app.post('/courses', (req: Request, res: Response) => {
    // console.log(req.method);
    // console.log(typeof(db.courses.length));
    const { name } = req.body;
    const id = db.courses[db.courses.length - 1].id + 1;

    // console.log(id);
    db.courses.push({
        id,
        name
    });
    res.status(created).json({
        id
    })
});

app.put('/courses/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const name: string = req.body.name;

    const course_put = db.courses.find((element, i) => {
        // element – current element in the array.
        // i=index (optional) – index of the current element in the array
        if (element.id === id) {
            db.courses[i] = { id: id, name: name };
            return true; // stop searching
        }
    });
    const course = db.courses.find((element) => element.id === id);
    // let obj = arr.find(o => o.name === 'string 1');

    res.status(ok).json({
        course
    });
});

app.delete('/courses/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    var index = db.courses.findIndex(function(element){
        return element.id === id;
    })
    if (index !== -1) db.courses.splice(index, 1);

    // console.log(db.courses);
    var text = 'deleted';
   
    res.status(ok).json({
        id,
        text
    });
});

// SUBJECTS ENDPOINTS
app.get('/subjects', (req: Request, res: Response) => {
    res.status(ok).json({
        subjects: db.subjects
    });
});

app.get('/subjects/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const subject = db.subjects.find((element) => element.id === id);
    res.status(ok).json({
        subject
    });
});

app.post('/subjects', (req: Request, res: Response) => {
    const { name, EAP } = req.body;
    const id = db.subjects[db.subjects.length - 1].id + 1;

    db.subjects.push({
        id,
        name,
        EAP
    });
    res.status(created).json({
        id
    })
});

app.put('/subjects/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const { name, EAP } = req.body;

    const subject_put = db.subjects.find((element, i) => {
        // element – current element in the array.
        // i=index (optional) – index of the current element in the array
        if (element.id === id) {
            db.subjects[i] = { id: id, name: name, EAP: EAP};
            return true; // stop searching
        }
    });
    const subject = db.subjects.find((element) => element.id === id);
    // let obj = arr.find(o => o.name === 'string 1');

    res.status(ok).json({
        subject
    });
});

app.delete('/subjects/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    var index = db.subjects.findIndex(function(element){
        return element.id === id;
    })
    if (index !== -1) db.subjects.splice(index, 1);

    var text = 'deleted';
   
    res.status(ok).json({
        id,
        text
    });
});

// TEACHERS ENDPOINTS
app.get('/teachers', (req: Request, res: Response) => {
    res.status(ok).json({
        teachers: db.teachers
    });
});

app.get('/teachers/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const teacher = db.teachers.find((element) => element.id === id);
    res.status(ok).json({
        teacher
    });
});

app.post('/teachers', (req: Request, res: Response) => {
    const { name } = req.body;
    const id = db.teachers[db.teachers.length - 1].id + 1;

    db.teachers.push({
        id,
        name
    });
    res.status(created).json({
        id
    })
});

app.put('/teachers/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const name: string = req.body.name;

    const teacher_put = db.teachers.find((element, i) => {
        // element – current element in the array.
        // i=index (optional) – index of the current element in the array
        if (element.id === id) {
            db.teachers[i] = { id: id, name: name };
            return true; // stop searching
        }
    });
    const teacher = db.teachers.find((element) => element.id === id);
    // let obj = arr.find(o => o.name === 'string 1');

    res.status(ok).json({
        teacher
    });
});

app.delete('/teachers/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    var index = db.teachers.findIndex(function(element){
        return element.id === id;
    })
    if (index !== -1) db.teachers.splice(index, 1);

    var text = 'deleted';
   
    res.status(ok).json({
        id,
        text
    });
});

// ROOMS ENDPOINTS
app.get('/rooms', (req: Request, res: Response) => {
    res.status(ok).json({
        rooms: db.rooms
    });
});

app.get('/rooms/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const room = db.rooms.find((element) => element.id === id);
    res.status(ok).json({
        room
    });
});

app.post('/rooms', (req: Request, res: Response) => {
    const { name } = req.body;
    const id = db.rooms[db.rooms.length - 1].id + 1;

    db.rooms.push({
        id,
        name
    });
    res.status(created).json({
        id
    })
});

app.put('/rooms/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const name: string = req.body.name;

    const room_put = db.rooms.find((element, i) => {
        // element – current element in the array.
        // i=index (optional) – index of the current element in the array
        if (element.id === id) {
            db.rooms[i] = { id: id, name: name };
            return true; // stop searching
        }
    });
    const room = db.rooms.find((element) => element.id === id);
    // let obj = arr.find(o => o.name === 'string 1');

    res.status(ok).json({
        room
    });
});

app.delete('/rooms/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    var index = db.rooms.findIndex(function(element){
        return element.id === id;
    })
    if (index !== -1) db.rooms.splice(index, 1);

    var text = 'deleted';
   
    res.status(ok).json({
        id,
        text
    });
});

// LESSONS ENDPOINTS
app.get('/lessons', (req: Request, res: Response) => {

    function get_lessons() {
        const lesson_json = [];

        for (let i = 0; i < db.lessons.length; i++) {
            const lesson_info = db.lessons[i];

            const id = lesson_info?.id;
            const start_time = lesson_info?.start_time;
            const end_time = lesson_info?.end_time;
            const course_id = lesson_info?.course_id;
            const subject_id = lesson_info?.subject_id;
            const teacher_id = lesson_info?.teacher_id;
            const room_id = lesson_info?.room_id;
            const comment = lesson_info?.comment;

            const course = db.courses.find((element) => element.id === course_id) || null;
            const subject = db.subjects.find((element) => element.id === subject_id) || null;
            const teacher = db.teachers.find((element) => element.id === teacher_id) || null;
            const room = db.rooms.find((element) => element.id === room_id) || null;

            lesson_json.push({
                id: id,
                start_time: start_time,
                end_time: end_time,
                course: course,
                subject: subject,
                teacher: teacher,
                room: room,
                comment: comment
            });
        };
        return (lesson_json);
    };
    console.log(get_lessons());

    res.status(ok).json({
        lessons: get_lessons()
    });
});

app.get('/lessons/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const lesson_info = db.lessons.find((element) => element.id === id);

    const start_time = lesson_info?.start_time;
    const end_time = lesson_info?.end_time;
    const course_id = lesson_info?.course_id;
    const subject_id = lesson_info?.subject_id;
    const teacher_id = lesson_info?.teacher_id;
    const room_id = lesson_info?.room_id;
    const comment = lesson_info?.comment;

    const course = db.courses.find((element) => element.id === course_id);
    const subject = db.subjects.find((element) => element.id === subject_id);
    const teacher = db.teachers.find((element) => element.id === teacher_id);
    const room = db.rooms.find((element) => element.id === room_id);

    console.log(lesson_info);
    
    res.status(ok).json({
        lesson: id,
        start_time: start_time,
        end_time: end_time,
        course: course,
        subject: subject,
        teacher: teacher,
        room_id: room,
        comment: comment
    }); 
});

app.post('/lessons', (req: Request, res: Response) => {

    console.log(req.body);
    const start_time = req.body.start_time || null;
    const end_time = req.body.end_time || null;
    const course_id: number = req.body.course_id || null;
    const subject_id: number = req.body.subject_id || null;
    const teacher_id: number = req.body.teacher_id || null;
    const room_id = req.body.room_id || null;
    const comment = req.body.comment || null;

    const id = db.lessons[db.lessons.length - 1].id + 1;

    db.lessons.push({
        id,
        start_time,
        end_time,
        course_id,
        subject_id,
        teacher_id,
        room_id,
        comment
    });

    res.status(created).json({
        id
    })
});

app.put('/lessons/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log(req.body);

    db.lessons.find((element, i) => {

        if (element.id === id) {
            const target = db.lessons[i];
            const source = req.body;
            const newObj = Object.assign({}, target, source);
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
            // Note: Object.assign() does not throw on null or undefined sources.
            // console.log(newObj);

            db.lessons[i] = newObj;
            
            return true; // stop searching
        };
    });
    const lesson = db.lessons.find((element) => element.id === id);

    res.status(ok).json({
        lesson
    });
});

app.delete('/lessons/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    var index = db.lessons.findIndex(function(element){
        return element.id === id;
    })
    if (index !== -1) db.lessons.splice(index, 1);

    var text = 'deleted';
   
    res.status(ok).json({
        id,
        text
    });
});

app.listen(port, () => {
    console.log('Server is running');
});