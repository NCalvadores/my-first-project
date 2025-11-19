const form = document.getElementById('login-form');
const statusMsg = document.getElementById('login-status');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

// Load remembered email
const savedEmail = localStorage.getItem('userEmail');
if (savedEmail) {
  form.email.value = savedEmail;
  document.getElementById('rememberMe').checked = true;
}

// Toggle show/hide password
const toggleIcon = document.getElementById('toggleIcon');

toggleIcon.addEventListener('click', function () {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});


// Handle login form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  if (email === 'admin@example.com' && password === 'admin') {
    statusMsg.textContent = 'Login successful!';
    statusMsg.style.color = 'green';
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userName', name);

    if (document.getElementById('rememberMe').checked) {
      localStorage.setItem('userEmail', email);
    } else {
      localStorage.removeItem('userEmail');
    }

    setTimeout(() => {
      window.location.href = 'main_page.html';
    }, 1000);
  } else {
    statusMsg.textContent = 'Invalid credentials. Try again.';
    statusMsg.style.color = 'red';
    localStorage.setItem('loggedIn', 'false');
  }
});


 /* //Dark Mode
const darkToggle = document.getElementById('darkToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  if (darkToggle) darkToggle.checked = true;
}

darkToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const theme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});
*/

// Get the avatar from localStorage
const savedImage = localStorage.getItem("userAvatar");
if (savedImage) {
  document.body.style.setProperty("--avatar-bg", `url(${savedImage})`);
}

const avatarImg = document.getElementById("profileAvatar");
const headerAvatar = document.getElementById("headerAvatar"); // dropdown avatar
const avatarUpload = document.getElementById("avatarUpload");

avatarUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;

      // Update profile card
      avatarImg.src = imageData;

      // Update dropdown avatar
      if (headerAvatar) headerAvatar.src = imageData;

      // Update blurred background
      document.body.style.setProperty("--avatar-bg", `url(${imageData})`);

      // Save to localStorage for persistence
      localStorage.setItem("userAvatar", imageData);
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please upload a valid image file.");
  }
});
