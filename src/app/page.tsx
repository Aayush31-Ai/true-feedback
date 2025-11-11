"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import Navbar from "@/components/appComponents/Navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";

const HomePage = () => {

  const {data:session} = useSession();
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-black flex flex-col">
      <Navbar/>
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto px-6 md:px-10 py-20">
        {/* Left Content */}
        <div className="text-center md:text-left space-y-6 md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Get Honest <span className="text-gray-800">Anonymous Feedback</span>  
            From Anyone <Rocket 
  className="inline-block mb-3 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
/>

          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto md:mx-0">
            TrueFeedback helps you collect honest opinions from friends, coworkers, or your audience — without revealing identities.  
            Improve yourself through real, unfiltered feedback.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
            <Link href="/sign-up">
              <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2">
                {
                  session? ("Dashboard"):("Get Started")
                }
                 <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Content / Illustration */}
     <div className="md:w-1/2 flex md:mb-15 justify-center mb-10 md:mb-0">
  <Image
    priority
    width={460}
    height={460}
    src="/Sent-Message-bro.svg"
    alt="Feedback illustration"
    className="w-80 md:w-[460px]"
  />
</div>
      </section>

      {/* How it Works Section */}
      <section className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-5xl mx-auto text-center px-6 space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How TrueFeedback Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-3xl font-bold mb-3">1️⃣</div>
              <h3 className="text-xl font-semibold mb-2">Create Your Link</h3>
              <p className="text-gray-600 text-sm">
                Sign up and get your personal TrueFeedback link to share with others.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-3xl font-bold mb-3">2️⃣</div>
              <h3 className="text-xl font-semibold mb-2">Share It Anywhere</h3>
              <p className="text-gray-600 text-sm">
                Post your link on social media, send it to friends, or share in your bio.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-3xl font-bold mb-3">3️⃣</div>
              <h3 className="text-xl font-semibold mb-2">Receive Honest Feedback</h3>
              <p className="text-gray-600 text-sm">
                Get anonymous messages from people and grow through their feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 border-t border-gray-100 text-sm">
        © {new Date().getFullYear()} TrueFeedback · Built with ❤️ by Aayush Pal
      </footer>
    </div>
  );
};

export default HomePage;
