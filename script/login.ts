// Import advanced TypeScript types
import { 
  LoginCredentials, 
  ValidationResult, 
  LoginState, 
  LoginStatus, 
  VALIDATION_MESSAGES,
  FormSubmitHandler,
  InputEventHandler 
} from './types';

// Hardcoded credentials
const VALID_EMAIL: string = 'duongph2406@gmail.com';
const VALID_PASSWORD: string = '123@123Aa';
const MAX_ATTEMPTS: number = 5;

// Login state
const loginState: LoginState = {
  attempts: 0,
  isBlocked: false,
  maxAttempts: MAX_ATTEMPTS,
  status: LoginStatus.IDLE,
  lastAttempt: undefined
};

// DOM elements with proper type assertions
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const togglePasswordBtn = document.getElementById('toggle-password') as HTMLButtonElement;
const errorMessage = document.getElementById('error-message') as HTMLDivElement;
const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;

// Validation regex patterns
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Toggle password visibility
togglePasswordBtn.addEventListener('click', function(this: HTMLButtonElement): void {
  const type: string = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.textContent = type === 'password' ? '👁️' : '🙈';
});

// Show error message
function showError(message: string): void {
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
function hideError(): void {
  errorMessage.style.display = 'none';
}

// Validate email format
function validateEmail(email: string): ValidationResult {
  const isValid = emailRegex.test(email);
  return {
    isValid,
    message: isValid ? undefined : VALIDATION_MESSAGES.INVALID_EMAIL,
    field: 'email'
  };
}

// Validate password format
function validatePassword(password: string): ValidationResult {
  const isValid = passwordRegex.test(password);
  return {
    isValid,
    message: isValid ? undefined : VALIDATION_MESSAGES.INVALID_PASSWORD,
    field: 'password'
  };
}

// Check if user is blocked
function checkIfBlocked(): boolean {
  if (loginState.attempts >= loginState.maxAttempts) {
    loginState.isBlocked = true;
    loginState.status = LoginStatus.BLOCKED;
    showError(VALIDATION_MESSAGES.MAX_ATTEMPTS);
    loginBtn.disabled = true;
    loginBtn.style.backgroundColor = '#ccc';
    loginBtn.style.cursor = 'not-allowed';
    return true;
  }
  return false;
}

// Validate credentials
function validateCredentials(credentials: LoginCredentials): boolean {
  return credentials.email === VALID_EMAIL && credentials.password === VALID_PASSWORD;
}

// Show success message
function showSuccessMessage(): void {
  loginState.status = LoginStatus.SUCCESS;
  errorMessage.style.color = '#28a745';
  errorMessage.style.backgroundColor = '#e6f7e6';
  errorMessage.style.border = '1px solid #28a745';
  errorMessage.textContent = VALIDATION_MESSAGES.LOGIN_SUCCESS;
  errorMessage.style.display = 'block';
}

// Disable form elements
function disableForm(): void {
  loginBtn.disabled = true;
  emailInput.disabled = true;
  passwordInput.disabled = true;
}

// Redirect to dashboard
function redirectToDashboard(): void {
  setTimeout((): void => {
    window.location.href = 'dashboard.html';
  }, 2000);
}

// Handle successful login
function handleSuccessfulLogin(): void {
  hideError();
  showSuccessMessage();
  disableForm();
  redirectToDashboard();
}

// Handle failed login
function handleFailedLogin(): void {
  loginState.attempts++;
  loginState.status = LoginStatus.FAILED;
  loginState.lastAttempt = new Date();
  
  const remainingAttempts: number = loginState.maxAttempts - loginState.attempts;
  
  if (remainingAttempts > 0) {
    showError(`Email hoặc mật khẩu không đúng! Còn lại ${remainingAttempts} lần thử.`);
  } else {
    checkIfBlocked();
  }
}

// Handle form submission
loginForm.addEventListener('submit', function(e: SubmitEvent): void {
  e.preventDefault();
  
  if (checkIfBlocked()) {
    return;
  }

  loginState.status = LoginStatus.VALIDATING;

  const credentials: LoginCredentials = {
    email: emailInput.value.trim(),
    password: passwordInput.value
  };

  hideError();

  // Validate email format
  const emailValidation = validateEmail(credentials.email);
  if (!emailValidation.isValid) {
    showError(emailValidation.message!);
    return;
  }

  // Validate password format
  const passwordValidation = validatePassword(credentials.password);
  if (!passwordValidation.isValid) {
    showError(passwordValidation.message!);
    return;
  }

  // Check credentials
  if (validateCredentials(credentials)) {
    handleSuccessfulLogin();
  } else {
    handleFailedLogin();
  }
});

// Real-time validation feedback for email
emailInput.addEventListener('blur', function(this: HTMLInputElement): void {
  if (this.value && !validateEmail(this.value).isValid) {
    this.style.borderColor = '#ff4444';
  } else {
    this.style.borderColor = '';
  }
});

// Real-time validation feedback for password
passwordInput.addEventListener('blur', function(this: HTMLInputElement): void {
  if (this.value && !validatePassword(this.value).isValid) {
    this.style.borderColor = '#ff4444';
  } else {
    this.style.borderColor = '';
  }
});

// Clear validation styling on focus
emailInput.addEventListener('focus', function(this: HTMLInputElement): void {
  this.style.borderColor = '';
  hideError();
});

passwordInput.addEventListener('focus', function(this: HTMLInputElement): void {
  this.style.borderColor = '';
  hideError();
}); 