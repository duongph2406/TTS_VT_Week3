// Type definitions for dashboard
interface SessionStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

// Dashboard class to manage functionality
class Dashboard {
  private readonly SESSION_KEY = 'loggedIn';

  constructor() {
    this.init();
  }

  // Initialize dashboard
  private init(): void {
    this.checkAuthStatus();
    this.setLoggedInStatus();
    this.setupEventListeners();
    this.startTimeUpdater();
  }

  // Check if user is logged in
  private checkAuthStatus(): void {
    const isFromLogin = document.referrer.includes('index.html');
    const hasSession = sessionStorage.getItem(this.SESSION_KEY);
    
    if (!isFromLogin && !hasSession) {
      this.redirectToLogin();
    }
  }

  // Set logged in status in session storage
  private setLoggedInStatus(): void {
    sessionStorage.setItem(this.SESSION_KEY, 'true');
  }

  // Setup event listeners
  private setupEventListeners(): void {
    // Add logout functionality to window object for onclick handler
    (window as any).logout = this.logout.bind(this);
  }

  // Logout function
  public logout(): void {
    const confirmLogout = confirm('Bạn có chắc chắn muốn đăng xuất?');
    
    if (confirmLogout) {
      this.clearSession();
      this.showLogoutMessage();
      this.redirectToLogin();
    }
  }

  // Clear session data
  private clearSession(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  // Show logout message
  private showLogoutMessage(): void {
    alert('Đăng xuất thành công!');
  }

  // Redirect to login page
  private redirectToLogin(): void {
    window.location.href = 'index.html';
  }

  // Update page title with current time
  private updateTime(): void {
    const now = new Date();
    const timeString = now.toLocaleString('vi-VN');
    document.title = `Dashboard - ${timeString}`;
  }

  // Start time updater
  private startTimeUpdater(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', (): void => {
  new Dashboard();
});

// Fallback initialization if DOMContentLoaded has already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', (): void => {
    new Dashboard();
  });
} else {
  new Dashboard();
} 