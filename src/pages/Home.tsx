import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to InSync</h1>
          <p className="text-xl text-gray-600">Your Personal Health Data Assistant</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex justify-center mb-8">
            <Activity size={64} className="text-indigo-600" />
          </div>
          <button
            onClick={() => navigate('/login')}
            className="block w-full max-w-md mx-auto bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Sync with MyChart
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">About InSync</h2>
            <p className="text-gray-600">
              InSync is your comprehensive health data management solution. We help you
              visualize and understand your health information from MyChart, providing
              valuable insights and trends to support your healthcare journey.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Terms & Conditions</h2>
            <p className="text-gray-600">
              By using InSync, you agree to our terms of service regarding data privacy
              and security. We maintain strict confidentiality of your health information
              and comply with all relevant healthcare data protection regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;