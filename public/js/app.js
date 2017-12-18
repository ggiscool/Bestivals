const app = angular.module('BestivalsApp', []);
//---------------------------
app.controller('MainController',['$http', function($http) {
//---------------------------
  this.test = "It works!";
  this.createForm = {}
  this.festival = '';
//---------------------------

//CREATE ROUTE
this.createFestival = () => {
  console.log('submit button calls this fxn');
  $http({
    method : 'POST',
    url : '/festivals',
    data : this.createForm
  }).then( response => {
    this.festivals.push(response.data);
    this.createForm = {};
}, error => {
  console.error( error );
}).catch (err => console.log('Catch: ', err));
}

//GET ROUTE - FESTIVALS
this.getFestivals = () => {
  $http({
    method : 'GET',
    url : '/festivals'
  }).then ( response => {
    this.festivals = response.data;
    // this.festival = this.festivals;
    // console.table(this.festivals);
    // console.log(this.festivals);
  }, error => {
    console.error(error.message);
  }).catch(err => console.error ( 'Catch:', err))
}
this.getFestivals();

//GET ROUTE - COMMENTS
this.getComments = () => {
  $http({
    method : 'GET',
    url : '/comments'
  }).then ( response => {
    this.comments = response.data;
    // this.festival = this.festivals;
    console.table(this.comments);
    console.log(this.comments);
  }, error => {
    console.error(error.message);
  }).catch(err => console.error ( 'Catch:', err))
}

//DELETE ROUTE
this.deleteFestival = (id) => {
  console.log("I'm going to delete you!");
  $http({
    method : 'DELETE',
    url : '/festivals/' + id
  }).then( response => {
    // console.table(response.data);
    const removeByIndex = this.festivals.findIndex(festival => festival._id ===id);
    this.festivals.splice(removeByIndex, 1);
    console.log('this is the array index number of the festival i want to delete', removeByIndex);
  }, error =>{ console.error (error.message)
  }).catch(err => console.error ('Catch: ', err));
}

//ONE FESTIVAL
this.chooseOneFest = (festival) => {
  this.festival = festival;
  console.log(this.festival.name);
}

// //UPDATE ROUTE
// this.updateFest = (festival) => {
//   $http({
//     method : 'PUT',
//     url : '/festivals/' + festival._id,
//   }).then ( response => {
//     console.log(response.data);
//   }, error => {
//     console.log(error.message);
//   }).catch ( err => console.error ('Catch:', err))
// }

//REGISTRATION
this.registerUser = () => {
  $http({
    url: '/users', method: 'POST', data: this.registerForm })
   .then(response => {
     console.log('Registered!');
     this.user = response.data;
   }, ex => {
     console.log(ex.data.err);
     this.error = ex.statusText;
   })
   .catch(err => this.error = "Something's wrong" );
};

//LOGIN
this.loginUser = () => {
  $http({
  url: '/sessions/login',
  method: 'post',
  data: this.loginForm })
      .then(response =>  {
        console.log('Logged in!');
        this.user = response.data.user;
        console.log(this.user);
      }, ex => {
        console.log(ex.data.err);
        this.error = ex.statusText;
      })
      .catch(err => this.error = "Something's wrong" );
};

//LOGOUT
this.logout = () => {
  $http({
    url: '/sessions/logout',
    method: "delete"
  }).then(response => {
    console.log("Logout successful");
    this.user = {};
  }, ex => {
    console.error(ex.data.err);
    this.error = ex.statusText;
  }).catch(err => this.error = "Something's wrong");
};
}]);
