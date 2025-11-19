const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartItems = document.getElementById('cart-items');
  const totalSpan = document.getElementById('total');

  function displayCheckoutCart() {
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty.</p>';
      totalSpan.textContent = '0.00';
      return;
    }

    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
      cartItems.appendChild(li);
      total += item.price;
    });

    totalSpan.textContent = total.toFixed(2);
  }

  displayCheckoutCart();


document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('fname').value;

    if (name) {
      // clear cart
      localStorage.removeItem('cart');

      // show confirmation
      document.getElementById('confirmation-message').textContent =
        `Thank you, ${name}! Your order has been placed successfully.`;
    } else {
      alert('Please enter your name.');
    } 
  });