document.addEventListener('DOMContentLoaded', () => {
  // Redirect if not logged in
  if (localStorage.getItem('loggedIn') !== 'true') {
    alert('You must be logged in to view the cart.');
    window.location.href = 'login.html';
    return;
  }

  // Dark mode
  const darkToggle = document.getElementById('darkToggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    if (darkToggle) darkToggle.checked = true;
  }

  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Login/logout link
  const loginLink = document.getElementById('auth-link');
  if (localStorage.getItem('loggedIn') === 'true') {
    loginLink.textContent = 'Logout';
    loginLink.href = '#';
    loginLink.onclick = () => {
      localStorage.setItem('loggedIn', 'false');
      window.location.href = 'login.html';
    };
  }

  // Cart Logic
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');
    
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
  const emptyMsg = document.createElement('p');
  emptyMsg.textContent = "Your cart is empty.";
  emptyMsg.classList.add('empty-cart');
  cartItems.appendChild(emptyMsg);
}

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} - $${item.price}
        <button data-index="${index}" class="removeBtn">Remove</button>
      `;
      cartItems.appendChild(li);
      total += item.price;
    });

    totalSpan.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  document.getElementById('cart-items').addEventListener('click', function(e) {
    if (e.target.classList.contains('removeBtn')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      cart.splice(index, 1);
      updateCart();
    }
  });

  document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty! Please add items before checking out.');
    return;
  }
  window.location.href = 'checkout.html';
});


  updateCart();
});
