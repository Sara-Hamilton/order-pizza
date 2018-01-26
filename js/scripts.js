// business logic
function Pizza {
  this.toppings = [];
  this.size = size;
}

Pizza.prototype.cost = function(toppings, size) {
  var toppingsPrice = .75;
  var sizePrice = 0;
  if (size === personal) {
    sizePrice = 7.99;
  } else if (size === large) {
    sizePrice = 12.99;
  } else if (size === family) {
    sizePrice = 15.99;
  }
  return ((toppings.length * toppingsPrice) + sizePrice))
}


// business logic
$(document).ready(function(){
  $("#orderForm").submit(function(event){
    event.preventDefault();

    var pizzaTopping = "";
    var pizzaToppings = [];
    var pizzaSize = "";
    var cost = 0;

    $("input:checkbox[name=topping]:checked").each(function(){
      pizzaTopping = $(this).val();
      pizzaToppings.push(pizzaTopping);
    });
    pizzaSize = $("select#size").val();

  });
});
