import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Lan Onasis | AI-Powered African Fintech Solutions
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Transforming African businesses through innovative AI solutions
          </p>
          <div className="space-y-4">
            <a 
              href="https://api.lanonasis.com" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Visit Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
