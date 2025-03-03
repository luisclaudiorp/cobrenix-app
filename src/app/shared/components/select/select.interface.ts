export interface SelectOption {
  value: any;
  label: string;
}

export interface SelectOptions {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  errorMessages?: { [key: string]: string };
}