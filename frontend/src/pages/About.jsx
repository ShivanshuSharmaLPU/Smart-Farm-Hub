import React from "react";

const About = () => {
  const cards = [
    {
      title: "Data-Driven Decisions",
      description:
        "The Crop Prediction System empowers farmers to select the best crops using soil and weather data, helping improve yields and reduce risks.",
    },
    {
      title: "Machine Learning Insights",
      description:
        "Advanced machine learning algorithms analyze historical data and environmental factors, providing accurate crop recommendations.",
    },
    {
      title: "Tailored Guidance",
      description:
        "Farmers can input parameters like soil type, rainfall, and temperature to receive personalized advice on crop selection and planting schedules.",
    },
    {
      title: "Sustainable Agriculture",
      description:
        "Our goal is to modernize farming by combining technology and agronomy, enabling smart, sustainable, and profitable agriculture.",
    },
  ];

  return (
    <div className="min-h-screen w-full pt-24 bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-6 flex flex-col items-center">

      {/* Page Heading with Gradient Text */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-green-500 to-green-700 animate-pulse drop-shadow-lg text-center">
        About Crop Prediction System
      </h1>

      {/* Cards Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
  {cards.map((card, index) => (
    <div
      key={index}
className="bg-gradient-to-br from-green-500 via-green-400 to-green-600 border-l-8 border-lime-300 text-gray-900 rounded-3xl shadow-2xl p-6 transform transition duration-500 hover:scale-105 hover:shadow-3xl hover:-translate-y-2 cursor-pointer"

    >
      <h2 className="text-2xl font-bold mb-4">
        {card.title}
      </h2>
    <p className="leading-relaxed text-gray-800 transition-colors duration-300 hover:text-gray-900">

        {card.description}
      </p>
    </div>
  ))}
</div>



      {/* Footer Note with Gradient Hover */}
      <p className="mt-12 text-sm italic opacity-80 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-green-700 transition-opacity duration-300 hover:opacity-100 text-center">
        Empowering farmers with data-driven insights for a sustainable future.
      </p>
    </div>
  );
};

export default About;
