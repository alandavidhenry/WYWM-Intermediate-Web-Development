// on document ready
$(document).ready(() => {
  // Load the header.html into the header div, once it's loaded execute callback to add class to headerHome div
  $("#header").load("./template/header.html", () => {
    $("#headerCheckout")
      .removeClass()
      .addClass("nav-link active text-black fw-bold");
  });

  // Load the footer.html into the footer div, once it's loaded execute callback to add class to footerHome div
  $("#footer").load("./template/footer.html", () => {
    $("#footerCheckout")
      .removeClass()
      .addClass("nav-link active text-black fw-bold");
  });

  // Load shoppingCart.html
  $("#shoppingCart").load("./shoppingCart.html");

  // Set product variable
  let product = [];

  if (localStorage.getItem("items")) {
    products = JSON.parse(localStorage.getItem("items"));
    let orderBody = $(".orderBody");

    // render products name, price, and quantity
    function updateBody(product) {
      orderBody.empty(); // empty the initial contents of order body div before adding new items
      products.map((product) => {
        orderBody.append(
          `<div class="orderDetails" id="${product.name}">
            <div class="mb-4" id="productInfo">
              <img class="image" src="${product.image}" alt="" width="100" height="100">
              <div class="row">
                <div class="name col-sm-3"><strong>${product.name}</strong></div>
                <div class="price col-sm-5">$${product.price}/item</div>
                <div class="quantity col-sm-2">x ${product.quantity}</div>
                <div class="itemSubTotal col-sm-2">$${product.price * product.quantity}</div>
              </div>
            </div>
          </div>`
        );
      });
    };

    // Run function
    updateBody(product);

    // Set checkoutTotal variable
    var checkoutTotal = 0;

    // Update total cost
    function updateCartTotal(product) {

      let checkoutArray = [];

      products.map((product) => {
        checkoutArray.push(product.quantity * product.price);
      });
      
      // Sum array
      checkoutTotal = checkoutArray.reduce((a, b) => a + b, 0);
    };

    // Run function
    updateCartTotal(product);

    // Append total cost div to bottom of checkout page
    orderBody.append(
      `<div class="checkoutTotal mt-4">
        <div class="row">
          <div class="col-sm-10 text-end"><strong>Total cost:</strong></div>
          <div class="checkoutTotalText col-sm-2"><strong>$${checkoutTotal}</strong></div>
      </div>`
    );
  };
});

// Bootstrap JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// emailjs script
const btn = document.getElementById('button');

document.getElementById('checkoutForm')
.addEventListener('submit', function(event) {
  event.preventDefault();

  btn.value = 'Sending...';

  const serviceID = 'default_service';
  const templateID = 'template_7fms13o';

  var params = {
    firstName: document.getElementById("inputFirstName").value,
    lastName: document.getElementById("inputLastName").value,
    email: document.getElementById("inputEmail").value,
    phone: document.getElementById("inputPhoneNumber").value,
    address: document.getElementById("inputAddress").value,
    cardNumber: '**** **** **** ' + document.getElementById("inputCardNumber").value.slice(0,4),
    cardExpiry: document.getElementById("inputCardExpiryDate").value,
    html: products.map((product) => {
            `<div class="orderDetails" id="${product.name}">
              <div class="mb-4" id="productInfo">
                <img class="image" src="${product.image}" alt="" width="100" height="100">
                <div class="row">
                  <div class="name col-sm-3"><strong>${product.name}</strong></div>
                  <div class="price col-sm-5">$${product.price}/item</div>
                  <div class="quantity col-sm-2">x ${product.quantity}</div>
                  <div class="itemSubTotal col-sm-2">$${product.price * product.quantity}</div>
                </div>
              </div>
            </div>`
          })
  };

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("inputFirstName").value = "";
      document.getElementById("inputLastName").value = "";
      document.getElementById("inputEmail").value = "";
      document.getElementById("inputPhoneNumber").value = "";
      document.getElementById("inputAddress").value = "";
      document.getElementById("inputCardNumber").value = "";
      document.getElementById("inputCardExpiryDate").value = "";    
      btn.value = 'Order now';
      alert("Sent!");
    })
    .catch((err) => {
      btn.value = 'Order now';
      alert(JSON.stringify(err));
      console.log(err);
    });

});

