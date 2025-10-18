// Core Hospital Type
export interface Hospital {
  hospital_id: number;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

// Pagination Parameters
export interface HospitalPagination {
  page: number;
  limit: number;
  search: string;
}

// API Response Type
export interface HospitalResponse {
  data: Hospital[];
  total: number;
  page: number;
  limit: number;
  hasMore?: boolean;
}

// Form Types (if needed for create/update)
export interface HospitalFormData {
  name: string;
  address: string;
  phone_number: string;
  email: string;
  image_url?: string;
}

// Filter Types
export interface HospitalFilters {
  search?: string;
  location?: string;
  services?: string[];
  sortBy?: 'name' | 'created_at' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
}