import React, { useContext, useState } from 'react'
import AppContext from '../../contexts/AppContext'
import api from '../config/api'
import { useNavigate } from 'react-router-dom'

function PostForm() {
  const { setPrediction, AreaItems } = useContext(AppContext)
  const navigate = useNavigate()

  const [postData, setpostData] = useState({
    "Year": "",
    "average_rain_fall_mm_per_year": "",
    "pesticides_tonnes": "",
    "avg_temp": "",
    "Area": "",
    "Item": ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!postData.Year || postData.Year < 1900 || postData.Year > new Date().getFullYear() + 10) {
      newErrors.Year = "Please enter a valid year between 1900 and " + (new Date().getFullYear() + 10)
    }
    
    if (!postData.average_rain_fall_mm_per_year || postData.average_rain_fall_mm_per_year < 0) {
      newErrors.average_rain_fall_mm_per_year = "Please enter a valid rainfall amount"
    }
    
    if (!postData.pesticides_tonnes || postData.pesticides_tonnes < 0) {
      newErrors.pesticides_tonnes = "Please enter a valid pesticides amount"
    }
    
    if (!postData.avg_temp || postData.avg_temp < -50 || postData.avg_temp > 60) {
      newErrors.avg_temp = "Please enter a valid temperature between -50°C and 60°C"
    }
    
    if (!postData.Area) {
      newErrors.Area = "Please select a country"
    }
    
    if (!postData.Item) {
      newErrors.Item = "Please select a crop item"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await api.post('/predict', {
        ...postData,
        Year: Number(postData.Year),
        average_rain_fall_mm_per_year: Number(postData.average_rain_fall_mm_per_year),
        pesticides_tonnes: Number(postData.pesticides_tonnes),
        avg_temp: Number(postData.avg_temp)
      })
      
      if (response.data) {
        setPrediction(response.data)
        navigate('/result')
      }
    } catch (error) {
      console.error('Error:', error)
      setErrors({ submit: "Failed to get prediction. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setpostData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Crop Yield Prediction
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Enter your agricultural data to get accurate crop yield predictions using our advanced AI models.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Agricultural Data Input
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please provide accurate information for the best prediction results.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Year Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="Year"
                value={postData.Year}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.Year 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-green-500 dark:focus:ring-green-400'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="e.g., 2024"
                min="1900"
                max={new Date().getFullYear() + 10}
              />
              {errors.Year && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.Year}</p>
              )}
            </div>

            {/* Rainfall Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Average Rainfall (mm/year) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="average_rain_fall_mm_per_year"
                  value={postData.average_rain_fall_mm_per_year}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.average_rain_fall_mm_per_year 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-green-500 dark:focus:ring-green-400'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="e.g., 1200"
                  min="0"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">mm</span>
                </div>
              </div>
              {errors.average_rain_fall_mm_per_year && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.average_rain_fall_mm_per_year}</p>
              )}
            </div>

            {/* Pesticides Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pesticides Used (tonnes) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="pesticides_tonnes"
                  value={postData.pesticides_tonnes}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.pesticides_tonnes 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-green-500 dark:focus:ring-green-400'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="e.g., 15.5"
                  min="0"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">tonnes</span>
                </div>
              </div>
              {errors.pesticides_tonnes && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pesticides_tonnes}</p>
              )}
            </div>

            {/* Temperature Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Average Temperature (°C) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="avg_temp"
                  value={postData.avg_temp}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.avg_temp 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-green-500 dark:focus:ring-green-400'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="e.g., 25.5"
                  min="-50"
                  max="60"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">°C</span>
                </div>
              </div>
              {errors.avg_temp && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.avg_temp}</p>
              )}
            </div>

            {/* Country Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="Area"
                value={postData.Area}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.Area 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-green-500 dark:focus:ring-green-400'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              >
                <option value="">Select a country</option>
                {AreaItems.areas?.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              {errors.Area && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.Area}</p>
              )}
            </div>

            {/* Crop Item Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Crop Item <span className="text-red-500">*</span>
              </label>
              <select
                name="Item"
                value={postData.Item}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.Item 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-green-500 dark:focus:ring-green-400'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              >
                <option value="">Select a crop item</option>
                {AreaItems.items?.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              {errors.Item && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.Item}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 hover:scale-105 focus:ring-4 focus:ring-green-500/50'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Get Prediction'
              )}
            </button>
          </form>

          {/* Info Section */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
              💡 Tips for Better Predictions
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Use accurate, up-to-date data for best results</li>
              <li>• Ensure all fields are filled with valid information</li>
              <li>• Our AI model considers multiple factors for predictions</li>
              <li>• Results are based on historical data and current trends</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostForm