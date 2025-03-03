import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SelectOptions } from './select.interface';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOptions = { options: [] };
  @Input() control?: FormControl;
  @Input() showErrors = true;

  value: any = '';
  isDisabled = false;
  touched = false;
  isOpen = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  get inputValue(): any {
    return this.control ? this.control.value : this.value;
  }

  get isInvalid(): boolean {
    return this.control ? this.control.invalid && (this.control.dirty || this.control.touched) : false;
  }

  get errors(): { [key: string]: any } | null {
    return this.control ? this.control.errors : null;
  }

  writeValue(value: any): void {
    this.value = value;
    if (this.control) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.control) {
      if (isDisabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }

  onSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value === '' ? null : value;
    this.onChange(this.value);
    
    if (this.control) {
      this.control.setValue(this.value);
    }
    
    this.markAsTouched();
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
      if (this.control) {
        this.control.markAsTouched();
      }
    }
  }

  hasError(): boolean {
    if (!this.showErrors) return false;
    return this.control ? this.control.invalid && this.control.touched : false;
  }

  getErrorMessage(): string {
    if (!this.control || !this.control.errors || !this.options.errorMessages) {
      return '';
    }

    const firstError = Object.keys(this.control.errors)[0];
    return this.options.errorMessages[firstError] || 'Erro de validação';
  }
}