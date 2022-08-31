import mongoose from 'mongoose';
import Http400 from '../exceptions/Http400';

export interface IUsersSchema {
    username: string;
    password: string;
    uid: number;
}

export interface IUsers extends mongoose.Document {
    username: string;
    password: string;
    uid: number;
}

const userSchema = new mongoose.Schema<IUsersSchema>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    uid: { type: Number, required: true }
})

export function createUserModel(connection: mongoose.Connection) {
    return connection.model<IUsers>('users', userSchema)
}

export class Users {
    private static _model: mongoose.Model<IUsers>;
    private static _db: mongoose.Connection;

    static setDb(db: mongoose.Connection) {
        this._db = db;
        this._model = createUserModel(this._db)
    }

    static getAllUsers(): Promise<Array<IUsers> | null> {
        return new Promise((resolve, reject) => {
            this._model.find().then((users) => {
                return resolve(users);
            }).catch(err => reject(err))
        })
    }

    static async getUserById(uid: number): Promise<IUsers | null> {
        const user = await this._model.findOne({ uid }).exec()
        return user;
    }

    static async getUserByUsername(username: string): Promise<IUsers | null> {
        const user = await this._model.findOne({ username }).exec()
        return user;
    }

    static async getUserByCredentials(username: string, password: string): Promise<IUsers | null> {
        return await this._model.findOne({ username, password }).exec()
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
        ]).sort("-uid")
        return result.length ? Number(result[0].uid) + 1 : 0
    }

    static async addUsers(username: string, password: string) {
        console.log(`Add Users : ${username} Password :${password}`)
        const oldUser = await this.getUserByUsername(username);
        if (oldUser) {
            throw new Http400("Username Already exists");
        }
        const uid = await this.findMaxUid();
        console.log("MAX UID : ", uid);
        await this._model.create({
            username: username,
            password: password,
            uid
        })
        const user = await this.getUserById(uid);
        return user
    }

    static async updateUser(uid: number, data: Partial<IUsers>) {
        const user = await this._model.findOneAndUpdate({ uid: uid }, { ...data }, { new: true });
        return user;
    }

    static async deleteUser(uid: number) {
        return await this._model.deleteOne({ uid })
    }
}