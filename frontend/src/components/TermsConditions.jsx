import React from 'react'
import { Link } from 'react-router-dom'

function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-green-600 dark:bg-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Please read these terms carefully before using our crop yield prediction service.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                By accessing and using Agrova's crop yield prediction service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Agrova provides an online platform for crop yield prediction using machine learning algorithms. Our service includes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                <li>Crop yield prediction based on input parameters</li>
                <li>Data analysis and visualization</li>
                <li>Agricultural insights and recommendations</li>
                <li>Technical support and documentation</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. User Responsibilities
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                As a user of our service, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                <li>Provide accurate and truthful information</li>
                <li>Use the service for lawful purposes only</li>
                <li>Not attempt to reverse engineer or hack our systems</li>
                <li>Respect intellectual property rights</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Report any security vulnerabilities you discover</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Data and Privacy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these terms by reference. By using our service, you consent to the collection and use of information as outlined in our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The service and its original content, features, and functionality are and will remain the exclusive property of Agrova and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Disclaimers
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The information provided through our service is for general informational purposes only. While we strive to provide accurate predictions, we make no warranties about:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                <li>The accuracy or completeness of predictions</li>
                <li>The suitability of recommendations for your specific situation</li>
                <li>The availability or uninterrupted operation of the service</li>
                <li>The absence of errors or technical issues</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                In no event shall Agrova, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Indemnification
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You agree to defend, indemnify, and hold harmless Agrova and its licensors and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms or your use of the service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Service Modifications
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                10. Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                11. Governing Law
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which Agrova operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                13. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Email:</strong> legal@agrova.com<br />
                  <strong>Address:</strong> Agrova Technologies<br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600 dark:bg-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            By using our service, you agree to these terms and our privacy policy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/predict"
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Start Using Agrova
            </Link>
            <Link
              to="/privacy"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Read Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsConditions 