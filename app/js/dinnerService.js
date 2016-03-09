// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource,$cookieStore) {
  
  var numberOfGuest = 2;
  var pendingmenu = [];
  var dishType = '';
  var filter = '';
  var dishID;
  var th = this;
  var num = 1;
  this.pending = [];
  this.dish = [];
  this.dishes = [];  
  this.menu = [];
  this.pending.Title = "pending";
  this.menuID = [];
   var apiKey = "18f3cT02U9f6yRl3OKDpP8NA537kxYKu";
  // var apiKey = "XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN";
  // var apiKey = "3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4";
  // var apiKey = "8vtk7KykflO5IzB96kb0mpot0sU40096";
  // var apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6";
  // var apiKey = "r02x0R09O76JMCMc4nuM0PJXawUHpBUL";
  // var apiKey = "H9n1zb6es492fj87OxDtZM9s5sb29rW3";

  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
    $cookieStore.put("numberOfGuest",num);
  }

  this.getNumberOfGuests = function() {
    return $cookieStore.get("numberOfGuest"); 
  }

  this.getTotalDishPrice = function(Ingredients){
    var guestNum = this.getNumberOfGuests();
    var dishIngre = Ingredients;
    //console.log(guestNum);

    var totalPrice = 0;
    for (var i = 0; i < dishIngre.length; i++) {
      totalPrice += dishIngre[i].Quantity * guestNum;
    };
    totalPrice = parseFloat(totalPrice.toFixed(2));
    //console.log(totalPrice);
    return totalPrice;
    
  }
  
  this.addPending = function(Title, Ingredients){
    this.pending.Title = Title;
    this.pending.Ingredients = Ingredients;

  }

  this.clearPending = function(){
    this.pending.Title = "pending";
    this.pending.dishPrice = 0;
  }

  this.getPendingName = function(){
      var Title = this.pending.Title;
    //   if (Title != "pending") {
    //   var Title = this.pending.Title;
    // };
    return Title;
  }

  this.getPendingPrice = function(){
    var dishPrice;
    if (this.pending.Title == "pending") {
        dishPrice = 0;
    }else{
      var Ingredients = this.pending.Ingredients;
      dishPrice = this.getTotalDishPrice(Ingredients);
    }
    //console.log(dishPrice);
    return dishPrice;
  }

  this.getCookieMenu = function() {
    if ( $cookieStore.get("menuID") ){
      // this.menuID = $cookieStore.get("menuID");
      console.log(this.menuID);
      for (var key in this.menuID){
      (function(key){
        // this.menu[key]
        //console.log("hi");
      })(key)
    }
    };
    else{
      return;
    }
  }

  this.getFullMenu = function() {
     for (var i = 0; i < this.menu.length; i++) {
        dishPrice = this.getTotalDishPrice(this.menu[i].Ingredients);
        this.menu[i].DishPrice = dishPrice;
    };
        return this.menu;        
  }
  
  this.addDishToMenu = function(dishID) {
    this.getCookieMenu();
     this.Dish.get({id:dishID},function(data){
       var selectDishType = data.Category;
       var theSameType = -1;

        if (th.menu.length == 0) {
          th.menu.push(data);
          th.menuID.push(dishID);
          //console.log("directly add");
        } else{
          for (var i = 0; i< th.menu.length; i++) {
          //if there is the same type in the menu, assign the value of the theSameType with the array index
            var dishInMenu = th.menu[i];
            var dishInMenuType = dishInMenu.Category;
            if (dishInMenuType == selectDishType) {
              theSameType = i;   
              //console.log("same");    
            };
          };

          if (theSameType != -1) {
            th.menu[theSameType] = data;
            th.menuID[theSameType] = dishID;
            //console.log("switch");
          }else{
            th.menu.push(data); 
            th.menuID.push(dishID);
            //console.log("addNew");
          };
        }; 

        //th.menuID.push(dishID);
        $cookieStore.put("menuID",th.menuID);
        // console.log(th.menuID);
        // console.log($cookieStore.get("menuID"));  
     }); 
     // this.getFullMenu();
  }

  this.removeDishFromMenu = function(id) {
    for (var i = 0; i< this.menu.length; i++) {
      if (this.menu[i].RecipeID == id) {
        // console.log(menu[i]);
        this.menu.splice(i,1);
      };
    };
    //console.log(this.menu);
  }

  this.getTotalMenuPrice = function() {
      this.getFullMenu();
       var totalPrice = 0;
       //console.log(this.menu);
        //The loop to get all the price and pass the value of the price
       for (var i = 0; i < this.menu.length; i++) {
          totalPrice += this.menu[i].DishPrice;
        };       
       totalPrice = parseFloat(totalPrice.toFixed(2));
       //console.log(totalPrice);
      return totalPrice;
  }

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:5,api_key: apiKey});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key: apiKey}); 

  // dish = this.Dish.get({id:12345});
  //console.log(dish);
  // this.Dish.get({id:12345},function(data){
  //   th.dish=data;
  //   //console.log(th.dish.Title);
  //   });

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