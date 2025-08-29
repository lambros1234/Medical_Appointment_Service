import '../index.css'
import Header from '../components/Header'


export default function MainLayout({ children }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Background */}
      <div className="background"></div>

      {/* Page content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}

