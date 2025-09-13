"use client";

import { ArrowRight, Code, Smartphone, Brain } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Custom Software &{" "}
            <span className="text-blue-600">AI Development</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Trusted software development company since 2014. We deliver custom solutions, 
            mobile apps, AI/ML, and enterprise software for corporates & governments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              View Our Work
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Software</h3>
              <p className="text-gray-600">Tailored solutions for your unique business needs</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Apps</h3>
              <p className="text-gray-600">iOS and Android apps that users love</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI & ML</h3>
              <p className="text-gray-600">Intelligent solutions powered by machine learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}