import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import api from '../config/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Counter animation hook
const useCounter = (target, duration = 3000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Use easing function for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      const currentCount = Math.floor(easedProgress * target);
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);
  
  return count;
};

const CenteredCard = () => {
  const { Prediction } = useContext(AppContext);
  const [metricsData, setMetricsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('');
  const [activeTab, setActiveTab] = useState('prediction');

  // Counter hooks - moved to top level to avoid conditional rendering
  const predictionValue = Prediction?.prediction || 0;
  const confidenceValue = Prediction?.confidence || 85;
  const accuracyValue = metricsData?.accuracy || 0;
  const precisionValue = metricsData?.precision || 0;
  const recallValue = metricsData?.recall || 0;
  
  const animatedPrediction = useCounter(predictionValue, 3500);
  const animatedConfidence = useCounter(confidenceValue, 3000);
  const animatedAccuracy = useCounter(accuracyValue, 4000);
  const animatedPrecision = useCounter(precisionValue, 4500);
  const animatedRecall = useCounter(recallValue, 5000);

  useEffect(() => {
    fetchMetricsData();
  }, []);

  const fetchMetricsData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/metrics-data');
      setMetricsData(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      setDownloadStatus('downloading');
      const response = await api.get('/download-report', {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `agrova-report-${new Date().toISOString().split('T')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus(''), 3000);
    } catch (error) {
      console.error('Error downloading report:', error);
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus(''), 3000);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const renderPredictionCard = () => {
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-down">
            Prediction Results
          </h2>
          <p className="text-gray-600 dark:text-gray-300 animate-slide-up">
            Your crop yield prediction has been calculated successfully
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Main Prediction */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 animate-slide-in-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Predicted Crop Yield
            </h3>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2 animate-pulse">
              {animatedPrediction.toFixed(2)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              tons per hectare
            </p>
          </div>

          {/* Confidence Score */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 animate-slide-in-right">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Model Confidence
            </h3>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 animate-pulse">
              {animatedConfidence}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              prediction accuracy
            </p>
          </div>
        </div>

      {/* Input Summary */}
      {Prediction && Prediction.input_data && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8 animate-slide-up">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Input Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
              <p className="font-semibold text-gray-900 dark:text-white">{Prediction.input_data.Year || 'N/A'}</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-sm text-gray-600 dark:text-gray-400">Country</p>
              <p className="font-semibold text-gray-900 dark:text-white">{Prediction.input_data.Area || 'N/A'}</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-sm text-gray-600 dark:text-gray-400">Crop</p>
              <p className="font-semibold text-gray-900 dark:text-white">{Prediction.input_data.Item || 'N/A'}</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
              <p className="font-semibold text-gray-900 dark:text-white">{Prediction.input_data.avg_temp || 'N/A'}°C</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rainfall</p>
              <p className="font-semibold text-gray-900 dark:text-white">{Prediction.input_data.average_rain_fall_mm_per_year || 'N/A'} mm</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pesticides</p>
              <p className="font-semibold text-gray-900 dark:text-white">{Prediction.input_data.pesticides_tonnes || 'N/A'} tonnes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  };

  const renderMetricsCharts = () => {
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-down">
            Model Performance Metrics
          </h2>
          <p className="text-gray-600 dark:text-gray-300 animate-slide-up">
            Detailed analysis of our machine learning model performance
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : metricsData ? (
          <div className="space-y-8">
            {/* Accuracy Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center animate-slide-in-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Accuracy Score
                </h3>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {animatedAccuracy.toFixed(1)}%
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center animate-slide-in-up">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Precision Score
                </h3>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {animatedPrecision.toFixed(1)}%
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 text-center animate-slide-in-right">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Recall Score
                </h3>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {animatedRecall.toFixed(1)}%
                </div>
              </div>
            </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Line Chart */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 animate-slide-in-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Prediction vs Actual Values
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metricsData.line_chart_data || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="index" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#82ca9d" 
                    strokeWidth={3}
                    dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#82ca9d', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 animate-slide-in-right">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Feature Importance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metricsData.feature_importance || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="feature" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="importance" 
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 animate-slide-up">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Model Performance Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={metricsData.pie_chart_data || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {metricsData.pie_chart_data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No metrics data available</p>
        </div>
      )}
    </div>
  );
  };

  const renderDownloadSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Download Report
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Get a comprehensive PDF report of your prediction and analysis
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Comprehensive Report
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Download a detailed PDF report including your prediction, model metrics, and analysis
          </p>

          <button
            onClick={handleDownloadReport}
            disabled={downloadStatus === 'downloading'}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
              downloadStatus === 'downloading'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 hover:scale-105'
            }`}
          >
            {downloadStatus === 'downloading' ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Downloading...
              </div>
            ) : downloadStatus === 'success' ? (
              'Download Complete!'
            ) : downloadStatus === 'error' ? (
              'Download Failed'
            ) : (
              'Download Report'
            )}
          </button>

          {downloadStatus === 'success' && (
            <p className="text-green-600 dark:text-green-400 text-sm mt-2">
              Report downloaded successfully!
            </p>
          )}
          {downloadStatus === 'error' && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">
              Failed to download report. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Analysis Complete
        </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your crop yield prediction and detailed analysis are ready
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            <div className="flex space-x-1">
              {[
                { id: 'prediction', label: 'Prediction', icon: '📊' },
                { id: 'metrics', label: 'Metrics', icon: '📈' },
                { id: 'download', label: 'Download', icon: '📥' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'prediction' && renderPredictionCard()}
          {activeTab === 'metrics' && renderMetricsCharts()}
          {activeTab === 'download' && renderDownloadSection()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/predict"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            New Prediction
          </Link>
          <Link
            to="/"
            className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CenteredCard;
