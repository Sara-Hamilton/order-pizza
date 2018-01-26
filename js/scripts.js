// business logic
function Pizza (toppings, size){
  this.toppings = toppings;
  this.size = size;
}

Pizza.prototype.cost = function() {
  var toppingsPrice = .75;
  var sizePrice = "";
  if (this.size === "Small") {
    sizePrice = 7.99;
  } else if (this.size === "Medium") {
    sizePrice = 12.99;
  } else if (this.size === "Large") {
    sizePrice = 15.99;
  }
  return ((this.toppings.length * toppingsPrice) + sizePrice);
}

Pizza.prototype.orderSummary = function() {
  return this.size + " pizza with " + this.toppings
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
    pizzaOrder.toppings = pizzaToppings;
    pizzaOrder.size = pizzaSize;
    cost = parseFloat(pizzaOrder.cost()).toFixed(2);
    $("#order").append(pizzaOrder.orderSummary());
    $("#order").append("<h4>Total cost: $" + cost + "</h4>");

    $("#order-button").hide();
    $("#order-summary").show();
  });
});
