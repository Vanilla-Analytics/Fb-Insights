import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-600 mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using this application, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do 
              not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Our application provides social media management tools, including but not limited to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Facebook page management and insights</li>
                <li>Content scheduling and publishing</li>
                <li>Analytics and reporting</li>
                <li>Account management features</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Account and Registration</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                To access certain features of our service, you may be required to create an account 
                and connect your social media accounts, including Facebook.
              </p>
              <p>You agree to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Acceptable Use</h2>
            <div className="space-y-3 text-gray-700">
              <p>You agree not to use the service to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Post harmful, offensive, or inappropriate content</li>
                <li>Spam or send unsolicited communications</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the service</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Facebook Integration</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Our service integrates with Facebook through their API. By using this integration, 
                you also agree to comply with:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Facebook's Terms of Service</li>
                <li>Facebook's Platform Policy</li>
                <li>Facebook's Community Standards</li>
              </ul>
              <p>
                We are not responsible for any changes to Facebook's policies or API that may affect 
                our service.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Privacy</h2>
            <p className="text-gray-700">
              Your privacy is important to us. Please review our Privacy Policy, which also governs 
              your use of the service, to understand our practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Intellectual Property</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                The service and its original content, features, and functionality are and will remain 
                the exclusive property of our company and its licensors.
              </p>
              <p>
                You retain ownership of content you post through our service, but grant us a license 
                to use, display, and distribute such content as necessary to provide the service.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Service Availability</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                We strive to maintain high availability of our service, but we do not guarantee 
                uninterrupted access. We may:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Modify or discontinue the service at any time</li>
                <li>Perform maintenance that may temporarily affect availability</li>
                <li>Suspend access for violations of these terms</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700">
              In no event shall our company be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including without limitation, loss of profits, 
              data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Indemnification</h2>
            <p className="text-gray-700">
              You agree to defend, indemnify, and hold harmless our company from and against any 
              claims, damages, obligations, losses, liabilities, costs, and expenses arising from 
              your use of the service or violation of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Termination</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                We may terminate or suspend your account and access to the service immediately, 
                without prior notice or liability, for any reason whatsoever, including without 
                limitation if you breach the terms.
              </p>
              <p>
                You may terminate your account at any time by contacting us or using the account 
                deletion features within the service.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law</h2>
            <p className="text-gray-700">
              These terms shall be interpreted and governed in accordance with the laws of 
              [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right, at our sole discretion, to modify or replace these terms at any 
              time. If a revision is material, we will try to provide at least 30 days notice prior 
              to any new terms taking effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Contact Information</h2>
            <div className="text-gray-700">
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <div className="mt-3">
                <p>Email: support@yourapp.com</p>
                <p>Address: [Your Business Address]</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;