// business logic
function Pizza(toppings, size) {
  this.toppings = toppings;
  this.size = size;
}

function Order() {
  this.pizzas = [];
  this.total = 0;
  this.name = "";
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
  var pizza = new Pizza();
  var order = new Order();
  $("#orderForm").submit(function(event){
    event.preventDefault();

    var pizzaTopping = "";
    var pizzaToppings = [];
    var pizzaSize = "";
    var cost = 0.00;
    // var pizza = new Pizza();
    // var order = new Order();

    $("input:checkbox[name=topping]:checked").each(function(){
      pizzaTopping = $(this).val();
      pizzaToppings.push(pizzaTopping);
    });
    pizzaSize = $("select#size").val();
    pizza.toppings = pizzaToppings;
    pizza.size = pizzaSize;
    cost = parseFloat(pizza.cost()).toFixed(2);
    console.log(cost)
    order.pizzas.push(pizza);
    order.total += parseFloat(cost).toFixed(2);
    console.log(pizza)
    console.log(order)
    console.log(typeof order.total)
    $("#order").append(pizza.orderSummary());
    $("#order").append("<h4>Price: $" + cost + "</h4>");
    $("#total").append("<h4>$" + order.total + "</h4>")

    $("#orderForm").hide();
    $("#order-summary").show();
  });

  $("#order-more").click(function() {
    $("#orderForm").trigger("reset");
    $("#orderForm").show();
  })
});
