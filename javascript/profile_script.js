function compressImage(file, maxWidth = 400, quality = 0.8, callback) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scale = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedData = canvas.toDataURL("image/jpeg", quality);
      callback(compressedData);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

document.addEventListener("DOMContentLoaded", function () {
  // Redirect
  if (localStorage.getItem('loggedIn') !== 'true') {
    alert('You must be logged in to access your profile.');
    window.location.href = 'login.html';
    return;
  }

  // Fill in user info
  const userName = localStorage.getItem('userName') || 'Guest';
  const userEmail = localStorage.getItem('userEmail') || 'N/A';
  const memberSince = 'June 2025';

  document.getElementById('profile-name').textContent = userName;
  document.getElementById('profile-email').textContent = userEmail;
  document.getElementById('profile-date').textContent = memberSince;

  // Auth link toggle
  const loginLink = document.getElementById('auth-link');
  if (loginLink && localStorage.getItem('loggedIn') === 'true') {
    loginLink.textContent = 'Logout';
    loginLink.href = '#';
    loginLink.onclick = (e) => {
      e.preventDefault();

      localStorage.removeItem("userAvatar");
      document.documentElement.style.removeProperty('--avatar-bg');
      document.querySelector('main.profile-page')?.classList.remove('bg-active');
  
      localStorage.setItem('loggedIn', 'false');
      window.location.href = 'login.html';
    };
  }

  // Avatar logic
  const avatarImg = document.getElementById("profileAvatar");
  const headerAvatar = document.getElementById("headerAvatar");
  const avatarUpload = document.getElementById("avatarUpload");

  const savedAvatar = localStorage.getItem("userAvatar");
if (savedAvatar) {
  avatarImg.src = savedAvatar;
  if (headerAvatar) headerAvatar.src = savedAvatar;

  // Set background variable
  document.documentElement.style.setProperty('--avatar-bg', `url(${savedAvatar})`);

  // Force reflow and trigger fade-in
  const mainEl = document.querySelector('main.profile-page');
  if (mainEl) {
    mainEl.classList.remove('bg-active');      // reset animation
    void mainEl.offsetWidth;                   // force reflow
    mainEl.classList.add('bg-active');         // re-trigger fade-in
  }
}

//Background changes on upload pfp
  if (avatarUpload) {
  avatarUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
      compressImage(file, 400, 0.8, (imageData) => {
        avatarImg.src = imageData;
        if (headerAvatar) headerAvatar.src = imageData;
        document.documentElement.style.setProperty('--avatar-bg', `url(${imageData})`);

        const mainEl = document.querySelector('main.profile-page');
        if (mainEl) {
          mainEl.classList.remove('bg-active');
          void mainEl.offsetWidth;
          mainEl.classList.add('bg-active');
        }

        localStorage.setItem("userAvatar", imageData);
      });
     } else {
       alert("Please upload a valid image file.");
    }
   });

  }
});