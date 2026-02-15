import React from "react";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex items-center justify-center p-6">
      <div className="bg-gradient-to-br from-white via-green-50 to-green-100 rounded-3xl shadow-2xl max-w-lg w-full p-10 transform transition duration-500 hover:scale-105 hover:shadow-3xl">
        {/* Heading with Gradient Text */}
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-lime-500 to-green-700 animate-pulse drop-shadow-md">
          Contact Us
        </h1>

        {/* Form */}
        <form className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-green-500 animate-bounce" />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full pl-10 pr-3 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-green-500 animate-bounce delay-75" />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full pl-10 pr-3 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
            />
          </div>

          {/* Message Field */}
          <div className="relative">
            <FaCommentDots className="absolute top-3 left-3 text-green-500 animate-bounce delay-150" />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full pl-10 pr-3 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold py-3 rounded-xl hover:from-lime-500 hover:to-green-600 hover:shadow-xl transition-all duration-300 text-lg"
          >
            Send Message
          </button>
        </form>

        {/* Footer Note */}
        <p className="mt-6 text-center text-sm italic text-green-700 opacity-80 hover:opacity-100 transition duration-300">
          We’d love to hear from you! Your feedback helps us improve.
        </p>
      </div>
    </div>
  );
};

export default Contact;
