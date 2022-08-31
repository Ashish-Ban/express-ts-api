"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../models/Users");
class UserRepository {
    _db;
    _users = Users_1.Users;
    constructor(db) {
        this._db = db;
        this._users.setDb(db.getConnection());
    }
    async getAllUsers() {
        return this._users.getAllUsers();
    }
    async getUser(uid) {
        // Async version instead of promise version
        try {
            const user = await this._users.getUserById(uid);
            console.log("user : ", JSON.stringify(user));
            return user;
        }
        catch (error) {
            console.error("UserRepository.js -> getUser Error : " + error?.message);
            throw error;
        }
    }
    async getUserByCredentials(username, password) {
        try {
            return await this._users.getUserByCredentials(username, password);
        }
        catch (error) {
            console.error("UserRepository.js -> getUserByCredentials Error : " + error?.message);
            throw error;
        }
    }
    async createUser(username, password) {
        try {
            return this._users.addUsers(username, password);
        }
        catch (error) {
            console.error("UserRepository.js -> createUser Error : " + error?.message);
            throw error;
        }
    }
    async updateUser(uid, data) {
        return this._users.updateUser(uid, data);
    }
    async deleteUser(uid) {
        try {
            return this._users.deleteUser(uid);
        }
        catch (error) {
            console.error("UserRepository.js -> deleteUser" + error?.message);
            throw error;
        }
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map