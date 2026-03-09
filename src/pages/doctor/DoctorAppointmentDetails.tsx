import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../../hooks/useAuth";
import { useDoctorAppointmentDetails, useUpdateAppointmentStatus } from "../../hooks/useDoctorAppointments";
import TreatmentReportForm from "../../components/doctor/TreatmentReportForm";

function DoctorAppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: appointment, isLoading, isError } = useDoctorAppointmentDetails(Number(id));
  const updateStatus = useUpdateAppointmentStatus();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"Approved" | "Rejected" | "Completed" | null>(null);

  if (!user) return <p className="p-8">User not logged in.</p>;
  if (isLoading) return <p className="p-8">Loading appointment details...</p>;
  if (isError || !appointment) return <p className="p-8">Appointment not found.</p>;

  const handleStatusChange = async (status: "Approved" | "Rejected" | "Completed") => {
    setPendingAction(status);
    setShowConfirmModal(true);
  };

  const confirmStatusChange = async () => {
    if (!pendingAction) return;

    try {
      await updateStatus.mutateAsync({ id: Number(id), status: pendingAction });
      setShowConfirmModal(false);
      setPendingAction(null);
      // Stay on page to show updated status
    } catch (error) {
      console.error("Failed to update status:", error);
      setShowConfirmModal(false);
      setPendingAction(null);
    }
  };

  const getActionText = () => {
    switch (pendingAction) {
      case "Approved":
        return "approve this appointment";
      case "Rejected":
        return "reject this appointment";
      case "Completed":
        return "mark this appointment as completed";
      default:
        return "";
    }
  };

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
              <Link to="/doctor/appointments" className="size-11 flex shrink-0">
                <img
                  src="/assets/images/icons/mobile-back-button.svg"
                  className="size-full"
                  alt="icon"
                />
              </Link>
              <h1 className="font-bold text-lg leading-none text-center">
                Appointment Details
              </h1>
              <div className="size-11 flex shrink-0" />
            </div>
          </div>
        </div>

        <main className="flex flex-col flex-1">
          {/* Patient Info Card */}
          <div className="flex flex-col rounded-2xl border border-monday-stroke p-4 bg-white gap-4 mx-5">
            <div className="flex items-center gap-[10px]">
              <div className="flex size-16 rounded-full bg-monday-background overflow-hidden shrink-0">
                <img
                  src={appointment.user?.photo || "/assets/images/icons/profile-2user-grey.svg"}
                  className="size-full object-cover"
                  alt="patient"
                />
              </div>
              <div className="flex flex-col gap-[6px] w-full">
                <p className="font-semibold text-lg">{appointment.user?.name || "Patient"}</p>
                <div className="flex items-center gap-1 text-nowrap">
                  <img
                    src="/assets/images/icons/sms-grey.svg"
                    className="flex size-5 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-monday-gray leading-none">
                    {appointment.user?.email}
                  </p>
                </div>
              </div>
              {appointment.status === "Approved" && (
                <p className="rounded-[4px] py-[6px] px-2 bg-monday-green/10 font-bold text-monday-green shrink-0">
                  Approved
                </p>
              )}
              {appointment.status === "Waiting" && (
                <p className="rounded-[4px] py-[6px] px-2 bg-monday-orange/10 font-bold text-monday-orange shrink-0">
                  Waiting
                </p>
              )}
              {appointment.status === "Completed" && (
                <p className="rounded-[4px] py-[6px] px-2 bg-emerald-500/10 font-bold text-emerald-500 shrink-0">
                  Completed
                </p>
              )}
              {appointment.status === "Rejected" && (
                <p className="rounded-[4px] py-[6px] px-2 bg-monday-red/10 font-bold text-monday-red shrink-0">
                  Rejected
                </p>
              )}
            </div>
            <hr className="border border-monday-stroke" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 items-center text-center shrink-0">
                <p className="flex items-center gap-0.5 font-semibold leading-none text-nowrap">
                  <img
                    src="/assets/images/icons/call-incoming-grey.svg"
                    className="size-5"
                    alt="icon"
                  />
                  {appointment.user?.phone || "-"}
                </p>
                <p className="font-medium text-sm text-monday-gray leading-none">
                  Phone
                </p>
              </div>
              <div className="flex flex-col gap-2 items-center text-center">
                <p className="flex items-center gap-0.5 font-semibold leading-none">
                  <img
                    src={`${appointment.user?.gender === "Male"
                      ? "/assets/images/icons/man-black-fill.svg"
                      : "/assets/images/icons/woman-black-fill.svg"
                      }`}
                    className="size-5"
                    alt="icon"
                  />
                  {appointment.user?.gender || "-"}
                </p>
                <p className="font-medium text-sm text-monday-gray leading-none">
                  Gender
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="flex flex-col w-full flex-1 p-5 pb-0 gap-4 bg-white mt-5">
            <div className="flex flex-col gap-4">
              <p className="font-bold text-lg">Appointment Details</p>
              <div className="flex flex-col rounded-2xl border border-monday-stroke">
                <div className="flex items-center gap-4 p-5 px-4">
                  <div className="flex size-16 rounded-2xl bg-monday-background overflow-hidden shrink-0">
                    <img
                      src={appointment.doctor?.hospital?.photo}
                      className="size-full object-cover"
                      alt="hospital"
                    />
                  </div>
                  <div className="flex flex-col gap-[6px] w-full overflow-hidden">
                    <p className="font-bold">{appointment.doctor?.hospital?.name}</p>
                    <div className="flex items-center gap-1 text-nowrap">
                      <img
                        src="/assets/images/icons/location-grey.svg"
                        className="flex size-5 shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold text-monday-gray truncate">
                        {appointment.doctor?.hospital?.city} ({appointment.doctor?.hospital?.post_code})
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border-monday-stroke" />
                <div className="flex flex-col p-5 px-4 gap-4">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                      <img
                        src="/assets/images/icons/stetoscop-grey.svg"
                        className="size-5"
                        alt="icon"
                      />
                      Specialist
                    </p>
                    <p className="font-bold leading-none">
                      {appointment.doctor?.specialist?.name}
                    </p>
                  </div>
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
                      {format(new Date(appointment.started_at), "dd MMM yyyy")}
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
                  <hr className="border-monday-stroke" />
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                      <img
                        src="/assets/images/icons/ticket-expired-grey.svg"
                        className="size-5"
                        alt="icon"
                      />
                      Price
                    </p>
                    <p className="font-bold leading-none">
                      Rp {appointment.sub_total?.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                      <img
                        src="/assets/images/icons/receipt-2-grey.svg"
                        className="size-5"
                        alt="icon"
                      />
                      Tax
                    </p>
                    <p className="font-bold leading-none">
                      Rp {appointment.tax_total?.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                      <img
                        src="/assets/images/icons/receipt-text-grey.svg"
                        className="size-5"
                        alt="icon"
                      />
                      Grand Total
                    </p>
                    <p className="font-bold text-lg leading-none text-monday-green">
                      Rp {appointment.grand_total?.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Proof of Payment */}
            {appointment.proof && (
              <div className="flex flex-col gap-4 mt-4">
                <p className="font-bold text-lg">Proof of Payment</p>
                <div className="flex w-full h-[200px] rounded-2xl bg-monday-background overflow-hidden">
                  <img
                    src={appointment.proof}
                    className="size-full object-cover"
                    alt="proof"
                  />
                </div>
              </div>
            )}

            {/* Treatment Report Section - Only for Completed */}
            {appointment.status === "Completed" && (
              <div className="flex flex-col gap-4 mt-4">
                <p className="font-bold text-lg">Treatment Report</p>
                <TreatmentReportForm appointmentId={Number(id)} />
              </div>
            )}

            {/* Back Button for Completed/Rejected - Inline */}
            {(appointment.status === "Completed" || appointment.status === "Rejected") && (
              <div className="mt-6 mb-8">
                <button
                  onClick={() => navigate("/doctor/appointments")}
                  className="flex items-center w-full justify-center gap-2 rounded-full py-4 px-6 bg-monday-gray/10 hover:bg-monday-gray/20 transition-colors"
                >
                  <svg className="w-5 h-5 text-monday-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-semibold text-lg leading-none text-monday-gray">
                    Back to Appointments
                  </span>
                </button>
              </div>
            )}

            {/* Action Buttons - Fixed Bottom for Waiting/Approved only */}
            {(appointment.status === "Waiting" || appointment.status === "Approved") && (
              <div className="flex relative w-full min-h-[120px] mt-4">
                <div className="fixed z-30 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
                  {appointment.status === "Waiting" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleStatusChange("Rejected")}
                        disabled={updateStatus.isPending}
                        className="flex-1 flex items-center justify-center rounded-full py-4 px-6 border-2 border-monday-red text-monday-red hover:bg-monday-red/10 transition-colors disabled:opacity-50"
                      >
                        <span className="font-semibold leading-none">Reject</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange("Approved")}
                        disabled={updateStatus.isPending}
                        className="flex-1 flex items-center justify-center rounded-full py-4 px-6 bg-monday-green hover:bg-monday-green/90 transition-colors disabled:opacity-50"
                      >
                        <span className="font-semibold leading-none text-white">Approve</span>
                      </button>
                    </div>
                  )}

                  {appointment.status === "Approved" && (
                    <button
                      onClick={() => handleStatusChange("Completed")}
                      disabled={updateStatus.isPending}
                      className="flex items-center w-full justify-center gap-2 rounded-full py-4 px-6 bg-monday-blue hover:bg-monday-blue/90 transition-all disabled:opacity-50"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-bold text-lg leading-none text-white">
                        {updateStatus.isPending ? "Processing..." : "Mark as Completed"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-black/50 pointer-events-auto" onClick={() => { setShowConfirmModal(false); setPendingAction(null); }} />
            <div className="relative bg-white rounded-3xl p-6 w-[85%] max-w-[340px] pointer-events-auto shadow-2xl">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className={`flex items-center justify-center size-16 rounded-full ${pendingAction === "Approved" ? "bg-monday-green/10" :
                  pendingAction === "Rejected" ? "bg-monday-red/10" :
                    "bg-emerald-500/10"
                  }`}>
                  {pendingAction === "Approved" && (
                    <svg className="w-8 h-8 text-monday-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {pendingAction === "Rejected" && (
                    <svg className="w-8 h-8 text-monday-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {pendingAction === "Completed" && (
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <p className="font-bold text-lg">Confirm Action</p>
                <p className="text-monday-gray mb-2">
                  Are you sure you want to {getActionText()}?
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => {
                      setShowConfirmModal(false);
                      setPendingAction(null);
                    }}
                    className="flex-1 items-center justify-center py-4 rounded-full border-2 border-monday-stroke font-bold hover:bg-monday-background transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmStatusChange}
                    disabled={updateStatus.isPending}
                    className={`flex-1 items-center justify-center py-4 rounded-full font-bold text-white transition-colors text-sm ${pendingAction === "Rejected" ? "bg-monday-red" :
                      pendingAction === "Approved" ? "bg-monday-green" :
                        "bg-monday-blue"
                      } disabled:opacity-50`}
                  >
                    {updateStatus.isPending ? "..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorAppointmentDetails;

