import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, CompanyFilters } from '../interfaces/company.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private apiUrl = `${environment.apiUrl}/companies`;

  constructor(private http: HttpClient) {}

  getAll(filters?: CompanyFilters): Observable<Company[]> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.name) {
        params = params.set('name', filters.name);
      }
      if (filters.email) {
        params = params.set('email', filters.email);
      }
      if (filters.id !== undefined && filters.id !== null) {
        params = params.set('id', filters.id.toString());
      }
      if (filters.active !== undefined && filters.active !== null) {
        params = params.set('active', filters.active.toString());
      }
    }

    return this.http.get<Company[]>(this.apiUrl, { params });
  }

  create(createCompanyDto: Omit<Company, 'id' | 'active' | 'createdAt' | 'updatedAt'>): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, createCompanyDto);
  }

  update(id: number, updateCompanyDto: Partial<Omit<Company, 'id' | 'createdAt' | 'updatedAt'>>): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/${id}`, updateCompanyDto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}