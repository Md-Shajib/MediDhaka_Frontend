import React from 'react';

interface DoctorCardProps {
  name: string;
  specialty: string;
  hospital: string;
  phone?: string;
  email?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialty, hospital, phone, email }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-blue-800">{name}</h3>
      <p className="text-sm text-gray-600">{specialty}</p>
      <p className="text-sm text-gray-500 mt-1">Hospital: {hospital}</p>
      {phone && <p className="text-sm text-gray-500">📞 {phone}</p>}
      {email && <p className="text-sm text-gray-500">✉️ {email}</p>}
    </div>
  );
};

export default DoctorCard;
