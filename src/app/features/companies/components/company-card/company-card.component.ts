import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Company } from '../../interfaces/company.interface';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent {
  @Input() company!: Company;
  @Output() edit = new EventEmitter<number>();
  @Output() toggleStatus = new EventEmitter<Company>();



  onEdit() {
    if (this.company.id) {
      this.edit.emit(this.company.id);
    }
  }

  onToggleStatus() {
    this.toggleStatus.emit(this.company);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}