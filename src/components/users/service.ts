import db from '../../db';
import hashService from '../general/services/hashService';
import { NewUser, User, UpdateUser } from './interface';

const usersService = {
  getAllUsers: (): User[] => {
    const { users } = db;
    return users;
  },
  getUserById: (id: number): User | undefined => {
    const user = db.users.find((element) => element.id === id);
    return user;
  },
  getUserByEmail: (email: string): User | undefined => {
    const user = db.users.find((element) => element.email === email);
    return user;
  },
  createUser: async (newUser: NewUser): Promise<number> => {
    const id = db.users.length + 1;
    const hashedPassword = await hashService.hash(newUser.password);
    db.users.push({
      id,
      ...newUser, // objekti destruktureerimine
      password: hashedPassword,
    });
    return id;
  },
  updateUser: (updateUser: UpdateUser): boolean => {
    const {
      id, firstName, lastName, email, password, role,
    } = updateUser;
    const index = db.users.findIndex((element) => element.id === id);
    if (firstName) {
      db.users[index].firstName = firstName;
    }
    if (lastName) {
      db.users[index].lastName = lastName;
    }
    if (email) {
      db.users[index].email = email;
    }
    if (password) {
      db.users[index].password = password;
    }
    if (role) {
      db.users[index].role = role;
    }
    return true;
  },
  removeUser: (id: number): boolean => {
    const index = db.users.findIndex((element) => element.id === id);
    db.users.splice(index, 1);
    return true;
  },
};

export default usersService;
