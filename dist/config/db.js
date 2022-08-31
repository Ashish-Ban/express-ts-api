"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Db {
    dbOptions;
    connection;
    constructor(dbOptions) {
        this.dbOptions = dbOptions;
        this.setUpDb();
        console.log("Db Class created !");
    }
    getUriString = () => {
        return `mongodb://${this.dbOptions.dbHost}:${this.dbOptions.dbPort}/${this.dbOptions.dbName}`;
    };
    setUpDb = () => {
        try {
            this.connection = mongoose_1.default.createConnection(this.getUriString());
        }
        catch (error) {
            console.log(`Failed to connect database, options: ${JSON.stringify(this.dbOptions)}`);
            throw error;
        }
    };
    getConnection = () => {
        if (this.connection.readyState !== 1) {
            this.connection.destroy();
            this.setUpDb();
        }
        return this.connection;
    };
}
exports.default = Db;
//# sourceMappingURL=db.js.map