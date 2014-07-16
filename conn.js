/**
 * Created by Administrator on 14-7-14.
 */
var mysql = require('mysql');
    //settings = require('../settings');

module.exports.createConnection = function (ds) {
    if ((module.exports.connection) && (module.exports.connection._socket)
        && (module.exports.connection._socket.readable)
        && (module.exports.connection._socket.writable)) {
        return module.exports.connection;
    }
    console.log(((module.exports.connection) ?
        "UNHEALTHY SQL CONNECTION; RE" : "") + "CONNECTING TO SQL.");
    if(!ds)ds={
        host:'localhost',
        port:3310,
        user:'root',
        database:'wenku_spider',
        password:'srttest',
        charset: "utf8"
    };
    var connection = mysql.createConnection(ds);
    connection.connect(function (err) {
        if (err) {
            console.log("SQL CONNECT ERROR: " + err);
        } else {
            console.log("SQL CONNECT SUCCESSFUL.");
        }
    });
    connection.on("close", function (err) {
        console.log("SQL CONNECTION CLOSED.");
    });
    connection.on("error", function (err) {
        console.log("SQL CONNECTION ERROR: " + err);
    });
    module.exports.connection = connection;
    return module.exports.connection;
};

// Open a connection automatically at app startup.
module.exports.createConnection();
// If you've saved this file as database.js, then get and use the
// connection as in the following example:
// var database = require(__dirname + "/database");
// var connection = database.getConnection();
// connection.query(query, function(err, results) { ....
