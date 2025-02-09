import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Send } from 'lucide-react';
import { patients } from '../data/mychart';

const Chatbot = () => {
  const navigate = useNavigate();
  const currentPatientId = sessionStorage.getItem('currentPatientId');
  const patientData = currentPatientId ? patients[currentPatientId] : null;

  if (!patientData) {
    navigate('/login');
    return null;
  }

  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: `Hello ${patientData.name}! I'm your health assistant. How can I help you today?`, isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);

    // Simulate bot response based on keywords
    setTimeout(() => {
      let response = "I'm sorry, I don't understand. Could you please rephrase that?";
      
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes('appointment')) {
        response = `Your last appointment was on ${patientData.dateOfLastAppointment}. Would you like to schedule a new one?`;
      } else if (lowercaseInput.includes('blood pressure')) {
        response = `Your last blood pressure reading was ${patientData.bloodPressure}.`;
      } else if (lowercaseInput.includes('weight')) {
        response = `Your current weight is ${patientData.weight}.`;
      } else if (lowercaseInput.includes('medication')) {
        response = `Current medications: ${patientData.currentMedications}`;
      } else if (lowercaseInput.includes('immunization') || lowercaseInput.includes('vaccine')) {
        response = `Here are your immunization records: ${patientData.immunizationRecords}`;
      } else if (lowercaseInput.includes('symptom')) {
        response = `Recent symptoms: ${patientData.recentSymptoms}`;
      } else if (lowercaseInput.includes('allerg')) {
        response = `Your allergies: ${patientData.allergies}`;
      }

      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-indigo-600 text-white flex items-center gap-2">
            <MessageCircle size={24} />
            <h2 className="text-xl font-semibold">Health Assistant</h2>
          </div>

          <div className="h-[600px] flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;