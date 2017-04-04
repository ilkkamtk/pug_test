'use strict';

class Database {
    constructor() {
        this.mongoose = require('mongoose');
        this.mongoose.Promise = global.Promise; //ES6 Promise
    };

    connect(url, resolve, reject) {
        this.url = url;
        this.mongoose.connect(this.url).then(() => {
            resolve('Connected to Mongo');
        }, (err) => {
            reject('Connecting to Mongo failed: '+ err.message);
        });
    };

    getSchema(name, schema) {
        const s = new this.mongoose.Schema(schema);
        return this.mongoose.model(name, s);
    }
}
module.exports = new Database();