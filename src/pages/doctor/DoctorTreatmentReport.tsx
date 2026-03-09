import { Link, useParams, useNavigate } from "react-router-dom";
import { useDoctorAppointmentDetails } from "../../hooks/useDoctorAppointments";
import TreatmentReportForm from "../../components/doctor/TreatmentReportForm";

function DoctorTreatmentReport() {
 const { id } = useParams();
 const navigate = useNavigate();
 const { data: appointment, isLoading, isError } = useDoctorAppointmentDetails(Number(id));

 if (isLoading) return <p className="p-8">Loading...</p>;
 if (isError || !appointment) return <p className="p-8">Appointment not found.</p>;

 return (
  <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
   <div
    id="Content-Container"
    className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
   >
    {/* Top Navigation */}
    <div id="Top-Nav" className="flex relative w-full h-[128px]">
     <div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
      <div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
       <Link to={`/doctor/appointments/${id}`} className="size-11 flex shrink-0">
        <img
         src="/assets/images/icons/mobile-back-button.svg"
         className="size-full"
         alt="icon"
        />
       </Link>
       <h1 className="font-bold text-lg leading-none text-center">
        Treatment Report
       </h1>
       <div className="size-11 flex shrink-0" />
      </div>
     </div>
    </div>

    <main className="flex flex-col flex-1 px-5 pb-32">
     {/* Patient Info Summary */}
     <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-monday-stroke mb-5">
      <div className="flex size-14 rounded-full bg-monday-background overflow-hidden shrink-0">
       <img
        src={appointment.user?.photo || "/assets/images/icons/profile-2user-grey.svg"}
        className="size-full object-cover"
        alt="patient"
       />
      </div>
      <div className="flex flex-col gap-1">
       <p className="font-bold">{appointment.user?.name || "Patient"}</p>
       <p className="text-monday-gray text-sm">{appointment.user?.email}</p>
      </div>
      <p className="ml-auto rounded-[4px] py-[6px] px-2 bg-emerald-500/10 font-bold text-emerald-500 text-sm shrink-0">
       Completed
      </p>
     </div>

     {/* Appointment Info */}
     <div className="flex flex-col gap-3 p-4 bg-white rounded-2xl border border-monday-stroke mb-5">
      <div className="flex items-center justify-between">
       <p className="text-monday-gray text-sm">Hospital</p>
       <p className="font-semibold text-sm">{appointment.doctor?.hospital?.name}</p>
      </div>
      <div className="flex items-center justify-between">
       <p className="text-monday-gray text-sm">Specialist</p>
       <p className="font-semibold text-sm">{appointment.doctor?.specialist?.name}</p>
      </div>
      <div className="flex items-center justify-between">
       <p className="text-monday-gray text-sm">Date & Time</p>
       <p className="font-semibold text-sm">{appointment.started_at} • {appointment.time_at}</p>
      </div>
     </div>

     {/* Treatment Report Form */}
     <div className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">Submit Report</h2>
      <TreatmentReportForm
       appointmentId={Number(id)}
       onSuccess={() => navigate(`/doctor/appointments/${id}`)}
      />
     </div>
    </main>

    {/* Bottom Button */}
    <div className="flex relative w-full h-[100px]">
     <div className="fixed z-30 bottom-0 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
      <button
       onClick={() => navigate(`/doctor/appointments/${id}`)}
       className="flex items-center w-full justify-center gap-2 rounded-full py-4 px-6 bg-monday-gray/10 hover:bg-monday-gray/20 transition-colors"
      >
       <svg className="w-5 h-5 text-monday-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
       </svg>
       <span className="font-semibold text-lg leading-none text-monday-gray">
        Back to Details
       </span>
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}

export default DoctorTreatmentReport;
