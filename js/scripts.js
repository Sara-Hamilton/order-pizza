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

Order.prototype.setCustomer = function(customer) {
  this.customer = customer;
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

function displayOrderSummary() {
  $("#orderForm").hide();
  $("#order-summary").show();
}

function displayOrderMoreForm() {
  $("#orderForm").trigger("reset");
  $("#orderForm").show();
}

function displayCustomerForm() {
  $("#customerForm").show();
}

function displayCustomerData() {
  $("#customerForm").hide();
  $("#order-more").hide();
  $("#checkout").hide();
  $("#contact-info").show();
}


// user interface logic
$(document).ready(function() {
  var newPizza = new Pizza();
  var newOrder = new Order();
  $("#orderForm").submit(function(event) {
    event.preventDefault();

    var pizzaTopping = "";
    var pizzaToppings = [];
    var pizzaSize = "";
    var cost = 0;

    $("input:checkbox[name=topping]:checked").each(function() {
      pizzaTopping = $(this).val();
      pizzaToppings.push(pizzaTopping);
    });
    pizzaSize = $("select#size").val();
    newPizza.toppings = pizzaToppings;
    newPizza.size = pizzaSize;
    cost = parseFloat(newPizza.cost()).toFixed(2);
    newOrder.pizzas.push(newPizza);
    newOrder.adjustTotal(cost);
    $("#order").append(newPizza.pizzaSummary());
    $("#order").append("<h4>Price: $" + cost + "</h4><hr>");
    $("#total").html("<h4>$" + newOrder.total + "</h4>")
    displayOrderSummary();
  });

  $("#order-more").click(function() {
    displayOrderMoreForm();
  });

  $("#checkout").click(function() {
    displayCustomerForm();
  });

  $("#customerForm").submit(function(event) {
    event.preventDefault();

    var firstName = $("input#first-name").val();
    var lastName = $("input#last-name").val();
    var street = $("input#street").val();
    var city = $("input#city").val();
    var state = $("input#state").val();
    var zipcode = $("input#zipcode").val();
    var newCustomer = new Customer(firstName, lastName, street, city, state, zipcode);
    newOrder.setCustomer(newCustomer);
    $("#customer-name").text(newCustomer.getName());
    $("#customer-address").text(newCustomer.getAddress());
    displayCustomerData();
  });
});
