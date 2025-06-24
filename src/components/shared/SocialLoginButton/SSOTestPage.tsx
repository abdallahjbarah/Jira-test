'use client';

import React from 'react';
import SocialLoginButton from './index';
import { useFirebase } from '@/providers/FirebaseProvider';

export default function SSOTestPage(): React.ReactElement {
  const { isInitialized, error } = useFirebase();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Firebase SSO Test</h1>
        
        {/* Firebase Status */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Firebase Status</h2>
          <div className="p-4 rounded-md bg-gray-100">
            <p className="text-sm">
              <span className="font-medium">Initialized:</span>{' '}
              <span className={isInitialized ? 'text-green-600' : 'text-red-600'}>
                {isInitialized ? 'Yes' : 'No'}
              </span>
            </p>
            {error && (
              <p className="text-sm mt-2">
                <span className="font-medium text-red-600">Error:</span> {error}
              </p>
            )}
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Social Login Options</h2>
          
          <div className="space-y-3">
            <SocialLoginButton provider="google" userType="guest" />
            <SocialLoginButton provider="facebook" userType="guest" />
            <SocialLoginButton provider="apple" userType="guest" />
          </div>

          <div className="mt-8">
            <h3 className="text-md font-medium mb-3">Partner Login</h3>
            <div className="space-y-3">
              <SocialLoginButton provider="google" userType="partner" />
              <SocialLoginButton provider="facebook" userType="partner" />
              <SocialLoginButton provider="apple" userType="partner" />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Test Instructions:</h3>
          <ol className="text-xs text-blue-700 space-y-1">
            <li>1. Ensure your backend API is running</li>
            <li>2. Configure Firebase Console with your domain</li>
            <li>3. Set up environment variables</li>
            <li>4. Click any social login button to test</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 