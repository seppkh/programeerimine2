// console.log('Hello world!');

import express, { Request, Response, Application } from "express";
import { request } from "http";

const app: Application = express();
app.use(express.json());
// const body = app.use();

const port: number = 3000;
const ok: number = 200;
const created: number = 201;

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
        lastName: 'Maasikas'}
    ]
};

app.get('/ping', (req: Request, res: Response) => { // jutumärkide vahel on teekond, millel app GET päringut ootab; võime lisada alamkausta nt /ping
    res.status(ok).json({
        message: 'Hello world!',
    });
}); //localhost:3000/ping GET

app.get('/users', (req: Request, res: Response) => { // jutumärkide vahel on teekond, millel app GET päringut ootab; võime lisada alamkausta nt /ping
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

app.listen(port, () => {
    console.log('Server is running');
});