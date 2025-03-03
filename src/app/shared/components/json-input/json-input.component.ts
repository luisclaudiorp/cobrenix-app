import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { jsonValidator, formatJsonValue } from '../../validators/json.validator';

@Component({
  selector: 'app-json-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="json-input-container" [class.has-error]="hasError()">
      <label *ngIf="label" [for]="id">
        {{ label | translate }}
        <span class="required" *ngIf="required">*</span>
      </label>

      <div class="input-wrapper">
        <textarea
          [id]="id"
          [formControl]="control"
          rows="4"
          [placeholder]="placeholder ? (placeholder | translate) : ''"
          (blur)="onBlur()"
          [class.invalid]="hasError()"
        ></textarea>

        <button type="button" class="format-button" (click)="formatJson()" [title]="'JSON.FORMAT' | translate">
          <i class="fas fa-code"></i>
        </button>
      </div>

      <div class="error-message" *ngIf="hasError()">
        <span *ngIf="control.errors?.['invalidJson']">{{ 'JSON.ERROR.INVALID' | translate }}</span>
        <span *ngIf="control.errors?.['required']">{{ 'JSON.ERROR.REQUIRED' | translate }}</span>
      </div>
    </div>
  `,
  styles: [`
    .json-input-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        transition: color 0.3s ease;
        color: var(--label-color);
        font-weight: 500;

        .required {
          color: var(--error-color);
          margin-left: 0.25rem;
        }
      }

      .input-wrapper {
        position: relative;
        width: 100%;

        textarea {
          width: 100%;
          padding: 0.75rem;
          padding-right: 2.5rem;
          border-radius: 6px;
          font-size: 1rem;
          font-family: monospace;
          transition: all 0.3s ease;
          border: var(--border-label);
          background: var(--background-label);
          color: var(--input-color);
          resize: vertical;
          min-height: 100px;

          &::placeholder {
            color: var(--input-placeholder);
            font-family: var(--font-family);
          }

          &:focus {
            outline: none;
            border-color: var(--input-focus-border);
            background: var(--input-focus-background);
            box-shadow: var(--input-focus-shadow);
          }

          &.invalid {
            border-color: var(--input-invalid-border);
            background: var(--input-invalid-background);
            box-shadow: var(--input-invalid-shadow);
          }
        }

        .format-button {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--toggle-color);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;

          &:hover {
            color: var(--toggle-hover-color);
          }

          &:focus {
            outline: none;
          }
        }
      }

      .error-message {
        color: var(--error-color);
        font-size: 0.85rem;
        margin-top: 0.25rem;
        text-shadow: none;
      }
    }
  `]
})
export class JsonInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() id?: string;
  @Input() required = false;

  ngOnInit() {
    // Adiciona o validador de JSON aos validadores existentes
    const validators = this.control.validator 
      ? [this.control.validator, jsonValidator] 
      : [jsonValidator];
    
    this.control.setValidators(validators);
  }

  hasError(): boolean {
    return this.control ? this.control.invalid && (this.control.dirty || this.control.touched) : false;
  }

  formatJson() {
    if (this.control.value) {
      const formatted = formatJsonValue(this.control.value);
      this.control.setValue(formatted);
      this.control.markAsTouched();
    }
  }

  onBlur() {
    if (this.control.value) {
      const formatted = formatJsonValue(this.control.value);
      if (formatted !== this.control.value) {
        this.control.setValue(formatted);
      }
    }
    this.control.markAsTouched();
  }
}