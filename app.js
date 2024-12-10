(function (){
'use strict';

angular.module('app',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.provider('ShoppingListCheckOffService',ShoppingListCheckOffServiceProvider)
.config(Config);

Config.$inject = ['ShoppingListCheckOffServiceProvider'];
function Config(ShoppingListCheckOffServiceProvider){
  ShoppingListCheckOffServiceProvider.items = [
    { name: "cookies", quantity: 30 },
    { name: "cookies", quantity: 20 },
    { name: "cookies", quantity: 10 },
    { name: "cookies", quantity: 5 },
    { name: "cookie", quantity: 1 },
  ];
};

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  let list = this;
  // get to buy item list
  list.items = ShoppingListCheckOffService.getToBuyItems();
  // buy item function
  list.buyItem = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  let list = this;
  // get already bought item list
  list.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService(defaultItems){
  let service = this;

  // init lists
  let toBuyItems = defaultItems;
  let boughtItems = [];

  // get to buy items list
  service.getToBuyItems = function (){
    return toBuyItems;
  }
  // get already bought items list
  service.getBoughtItems = function (){
    return boughtItems;
  }
  // function to buy an item
  service.buyItem = function (itemIndex){
    // push in bought list
    boughtItems.push(toBuyItems[itemIndex]);
    // remove from to buy list
    toBuyItems.splice(itemIndex, 1);
  }
}

function ShoppingListCheckOffServiceProvider(){
  let provider = this;
  // init default items
  provider.items = [];
  // init service with default items
  provider.$get = function (){
    let toBuyItems = new ShoppingListCheckOffService(provider.items);
    return toBuyItems;
  }
}

})();
