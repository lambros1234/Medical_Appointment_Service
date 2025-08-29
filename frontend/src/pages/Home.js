import MainLayout from '../layouts/MainLayout'
import Doctor from '../assets/doctor.png'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    // Check if user is logged in (JWT token in localStorage)
    const token = localStorage.getItem("token");

    if (token) {
      // User is logged in - go to appointment booking page
      navigate("/appointments");
    } else {
      // Not logged in - redirect to login page
      navigate("/login");
    }
  };

  return (
    <MainLayout>
      <div className="bg-blue-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-blue-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left text */}
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Find a <span className="text-blue-600 underline decoration-pink-400">Doctor</span> And <br />
                Book An Appointment
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg">
                We are a team of 50+ Expert Doctors with 24/7 Service, 200+ beds, Home appointments and Video Consultation.
              </p>
              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleAppointmentClick}
                  className="rounded-md bg-blue-600 px-5 py-3 text-white font-medium shadow hover:bg-blue-700"
                >
                  Make Appointment
                </button>
              </div>
            </div>

            {/* Right image */}
            <div className="flex-1 relative">
              <img
                src={Doctor}
                alt="Doctor"
                className="w-full max-w-sm mx-auto"
              />
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">How it Works?</h2>
            <p className="mt-2 text-gray-600">4 Steps to get your Solution</p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Step 1 */}
              <div>
                <div className="text-blue-600 text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900">Search Doctor</h3>
                <p className="mt-2 text-sm text-gray-600">Keeping you healthy is our High Priority</p>
              </div>

              {/* Step 2 */}
              <div>
                <div className="text-blue-600 text-4xl mb-4">👤</div>
                <h3 className="text-lg font-medium text-gray-900">Check Doctor Profile</h3>
                <p className="mt-2 text-sm text-gray-600">Choose from 100’s of doctors from our list.</p>
              </div>

              {/* Step 3 */}
              <div>
                <div className="text-blue-600 text-4xl mb-4">📅</div>
                <h3 className="text-lg font-medium text-gray-900">Schedule Appointment</h3>
                <p className="mt-2 text-sm text-gray-600">Schedule an appointment with variable dates.</p>
              </div>

              {/* Step 4 */}
              <div>
                <div className="text-blue-600 text-4xl mb-4">✅</div>
                <h3 className="text-lg font-medium text-gray-900">Get Solution</h3>
                <p className="mt-2 text-sm text-gray-600">Get best solution for your requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

