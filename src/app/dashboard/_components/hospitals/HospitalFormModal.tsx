"use client";
import { useEffect, useState } from "react";
import { X, Building2, MapPin, Phone, Mail, Image as ImageIcon, Loader2 } from "lucide-react";
import { useCreateHospitalMutation, useGetHospitalsByIdQuery, useUpdateHospitalMutation } from "@/store/service/hospital.service";
import { HospitalFormData } from "@/types/hospital";

interface HospitalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospitalId: number | null;
}

export default function HospitalFormModal({
  isOpen,
  onClose,
  hospitalId,
}: HospitalFormModalProps) {
  const [formData, setFormData] = useState<HospitalFormData>({
    name: "",
    address: "",
    phone_number: "",
    email: "",
    image_url: "",
  });

  const [errors, setErrors] = useState<Partial<HospitalFormData>>({});

  const { data: hospital, isLoading: isFetchingHospital } = useGetHospitalsByIdQuery(
    hospitalId!,
    { skip: !hospitalId }
  );

  const [createHospital, { isLoading: isCreating }] = useCreateHospitalMutation();
  const [updateHospital, { isLoading: isUpdating }] = useUpdateHospitalMutation();

  const isEditing = !!hospitalId;
  const isSubmitting = isCreating || isUpdating;

  // Populate form when editing
  useEffect(() => {
    if (hospital) {
      setFormData({
        name: hospital.name,
        address: hospital.address,
        phone_number: hospital.phone_number,
        email: hospital.email,
        image_url: hospital.image_url || "",
      });
    }
  }, [hospital]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        address: "",
        phone_number: "",
        email: "",
        image_url: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof HospitalFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<HospitalFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Hospital name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    }

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

    console.log("Updating hospital with ID:", hospitalId, formData);

    try {
      if (isEditing) {
        
        await updateHospital({ id: hospitalId, data: formData }).unwrap();
      } else {
        await createHospital(formData).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Failed to save hospital:", error);
      alert("Failed to save hospital. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Building2 size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? "Edit Hospital" : "Add New Hospital"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Form */}
        {isFetchingHospital ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Hospital Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Building2 size={16} className="text-teal-800" />
                Hospital Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter hospital name"
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={16} className="text-teal-800" />
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all resize-none ${
                  errors.address
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Phone size={16} className="text-teal-800" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all ${
                  errors.phone_number
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                }`}
              />
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} className="text-teal-800" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <ImageIcon size={16} className="text-teal-800" />
                Image URL (Optional)
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              />
              <p className="mt-1 text-xs text-gray-500">
                Provide a direct URL to the hospital image
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-teal-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{isEditing ? "Update Hospital" : "Create Hospital"}</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}