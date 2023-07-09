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