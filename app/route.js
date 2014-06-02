
module.exports = function(app) {

  app.use('/', require('./controllers/home'));
  app.use('/user', require('./controllers/user'));
};
