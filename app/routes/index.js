module.exports = (app) => {
    require('./users.routes')(app);
    require('./markets.routes')(app);
};