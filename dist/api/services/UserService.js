"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
class UserService {
    service_name = 'USER_SERVICE';
    userRepo;
    constructor(db) {
        this.userRepo = new UserRepository_1.default(db);
    }
    getServiceName() {
        return this.service_name;
    }
    getUsers = () => {
        return this.userRepo.getAllUsers();
    };
    getUserById = (uid) => {
        return this.userRepo.getUser(uid);
    };
    getUserByCredentials = (username, password) => {
        return this.userRepo.getUserByCredentials(username, password);
    };
    createUser = (username, password) => {
        return this.userRepo.createUser(username, password);
    };
    updateUser = (uid, data) => {
        return this.userRepo.updateUser(uid, data);
    };
    deleteUser = (uid) => {
        return this.userRepo.deleteUser(uid);
    };
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map