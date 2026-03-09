import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../../hooks/useAuth";
import { useDoctorAppointments, useDoctorProfile, useDoctorStatistics } from "../../hooks/useDoctorAppointments";
import DoctorBottomNav from "../../components/doctor/DoctorBottomNav";

function DoctorDashboard() {
 const { user } = useAuth();
 const { data: profile, isLoading: isLoadingProfile } = useDoctorProfile();
 const { data: statistics, isLoading: isLoadingStats } = useDoctorStatistics();
 const { data: appointments, isLoading: isLoadingAppointments, isError } = useDoctorAppointments();

 if (!user) return <p className="p-8">User not logged in.</p>;
 if (isLoadingProfile || isLoadingAppointments || isLoadingStats) return <p className="p-8">Loading...</p>;
 if (isError) return <p className="p-8">Error loading data...</p>;

 // Get only today's and upcoming appointments for dashboard
 const upcomingAppointments = appointments?.filter((apt) => {
  const aptDate = new Date(apt.started_at);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return aptDate >= today && apt.status !== "Rejected" && apt.status !== "Completed";
 }).slice(0, 5);

 return (
  <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
   <div
    id="Content-Container"
    className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background pb-24"
   >
    {/* Header */}
    <div
     id="Top-Nav"
     className="flex items-center justify-between h-[112px] w-full p-5 pt-8 bg-monday-green"
    >
     <div className="flex items-center w-full gap-3">
      <Link to="/doctor/profile" className="relative flex size-[60px] shrink-0 items-center justify-center">
       <div
        id="Avatar-Container"
        className="flex size-full rounded-full overflow-hidden border-[3px] border-white ring-2 ring-monday-green bg-monday-background"
       >
        <img
         src={profile?.photo || user.photo}
         className="size-full object-cover"
         alt="avatar"
        />
       </div>
      </Link>
      <div className="flex flex-col gap-[6px]">
       <p className="font-bold text-white">{profile?.name || user.name}</p>
       <p className="flex items-center gap-1">
        <img
         src="/assets/images/icons/stetoscop-grey.svg"
         className="flex size-4 shrink-0 brightness-200"
         alt="icon"
        />
        <span className="font-semibold text-sm leading-none text-white/80">
         {profile?.specialist?.name || "Doctor"}
        </span>
       </p>
      </div>
     </div>
     <div className="flex items-center gap-2">
      <div className="flex flex-col items-end">
       <p className="font-bold text-white text-lg">{statistics?.today_appointments || 0}</p>
       <p className="text-xs text-white/70">Today</p>
      </div>
     </div>
    </div>

    {/* Stats Cards */}
    <div className="flex gap-3 p-5 -mt-4 overflow-x-auto">
     <div className="flex-1 min-w-[100px] flex flex-col items-center rounded-2xl p-4 bg-white shadow-sm gap-2">
      <p className="font-bold text-2xl text-monday-green">{statistics?.total_appointments || 0}</p>
      <p className="font-medium text-xs text-monday-gray text-center">Total</p>
     </div>
     <div className="flex-1 min-w-[100px] flex flex-col items-center rounded-2xl p-4 bg-white shadow-sm gap-2">
      <p className="font-bold text-2xl text-monday-orange">{statistics?.pending_appointments || 0}</p>
      <p className="font-medium text-xs text-monday-gray text-center">Waiting</p>
     </div>
     <div className="flex-1 min-w-[100px] flex flex-col items-center rounded-2xl p-4 bg-white shadow-sm gap-2">
      <p className="font-bold text-2xl text-blue-500">{statistics?.approved_appointments || 0}</p>
      <p className="font-medium text-xs text-monday-gray text-center">Approved</p>
     </div>
     <div className="flex-1 min-w-[100px] flex flex-col items-center rounded-2xl p-4 bg-white shadow-sm gap-2">
      <p className="font-bold text-2xl text-emerald-500">{statistics?.completed_appointments || 0}</p>
      <p className="font-medium text-xs text-monday-gray text-center">Completed</p>
     </div>
    </div>

    {/* Earnings Card */}
    <div className="px-5">
     <div className="flex items-center justify-between rounded-2xl p-5 bg-gradient-to-r from-monday-green to-emerald-500">
      <div className="flex flex-col gap-1">
       <p className="font-medium text-white/80 text-sm">Total Earnings</p>
       <p className="font-bold text-xl text-white">
        Rp {statistics?.total_earnings?.toLocaleString("id-ID") || 0}
       </p>
      </div>
      <div className="flex items-center justify-center size-12 rounded-full bg-white/20">
       <img src="/assets/images/icons/money-grey.svg" className="size-6 brightness-200" alt="icon" />
      </div>
     </div>
    </div>

    {/* Upcoming Appointments List */}
    <main className="flex flex-col flex-1">
     <div className="flex flex-col w-full p-5 gap-4 bg-white mt-5">
      <div className="flex items-center justify-between">
       <div className="flex flex-col gap-1">
        <p className="font-bold text-xl">Upcoming Appointments</p>
        <p className="font-semibold text-sm leading-none text-monday-gray">
         Next appointments to handle
        </p>
       </div>
       <Link
        to="/doctor/appointments"
        className="font-semibold text-sm text-monday-green"
       >
        View All
       </Link>
      </div>

      {upcomingAppointments && upcomingAppointments.length > 0 ? (
       upcomingAppointments.map((appointment) => (
        <div
         key={appointment.id}
         className="flex flex-col rounded-2xl border border-monday-stroke p-4 gap-4"
        >
         <div className="flex items-center gap-4">
          <div className="flex size-14 rounded-full bg-monday-background overflow-hidden shrink-0">
           <img
            src={appointment.user?.photo || "/assets/images/icons/profile-2user-grey.svg"}
            className="size-full object-cover"
            alt="patient"
           />
          </div>
          <div className="flex flex-col gap-[6px] w-full overflow-hidden">
           <p className="font-semibold">{appointment.user?.name || "Patient"}</p>
           <div className="flex items-center gap-1 text-nowrap">
            <img
             src="/assets/images/icons/sms-grey.svg"
             className="flex size-4 shrink-0"
             alt="icon"
            />
            <p className="font-medium text-sm text-monday-gray truncate">
             {appointment.user?.email}
            </p>
           </div>
          </div>
          {appointment.status === "Approved" && (
           <p className="rounded-[4px] py-[6px] px-2 bg-monday-green/10 font-bold text-sm text-monday-green shrink-0">
            Approved
           </p>
          )}
          {appointment.status === "Waiting" && (
           <p className="rounded-[4px] py-[6px] px-2 bg-monday-orange/10 font-bold text-sm text-monday-orange shrink-0">
            Waiting
           </p>
          )}
         </div>
         <hr className="border-monday-stroke" />
         <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
           <img
            src="/assets/images/icons/calendar-2-grey.svg"
            className="size-4"
            alt="icon"
           />
           <p className="font-semibold">
            {format(new Date(appointment.started_at), "dd MMM yyyy")}
           </p>
          </div>
          <div className="flex items-center gap-2">
           <img
            src="/assets/images/icons/clock-grey.svg"
            className="size-4"
            alt="icon"
           />
           <p className="font-semibold">{appointment.time_at}</p>
          </div>
         </div>
         <Link
          to={`/doctor/appointments/${appointment.id}`}
          className="flex items-center justify-center w-full h-[44px] rounded-full py-3 px-6 bg-monday-green"
         >
          <span className="font-semibold leading-none text-white">
           Handle Appointment
          </span>
         </Link>
        </div>
       ))
      ) : (
       <div
        id="Empty-State"
        className="flex flex-col flex-1 items-center justify-center rounded-[20px] p-[10px] gap-8"
       >
        <img
         src="/assets/images/icons/note-remove-grey.svg"
         className="size-[52px]"
         alt="icon"
        />
        <div className="flex flex-col gap-1 items-center text-center">
         <p className="font-semibold text-monday-gray text-lg">
          No upcoming appointments
         </p>
         <p className="font-medium text-monday-gray text-sm">
          Your patient appointments will appear here
         </p>
        </div>
       </div>
      )}
     </div>
    </main>

    {/* Bottom Navigation */}
    <DoctorBottomNav />
   </div>
  </div>
 );
}

export default DoctorDashboard;

