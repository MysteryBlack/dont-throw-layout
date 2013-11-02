app.service('UserSvc', [
  '$rootScope', function($rootScope) {
    var res, user_data;
    user_data = {
      name: null,
      status: 'logout',
      is_admin: null,
      usr_id: null,
      usr_home: null,
      usr_email: null,
      sid: null
    };
    res = {
      count: 0
    };
    $.ajax({
      type: "GET",
      url: "/photo/api/user.php?a=login",
      cache: false,
      dataType: 'xml'
    }).done(function(res) {
      if ($('status', res).text() === '1') {
        user_data.name = $('usr_name', res).text();
        user_data.is_admin = $('is_admin', res).text();
        user_data.usr_id = $('usr_id', res).text();
        user_data.usr_home = $('usr_home', res).text();
        user_data.usr_email = $('usr_email', res).text();
        user_data.sid = $('sid', res).text();
        user_data.status = 'login';
      } else {
        user_data.status = 'logout';
      }
      if (!$rootScope.$$phase) {
        return $rootScope.$apply();
      }
    });
    this.login = function(user, pwd) {
      var login_action;
      res.count = 0;
      user_data.status = 'logging';
      return (login_action = function() {
        return $.ajax({
          type: "GET",
          url: "/photo/api/user.php?a=login",
          cache: false,
          data: {
            u: user,
            p: ezEncode(pwd)
          },
          dataType: 'xml'
        }).done(function(res) {
          if ($('status', res).text() === '1') {
            user_data.status = 'login';
            user_data.name = $('usr_name', res).text();
            user_data.is_admin = $('is_admin', res).text();
            user_data.usr_id = $('usr_id', res).text();
            user_data.usr_home = $('usr_home', res).text();
            user_data.usr_email = $('usr_email', res).text();
            user_data.sid = $('sid', res).text();
          } else {
            user_data.status = 'failed';
            user_data.is_admin = null;
            user_data.usr_id = null;
            user_data.usr_home = null;
            user_data.usr_email = null;
            user_data.sid = null;
          }
          if (!$rootScope.$$phase) {
            return $rootScope.$apply();
          }
        }).error(function(res) {
          res.count++;
          if (res.count < 5) {
            return setTimout(login_action, 1000 * res.count);
          } else {
            user_data.status = 'disconnection';
            user_data.is_admin = null;
            user_data.usr_id = null;
            user_data.usr_home = null;
            user_data.usr_email = null;
            return user_data.sid = null;
          }
        });
      })();
    };
    this.info = function() {
      return user_data;
    };
    this.sid = function() {
      return user_data.sid;
    };
    return this.status = function() {
      return user_data.status;
    };
  }
]);

/*
//@ sourceMappingURL=user_svc.js.map
*/