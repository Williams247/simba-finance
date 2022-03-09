const app = require("express").Router();

// User routes
app.use(require("./auth/user"));
app.use(require("./customer/profile"));
app.use(require("./customer/transactions"));
app.use(require("./customer/fund-account"));
app.use(require('./customer/send-money'));
app.use(require("./customer/find-customer"));
app.use(require("./customer/balances"));

module.exports = app;
