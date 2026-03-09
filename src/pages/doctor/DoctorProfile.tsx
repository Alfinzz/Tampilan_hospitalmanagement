import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDoctorProfile, useDoctorStatistics } from "../../hooks/useDoctorAppointments";
import DoctorBottomNav from "../../components/doctor/DoctorBottomNav";

function DoctorProfile() {
 const { user, logout } = useAuth();
 const { data: profile, isLoading: isLoadingProfile } = useDoctorProfile();
 const { data: statistics, isLoading: isLoadingStats } = useDoctorStatistics();

 if (!user) return <p className="p-8">User not logged in.</p>;
 if (isLoadingProfile || isLoadingStats) return <p className="p-8">Loading...</p>;

 const handleLogout = async () => {
  await logout();
  window.location.href = "/doctor/login";
 };

 return (
  <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
   <div
    id="Content-Container"
    className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background pb-24"
   >
    {/* Header */}
    <div
     id="Top-Nav"
     className="flex items-center justify-center h-[112px] w-full p-5 pt-8 bg-monday-green"
    >
     <h1 className="font-bold text-xl text-white">My Profile</h1>
    </div>

    {/* Profile Card */}
    <div className="flex flex-col items-center -mt-10 px-5">
     <div className="relative flex size-24 shrink-0 items-center justify-center">
      <div className="flex size-full rounded-full overflow-hidden border-4 border-white ring-2 ring-monday-green bg-monday-background shadow-lg">
       <img
        src={profile?.photo || user.photo}
        className="size-full object-cover"
        alt="avatar"
       />
      </div>
     </div>
     <div className="flex flex-col items-center mt-4 gap-1">
      <p className="font-bold text-xl">{profile?.name || user.name}</p>
      <p className="font-semibold text-monday-gray">{profile?.specialist?.name || "Doctor"}</p>
     </div>

     {/* Edit Profile Button */}
     <Link
      to="/doctor/profile/edit"
      className="flex items-center gap-2 mt-4 px-6 py-2 rounded-full bg-monday-green/10 hover:bg-monday-green/20 transition-colors"
     >
      <svg className="w-4 h-4 text-monday-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
      <span className="font-semibold text-monday-green">Edit Profile</span>
     </Link>
    </div>

    {/* Statistics Grid */}
    <div className="grid grid-cols-2 gap-3 p-5 mt-4">
     <div className="flex flex-col items-center rounded-2xl p-4 bg-white shadow-sm gap-1">
      <p className="font-bold text-2xl text-monday-green">{statistics?.total_appointments || 0}</p>
      <p className="font-medium text-sm text-monday-gray text-center">Total Appointments</p>
     </div>
     <div className="flex flex-col items-center rounded-2xl p-4 bg-white shadow-sm gap-1">
      <p className="font-bold text-2xl text-monday-orange">{statistics?.pending_appointments || 0}</p>
      <p className="font-medium text-sm text-monday-gray text-center">Pending</p>
     </div>
     <div className="flex flex-col items-center rounded-2xl p-4 bg-white shadow-sm gap-1">
      <p className="font-bold text-2xl text-blue-500">{statistics?.approved_appointments || 0}</p>
      <p className="font-medium text-sm text-monday-gray text-center">Approved</p>
     </div>
     <div className="flex flex-col items-center rounded-2xl p-4 bg-white shadow-sm gap-1">
      <p className="font-bold text-2xl text-emerald-500">{statistics?.completed_appointments || 0}</p>
      <p className="font-medium text-sm text-monday-gray text-center">Completed</p>
     </div>
    </div>

    {/* Earnings Card */}
    <div className="mx-5">
     <div className="flex items-center justify-between rounded-2xl p-5 bg-gradient-to-r from-monday-green to-emerald-500 shadow-lg">
      <div className="flex flex-col gap-1">
       <p className="font-medium text-white/80">Total Earnings</p>
       <p className="font-bold text-2xl text-white">
        Rp {statistics?.total_earnings?.toLocaleString("id-ID") || 0}
       </p>
      </div>
      <div className="flex items-center justify-center size-14 rounded-full bg-white/20">
       <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
       </svg>
      </div>
     </div>
    </div>

    {/* Info Section */}
    <div className="flex flex-col bg-white mt-5 p-5 gap-4">
     <p className="font-bold text-lg">Information</p>

     {/* About */}
     <div className="flex flex-col gap-2">
      <p className="font-semibold text-monday-gray">About</p>
      <p className="text-sm leading-relaxed">{profile?.about || "No description yet."}</p>
     </div>

     <hr className="border-monday-stroke" />

     {/* Experience */}
     <div className="flex items-center justify-between">
      <p className="font-semibold text-monday-gray">Years of Experience</p>
      <p className="font-bold">{profile?.yoe || 0} Years</p>
     </div>

     <hr className="border-monday-stroke" />

     {/* Gender */}
     <div className="flex items-center justify-between">
      <p className="font-semibold text-monday-gray">Gender</p>
      <p className="font-bold">{profile?.gender || "-"}</p>
     </div>

     <hr className="border-monday-stroke" />

     {/* Hospital */}
     <div className="flex items-center gap-3">
      <div className="flex size-12 rounded-xl bg-monday-background overflow-hidden shrink-0">
       <img
        src={profile?.hospital?.photo}
        className="size-full object-cover"
        alt="hospital"
       />
      </div>
      <div className="flex flex-col gap-1">
       <p className="font-semibold">{profile?.hospital?.name}</p>
       <p className="text-sm text-monday-gray">{profile?.hospital?.city} ({profile?.hospital?.post_code})</p>
      </div>
     </div>
    </div>

    {/* Logout Button */}
    <div className="p-5">
     <button
      onClick={handleLogout}
      className="flex items-center justify-center w-full gap-2 py-4 rounded-full border-2 border-monday-red text-monday-red hover:bg-monday-red/10 transition-colors"
     >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span className="font-semibold">Logout</span>
     </button>
    </div>

    {/* Bottom Navigation */}
    <DoctorBottomNav />
   </div>
  </div>
 );
}

export default DoctorProfile;
