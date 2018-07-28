const mongoose = require("mongoose");

const url = 'mongodb://localhost:';
const PORT = 27017;
const dbName = '/bumarble';

/**
 * 몽고디비와 connection
 * @returns {function(*, *, *): *}
 */
const connection = () => {
    mongoose.connect(url + PORT + dbName);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('connection open') );

    return (req, res, next) => next();
};

module.exports = {
    connection
}