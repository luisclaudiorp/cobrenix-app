import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputOptions } from './input.interface';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() options: InputOptions = {};
  @Input() control?: FormControl | any;
  @Input() showErrors = true;

  value: any = '';
  isDisabled = false;
  touched = false;
  showPassword = false;

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

  ngOnInit() {
    // Configurações padrão
    this.options = {
      type: 'text',
      iconPosition: 'right',
      errorMessages: {
        required: 'INPUT.ERROR.REQUIRED',
        email: 'INPUT.ERROR.EMAIL',
        minlength: 'INPUT.ERROR.MIN_LENGTH',
        maxlength: 'INPUT.ERROR.MAX_LENGTH',
        pattern: 'INPUT.ERROR.PATTERN'
      },
      ...this.options
    };

    // Se tiver um controle, sincroniza o valor inicial
    if (this.control) {
      this.value = this.control.value;
      
      // Inscreve para mudanças no controle
      this.control.valueChanges.subscribe((value: any) => {
        this.value = value;
      });
    }
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

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    
    if (this.control) {
      this.control.setValue(value);
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

  togglePasswordVisibility(): void {
    if (this.options.type === 'password') {
      this.showPassword = !this.showPassword;
    }
  }

  getInputType(): string {
    if (this.options.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.options.type || 'text';
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