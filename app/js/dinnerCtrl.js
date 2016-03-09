// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  // $scope.listAlldishes = Dinner.DishSearch;

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }
  
  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price
  $scope.menu = Dinner.getFullMenu();

  $scope.totalPrice = Dinner.getTotalMenuPrice();

  $scope.getTotalMenuPrice = function(){
    return Dinner.getTotalMenuPrice();
  }
  
  //$scope.pending = Dinner.getPending();
  //console.log($scope.pending);

  $scope.removeDishFromMenu = function(dishID){
    Dinner.removeDishFromMenu(dishID);

  }

  $scope.getPendingName = function(){
     return Dinner.getPendingName();
     //console.log("hi");
  }

  $scope.getPendingPrice = function(){
    return Dinner.getPendingPrice();
  }
});