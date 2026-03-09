import { useState } from "react";
import { useSubmitTreatmentReport, useDoctorTreatmentReport } from "../../hooks/useTreatmentReport";

interface TreatmentReportFormProps {
 appointmentId: number;
 onSuccess?: () => void;
}

function TreatmentReportForm({ appointmentId, onSuccess }: TreatmentReportFormProps) {
 const { data: existingReport, isLoading: isLoadingReport } = useDoctorTreatmentReport(appointmentId);
 const submitReport = useSubmitTreatmentReport();

 const [diagnosis, setDiagnosis] = useState("");
 const [prescription, setPrescription] = useState("");
 const [doctorNotes, setDoctorNotes] = useState("");
 const [nextVisitDate, setNextVisitDate] = useState("");
 const [isEditing, setIsEditing] = useState(false);
 const [showSuccess, setShowSuccess] = useState(false);

 // Initialize form with existing data
 const initializeForm = () => {
  if (existingReport) {
   setDiagnosis(existingReport.diagnosis);
   setPrescription(existingReport.prescription || "");
   setDoctorNotes(existingReport.doctor_notes || "");
   setNextVisitDate(existingReport.next_visit_date || "");
  }
  setShowSuccess(false);
  setIsEditing(true);
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!diagnosis.trim()) {
   alert("Diagnosis is required");
   return;
  }

  try {
   await submitReport.mutateAsync({
    appointmentId,
    data: {
     diagnosis,
     prescription: prescription || undefined,
     doctor_notes: doctorNotes || undefined,
     next_visit_date: nextVisitDate || undefined,
    },
   });
   setIsEditing(false);
   setShowSuccess(true);
   if (onSuccess) onSuccess();
  } catch (error) {
   console.error("Failed to submit report:", error);
  }
 };

 if (isLoadingReport) {
  return <p className="text-monday-gray text-center py-4">Loading...</p>;
 }

 // Show success message immediately after submit
 if (showSuccess && !isEditing) {
  return (
   <div className="flex flex-col gap-4 p-5 bg-monday-green/10 rounded-2xl border-2 border-monday-green">
    <div className="flex items-center justify-center gap-3">
     <div className="flex items-center justify-center size-12 rounded-full bg-monday-green">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
     </div>
     <div className="flex flex-col">
      <p className="font-bold text-lg text-monday-green">Report Submitted!</p>
      <p className="text-monday-green/80 text-sm">Treatment report has been sent to patient</p>
     </div>
    </div>
    <button
     onClick={initializeForm}
     className="text-monday-green font-semibold text-sm underline"
    >
     Edit Report
    </button>
   </div>
  );
 }

 // Show existing report view
 if (existingReport && !isEditing) {
  return (
   <div className="flex flex-col gap-4 p-5 bg-white rounded-2xl border border-monday-stroke">
    <div className="flex items-center justify-between">
     <h3 className="font-bold text-lg">Treatment Report</h3>
     <button
      onClick={initializeForm}
      className="text-monday-blue font-semibold text-sm"
     >
      Edit
     </button>
    </div>

    <div className="flex flex-col gap-3">
     <div className="flex flex-col gap-1">
      <p className="text-sm font-medium text-monday-gray">Diagnosis</p>
      <p className="font-semibold">{existingReport.diagnosis}</p>
     </div>

     {existingReport.prescription && (
      <div className="flex flex-col gap-1">
       <p className="text-sm font-medium text-monday-gray">Prescription</p>
       <p className="font-semibold whitespace-pre-wrap">{existingReport.prescription}</p>
      </div>
     )}

     {existingReport.doctor_notes && (
      <div className="flex flex-col gap-1">
       <p className="text-sm font-medium text-monday-gray">Notes</p>
       <p className="font-semibold whitespace-pre-wrap">{existingReport.doctor_notes}</p>
      </div>
     )}

     {existingReport.next_visit_date && (
      <div className="flex flex-col gap-1">
       <p className="text-sm font-medium text-monday-gray">Next Visit</p>
       <p className="font-semibold">{existingReport.next_visit_date}</p>
      </div>
     )}
    </div>

    <div className="flex items-center gap-2 text-monday-green">
     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
     </svg>
     <span className="font-medium text-sm">Report submitted</span>
    </div>
   </div>
  );
 }

 // Show form for creating/editing report
 return (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 bg-white rounded-2xl border border-monday-stroke">
   <div className="flex items-center justify-between">
    <h3 className="font-bold text-lg">
     {existingReport ? "Edit Treatment Report" : "Submit Treatment Report"}
    </h3>
    {existingReport && (
     <button
      type="button"
      onClick={() => setIsEditing(false)}
      className="text-monday-gray font-semibold text-sm"
     >
      Cancel
     </button>
    )}
   </div>

   <div className="flex flex-col gap-2">
    <label className="font-semibold text-sm">
     Diagnosis <span className="text-monday-red">*</span>
    </label>
    <textarea
     value={diagnosis}
     onChange={(e) => setDiagnosis(e.target.value)}
     placeholder="Enter diagnosis..."
     className="w-full min-h-[80px] px-4 py-3 rounded-xl border border-monday-stroke focus:border-monday-green focus:ring-1 focus:ring-monday-green outline-none resize-none"
     required
    />
   </div>

   <div className="flex flex-col gap-2">
    <label className="font-semibold text-sm">Prescription</label>
    <textarea
     value={prescription}
     onChange={(e) => setPrescription(e.target.value)}
     placeholder="Enter prescription/medicine..."
     className="w-full min-h-[80px] px-4 py-3 rounded-xl border border-monday-stroke focus:border-monday-green focus:ring-1 focus:ring-monday-green outline-none resize-none"
    />
   </div>

   <div className="flex flex-col gap-2">
    <label className="font-semibold text-sm">Doctor Notes</label>
    <textarea
     value={doctorNotes}
     onChange={(e) => setDoctorNotes(e.target.value)}
     placeholder="Additional notes for patient..."
     className="w-full min-h-[60px] px-4 py-3 rounded-xl border border-monday-stroke focus:border-monday-green focus:ring-1 focus:ring-monday-green outline-none resize-none"
    />
   </div>

   <div className="flex flex-col gap-2">
    <label className="font-semibold text-sm">Next Visit Date (Optional)</label>
    <input
     type="date"
     value={nextVisitDate}
     onChange={(e) => setNextVisitDate(e.target.value)}
     className="w-full px-4 py-3 rounded-xl border border-monday-stroke focus:border-monday-green focus:ring-1 focus:ring-monday-green outline-none"
    />
   </div>

   <button
    type="submit"
    disabled={submitReport.isPending || !diagnosis.trim()}
    className="flex items-center justify-center w-full rounded-full py-4 px-6 bg-monday-green hover:bg-monday-green/90 transition-colors disabled:opacity-50"
   >
    <span className="font-semibold text-lg leading-none text-white">
     {submitReport.isPending ? "Submitting..." : "Submit Report"}
    </span>
   </button>
  </form>
 );
}

export default TreatmentReportForm;
