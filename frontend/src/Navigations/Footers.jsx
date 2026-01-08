// Footer.jsx
import React from 'react';

const Footers = () => {
  return (
    <footer className="py-4 mt-auto mb-0 text-gray-600 bg-gray-100 shadow-inner dark:bg-gray-900 dark:text-gray-300">
      <div className="flex flex-col items-center justify-between px-4 mx-auto max-w-7xl md:flex-row">
        
        {/* Left side: copyright */}
        <p className="text-sm text-white">&copy; 2026 Hospital Management System. All rights reserved.</p>
        
        {/* Right side: version & support */}
        <div className="flex mt-2 space-x-4 text-sm md:mt-0">
          <span>Version 1.0.0</span>
          <a 
            href="mailto:support@hospital.com" 
            className="hover:underline"
          >
            Support
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footers;
