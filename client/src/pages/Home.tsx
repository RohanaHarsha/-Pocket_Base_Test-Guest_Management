//import { useNavigate } from 'react-router-dom';

export const Home = () => {
  

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">Hotel Guest Management</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your guest registration process with our intuitive and powerful management system. 
            Keep track of all your guests in one centralized location.
          </p>
        </div>

       
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center hover:shadow-xl transition-shadow duration-300">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Guest Registration</h3>
          <p className="text-gray-600">
            this functionality allows you to register your guests with their personal information
          </p>
        </div>

        <div className="card text-center hover:shadow-xl transition-shadow duration-300">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Guest List</h3>
          <p className="text-gray-600">
           once you go on to the guest list you can see the registerd guests in the list
          </p>
        </div>

        <div className="card text-center hover:shadow-xl transition-shadow duration-300">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1a2 2 0 104 0V4z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Pocketbase backend</h3>
          <p className="text-gray-600">
            Edit, update, or remove guest information with pocketbase. 
            Keep the guest database accurate and up-to-date.
          </p>
        </div>
      </div>

     

      {/* Getting Started Section */}
      <div className="card">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Register Guests</h3>
              <p className="text-gray-600 text-center">
                Use our simple form to collect guest information including contact details and preferences.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manage Data</h3>
              <p className="text-gray-600 text-center">
                View, edit, and organize all your guest information in one convenient location.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Stay Organized</h3>
              <p className="text-gray-600 text-center">
                Keep track of all your guests with our clean, intuitive interface and management tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};