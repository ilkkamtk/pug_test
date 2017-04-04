'use strict';

const config = require('./config');

const express = require('express');
const DB = require('./modules/database');

const app = express();

app.set('view engine', 'pug');

// connect to DB
const dbPromise = new Promise(
    (resolve, reject) => {
        DB.connect('mongodb://'+config.user+':'+config.pwd+'@localhost/alakerta', resolve, reject)
    });

dbPromise.then((msg) => {
    console.log(msg);
    app.listen(3000);
}).catch((reason) => {
    console.log(reason);
});
// end connect to DB


const catSchema = {
    name: String,
    age: Number,
    gender: {
        type: 'String',
        enum: ['male', 'female']
    },
    color: String,
    weight: Number
};

const Cat = DB.getSchema('Cat', catSchema);


app.get('/', function (req, res) {
    let cats = [];
    Cat.find().exec().then((posts) => {
        cats = posts
    });
    res.render('index', { title: 'Hey', cats: cats })
});