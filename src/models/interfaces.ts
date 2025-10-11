export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospitalName: string;
  phone: string;
  email: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
}
