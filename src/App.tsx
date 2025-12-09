import { Link, Outlet } from 'react-router-dom';   
import './App.css';

const App = () => (
  <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar */}
    <nav className="w-64 bg-white border-r border-gray-200 shadow-md h-screen fixed">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Guest Manager</h1>
      </div>
      
      <div className="p-4 overflow-y-auto h-[calc(100vh-96px)]">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/" 
              className="nav-link group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/GuestRegistration" 
              className="nav-link group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Guest Registration</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/GuestList" 
              className="nav-link group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Guest List</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    {/* Main Content */}
    <main className="flex-1 ml-64 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <Outlet />
      </div>
    </main>
  </div>
);

export default App;
