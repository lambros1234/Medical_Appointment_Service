import MainLayout from "../../layouts/MainLayout";
import Doctor from "../../assets/doctor.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    const token = localStorage.getItem("token");
    if (token) navigate("/appointments");
    else navigate("/login");
  };

  const handleBrowseDoctors = () => navigate("/doctors");

  const steps = [
    {
      icon: "🔍",
      title: "Search doctor",
      desc: "Find by specialty, availability, and reviews.",
    },
    {
      icon: "👤",
      title: "Check profile",
      desc: "See experience, specialties, and ratings.",
    },
    {
      icon: "📅",
      title: "Book a slot",
      desc: "Pick a time that works for you in seconds.",
    },
    {
      icon: "✅",
      title: "Get care",
      desc: "Visit in-clinic or online and get your solution.",
    },
  ];

  return (
    <MainLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3 py-1 text-sm text-blue-700 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Book in minutes • Verified doctors
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Find a{" "}
                <span className="text-blue-600">Doctor</span>{" "}
                and book an appointment
              </h1>

              <p className="mt-5 text-lg text-gray-600 max-w-xl">
                Choose from trusted specialists and schedule your visit fast — in-clinic
                or online.
              </p>

              {/* CTA Row */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAppointmentClick}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-blue-700 transition"
                >
                  Book appointment
                </button>

                <button
                  onClick={handleBrowseDoctors}
                  className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50 transition"
                >
                  Browse doctors
                </button>
              </div>

              {/* Trust row */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
                <div className="rounded-xl bg-white/70 backdrop-blur border border-gray-200 p-3">
                  <div className="text-sm text-gray-500">Rating</div>
                  <div className="font-semibold text-gray-900">4.8/5 ⭐</div>
                </div>
                <div className="rounded-xl bg-white/70 backdrop-blur border border-gray-200 p-3">
                  <div className="text-sm text-gray-500">Doctors</div>
                  <div className="font-semibold text-gray-900">50+ Verified</div>
                </div>
                <div className="rounded-xl bg-white/70 backdrop-blur border border-gray-200 p-3">
                  <div className="text-sm text-gray-500">Booking</div>
                  <div className="font-semibold text-gray-900">~2 minutes</div>
                </div>
                <div className="rounded-xl bg-white/70 backdrop-blur border border-gray-200 p-3">
                  <div className="text-sm text-gray-500">Security</div>
                  <div className="font-semibold text-gray-900">Private data 🔒</div>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-white/60 backdrop-blur border border-gray-200 shadow-sm" />
              <div className="relative p-6 sm:p-10">
                <img
                  src={Doctor}
                  alt="Doctor"
                  className="w-full max-w-md mx-auto drop-shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            <p className="mt-2 text-gray-600">
              Four simple steps to get care quickly.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-50 text-2xl">
                  {s.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                <div className="mt-4 h-1 w-10 rounded-full bg-blue-600/20 group-hover:bg-blue-600/40 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}