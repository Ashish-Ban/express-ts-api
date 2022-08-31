"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.createUserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Http400_1 = __importDefault(require("../exceptions/Http400"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    uid: { type: Number, required: true }
});
function createUserModel(connection) {
    return connection.model('users', userSchema);
}
exports.createUserModel = createUserModel;
class Users {
    static _model;
    static _db;
    static setDb(db) {
        this._db = db;
        this._model = createUserModel(this._db);
    }
    static getAllUsers() {
        return new Promise((resolve, reject) => {
            this._model.find().then((users) => {
                return resolve(users);
            }).catch(err => reject(err));
        });
    }
    static async getUserById(uid) {
        const user = await this._model.findOne({ uid }).exec();
        return user;
    }
    static async getUserByUsername(username) {
        const user = await this._model.findOne({ username }).exec();
        return user;
    }
    static async getUserByCredentials(username, password) {
        return await this._model.findOne({ username, password }).exec();
    }
    static async findMaxUid() {
        const result = await this._model.aggregate([
            {
                $project: {
                    uid: {
                        $max: "$uid"
                    }
                }
            }
        ]).sort("-uid");
        return result.length ? Number(result[0].uid) + 1 : 0;
    }
    static async addUsers(username, password) {
        console.log(`Add Users : ${username} Password :${password}`);
        const oldUser = await this.getUserByUsername(username);
        if (oldUser) {
            throw new Http400_1.default("Username Already exists");
        }
        const uid = await this.findMaxUid();
        console.log("MAX UID : ", uid);
        await this._model.create({
            username: username,
            password: password,
            uid
        });
        const user = await this.getUserById(uid);
        return user;
    }
    static async updateUser(uid, data) {
        const user = await this._model.findOneAndUpdate({ uid: uid }, { ...data }, { new: true });
        return user;
    }
    static async deleteUser(uid) {
        return await this._model.deleteOne({ uid });
    }
}
exports.Users = Users;
//# sourceMappingURL=Users.js.map