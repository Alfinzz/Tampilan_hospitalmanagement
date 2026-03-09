import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useDoctorAppointments, useDoctorStatistics } from "../../hooks/useDoctorAppointments";
import DoctorBottomNav from "../../components/doctor/DoctorBottomNav";

type StatusFilter = "all" | "Waiting" | "Approved" | "Completed";

function DoctorAppointments() {
 const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
 const { data: appointments, isLoading, isError } = useDoctorAppointments(statusFilter);
 const { data: statistics } = useDoctorStatistics();

 if (isLoading) return <p className="p-8">Loading...</p>;
 if (isError) return <p className="p-8">Error loading appointments...</p>;

 const filterTabs: { label: string; value: StatusFilter; count?: number }[] = [
  { label: "All", value: "all", count: statistics?.total_appointments },
  { label: "Waiting", value: "Waiting", count: statistics?.pending_appointments },
  { label: "Approved", value: "Approved", count: statistics?.approved_appointments },
  { label: "Completed", value: "Completed", count: statistics?.completed_appointments },
 ];

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
     <h1 className="font-bold text-xl text-white">My Appointments</h1>
    </div>

    {/* Filter Tabs */}
    <div className="flex gap-2 p-5 -mt-4 overflow-x-auto">
     {filterTabs.map((tab) => (
      <button
       key={tab.value}
       onClick={() => setStatusFilter(tab.value)}
       className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${statusFilter === tab.value
         ? "bg-monday-green text-white"
         : "bg-white text-monday-gray border border-monday-stroke"
        }`}
      >
       <span className="font-semibold text-sm">{tab.label}</span>
       {tab.count !== undefined && (
        <span
         className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold ${statusFilter === tab.value ? "bg-white/20 text-white" : "bg-monday-background"
          }`}
        >
         {tab.count}
        </span>
       )}
      </button>
     ))}
    </div>

    {/* Appointments List */}
    <main className="flex flex-col flex-1 px-5 gap-4">
     {appointments && appointments.length > 0 ? (
      appointments.map((appointment) => (
       <div
        key={appointment.id}
        className="flex flex-col rounded-2xl border border-monday-stroke bg-white p-4 gap-4"
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
         {appointment.status === "Completed" && (
          <p className="rounded-[4px] py-[6px] px-2 bg-emerald-500/10 font-bold text-sm text-emerald-500 shrink-0">
           Completed
          </p>
         )}
         {appointment.status === "Rejected" && (
          <p className="rounded-[4px] py-[6px] px-2 bg-monday-red/10 font-bold text-sm text-monday-red shrink-0">
           Rejected
          </p>
         )}
        </div>
        <hr className="border-monday-stroke" />
        <div className="flex flex-col gap-3">
         <div className="flex items-center justify-between">
          <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
           <img
            src="/assets/images/icons/calendar-2-grey.svg"
            className="size-5"
            alt="icon"
           />
           Date
          </p>
          <p className="font-bold leading-none">
           {format(new Date(appointment.started_at), "dd MMMM yyyy")}
          </p>
         </div>
         <div className="flex items-center justify-between">
          <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
           <img
            src="/assets/images/icons/clock-grey.svg"
            className="size-5"
            alt="icon"
           />
           Time
          </p>
          <p className="font-bold leading-none">{appointment.time_at}</p>
         </div>
         <div className="flex items-center justify-between">
          <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
           <img
            src="/assets/images/icons/money-grey.svg"
            className="size-5"
            alt="icon"
           />
           Amount
          </p>
          <p className="font-bold leading-none text-monday-green">
           Rp {appointment.grand_total?.toLocaleString("id-ID")}
          </p>
         </div>
        </div>
        <hr className="border-monday-stroke" />
        <Link
         to={`/doctor/appointments/${appointment.id}`}
         className="flex items-center justify-center w-full h-[48px] rounded-full py-3 px-6 bg-monday-green/10"
        >
         <span className="font-semibold leading-none text-monday-green">
          View Details
         </span>
        </Link>
       </div>
      ))
     ) : (
      <div
       id="Empty-State"
       className="flex flex-col flex-1 items-center justify-center rounded-[20px] p-[10px] gap-8 mt-10"
      >
       <img
        src="/assets/images/icons/note-remove-grey.svg"
        className="size-[52px]"
        alt="icon"
       />
       <div className="flex flex-col gap-1 items-center text-center">
        <p className="font-semibold text-monday-gray text-lg">
         No {statusFilter !== "all" ? statusFilter.toLowerCase() : ""} appointments
        </p>
        <p className="font-medium text-monday-gray text-sm">
         Your appointments will appear here
        </p>
       </div>
      </div>
     )}
    </main>

    {/* Bottom Navigation */}
    <DoctorBottomNav />
   </div>
  </div>
 );
}

export default DoctorAppointments;
