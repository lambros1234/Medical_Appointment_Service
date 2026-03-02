import MainLayout from "../../layouts/MainLayout";
import HeroImage from "../../assets/doctor3.png"; // replace later with a more modern image
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    const token = localStorage.getItem("token");
    if (token) navigate("/appointments");
    else navigate("/login");
  };

  const handleBrowseDoctors = () => navigate("/doctors");

  return (
    <MainLayout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-50">
        
        {/* Gradient Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

            {/* LEFT SIDE */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-medium text-blue-600 shadow-sm border border-blue-100">
                🚀 Trusted by 1,000+ patients
              </div>

              <h1 className="mt-6 text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Modern Healthcare
                <span className="block text-blue-600">
                  Made Simple
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Book appointments with verified doctors in seconds. 
                Fast scheduling, secure data, and seamless care.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAppointmentClick}
                  className="rounded-2xl bg-blue-600 px-8 py-4 text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Book Appointment
                </button>

                <button
                  onClick={handleBrowseDoctors}
                  className="rounded-2xl bg-white px-8 py-4 font-semibold text-gray-900 border border-gray-200 hover:bg-gray-50 transition"
                >
                  Explore Doctors
                </button>
              </div>

              {/* Stats Row */}
              <div className="mt-12 flex flex-wrap gap-10">
                <div>
                  <p className="text-3xl font-bold text-gray-900">50+</p>
                  <p className="text-sm text-gray-500">Verified Doctors</p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-gray-900">4.8★</p>
                  <p className="text-sm text-gray-500">Average Rating</p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-gray-900">2 min</p>
                  <p className="text-sm text-gray-500">Booking Time</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE + FLOATING UI */}
            <div className="relative">

              {/* Main Image */}
            <img
              src={HeroImage}
              alt="Healthcare"
              className="w-full max-w-lg mx-auto rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] float-slow"
            />

              {/* Floating Card 1 */}
              <div className="absolute top-10 -left-6 bg-white rounded-2xl shadow-xl p-4 w-52 border border-gray-100 hidden sm:block float-card">
                <p className="text-xs text-gray-500">Next Appointment</p>
                <p className="font-semibold text-gray-900">Dr. Smith</p>
                <p className="text-sm text-blue-600">Tomorrow · 10:30 AM</p>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-10 -right-6 bg-white rounded-2xl shadow-xl p-4 w-44 border border-gray-100 hidden sm:block float-card" style={{ animationDelay: "1.0s" }}>
                <p className="text-xs text-gray-500">Availability</p>
                <p className="text-green-500 font-semibold">12 slots open</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Why MediBook?
            </h2>
            <p className="mt-3 text-gray-600">
              Designed for speed, clarity, and trust.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">
                Secure & Private
              </h3>
              <p className="mt-3 text-gray-600">
                Your medical data stays encrypted and protected.
              </p>
            </div>

            <div className="rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">
                Instant Booking
              </h3>
              <p className="mt-3 text-gray-600">
                Book confirmed appointments in under 2 minutes.
              </p>
            </div>

            <div className="rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">
                Verified Doctors
              </h3>
              <p className="mt-3 text-gray-600">
                All specialists are approved and reviewed.
              </p>
            </div>

          </div>
        </div>
      </section>

    </MainLayout>
  );
}