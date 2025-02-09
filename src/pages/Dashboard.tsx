import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patients } from '../data/mychart';
import DataVisualization from '../components/DataVisualization';
import { Activity, Heart, Weight, Calendar, Syringe, AlertCircle, History, User, LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const currentPatientId = sessionStorage.getItem('currentPatientId');
  const patientData = currentPatientId ? patients[currentPatientId] : null;
  const [selectedCsvFile, setSelectedCsvFile] = useState('blood_oxygen.csv');
  const csvFiles = [
    'blood_oxygen.csv',
    'exercise_minutes.csv',
    'heart_rate.csv',
    'hrv_trend.csv',
    'respiratory.csv',
    'sleep_hours.csv',
    'wrist_temp.csv',
  ];

  if (!patientData) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem('currentPatientId');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
            <p className="text-gray-500">Welcome back, {patientData.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h2 className="text-xl font-semibold text-gray-700">{patientData.name}</h2>
              <p className="text-gray-500">Patient ID: {patientData.patientId}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <Activity className="text-indigo-600" size={24} />
              <h3 className="text-xl font-semibold">Blood Pressure</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{patientData.bloodPressure}</p>
            <p className="text-sm text-gray-500">Last Reading</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <Weight className="text-indigo-600" size={24} />
              <h3 className="text-xl font-semibold">Weight</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{patientData.weight}</p>
            <p className="text-sm text-gray-500">Current Weight</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="text-indigo-600" size={24} />
              <h3 className="text-xl font-semibold">Last Visit</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {new Date(patientData.dateOfLastAppointment).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Last Appointment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <User className="text-indigo-600" size={24} />
              <h3 className="text-xl font-semibold">Personal Information</h3>
            </div>
            <div className="space-y-3">
              <p><span className="font-semibold">Age:</span> {patientData.age}</p>
              <p><span className="font-semibold">Gender:</span> {patientData.gender}</p>
              <p><span className="font-semibold">Race:</span> {patientData.race}</p>
              <p><span className="font-semibold">Location:</span> {patientData.location}</p>
              <p><span className="font-semibold">Height:</span> {patientData.height}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <History className="text-indigo-600" size={24} />
              <h3 className="text-xl font-semibold">Medical History</h3>
            </div>
            <div className="space-y-3">
              <p><span className="font-semibold">Family History:</span> {patientData.familyMedicalHistory}</p>
              <p><span className="font-semibold">Genetic Risks:</span> {patientData.geneticRiskFactors}</p>
              <p><span className="font-semibold">Pre-existing Conditions:</span> {patientData.preExistingConditions}</p>
              <p><span className="font-semibold">Mental Health:</span> {patientData.mentalHealthHistory}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <Syringe className="text-indigo-600" size={24} />
              <h3 className="text-xl font-semibold">Immunization Records</h3>
            </div>
            <p className="text-gray-700 whitespace-pre-line">
              {patientData.immunizationRecords.split(',').map((record, index) => (
                <span key={index} className="block mb-2">• {record.trim()}</span>
              ))}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <AlertCircle className="text-indigo-600" size={24} />
              <h3 className="text-xl font-semibold">Allergies & Medications</h3>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Allergies:</h4>
                <p className="text-gray-700">{patientData.allergies}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Current Medications:</h4>
                <p className="text-gray-700">{patientData.currentMedications}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="csvFile" className="block text-gray-700 text-sm font-bold mb-2">
            Select CSV File:
          </label>
          <select
            id="csvFile"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedCsvFile}
            onChange={(e) => setSelectedCsvFile(e.target.value)}
          >
            {csvFiles.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
        </div>

        <DataVisualization csvFile={selectedCsvFile} />
      </div>
    </div>
  );
};

export default Dashboard;
