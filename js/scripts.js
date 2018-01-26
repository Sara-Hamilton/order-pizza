// business logic
function Pizza (toppings, size){
  this.toppings = toppings;
  this.size = size;
}

Pizza.prototype.cost = function() {
  var toppingsPrice = .75;
  var sizePrice = "";
  if (this.size === "small") {
    sizePrice = 7.99;
  } else if (this.size === "medium") {
    sizePrice = 12.99;
  } else if (this.size === "large") {
    sizePrice = 15.99;
  }
  console.log(sizePrice)
  return ((this.toppings.length * toppingsPrice) + sizePrice);
}


// business logic
$(document).ready(function(){
  $("#orderForm").submit(function(event){
    event.preventDefault();

    var pizzaTopping = "";
    var pizzaToppings = [];
    var pizzaSize = "";
    var cost = 0;
    var pizzaOrder = new Pizza();

    $("input:checkbox[name=topping]:checked").each(function(){
      pizzaTopping = $(this).val();
      pizzaToppings.push(pizzaTopping);
    });
    pizzaSize = $("select#size").val();
    console.log(pizzaToppings)
    console.log(pizzaSize)
    pizzaOrder.toppings = pizzaToppings;
    pizzaOrder.size = pizzaSize;
    console.log(pizzaOrder)
    console.log(pizzaOrder.cost())

  });
});
