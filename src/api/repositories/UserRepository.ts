import Db from "../../config/db";
import { IUsers, Users } from "../models/Users";

export default class UserRepository {
    private _db!: Db;
    private _users = Users;
    constructor(db: any) {
        this._db = db;
        this._users.setDb(db.getConnection());
    }

    async getAllUsers(): Promise<Array<IUsers> | null> {
        return this._users.getAllUsers();
    }

    async getUser(uid: number): Promise<IUsers | null> {
        // Async version instead of promise version
        try {
            const user = await this._users.getUserById(uid)
            console.log("user : ", JSON.stringify(user));
            return user
        } catch (error: any) {
            console.error("UserRepository.js -> getUser Error : " + error?.message);
            throw error
        }
    }

    async getUserByCredentials(username: string, password: string): Promise<IUsers | null> {
        try {
            return await this._users.getUserByCredentials(username, password)
        } catch (error: any) {
            console.error("UserRepository.js -> getUserByCredentials Error : " + error?.message);
            throw error
        }
    }

    async createUser(username: string, password: string) {
        try {
            return this._users.addUsers(username, password)
        } catch (error: any) {
            console.error("UserRepository.js -> createUser Error : " + error?.message)
            throw error;
        }
    }

    async updateUser(uid: number, data: Partial<IUsers>) {
        return this._users.updateUser(uid, data)
    }

    async deleteUser(uid: number) {
        try {
            return this._users.deleteUser(uid)
        } catch (error: any) {
            console.error("UserRepository.js -> deleteUser" + error?.message);
            throw error;
        }
    }
}