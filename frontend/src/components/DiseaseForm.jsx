import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Upload } from 'lucide-react';

const DiseaseForm = () => {
    const { user } = useAuth();
    const [crop, setCrop] = useState('Rice');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                '/api/advisory/disease',
                { crop }, // Replace with FormData in real app
                { headers: { 'x-auth-token': token } }
            );
            setPrediction(res.data.prediction);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-white via-green-50 to-green-100 p-8 rounded-3xl border border-green-300 shadow-2xl w-full max-w-2xl overflow-auto transform transition duration-500 hover:scale-105 hover:shadow-3xl">
                
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 animate-pulse drop-shadow-lg">
                    🌿 Disease Detection
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Crop Selector */}
                   <div className="relative w-full">
  <select
    className="
      w-full
      appearance-none 
      border-2 border-green-300 
      rounded-xl 
      px-4 py-3 pr-10
      bg-white 
      text-gray-800 
      font-medium 
      text-base
      focus:outline-none 
      focus:ring-2 focus:ring-green-400 
      focus:border-transparent 
      shadow-sm 
      hover:shadow-md 
      transition-all duration-300 
      cursor-pointer
    "
    value={crop}
    onChange={(e) => setCrop(e.target.value)}
  >
    <option value="">Select a Crop</option>
    <option value="Wheat">Wheat</option>
    <option value="Maize">Maize</option>
    <option value="Rice">Rice</option>
    <option value="Barley">Barley</option>
    <option value="Soybean">Soybean</option>
    <option value="Cotton">Cotton</option>
    <option value="Sugarcane">Sugarcane</option>
    <option value="Millets">Millets</option>
  </select>

  {/* Custom dropdown arrow */}
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
    <svg
      className="w-5 h-5 text-green-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
        clipRule="evenodd"
      />
    </svg>
  </div>
</div>


                    {/* Image Upload */}
                    <div className="relative border-2 border-dashed border-green-300 rounded-2xl p-6 text-center cursor-pointer hover:bg-green-50 transition shadow-sm hover:shadow-md">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-2xl"
                        />
                        {preview ? (
                            <img src={preview} alt="Preview" className="mx-auto h-48 object-contain rounded-lg shadow-sm" />
                        ) : (
                            <div className="text-green-500 flex flex-col items-center justify-center">
                                <Upload className="h-10 w-10 mb-2 animate-bounce" />
                                <span className="text-sm font-medium">Click to upload Leaf Image</span>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!image || loading}
                        className="cursor-pointer w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl transition-all duration-300 text-lg disabled:opacity-80"
                    >
                        {loading ? 'Scanning...' : 'Detect Disease'}
                    </button>
                </form>

                {/* Prediction Result */}
                {prediction && (
                    <div className="mt-6 p-5 bg-gradient-to-r from-yellow-100 via-pink-100 to-red-200 border border-yellow-300 rounded-2xl text-center shadow-md transform transition duration-300 hover:scale-105">
                        <p className="text-lg font-bold text-yellow-700 animate-pulse">{prediction}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiseaseForm;
