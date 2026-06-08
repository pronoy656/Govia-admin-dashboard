"use client";
import Image from "next/image";
import { PropsWithChildren } from "react";

type AuthLayoutShellProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
}>;

export default function AuthLayoutShell({
  children,
}: AuthLayoutShellProps) {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-white text-black">
      {/* Left Side: Hero Image and Text */}
      <div className="relative hidden md:flex flex-col justify-end p-12 overflow-hidden bg-[#002D54]">
        <Image
          src="/govia-hero.png"
          alt="Government and civic administration dashboard"
          priority
          fill
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001122]/95 via-[#001e40]/60 to-[#002D54]/30" />

        {/* Text Content over Image */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Empowering Administration Through Intelligent Data
          </h1>
          <p className="text-lg text-blue-50/80 leading-relaxed font-medium">
            Join civic leaders and law enforcement professionals using Govia
            to streamline operations, monitor incidents, and improve community safety.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-[500px] flex flex-col items-center text-center">
          {/* Logo Section */}
          <div className="mb-12">
            <Image
              src="/image 1 (1).png"
              alt="Govia Logo"
              width={160}
              height={160}
              className="object-contain w-auto h-32"
              priority
            />
          </div>

          {/* Form Content */}
          <div className="w-full text-left text-black">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
