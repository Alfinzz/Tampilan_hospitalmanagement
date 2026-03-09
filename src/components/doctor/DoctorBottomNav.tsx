import { Link, useLocation } from "react-router-dom";

function DoctorBottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <div id="Menu-Bar" className="flex relative h-[100px] w-full">
      <div className="fixed bottom-0 z-30 h-[100px] w-full max-w-[640px] flex items-center justify-center">
        {/* Background with curved top */}
        <div className="absolute inset-0 bg-white border-t border-monday-stroke shadow-lg">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full border-t border-monday-stroke" />
        </div>

        {/* Center Button (Appointments) */}
        <Link
          to="/doctor/appointments"
          style={{ width: '56px', height: '56px' }}
          className="absolute z-20 -top-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center rounded-full bg-monday-green shadow-lg hover:bg-monday-green/90 transition-colors"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </Link>

        {/* Navigation Items */}
        <div className="relative z-10 flex items-center justify-between w-full h-full px-8">
          {/* Dashboard */}
          <Link
            to="/doctor/dashboard"
            className={`flex flex-col items-center gap-1.5 pt-3 pb-2 px-4 rounded-xl transition-all ${isActive("/doctor/dashboard")
              ? "text-monday-green bg-monday-green/10"
              : "text-monday-gray hover:text-monday-green"
              }`}
          >
            <div className="relative">
              <svg
                className={`w-6 h-6 transition-transform ${isActive("/doctor/dashboard") ? "scale-110" : ""}`}
                fill={isActive("/doctor/dashboard") ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={isActive("/doctor/dashboard") ? 0 : 2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {isActive("/doctor/dashboard") && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-monday-green rounded-full" />
              )}
            </div>
            <span className={`text-xs font-semibold ${isActive("/doctor/dashboard") ? "font-bold" : ""}`}>
              Home
            </span>
          </Link>

          {/* Spacer for center button */}
          <div className="w-16" />

          {/* Profile */}
          <Link
            to="/doctor/profile"
            className={`flex flex-col items-center gap-1.5 pt-3 pb-2 px-4 rounded-xl transition-all ${isActive("/doctor/profile")
              ? "text-monday-green bg-monday-green/10"
              : "text-monday-gray hover:text-monday-green"
              }`}
          >
            <div className="relative">
              <svg
                className={`w-6 h-6 transition-transform ${isActive("/doctor/profile") ? "scale-110" : ""}`}
                fill={isActive("/doctor/profile") ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={isActive("/doctor/profile") ? 0 : 2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {isActive("/doctor/profile") && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-monday-green rounded-full" />
              )}
            </div>
            <span className={`text-xs font-semibold ${isActive("/doctor/profile") ? "font-bold" : ""}`}>
              Profile
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorBottomNav;

