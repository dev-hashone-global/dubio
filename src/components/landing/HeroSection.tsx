"use client"

import React, { useState, useRef } from "react";
import circle1 from "../../../public/images/youtubeplayer.png";
import bgwave from "../../../public/images/bgwave.png";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedButton from "../ui/AnimatedButton";
import apiClient from "@/lib/apiClient";
import { AxiosError } from "axios";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await apiClient.post("/launch/waitlist", {
        email: email
      });
      
      setMessage("Successfully signed up for early access!");
      setEmail("");
    } catch (error) {
      console.error("Early access signup error:", error);
      if(error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setMessage("This email is already registered for early access.");
        } else if (error.response?.status === 400) {
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
    <div className="max-w-[1920px] mx-auto h-max lg:py-0 pt-32 pb-10 lg:h-[100vh] flex items-center relative">
      <Image src={bgwave} alt="Dubio" width={1000} height={500} className="absolute top-20 left-0" />
      <div className="max-w-[85%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-40 gap-10 ">
          <div className="text-center lg:text-start my-auto lg:col-span-1 lg:mt-0 relative">
           
            <h1 className="text-white 2xl:text-6xl lg:text-4xl md:text-4xl text-3xl font-bold">
              Dub Your Content into Any Language In Your Own Voice
            </h1>
            <p className="text-white md:text-base text-sm font-normal lg:mt-8 mt-4">
              Expand your audience, grow global revenue, and own your voice.
              Dubio lets you instantly transform your videos into any language
              using AI dubbing and voice cloning — all in seconds.
            </p>

            {/* Email Input and Join Waitlist Button */}
            <form ref={formRef} onSubmit={handleSubmit} className="relative mt-10">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full relative bg-[#2A1F3A] border-[#3D2A50] text-white placeholder:text-gray-400 h-12 sm:h-14 md:h-16 lg:h-[70px] px-6 rounded-full"
                disabled={isLoading}
              />
              <div className="lg:w-max w-full flex justify-center items-center">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="sm:absolute justify-self-center m-auto w-max right-5 lg:right-4 h-max top-1/2 sm:mt-0 mt-4 sm:-translate-y-1/2 bg-transparent hover:bg-transparent p-0"
                >
                  <AnimatedButton />
                </Button>
              </div>
            </form>
            {message && (
                <p className={`mt-4 text-sm ${message.includes("Successfully") ? "text-green-400" : "text-red-400"}`}>
                  {message}
                </p>
              )}
          </div>
          <div className="relative max-w-full lg:col-span-1">
            {/* <div className="absolute -z-10 2xl:-top-[420px] -top-[200px] left-[130%] -translate-x-1/2 2xl:w-[2010px] 2xl:h-[1217px] w-[1010px] h-[717px] object-cover"> */}
            {/* <div className="absolute -z-10 2xl:-top-[420px] -top-[200px] left-[100%] -translate-x-1/2 w-full h-full object-cover">
              <div className="relative">
                <div className="absolute sm:block hidden top-[50%] 2xl:-left-96 -left-56 z-10 2xl:w-[230px] w-[150px] h-[100px]">
                  <Image src={playLeft} alt="Hero" width={230} height={100} />
                </div>
                <div className="absolute sm:block hidden top-[35%] 2xl:left-10 left-5 z-10 2xl:w-[320px] w-[200px] h-[150px]">
                  <Image src={playRight} alt="Hero" width={320} height={150} />
                </div>
                <Image
                  src={circle1}
                  alt="AI Video Editor Animation"
                  width={1010}
                  height={717}
                  className=" 2xl:-top-[420px] -top-[200px] left-[38%] -translate-x-1/2 2xl:w-[2010px] 2xl:h-[1217px] sm:w-[1010px] sm:h-[717px] w-[517px] h-[517px] object-cover object-center"
                  //   className="-z-10 absolute 2xl:-top-[420px] -top-[200px] left-[38%] -translate-x-1/2 2xl:w-[2010px] 2xl:h-[1217px] w-[1010px] h-[717px] object-cover"
                />
                <div className="absolute 2xl:top-9 top-3 sm:top-5 2xl:right-[17%] right-[125px] z-10 w-full h-full flex justify-start items-center ml-[25%] bg-transparent">
                  <Image
                    src={play}
                    alt="Play"
                    width={250}
                    height={250}
                    className="bg-transparent "
                  />
                </div>
              </div>
            </div> */}
            <Image src={circle1} alt="AI Video Editor Animation" width={760} height={450}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
