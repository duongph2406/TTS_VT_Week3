// Hardcoded credentials
const VALID_EMAIL = 'duongph2406@gmail.com';
const VALID_PASSWORD = '123@123Aa';
const MAX_ATTEMPTS = 5;

let loginAttempts = 0;
let isBlocked = false;

// DOM elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('toggle-password');
const errorMessage = document.getElementById('error-message');
const loginBtn = document.getElementById('login-btn');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation regex (at least 8 characters, uppercase, lowercase, number, special char)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Toggle password visibility
togglePasswordBtn.addEventListener('click', function() {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.textContent = type === 'password' ? '👁️' : '🙈';
});

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  errorMessage.style.color = '#ff4444';
  errorMessage.style.backgroundColor = '#ffe6e6';
  errorMessage.style.padding = '10px';
  errorMessage.style.borderRadius = '4px';
  errorMessage.style.marginBottom = '15px';
  errorMessage.style.border = '1px solid #ff4444';
}

// Hide error message
function hideError() {
  errorMessage.style.display = 'none';
}

// Validate email format
function validateEmail(email) {
  return emailRegex.test(email);
}

// Validate password format
function validatePassword(password) {
  return passwordRegex.test(password);
}

// Check if user is blocked
function checkIfBlocked() {
  if (loginAttempts >= MAX_ATTEMPTS) {
    isBlocked = true;
    showError('Too many attempts! Please try again later.');
    loginBtn.disabled = true;
    loginBtn.style.backgroundColor = '#ccc';
    loginBtn.style.cursor = 'not-allowed';
    return true;
  }
  return false;
}

// Handle form submission
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (checkIfBlocked()) {
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  hideError();

  // Validate email format
  if (!validateEmail(email)) {
    showError('Vui lòng nhập địa chỉ email hợp lệ!');
    return;
  }

  // Validate password format
  if (!validatePassword(password)) {
    showError('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!');
    return;
  }

  // Check credentials
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    // Success
    hideError();
    
    // Show success message
    errorMessage.style.color = '#28a745';
    errorMessage.style.backgroundColor = '#e6f7e6';
    errorMessage.style.border = '1px solid #28a745';
    errorMessage.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
    errorMessage.style.display = 'block';
    
    // Disable form
    loginBtn.disabled = true;
    emailInput.disabled = true;
    passwordInput.disabled = true;
    
    // Redirect after 2 seconds
    setTimeout(function() {
      window.location.href = 'dashboard.html';
    }, 2000);
    
  } else {
    // Failed login
    loginAttempts++;
    const remainingAttempts = MAX_ATTEMPTS - loginAttempts;
    
    if (remainingAttempts > 0) {
      showError(`Email hoặc mật khẩu không đúng! Còn lại ${remainingAttempts} lần thử.`);
    } else {
      checkIfBlocked();
    }
  }
});

// Real-time validation feedback
emailInput.addEventListener('blur', function() {
  if (this.value && !validateEmail(this.value)) {
    this.style.borderColor = '#ff4444';
  } else {
    this.style.borderColor = '';
  }
});

passwordInput.addEventListener('blur', function() {
  if (this.value && !validatePassword(this.value)) {
    this.style.borderColor = '#ff4444';
  } else {
    this.style.borderColor = '';
  }
});

// Clear validation styling on focus
emailInput.addEventListener('focus', function() {
  this.style.borderColor = '';
  hideError();
});

passwordInput.addEventListener('focus', function() {
  this.style.borderColor = '';
  hideError();
}); 