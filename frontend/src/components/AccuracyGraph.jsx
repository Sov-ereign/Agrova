import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  Cell,
  AreaChart,
  Area
} from 'recharts'

function AccuracyGraph() {
  const [metricsData, setMetricsData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeChart, setActiveChart] = useState('line')

  useEffect(() => {
    fetchMetricsData()
  }, [])

  const fetchMetricsData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await axios.get('/api/metrics-data')
      setMetricsData(response.data)
    } catch (error) {
      console.error('Error fetching metrics:', error)
      setError('Failed to load metrics data')
    } finally {
      setIsLoading(false)
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d']

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading model metrics...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <svg className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Data</h3>
              <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
              <button
                onClick={fetchMetricsData}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Model Performance Analytics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comprehensive analysis of our machine learning model performance and accuracy metrics
          </p>
        </div>

        {/* Chart Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            <div className="flex space-x-1">
              {[
                { id: 'line', label: 'Line Chart', icon: '📈' },
                { id: 'bar', label: 'Bar Chart', icon: '📊' },
                { id: 'area', label: 'Area Chart', icon: '📉' },
                { id: 'pie', label: 'Pie Chart', icon: '🥧' }
              ].map((chart) => (
                <button
                  key={chart.id}
                  onClick={() => setActiveChart(chart.id)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    activeChart === chart.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  }`}
                >
                  <span className="mr-2">{chart.icon}</span>
                  {chart.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Summary */}
        {metricsData && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Accuracy</h3>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {metricsData.accuracy || 'N/A'}%
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Precision</h3>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {metricsData.precision || 'N/A'}%
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Recall</h3>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {metricsData.recall || 'N/A'}%
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">F1 Score</h3>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {metricsData.f1_score || 'N/A'}%
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="space-y-8">
          {/* Main Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {activeChart === 'line' && 'Prediction vs Actual Values'}
              {activeChart === 'bar' && 'Feature Importance Analysis'}
              {activeChart === 'area' && 'Model Performance Over Time'}
              {activeChart === 'pie' && 'Performance Distribution'}
            </h2>
            
            <ResponsiveContainer width="100%" height={500}>
              {activeChart === 'line' && (
                <LineChart data={metricsData?.line_chart_data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#8884d8" strokeWidth={3} />
                  <Line type="monotone" dataKey="predicted" stroke="#82ca9d" strokeWidth={3} />
                </LineChart>
              )}
              
              {activeChart === 'bar' && (
                <BarChart data={metricsData?.feature_importance || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="feature" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="importance" fill="#8884d8" />
                </BarChart>
              )}
              
              {activeChart === 'area' && (
                <AreaChart data={metricsData?.line_chart_data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="actual" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="predicted" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                </AreaChart>
              )}
              
              {activeChart === 'pie' && (
                <PieChart>
                  <Pie
                    data={metricsData?.pie_chart_data || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {metricsData?.pie_chart_data?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Additional Charts Grid */}
          {metricsData && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Confusion Matrix or Additional Metrics */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  Model Confidence Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={metricsData.confidence_distribution || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Error Analysis */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  Prediction Error Analysis
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metricsData.error_analysis || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="index" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="error" stroke="#FF8042" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Understanding the Metrics
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Model Performance</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• <strong>Accuracy:</strong> Overall correctness of predictions</li>
                <li>• <strong>Precision:</strong> Accuracy of positive predictions</li>
                <li>• <strong>Recall:</strong> Ability to find all positive cases</li>
                <li>• <strong>F1 Score:</strong> Harmonic mean of precision and recall</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Chart Types</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• <strong>Line Chart:</strong> Shows prediction vs actual values over time</li>
                <li>• <strong>Bar Chart:</strong> Displays feature importance rankings</li>
                <li>• <strong>Area Chart:</strong> Visualizes cumulative performance</li>
                <li>• <strong>Pie Chart:</strong> Shows performance distribution</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccuracyGraph