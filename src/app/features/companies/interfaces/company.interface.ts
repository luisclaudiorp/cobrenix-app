export interface Company {
  id?: number;
  name: string;
  email: string;
  active?: boolean;
  config?: {
    employees?: number;
    [key: string]: any;
  };
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompanyFilters {
  name?: string;
  email?: string;
  id?: number;
  active?: boolean;
}