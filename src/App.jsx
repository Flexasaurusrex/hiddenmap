import React from 'react';
import { Smartphone, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <Smartphone className="w-24 h-24 mx-auto text-cyan-400" />
        <h1 className="text-6xl font-bold">
          The <span className="text-cyan-400">Hidden</span> Map
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Revealing the elemental stories inside everything
        </p>
        <div className="flex items-center justify-center gap-2 text-purple-400">
          <Sparkles className="w-5 h-5" />
          <span>Building the experience...</span>
        </div>
      </div>
    </div>
  );
}

export default App;
