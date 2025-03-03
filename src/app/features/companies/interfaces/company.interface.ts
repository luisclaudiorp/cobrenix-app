export interface Company {
  id?: number;
  name: string;
  email: string;
  active?: boolean;
  config?: object;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompanyFilters {
  name?: string;
  email?: string;
  id?: number;
  active?: boolean;
}