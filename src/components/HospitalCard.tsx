import React from 'react';

interface HospitalCardProps {
  name: string;
  location: string;
  phone?: string;
  email?: string;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ name, location, phone, email }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-blue-800">{name}</h3>
      <p className="text-sm text-gray-600">📍 {location}</p>
      {phone && <p className="text-sm text-gray-500 mt-1">📞 {phone}</p>}
      {email && <p className="text-sm text-gray-500">✉️ {email}</p>}
    </div>
  );
};

export default HospitalCard;
