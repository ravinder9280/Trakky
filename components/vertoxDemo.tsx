'use client'
import React from "react";
import { Vortex } from "@/components/ui/vortex";
import Link from "next/link";
import { Button } from "./ui/button";

export function VortexDemo() {
  
  return (
    <div className="w-[calc(100%-2rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold text-center">
        Personalized AI Meal Plans        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
        Our AI meal planning system is designed to make meal planning easy and efficient.

        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <Link className='' href={'/mealplan'}>
        <Button size="lg" className="px-6 hover:text-green-300 ">
              Get Started
            </Button>
        </Link>
        <Link className='' href={'/mealplan'}>
        <Button size="lg" variant={"outline"} className="px-6   border-green-500  ">
              Contact Us
            </Button>
        </Link>
        </div>
      </Vortex>
    </div>
  );
}
