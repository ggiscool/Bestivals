const app = angular.module('BestivalsApp', []);
//---------------------------

app.controller('MainController',['$http', function($http) {
//---------------------------
  this.test = "It works!";
  this.createForm = {}
  this.festival = '';
//---------------------------

//CREATE Route
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

//GET route
this.getFestivals = () => {
  $http({
    method : 'GET',
    url : '/festivals'
  }).then ( response => {
    this.festivals = response.data;
    // this.festival = this.festivals;
    console.table(this.festivals);
    console.log(this.festivals);
  }, error => {
    console.error(error.message);
  }).catch(err => console.error ( 'Catch:', err))
}

//load immediately on page load
this.getFestivals();


//delete festivals -- SHOULD WE DELTE COMMENTS INSTEAD******
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

//select one festival
this.chooseOneFest = (festival) => {
  this.festival = festival;
  console.log(this.festival.name);
}

// //likes - UPDATE route??
// this.likeFest = (festival) => {
//   festival.likes ++;
//
//   $http({
//     method : 'PUT',
//     url : '/festivals/' + festival._id,
//     data : {likes : festival.likes}
//   }).then ( response => {
//     console.log(response.data.likes);
//   }, error => {
//     console.log(error.message);
//   }).catch ( err => console.error ('Catch:', err))
// }



}]);

//
// });
