import Db from "../../config/db";
import { IServices } from "../interfaces/services";
import { IUsers } from "../models/Users";
import UserRepository from "../repositories/UserRepository";

export default class UserService implements IServices {
    service_name: string = 'USER_SERVICE';
    userRepo !: UserRepository;
    constructor(db: Db) {
        this.userRepo = new UserRepository(db);
    }

    public getServiceName(): string {
        return this.service_name;
    }

    public getUsers = () => {
        return this.userRepo.getAllUsers();
    }

    public getUserById = (uid: number) => {
        return this.userRepo.getUser(uid);
    }

    public getUserByCredentials = (username: string, password: string) => {
        return this.userRepo.getUserByCredentials(username, password)
    }

    public createUser = (username: string, password: string) => {
        return this.userRepo.createUser(username, password);
    }

    public updateUser = (uid: number, data: Partial<IUsers>) => {
        return this.userRepo.updateUser(uid, data);
    }

    public deleteUser = (uid: number) => {
        return this.userRepo.deleteUser(uid);
    }
}