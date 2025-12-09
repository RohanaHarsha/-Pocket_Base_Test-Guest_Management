import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Guest } from '../server/Guest.ts';
import { getGuests, deleteGuest } from '../server/pocketbase.ts';

export default function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch guests on component mount
  useEffect(() => {
    setLoading(true);
    getGuests()
      .then(setGuests)
      .catch(err => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, []);

  // Filter guests based on search term
  const filteredGuests = guests.filter(guest =>
    `${guest.first_name} ${guest.last_name} ${guest.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete guest
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this guest?')) return;

    try {
      await deleteGuest(id);
      setGuests(prev => prev.filter(g => g.id !== id));
    } catch (err: any) {
      alert('Delete failed: ' + (err.message || String(err)));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Guest List</h1>
          <p className="text-gray-600 mt-1">Manage your registered guests</p>
        </div>
        <button
          onClick={() => navigate('/GuestRegistration')}
          className="btn-primary flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add New Guest</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guests...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error loading guests: {error}</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && guests.length === 0 && (
        <div className="card text-center py-16">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No guests found</h3>
          <p className="text-gray-600 mb-6">Get started by registering your first guest.</p>
          <button
            onClick={() => navigate('/GuestRegistration')}
            className="btn-primary"
          >
            Register First Guest
          </button>
        </div>
      )}

      {/* No Search Results */}
      {!loading && guests.length > 0 && filteredGuests.length === 0 && searchTerm && (
        <div className="card text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matching guests</h3>
          <p className="text-gray-600">Try adjusting your search terms.</p>
        </div>
      )}

      {/* Guests Table */}
      {filteredGuests.length > 0 && (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Date of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map(guest => (
                  <tr key={guest.id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-medium text-sm">
                          {guest.first_name?.[0]}{guest.last_name?.[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {guest.first_name} {guest.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div className="text-gray-900">{guest.email}</div>
                        <div className="text-gray-500">{guest.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {guest.address}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-900">
                       {new Date(guest.date_of_birth || '').toLocaleDateString() || 'N/A'}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/guests/${guest.id}`)}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                          title="View/Edit Guest"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(guest.id)}
                          className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                          title="Delete Guest"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer with Stats */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                Showing {guests.length} guests
              </div>
              <div>
                Total registered guests: {guests.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}