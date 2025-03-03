import { AbstractControl, ValidationErrors } from '@angular/forms';

export function jsonValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  try {
    // Se o valor já for um objeto, converte para string primeiro
    const value = typeof control.value === 'object' 
      ? JSON.stringify(control.value) 
      : control.value;

    JSON.parse(value);
    return null;
  } catch (e) {
    return { invalidJson: true };
  }
}

export function formatJsonValue(value: string): string {
  if (!value) return '';
  
  try {
    const parsed = JSON.parse(value);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return value;
  }
}