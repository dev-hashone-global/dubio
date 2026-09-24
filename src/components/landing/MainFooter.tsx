"use client"

import React, { useState } from "react";
import apiClient from "@/lib/apiClient";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedButton from "../ui/AnimatedButton";
import logo from "../../../public/images/mainlogo.png";
import Image from "next/image";
const MainFooter = () => {
  // Add state and logic for email signup
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      await apiClient.post("/launch/waitlist", { email });
      setMessage("Successfully signed up for early access!");
      setEmail("");
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { status?: number } };
        if (err.response?.status === 409) {
          setMessage("This email is already registered for early access.");
        } else if (err.response?.status === 400) {
          setMessage("Please enter a valid email address.");
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer
      className="w-full py-12 md:py-16 lg:py-20"
      style={{
        background:
          "linear-gradient(360deg, rgba(32, 24, 101, 0) 30%, #702CFD 100%)",
      }}
    >
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:font-extrabold font-bold mb-4 md:mb-6 leading-tight">
            Be among the first 100 creators
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            to try Dubio
          </h2>
          <p className="text-white/80 text-base font-normal mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Join the waitlist and get exclusive early access when we launch
          </p>

          {/* Email Signup */}
          <form onSubmit={handleSubmit} className="relative max-w-sm sm:max-w-md md:max-w-xl md:h-16 lg:h-[70px] mx-auto px-4 sm:px-0">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-[#2A1F3A] border-[#3D2A50] text-white placeholder:text-gray-300 
                       h-12 sm:h-14 md:h-16 lg:h-[70px] 
                       px-4 sm:px-6 pr-0 md:pr-40 lg:pr-48 
                       rounded-full text-sm sm:text-base md:text-lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
            />
              <Button 
                  type="submit"
                  disabled={isLoading}
                  className="sm:absolute justify-self-center m-auto w-max right-5 lg:right-4 h-max top-1/2 sm:mt-0 mt-4 sm:-translate-y-1/2 bg-transparent hover:bg-transparent p-0"
                >
                  <AnimatedButton />
                </Button>
          </form>
          {message && (
                <p className={`mt-4 text-sm ${message.includes("Successfully") ? "text-green-400" : "text-red-400"}`}>
                  {message}
                </p>
              )}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 md:gap-4 pt-8 md:pt-16">
          {/* Left Side - Branding */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              src={logo}
              alt="Dubio Logo"
              width={100}
              height={100}
              className="w-20 sm:w-24 h-auto md:w-40 object-contain"
              unoptimized
            />
            <p className="text-white/70 text-sm md:text-base text-center md:text-left">
              The future of creator voice technology
            </p>
            <p className="text-white/60 text-xs md:text-sm text-center md:text-left mt-2">
              20 Collyer Quay, #09-01, 20 Collyer Quay, Singapore 049319
            </p>
          </div>

          {/* Right Side - Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <p className="text-white/70 text-sm md:text-base mb-3 md:mb-4">
              Find us on Social
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/dubio.ai"
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Follow us on Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  className="sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/dubioai"
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Follow us on Facebook"
              >
                <svg
                  width="20"
                  height="20"
                  className="sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com/dubioai"
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Follow us on Twitter"
              >
                <svg
                  width="20"
                  height="20"
                  className="sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/dubio-ai"
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Follow us on GitHub"
              >
                <svg
                  width="20"
                  height="20"
                  className="sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
      </div>
      <div className="text-center pt-6 md:pt-8 mt-8 md:mt-12 border-t border-white/10">
        <p className="text-white/60 text-sm md:text-base">
          © Copyright 2025 All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default MainFooter;
