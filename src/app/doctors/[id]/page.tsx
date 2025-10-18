'use client';
import React, { useState, useEffect, use } from 'react';
import { Mail, Phone, Briefcase, Star, Clock, User, ArrowLeft, Loader2 } from 'lucide-react';
import ContactItem from './_components/ContactItem';
import { useGetDoctorByIdQuery } from '@/store/service/doctor.service';

interface PageProps {
  params: Promise<{ id: string }>;
}


export default function DoctorDetailsPage ({ params }: PageProps) {
  const { id } = use(params);
  const doctorId = parseInt(id);

  const { data: doctor, isLoading, error } = useGetDoctorByIdQuery(doctorId)
  const isError = !!error;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-xl text-indigo-700 font-semibold">Loading Doctor Details...</p>
      </div>
    );
  }

  if (isError || !doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <p className="text-xl text-red-500 font-semibold mb-4">Error</p>
        <p className="text-gray-600">"Doctor data could not be retrieved."</p>
        <button 
            onClick={() => window.history.back()} 
            className="mt-6 text-indigo-600 hover:text-indigo-800 transition-colors flex items-center p-2 rounded-lg border border-indigo-400"
            aria-label="Go back"
        >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="font-medium">Go Back</span>
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-['Inter']">
      
      {/* Back Button (Mock functionality) */}
      <button 
        onClick={() => window.history.back()} 
        className="self-start mb-6 text-indigo-600 hover:text-indigo-800 transition-colors flex items-center p-2 rounded-lg"
        aria-label="Go back to list"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span className="font-medium">Back to Directory</span>
      </button>

      {/* Main Detail Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-transform duration-500 hover:shadow-3xl">
        
        {/* Header Section */}
        <div className="bg-indigo-600 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-8">
          
          {/* Doctor Image / Avatar */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              src={doctor.image_url}
              alt={`Profile picture of ${doctor.name}`}
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              onError={(e) => {
                e.currentTarget.onerror = null; 
                e.currentTarget.src = `https://placehold.co/200x200/4F46E5/ffffff?text=${doctor.name[0]}`;
              }}
            />
            {/* Status Badge - Illustration */}
            <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full ring-2 ring-white bg-green-400 animate-pulse" title="Available"></span>
          </div>

          {/* Name and Primary Role */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {doctor.name}
            </h1>
            <p className="mt-1 text-xl font-light text-indigo-200">
              {doctor.specialty}
            </p>
            <div className="mt-3 flex items-center justify-center md:justify-start space-x-2">
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span className="text-lg font-semibold text-white">4.9</span>
              <span className="text-indigo-200">(158 reviews)</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          
          {/* 1. Contact Information (Left Column - Spans two-thirds on large screens) */}
          <div className="lg:col-span-2 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <User className="w-6 h-6 text-indigo-600" />
                <span>Personal & Contact Details</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                <ContactItem icon={Mail} label="Email Address" value={doctor.email} />
                <ContactItem icon={Phone} label="Contact Number" value={doctor.phone_number} />
                <ContactItem icon={Briefcase} label="Years of Practice" value={`${doctor.years_experience} Years`} />
                <ContactItem icon={Clock} label="Member Since" value={new Date(doctor.created_at).toLocaleDateString()} />
            </div>

            {/* Illustration/Description */}
            <div className="mt-8 pt-4 border-t border-gray-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">About Dr. {doctor.name.split(' ')[0]}</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                    Dr. {doctor.name.split(' ')[0]} is a highly dedicated professional specializing in {doctor.specialty} with a focus on cutting-edge techniques and patient-centered care. 
                    With {doctor.years_experience} years of experience, {doctor.name.split(' ')[0]} is committed to delivering excellence and innovation in their field. 
                    They are currently accepting new clients and look forward to assisting you.
                </p>
                <p className="mt-3 text-sm text-indigo-500 font-medium">
                    "Excellence is not a skill, it is an attitude."
                </p>
            </div>
          </div>

          {/* 2. Quick Actions / Sidebar (Right Column - Spans one-third on large screens) */}
          <div className="p-6 sm:p-8 bg-indigo-50">
            <h2 className="text-xl font-bold text-indigo-700 mb-5">Quick Actions</h2>
            
            <div className="space-y-4">
                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02]">
                    Book Appointment
                </button>
                <button className="w-full bg-white border border-indigo-400 text-indigo-600 font-semibold py-3 px-4 rounded-lg shadow-sm transition duration-200 hover:bg-indigo-100">
                    Send a Message
                </button>
                <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg shadow-sm transition duration-200 hover:bg-gray-100">
                    View Office Location
                </button>
            </div>

            {/* Availability Illustration */}
            <div className="mt-8 p-4 bg-white rounded-lg border-l-4 border-green-500 shadow-inner">
                <h3 className="text-lg font-semibold text-green-700">Today's Availability</h3>
                <p className="text-gray-600 text-sm mt-1">
                    Dr. {doctor.name.split(' ')[0]} is available for consultation between 9:00 AM - 1:00 PM and 3:00 PM - 5:00 PM.
                </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};