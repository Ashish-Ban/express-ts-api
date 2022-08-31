import mongoose from "mongoose";

export interface IDbOptions {
    dbHost: string;
    dbPort: number | 27017;
    dbName: string;
}

export default class Db {
    private dbOptions!: IDbOptions;
    private connection!: mongoose.Connection;
    constructor(dbOptions: IDbOptions) {
        this.dbOptions = dbOptions;
        this.setUpDb();
        console.log("Db Class created !");
    }

    private getUriString = () => {
        return `mongodb://${this.dbOptions.dbHost}:${this.dbOptions.dbPort}/${this.dbOptions.dbName}`;
    }

    private setUpDb = () => {
        try {
            this.connection = mongoose.createConnection(this.getUriString());
        } catch (error) {
            console.log(`Failed to connect database, options: ${JSON.stringify(this.dbOptions)}`)
            throw error;
        }
    }

    public getConnection = () => {
        if (this.connection.readyState !== 1) {
            this.connection.destroy();
            this.setUpDb();
        }
        return this.connection;
    }
}