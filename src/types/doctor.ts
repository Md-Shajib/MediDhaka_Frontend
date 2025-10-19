export interface Doctor {
  doctor_id: number;
  name: string;
  specialty: string;
  years_experience: number;
  phone_number: string;
  email: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface DoctorFormData {
  name: string;
  specialty: string;
  years_experience: number;
  phone_number: string;
  email: string;
  image_url?: string;
}

export interface HospitalDoctorRelation {
  hospital_id: number;
  doctor_id: number;
  role: string;
}

export interface DoctorPagination {
  page: number;
  limit: number;
  search: string;
}

export interface DoctorResponse {
  data: Doctor[];
  total: number;
  page: number;
  limit: number;
}

export interface DoctorWithHospitals extends Doctor {
  hospitals?: {
    hospital_id: number;
    hospital_name: string;
    role: string;
  }[];
}

export interface DoctorFormErrors {
  name?: string;
  specialty?: string;
  years_experience?: string;
  phone_number?: string;
  email?: string;
  image_url?: string;
}

export interface DoctorData {
  id: string;
  name: string;
  img_url: string;
  specialty: string;
  hospitalName: string;
  phone: string;
  email: string;
}