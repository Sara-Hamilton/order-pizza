// business logic
function Pizza(toppings, size) {
  this.toppings = toppings;
  this.size = size;
}

function Order() {
  this.pizzas = [];
  this.total = 0;
  this.customer = "";
}

function Customer(firstName, lastName, street, city, state, zipcode) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zipcode = zipcode;
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

Pizza.prototype.pizzaSummary = function() {
  return (this.size + " Pizza with " + this.toppings);
}

Order.prototype.setCustomer = function(Customer) {
  this.customer = Customer;
}

Order.prototype.adjustTotal = function(amount) {
  this.total = (parseFloat(this.total) + parseFloat(amount)).toFixed(2);
}

Customer.prototype.getName = function() {
  return (this.firstName + " " + this.lastName);
}

Customer.prototype.getAddress = function() {
  return (this.street + ", " + this.city + ", " + this.state + " " + this.zipcode);
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
    var cost = 0;

    $("input:checkbox[name=topping]:checked").each(function(){
      pizzaTopping = $(this).val();
      pizzaToppings.push(pizzaTopping);
    });
    pizzaSize = $("select#size").val();
    pizza.toppings = pizzaToppings;
    pizza.size = pizzaSize;
    cost = parseFloat(pizza.cost()).toFixed(2);
    order.pizzas.push(pizza);
    order.adjustTotal(cost);
    $("#order").append(pizza.pizzaSummary());
    $("#order").append("<h4>Price: $" + cost + "</h4>");
    $("#total").html("<h4>$" + order.total + "</h4>")

    $("#orderForm").hide();
    $("#order-summary").show();
  });

  $("#order-more").click(function() {
    $("#orderForm").trigger("reset");
    $("#orderForm").show();
  })

  $("#checkout").click(function(){
    $("#customerForm").show();
  });

  $("#customerForm").submit(function(event){
    event.preventDefault();

    var firstName = $("input#first-name").val();
    var lastName = $("input#last-name").val();
    var street = $("input#street").val();
    var city = $("input#city").val();
    var state = $("input#state").val();
    var zipcode = $("input#zipcode").val();

    var customer = new Customer(firstName, lastName, street, city, state, zipcode);
    order.setCustomer(customer);
    console.log(order);

    $("#customerForm").hide();
    $("#order-more").hide();
    $("#checkout").hide();
    $("#customer-name").text(customer.getName());
    $("#customer-address").text(customer.getAddress());
    $("#contact-info").show();
  });
});
