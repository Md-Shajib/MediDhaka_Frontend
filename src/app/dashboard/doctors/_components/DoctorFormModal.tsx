"use client";
import { useEffect, useState } from "react";
import {
  X,
  Stethoscope,
  Award,
  Phone,
  Mail,
  Image as ImageIcon,
  Loader2,
  Building2,
  Briefcase,
  Plus,
  Trash2,
} from "lucide-react";
import {
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useCreateHospitalDoctorRelationMutation,
  useGetDoctorHospitalsQuery,
  useDeleteHospitalDoctorRelationMutation,
} from "@/store/service/doctor.service";
import { useGetHospitalsQuery } from "@/store/service/hospital.service";
import { DoctorFormData, DoctorFormErrors } from "@/types/doctor";

interface DoctorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: number | null;
}

interface HospitalAssignment {
  hospital_id: number;
  role: string;
}

export default function DoctorFormModal({
  isOpen,
  onClose,
  doctorId,
}: DoctorFormModalProps) {
  const [formData, setFormData] = useState<DoctorFormData>({
    name: "",
    specialty: "",
    years_experience: 0,
    phone_number: "",
    email: "",
    image_url: "",
  });

  const [hospitalAssignments, setHospitalAssignments] = useState<HospitalAssignment[]>([]);
  const [errors, setErrors] = useState<Partial<DoctorFormErrors>>({});

  const { data: doctor, isLoading: isFetchingDoctor } = useGetDoctorByIdQuery(doctorId!, {
    skip: !doctorId,
  });

  const { data: hospitalsResponse } = useGetHospitalsQuery({
    page: 1,
    limit: 1000,
    search: "",
  });
  const hospitals = hospitalsResponse?.data || [];

  const { data: existingHospitals = [] } = useGetDoctorHospitalsQuery(doctorId!, {
    skip: !doctorId,
  });

  const [createDoctor, { isLoading: isCreating }] = useCreateDoctorMutation();
  const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation();
  const [createRelation] = useCreateHospitalDoctorRelationMutation();
  const [deleteRelation] = useDeleteHospitalDoctorRelationMutation();

  const isEditing = !!doctorId;
  const isSubmitting = isCreating || isUpdating;

  // Populate form when editing
  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name,
        specialty: doctor.specialty,
        years_experience: doctor.years_experience,
        phone_number: doctor.phone_number,
        email: doctor.email,
        image_url: doctor.image_url || "",
      });
    }
  }, [doctor]);

  // Load existing hospital assignments
  useEffect(() => {
    if (existingHospitals && existingHospitals.length > 0) {
      setHospitalAssignments(
        existingHospitals.map((h: any) => ({
          hospital_id: h.hospital_id,
          role: h.role || "",
        }))
      );
    }
  }, [existingHospitals]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        specialty: "",
        years_experience: 0,
        phone_number: "",
        email: "",
        image_url: "",
      });
      setHospitalAssignments([]);
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "years_experience" ? parseInt(value) || 0 : value,
    }));
    if (errors[name as keyof DoctorFormData]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const addHospitalAssignment = () => {
    setHospitalAssignments((prev) => [...prev, { hospital_id: 0, role: "" }]);
  };

  const removeHospitalAssignment = (index: number) => {
    setHospitalAssignments((prev) => prev.filter((_, i) => i !== index));
  };

  const updateHospitalAssignment = (index: number, field: keyof HospitalAssignment, value: any) => {
    setHospitalAssignments((prev) =>
      prev.map((assignment, i) =>
        i === index
          ? { ...assignment, [field]: field === "hospital_id" ? parseInt(value) : value }
          : assignment
      )
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DoctorFormErrors> = {};

    if (!formData.name.trim()) newErrors.name = "Doctor name is required";
    if (!formData.specialty.trim()) newErrors.specialty = "Specialty is required";
    if (formData.years_experience < 0) newErrors.years_experience = "Experience must be positive";
    if (!formData.phone_number.trim()) newErrors.phone_number = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let savedDoctorId = doctorId;

      if (isEditing) {
        await updateDoctor({ id: doctorId, data: formData }).unwrap();
      } else {
        const newDoctor = await createDoctor(formData).unwrap();
        savedDoctorId = newDoctor.doctor_id;
      }

      // Handle hospital assignments
      if (savedDoctorId && hospitalAssignments.length > 0) {
        // Delete old relations when editing
        if (isEditing && existingHospitals?.length > 0) {
          for (const rel of existingHospitals) {
            await deleteRelation({
              doctorId: savedDoctorId,
              hospitalId: rel.hospital_id,
            }).unwrap();
          }
        }

        // Create new relations
        for (const assignment of hospitalAssignments) {
          if (assignment.hospital_id && assignment.role.trim()) {
            await createRelation({
              doctor_id: savedDoctorId,
              hospital_id: assignment.hospital_id,
              role: assignment.role,
            }).unwrap();
          }
        }
      }

      onClose();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-blue-600" />
          {isEditing ? "Edit Doctor" : "Add Doctor"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Doctor Info Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 font-medium">
                <Stethoscope className="w-4 h-4" /> Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium">
                <Award className="w-4 h-4" /> Specialty
              </label>
              <input
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
              {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium">
                <Briefcase className="w-4 h-4" /> Experience (Years)
              </label>
              <input
                type="number"
                name="years_experience"
                value={formData.years_experience}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium">
                <Phone className="w-4 h-4" /> Phone
              </label>
              <input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
              {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium">
                <Mail className="w-4 h-4" /> Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium">
                <ImageIcon className="w-4 h-4" /> Image URL
              </label>
              <input
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
            </div>
          </div>

          {/* Hospital Assignments */}
          <div className="mt-4">
            <label className="flex items-center gap-2 font-medium mb-2">
              <Building2 className="w-4 h-4" /> Assigned Hospitals
            </label>

            {hospitalAssignments.map((assignment, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <select
                  value={assignment.hospital_id}
                  onChange={(e) =>
                    updateHospitalAssignment(index, "hospital_id", e.target.value)
                  }
                  className="border p-2 rounded-md w-1/2"
                >
                  <option value={0}>Select Hospital</option>
                  {hospitals.map((h: any) => (
                    <option key={h.hospital_id} value={h.hospital_id}>
                      {h.name}
                    </option>
                  ))}
                </select>
                <input
                  placeholder="Role"
                  value={assignment.role}
                  onChange={(e) => updateHospitalAssignment(index, "role", e.target.value)}
                  className="border p-2 rounded-md w-1/2"
                />
                <button
                  type="button"
                  onClick={() => removeHospitalAssignment(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addHospitalAssignment}
              className="text-blue-600 flex items-center gap-1 mt-2"
            >
              <Plus className="w-4 h-4" /> Add Hospital
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
