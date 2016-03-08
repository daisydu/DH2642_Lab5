// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  var numberOfGuest = 2;
  var menu = [];
  var pendingmenu = [];
  var dishType = '';
  var filter = '';
  var dishID;
  this.dish = [];
  this.dishes = [];  

  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }

  this.setDishID = function(id){
        dishID = id;
  }

  this.getDishID = function(){
    //console.log("get id"+dishID);
    return dishID;
  }

  this.setFilter = function(flt){
        filter = flt;
        //console.log("i am " + filter);
  }

  this.getFilter = function(){
        return filter;
  }

  this.getFullMenu = function() {
    //TODO Lab 2
    var dishesOnMenu = [];
    for (var i = 0; i < menu.length; i++) {
      dishesOnMenu.push(this.getLocalDish(menu[i]));

    };
    // console.log(dishesOnMenu);
        return dishesOnMenu;
  }

  var th = this;
  // var apiKey = "18f3cT02U9f6yRl3OKDpP8NA537kxYKu";
  // var apiKey = "XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN";
  // var apiKey = "3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4";
  // var apiKey = "8vtk7KykflO5IzB96kb0mpot0sU40096";
  // var apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6";
   var apiKey = "r02x0R09O76JMCMc4nuM0PJXawUHpBUL";
  // var apiKey = "H9n1zb6es492fj87OxDtZM9s5sb29rW3";

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:5,api_key: apiKey});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key: apiKey}); 
  dishes = this.DishSearch.get({});
  //console.log(dishes.Results);
  // dish = this.Dish.get({id:12345});
  //console.log(dish);
  this.Dish.get({id:12345},function(data){
    th.dish=data;
    //console.log(th.dish.Title);
    });

    this.DishSearch.get({title_kw:"main"},function(data){
    th.dishes = data.Results;
    //console.log(th.dishes);
  });
  
  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});