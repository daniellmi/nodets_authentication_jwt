import mongoose, { Connection, mongo, Mongoose, Schema } from 'mongoose'

class DbConnection {

    protected connection: Mongoose;

    public constructor() {
        this.connection = mongoose;
    }

    public async dbconnection() {
        await this.connection.connect("mongodb://localhost:27017/user", {
            serverSelectionTimeoutMS: 5000
        })
            .then(() => { console.log("database connected") })
            .catch(error => console.log("connection error", error));

    }

}
export default DbConnection;