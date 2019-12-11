"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compression = require("compression");
const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const MySql_1 = require("./mysql/MySql");
const any_route_1 = require("./routes/any_route");
const example_route_1 = require("./routes/example_route");
const index_route_1 = require("./routes/index_route");
const app = express();
app.listen(80);
app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: 'eaO1LJRfcOZEiXMs',
    store: MySql_1.MySQL.sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
// initialize session variables
app.use((req, res, next) => {
    req.session.exampleUserName = 'bob';
    next();
});
// example
app.use((req, res, next) => {
    // req obj is the same in all middleware functions and route handlers
    console.log(req.session.exampleUserName);
    next();
});
app.get('/', index_route_1.index_route_get);
app.get('/example', example_route_1.example_route_get).post('/example', example_route_1.example_route_post);
app.get('*', any_route_1.any_route_get);
//# sourceMappingURL=KnowledgeKnockout.js.map