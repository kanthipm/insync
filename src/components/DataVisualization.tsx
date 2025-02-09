import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataVisualizationProps {
  csvFile: string;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ csvFile }) => {
  const [csvData, setCsvData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/src/data/p001/${csvFile}`);
      const reader = response.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder('utf-8');
      const csvText = decoder.decode(result?.value);

      Papa.parse(csvText, {
        header: true,
        complete: (results: Papa.ParseResult<any>) => {
          console.log('CSV Data:', results.data);
          // Group data by date and calculate average heart rate
          const groupedData: { [key: string]: { total: number; count: number } } = {};
          results.data.forEach((row: any) => {
            const date = moment(row['Timestamp']).format('YYYY-MM-DD');
            if (!groupedData[date]) {
              groupedData[date] = {
                total: 0,
                count: 0,
              };
            }
            const dataValue = parseFloat(row[dataColumnMap[csvFile]]);
            if (!isNaN(dataValue)) {
              groupedData[date].total += dataValue;
              groupedData[date].count++;
            }
          });

          // Calculate average heart rate for each day
          const averageData = Object.keys(groupedData).map((date) => ({
            date,
            average: groupedData[date].total / groupedData[date].count,
          }));

          setCsvData(averageData);
        },
      });
    };

    fetchData();
  }, [csvFile]);

  const dataColumnMap = {
    'blood_oxygen.csv': 'Blood Oxygen Saturation (%)',
    'breathing_disturbances.csv': 'Breathing Disturbances',
    'exercise_minutes.csv': 'Exercise Minutes',
    'heart_rate.csv': 'Heart Rate (bpm)',
    'hrv_trend.csv': 'Heart Rate Variability (ms)',
    'respiratory.csv': 'Respiratory Rate (breaths/min)',
    'sleep_hours.csv': 'Sleep Hours',
    'wrist_temp.csv': 'Wrist Temperature (°F)',
  } as {[key: string]: string};

  const dataColumn = dataColumnMap[csvFile] || Object.keys(csvData[0] || {})[1];

  const chartData = {
    labels: csvData.map((row) => row.date),
    datasets: [
      {
        label: `Average ${csvFile}`,
        data: csvData.map((row) => row.average),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        labels: chartData.labels,
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Average Chart of ${csvFile}`,
      },
    },
  } as any;

  return (
    <div>
      <h3>{csvFile}</h3>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default DataVisualization;
