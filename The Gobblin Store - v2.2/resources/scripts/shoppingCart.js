$(document).ready(function () {
  let product = [];

  let itemNumber = 0;
  if (localStorage.getItem("items")) {
    products = JSON.parse(localStorage.getItem("items"));
    itemNumber = products.length;
  }
  $(".numberOfItems").text(itemNumber);

  // when the user clicks the shopping cart button, update .modal-body with the items in the cart
  $(".buttonWrapper").click(function () {
    if (localStorage.getItem("items")) {
      products = JSON.parse(localStorage.getItem("items"));
      let modalBody = $(".modal-body");

      // render products name, price, and quantity
      function updateBody(product) {
        modalBody.empty(); // empty the initial contents of modal body before adding new items
          products.map((product) => {
            modalBody.append(
              `<div class="productWrapper" id="${product.name}">
                <div class="mb-4" id="productInfo">
                  <img class="image" src="${product.image}" alt="" width="100" height="100">
                  <div class="row">
                    <div class="name col-sm-6"><strong>${product.name}</strong> $${product.price}/item</div>
                    <div class="quantity col-sm-3">x ${product.quantity}</div>
                    <div class="itemSubTotal col-sm-3">$${product.price * product.quantity}</div>
                  </div>
                </div>
                <div id="actions">
                  <button class="btn btn-primary increaseQuantity" id="${product.name}">
                    +
                  </button>
                  <button class="btn btn-danger decreaseQuantity" id="${product.name}">
                    -
                  </button>               
                </div>
              </div>`
            );
        });
      };

      updateBody(product);
      
      var cartTotal = 0;

      // Update total cost
      function updateCartTotal(product) {
      
        let cartArray = [];

        products.map((product) => {
          cartArray.push(product.quantity * product.price);
        });
        
        // Sum array
        cartTotal = cartArray.reduce((a, b) => a + b, 0);

        console.log("Function ran")
      };
      
      updateCartTotal(product);

      console.log(`On load: ${cartTotal}`);

      // Append total cost div to bottom of modal
      modalBody.append(
        `<div class="cartTotal mt-4">
          <p><strong>Shopping cart total cost:</p>
          <p class="cartTotalText">$${cartTotal}</p>
        </div>`
      );

      $(".increaseQuantity").click(function () {
        // get the id attribute of the button
        let productName = $(this).attr("id");
        // match the productName to the selected item inside products array
        let product = products.find((product) => product.name === productName);
        // then increase the selected item quantity by 1
        product.quantity++;

        // if >= 1, enable minus button
        if (product.quantity >= 1) {
          $(`[id='${productName}'] .decreaseQuantity`).prop({disabled: false});
        }
        // update the quantity div's text - go up to productWrapper level, and then find the div with .quantity class
        $(this)
          .closest(".productWrapper") // get the closest productWrapper div
          .find(".quantity") // get the quantity div
          .text(`x ${product.quantity}`); // update the text of the quantity

        // update the subtotal div's text - go up to productWrapper level, and then find the div with .itemSubTotal class
        $(this)
          .closest(".productWrapper") // get the closest productWrapper div
          .find(".itemSubTotal") // get the itemSubTotal div
          .text(`$${product.price * product.quantity}`); // update the text of the quantity
          
        updateCartTotal();
        console.log(`After +: ${cartTotal}`);

        // update the total div's text - go up to productWrapper level, and then find the div with .cartTotal class
        // $(this)
        // .closest(".cartTotal") // get the closest cartTotal div
        // .find(".cartTotalText") // get the cartTotal div
        // .text(`$${cartTotal}`); // update the text of the quantity

        $( ".cartTotal" ).empty();
        modalBody.append(
          `<div class="cartTotal mt-4">
            <p><strong>Shopping cart total cost:</p>
            <p class="cartTotalText">$${cartTotal}</p>
          </div>`
        );

        // update the items in localStorage
        localStorage.setItem("items", JSON.stringify(products));
      });

      $(".decreaseQuantity").click(function () {
        // get the id attribute of the button
        let productName = $(this).attr("id");
        // match the productName to the selected item inside products array
        let product = products.find((product) => product.name === productName);
        // then decrease the selected item quantity by 1
        product.quantity--;

        // if <= 0, disable minus button
        if (product.quantity <= 0) {
          $(this).prop({disabled: true});
        }

        // update the quantity div's text - go up to productWrapper level, and then find the div with .quantity class
        $(this)
        .closest(".productWrapper") // get the closest productWrapper div
        .find(".quantity") // get the quantity div
        .text(`x ${product.quantity}`); // update the text of the quantity

        // update the subtotal div's text - go up to productWrapper level, and then find the div with .itemSubTotal class
        $(this)
        .closest(".productWrapper") // get the closest productWrapper div
        .find(".itemSubTotal") // get the itemSubTotal div
        .text(`$${product.price * product.quantity}`); // update the text of the quantity

        updateCartTotal();
        console.log(`After -: ${cartTotal}`);

        // update the total div's text - go up to productWrapper level, and then find the div with .cartTotal class
        // $(this)
        // .closest(".cartTotal") // get the closest cartTotal div
        // .find(".cartTotalText") // get the cartTotal div
        // .text(`$${cartTotal}`); // update the text of the quantity

        $( ".cartTotal" ).empty();
        modalBody.append(
          `<div class="cartTotal mt-4">
            <p><strong>Shopping cart total cost:</p>
            <p class="cartTotalText">$${cartTotal}</p>
          </div>`
        );

        // update the items in localStorage
        localStorage.setItem("items", JSON.stringify(products));
      });
    }
  });
});
