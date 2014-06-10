module.exports = function(app) {

  app.use('/', require('./controllers/root'));
  app.use('/user', require('./controllers/user'));
  app.use('/oauth', require('./controllers/oauth'));
};
