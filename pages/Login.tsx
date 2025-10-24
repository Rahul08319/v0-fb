
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { FacebookIcon } from '../components/icons/FacebookIcon';

const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-gray-50">
      <div className="text-center p-8 max-w-md w-full">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-brand-blue mb-6">
          <FacebookIcon className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-brand-gray-600">Welcome to FBPostForge</h1>
        <p className="mt-2 text-gray-500">
          The ultimate tool to create, optimize, and schedule your Facebook posts.
        </p>
        <div className="mt-8">
          <button
            onClick={login}
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FacebookIcon className="h-5 w-5 mr-3" />
            Connect with Facebook
          </button>
        </div>
        <p className="mt-6 text-xs text-gray-400">
          By connecting, you agree to our Terms of Service and Privacy Policy. We will never post without your permission.
        </p>
      </div>
    </div>
  );
};

export default Login;
