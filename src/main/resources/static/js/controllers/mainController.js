(function(){
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['UserService', 'CookieService', '$location', '$route'];

  function MainController(UserService, CookieService, $location, $route) {

    var self = this;
    self.init = init; 
    self.checkUser = checkUser;
    self.removeUser = removeUser;
    self.getUser = getUser;
    self.getImage = getImage;
    self.setImage = setImage;

    self.themes = [
      { name: 'Cerulean', url: 'cerulean' },
      { name: 'Cosmo', url: 'cosmo' },
      { name: 'Cyborg', url: 'cyborg' },
      { name: 'Darkly', url: 'darkly' },
      { name: 'Flatly', url: 'flatly' },
      { name: 'Journal', url: 'journal' },
      { name: 'Lumen', url: 'lumen' },
      { name: 'Paper', url: 'paper' },
      { name: 'Readable', url: 'readable' },
      { name: 'Sandstone', url: 'sandstone' },
      { name: 'Simplex', url: 'simplex' },
      { name: 'Slate', url: 'slate' },
      { name: 'Solar', url: 'solar' },
      { name: 'Spacelab', url: 'spacelab' },
      { name: 'Superhero', url: 'superhero' },
      { name: 'United', url: 'united' },
      { name: 'Yeti', url: 'yeti' }
    ];

    self.theme = self.themes[4];
    self.$location = $location;

    init();

    function init() {
      getUser();
    }

    function getImage() {
      return self.imageUrl;
    }
    
    function setImage(image) {
      self.imageUrl = image;
    }

    function checkUser() {
      if(self.user) {
          return self.user;
      }
    }

    function getUser() {
      self.user = UserService.getUser();

      if(!self.user && UserService.checkUserCookies()) {
        console.log('User not found, cookies found');
        var credentials = {};
        credentials.username = CookieService.getCookie('username');
        credentials.password = CookieService.getCookie('password');

        UserService.login(credentials, true)
          .then(
          function(response){
            self.user = response;
            console.log('Logged in ' + self.user.username + ' from cookies');
            $route.reload();
          },
          function(error){
            console.log(error);
            alert(error);					
          });
      }
      else if(!self.user && !UserService.checkUserCookies()) {
        console.log('User not found, cookies not found');
      }

      if(self.user) {
        console.log('User found');
        
        self.unreadNotifications = 0;

        for(i = 0; i < self.user.notifications.length; i++) {
          if(!self.user.notifications[i].isRead) {
            self.unreadNotifications++;
          }
        }

        setImage(self.user.imageUrl);
      }
    }

    function removeUser() {
      UserService.removeUser();
      delete self.user;
      $location.path('/');
    }

  }
})();