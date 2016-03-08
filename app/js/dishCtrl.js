// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  //console.log($routeParams.dish);
  //$scope.dishView = function() {
    //var dishID = $routeParams;
    //console.log($routeParams.dishId);
    
    $scope.status = "Searching...";
   Dinner.Dish.get({id:$routeParams.dishId},function(data){
     $scope.dish=data;
     $scope.Ingredients = $scope.dish.Ingredients;
     $scope.people = Dinner.getNumberOfGuests();
     console.log($scope.dish);
     //$scope.status = "Showing " + data.Results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });

    $scope.addMenu = function(dishID){
     Dinner.addDishToMenu();
    }

});