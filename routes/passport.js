module.export = function(app, passport) {
  //PASSPORT.JS ROUTES
  app.get('/index', function(req,res) {
    res.render('index');
  });

  app.get('/login', function(req,res) {
    res.render('login');
  });

  app.get('/signup', function(res,req) {
    res.render('signup');
  });

  app.get('/logout', function(req,res) {
    req.logout();
    res.redirect('/index');
  });
  };
