// Toggle Login/Logout
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
const loginLink = document.getElementById('auth-link');
if (isLoggedIn && loginLink) {
  loginLink.textContent = 'Logout';
  loginLink.href = '#';
  loginLink.onclick = () => {
    localStorage.setItem('loggedIn', 'false');
    window.location.href = 'login.html';
  };
}

// Personalized Greeting
const userName = localStorage.getItem('userName');
if (isLoggedIn && userName) {
  const greeting = document.createElement('p');
  greeting.id = 'greeting';
  greeting.textContent = `Welcome back, ${userName}!`;
  const heroSection = document.querySelector('.hero .container');
  if (heroSection) {
    heroSection.appendChild(greeting);
  }
}

// Add to Cart
function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} has been added to your cart.`);
}

// Category Filter
const filter = document.getElementById('categoryFilter') || document.getElementById('categoryFilter2');
if (filter) {
  const applyFilter = () => {
    const category = filter.value;
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
      const match = category === 'all' || product.dataset.category === category;
      // Use empty string to show (let CSS/grid decide display) and 'none' to hide
      product.style.display = match ? '' : 'none';
    });
  };

  filter.addEventListener('change', applyFilter);
  applyFilter();
}

// Dark Modes
const darkToggle = document.getElementById('darkToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  if (darkToggle) darkToggle.checked = true;
}

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const userName = localStorage.getItem("userName") || "Guest";
  const profileAvatar = document.getElementById("headerAvatar");
  const subMenuWrap = profileAvatar.nextElementSibling;
  const authLink = document.getElementById("auth-link");

  // Load avatar from localStorage if user uploaded one
  const userAvatar = localStorage.getItem("userAvatar");
  if (userAvatar) profileAvatar.src = userAvatar;

  //Usermame display
  document.getElementById('dropdown-name').textContent = userName;

  // Toggle dropdown
  profileAvatar.addEventListener("click", function (e) {
    e.stopPropagation(); // prevent window click from closing it immediately
    subMenuWrap.style.display = subMenuWrap.style.display === "block" ? "none" : "block";
  });

  // Close dropdown if clicked outside
  window.addEventListener("click", function () {
    subMenuWrap.style.display = "none";
  });

});


const profileBtn = document.getElementById("headerAvatar");
const profileSubMenu = document.getElementById("profileSubMenu");


profileBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent document click from closing immediately
  profileSubMenu.classList.toggle("active");
});

// Close submenu if clicked outside
document.addEventListener("click", () => {
  profileSubMenu.classList.remove("active");
});

// Prevent closing when clicking inside submenu
profileSubMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

