// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
    
    $scope.status = "Searching...";
    $scope.numberOfGuests = Dinner.getNumberOfGuests();

   Dinner.Dish.get({id:$routeParams.dishId},function(data){
     $scope.dish=data;
     $scope.Ingredients = $scope.dish.Ingredients;
     $scope.dishPrice = Dinner.getTotalDishPrice($scope.Ingredients);
   },function(data){
     $scope.status = "There was an error";
   });

    $scope.addMenu = function(dishID){
     Dinner.addDishToMenu(dishID);
    }

});