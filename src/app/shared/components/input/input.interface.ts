export interface InputOptions {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  label?: string;
  placeholder?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  iconAction?: () => void;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  autocomplete?: string;
  name?: string;
  id?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  errorMessages?: { [key: string]: string };
}