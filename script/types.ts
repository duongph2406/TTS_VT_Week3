// Advanced TypeScript type definitions

// Enum for login status
export enum LoginStatus {
  IDLE = 'idle',
  VALIDATING = 'validating',
  SUCCESS = 'success',
  FAILED = 'failed',
  BLOCKED = 'blocked'
}

// Union types for validation states
export type ValidationState = 'valid' | 'invalid' | 'pending';

// Generic type for form field validation
export interface FormField<T = string> {
  value: T;
  isValid: boolean;
  errorMessage?: string;
  touched: boolean;
}

// More specific login credentials with readonly properties
export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

// Validation result with generic error types
export interface ValidationResult<T = string> {
  isValid: boolean;
  message?: T;
  field?: keyof LoginCredentials;
}

// Login state with status enum
export interface LoginState {
  attempts: number;
  isBlocked: boolean;
  maxAttempts: number;
  status: LoginStatus;
  lastAttempt?: Date;
}

// Event handler types
export type FormSubmitHandler = (e: SubmitEvent) => void;
export type InputEventHandler = (this: HTMLInputElement, e: Event) => void;

// Utility types
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Constants with const assertions
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Trường này là bắt buộc',
  INVALID_EMAIL: 'Vui lòng nhập địa chỉ email hợp lệ!',
  INVALID_PASSWORD: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!',
  MAX_ATTEMPTS: 'Quá nhiều lần thử! Vui lòng thử lại sau.',
  LOGIN_SUCCESS: 'Đăng nhập thành công! Đang chuyển hướng...'
} as const;

// Type for validation message keys
export type ValidationMessageKey = keyof typeof VALIDATION_MESSAGES;

// Advanced function signature with overloads
export interface Logger {
  log(message: string): void;
  log(level: 'info' | 'warn' | 'error', message: string): void;
}

// Class decorator type
export type ClassDecorator<T = {}> = (target: new (...args: any[]) => T) => new (...args: any[]) => T; 