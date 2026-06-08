"use client";

import React, { useState } from "react";
import { User, Mail, Shield, Key, Camera, Save, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@govia.com",
    phone: "+1 (555) 123-4567",
    role: "Super Administrator",
    agency: "Govia Administration",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Add API call here
    console.log("Profile saved", profileData);
  };

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Add API call here
    console.log("Password changed");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Profile Settings</h1>
        <p className="text-slate-500 mt-2 text-base">
          Manage your account information and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Info Summary */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center">
            <div className="relative group cursor-pointer mb-4">
              <div className="w-24 h-24 bg-[#1554ad] text-white rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg overflow-hidden">
                {profileData.firstName[0]}
                {profileData.lastName[0]}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-sm text-slate-500 mb-4">{profileData.role}</p>

            <div className="w-full space-y-3 mt-2 border-t border-slate-100 pt-4 text-left">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="truncate">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Shield className="w-4 h-4 text-slate-400" />
                <span>{profileData.agency}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          
          {/* Profile Form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#1554ad]" />
                <h3 className="font-bold text-slate-800">Personal Information</h3>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm font-medium text-[#1554ad] hover:text-[#11438a] transition-colors"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
            
            <form onSubmit={saveProfile} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#1554ad] hover:bg-[#11438a] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Security Form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center gap-2 bg-slate-50/50">
              <Key className="w-5 h-5 text-[#1554ad]" />
              <h3 className="font-bold text-slate-800">Security</h3>
            </div>
            
            <form onSubmit={changePassword} className="p-6">
              <div className="space-y-5 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Current Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
