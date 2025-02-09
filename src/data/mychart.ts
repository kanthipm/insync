export interface MyChartData {
  patientId: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  race: string;
  location: string;
  dateOfLastAppointment: string;
  bloodPressure: string;
  height: string;
  weight: string;
  recentSymptoms: string;
  familyMedicalHistory: string;
  geneticRiskFactors: string;
  preExistingConditions: string;
  mentalHealthHistory: string;
  currentMedications: string;
  allergies: string;
  immunizationRecords: string;
}

export const patients: { [key: string]: MyChartData } = {
  "P001": {
    patientId: "P001",
    name: "John Doe",
    dateOfBirth: "1985-06-15",
    age: 39,
    gender: "Male",
    race: "African American",
    location: "Raleigh, NC",
    dateOfLastAppointment: "2025-01-20",
    bloodPressure: "118/76 mmHg",
    height: "5'10\"",
    weight: "175 lbs",
    recentSymptoms: "Fatigue, headaches, difficulty concentrating, occasional dizziness",
    familyMedicalHistory: "Father - Hypertension, Mother - Iron-deficiency anemia, Grandfather - Sleep apnea",
    geneticRiskFactors: "Mild predisposition to iron-deficiency anemia, no known major genetic disorders",
    preExistingConditions: "Seasonal Allergies, GERD (Gastroesophageal Reflux Disease)",
    mentalHealthHistory: "Brief episodes of mild stress related to work, no diagnosed anxiety disorders",
    currentMedications: "Omeprazole 20 mg daily (for GERD), Loratadine 10 mg daily (for allergies)",
    allergies: "Penicillin, Pollen",
    immunizationRecords: "COVID-19 (Moderna, last dose 2024-09-12), Influenza (2024-10-01), Tdap (2022-06-15)"
  },
  "P002": {
    patientId: "P002",
    name: "Jane Smith",
    dateOfBirth: "1990-08-25",
    age: 34,
    gender: "Female",
    race: "Caucasian",
    location: "Austin, TX",
    dateOfLastAppointment: "2025-01-18",
    bloodPressure: "120/78 mmHg",
    height: "5'6\"",
    weight: "140 lbs",
    recentSymptoms: "None reported",
    familyMedicalHistory: "No major hereditary conditions, parents with mild hypertension in late 60s",
    geneticRiskFactors: "No known genetic predispositions",
    preExistingConditions: "None",
    mentalHealthHistory: "Occasional mild stress, no diagnosed conditions",
    currentMedications: "None",
    allergies: "None",
    immunizationRecords: "COVID-19 (Pfizer, last dose 2024-10-01), Influenza (2024-10-10), Tdap (2023-06-10)"
  }
};