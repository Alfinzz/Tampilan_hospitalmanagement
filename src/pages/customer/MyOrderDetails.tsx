import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useMyOrderDetails } from "../../hooks/useBookings";
import { useCustomerTreatmentReport } from "../../hooks/useTreatmentReport";
import { useState } from "react";
import { ImagePreviewModal } from "../../components/ImagePreviewModal";
import RatingFormModal from "../../components/RatingFormModal";
import RatingStars from "../../components/RatingStars";

function MyOrderDetails() {
  const { orderId } = useParams();

  const { data, isPending, isError } = useMyOrderDetails(Number(orderId));
  const { data: treatmentReport } = useCustomerTreatmentReport(Number(orderId));

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  if (isPending) return <p>Loading...</p>;
  if (isError || !data) return <p>Order not found</p>;

  const isRejected = data.status === "Rejected";
  const isApproved = data.status === "Approved";
  const isWaiting = data.status === "Waiting";
  const isCompleted = data.status === "Completed";

  return (
    <>
      <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
        <div
          id="Content-Container"
          className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
        >
          <div id="Top-Nav" className="flex relative w-full h-[128px]">
            <div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
              <div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
                <Link
                  to={"/customer/my-orders"}
                  className="size-11 flex shrink-0"
                >
                  <img
                    src="/assets/images/icons/mobile-back-button.svg"
                    className="size-full"
                    alt="icon"
                  />
                </Link>
                <h1 className="font-bold text-lg leading-none text-center">
                  Order Details
                </h1>
                <a href="#" className="size-11 flex shrink-0">
                  <img
                    src="/assets/images/icons/mobile-more-button.svg"
                    className="size-full"
                    alt="icon"
                  />
                </a>
              </div>
            </div>
          </div>
          <main className="flex flex-col flex-1">
            <div id="status" className="w-full max-w-[640px] relative px-5">
              {isRejected && (
                <div
                  id="Note-Red"
                  className="relative w-full min-h-16 rounded-t-[20px] overflow-hidden"
                >
                  <div className="absolute w-[inherit] h-full overflow-hidden">
                    <img
                      src="/assets/images/backgrounds/mobile-red-note.svg"
                      className="w-full h-full object-cover object-right"
                      alt="background"
                    />
                  </div>
                  <div className="relative flex items-center w-full h-full p-5 gap-[10px]">
                    <img
                      src="/assets/images/icons/note-remove-white-fill.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                    <p className="font-bold text-sm leading-[1.4em] text-white">
                      Booking declined. Refund on the way
                    </p>
                  </div>
                </div>
              )}
              {isApproved && (
                <div
                  id="Note-Green"
                  className="relative w-full min-h-16 rounded-t-[20px] overflow-hidden"
                >
                  <div className="absolute w-[inherit] h-full overflow-hidden">
                    <img
                      src="/assets/images/backgrounds/light-green-note.svg"
                      className="w-full h-full object-cover object-right"
                      alt="background"
                    />
                  </div>
                  <div className="relative flex items-center w-full h-full p-5 gap-[10px]">
                    <img
                      src="/assets/images/icons/calendar-tick-white-fill.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                    <p className="font-bold text-sm leading-[1.4em] text-white">
                      Doctor confirmed. See you soon!
                    </p>
                  </div>
                </div>
              )}
              {isCompleted && (
                <div
                  id="Note-Emerald"
                  className="relative w-full min-h-16 rounded-t-[20px] overflow-hidden bg-emerald-500"
                >
                  <div className="relative flex items-center w-full h-full p-5 gap-[10px]">
                    <svg className="flex size-6 shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-bold text-sm leading-[1.4em] text-white">
                      Appointment completed. Check your treatment report below.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col w-full flex-1 p-5 pt-8 gap-8 bg-white">
              <div className="flex flex-col gap-4">
                <p className="font-bold">Booking Review</p>
                <div className="flex flex-col rounded-2xl border border-monday-stroke p-5 px-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-16 rounded-full bg-monday-background overflow-hidden shrink-0">
                      <img
                        src={data.doctor.photo}
                        className="size-full object-cover"
                        alt="icon"
                      />
                    </div>
                    <div className="flex flex-col gap-[6px] w-full">
                      <p className="font-semibold">{data.doctor.name}</p>
                      <div className="flex items-center gap-1 text-nowrap">
                        <img
                          src="/assets/images/icons/stetoscop-grey.svg"
                          className="flex size-5 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold text-monday-gray leading-none">
                          {data.doctor.specialist.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
                      <img
                        src="/assets/images/icons/star-sliced-white.svg"
                        className="flex size-5 shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold leading-none text-white">
                        5.0
                      </p>
                    </div>
                  </div>
                  <hr className="border-monday-stroke" />
                  <div className="flex flex-col gap-4">
                    {isWaiting && (
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                          <img
                            src="/assets/images/icons/timer-grey.svg"
                            className="size-5"
                            alt="icon"
                          />
                          Status
                        </p>
                        <p className="rounded-[4px] py-[6px] px-2 bg-monday-orange/10 font-bold text-monday-orange">
                          Waiting
                        </p>
                      </div>
                    )}

                    {isApproved && (
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                          <img
                            src="/assets/images/icons/timer-grey.svg"
                            className="size-5"
                            alt="icon"
                          />
                          Status
                        </p>
                        <p className="rounded-[4px] py-[6px] px-2 bg-monday-green/10 font-bold text-monday-green">
                          Approved
                        </p>
                      </div>
                    )}

                    {isRejected && (
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                          <img
                            src="/assets/images/icons/timer-grey.svg"
                            className="size-5"
                            alt="icon"
                          />
                          Status
                        </p>
                        <p className="rounded-[4px] py-[6px] px-2 bg-monday-red/10 font-bold text-monday-red">
                          Rejected
                        </p>
                      </div>
                    )}

                    {isCompleted && (
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                          <img
                            src="/assets/images/icons/timer-grey.svg"
                            className="size-5"
                            alt="icon"
                          />
                          Status
                        </p>
                        <p className="rounded-[4px] py-[6px] px-2 bg-emerald-500/10 font-bold text-emerald-600">
                          Completed
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/note-text-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Order ID
                      </p>
                      <p className="font-bold leading-none">{data.id}</p>
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
                        {format(new Date(data.started_at), "dd MMM yyyy")}
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
                      <p className="font-bold leading-none">{data.time_at}</p>
                    </div>
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
                        Rp {data.sub_total.toLocaleString("id")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/money-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Sub Total
                      </p>
                      <p className="font-bold leading-none">
                        Rp {data.sub_total.toLocaleString("id")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/receipt-2-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Tax 11%
                      </p>
                      <p className="font-bold leading-none">
                        Rp {data.tax_total.toLocaleString("id")}
                      </p>
                    </div>
                    <hr className="border-monday-stroke" />
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/receipt-text-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Grand Total
                      </p>
                      <p className="font-bold text-lg leading-none text-monday-red">
                        Rp {data.grand_total.toLocaleString("id")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-bold">Hospital Details</p>
                <div className="flex flex-col rounded-2xl border border-monday-stroke p-5 px-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-16 rounded-2xl bg-monday-background overflow-hidden shrink-0">
                      <img
                        src={data.doctor.hospital.photo}
                        className="size-full object-cover"
                        alt="icon"
                      />
                    </div>
                    <div className="flex flex-col gap-[6px] w-full overflow-hidden">
                      <p className="font-semibold text-lg">
                        {data.doctor.hospital.name}
                      </p>
                      <div className="flex items-center gap-1 text-nowrap">
                        <img
                          src="/assets/images/icons/location-grey.svg"
                          className="flex size-5 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold text-monday-gray truncate">
                          {data.doctor.hospital.city} (
                          {data.doctor.hospital.post_code})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
                      <img
                        src="/assets/images/icons/star-sliced-white.svg"
                        className="flex size-5 shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold leading-none text-white">
                        4.8
                      </p>
                    </div>
                  </div>
                  <hr className="border-monday-stroke" />
                  <div className="w-full h-[270px] overflow-hidden rounded-[20px] resize-none">
                    <div id="g-mapdisplay" className="size-full">
                      <iframe
                        className="size-full border-none"
                        src={`https://www.google.com/maps/embed/v1/place?q=${data.doctor.hospital.name}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                      ></iframe>
                    </div>
                  </div>
                  <p className="font-medium leading-[1.6em] text-monday-gray">
                    {data.doctor.hospital.address}{" "}
                    {data.doctor.hospital.post_code} Indonesia
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-bold">Proof of Payment</p>
                <div className="flex flex-col rounded-2xl border border-monday-stroke p-5 px-4 gap-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/calendar-2-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Bank Name
                      </p>
                      <p className="font-bold leading-none">Amba Bank</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/clock-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Bank Account
                      </p>
                      <p className="font-bold leading-none">Bimore Care</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/ticket-expired-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Bank Number
                      </p>
                      <p className="font-bold leading-none">555 300 2003</p>
                    </div>
                  </div>
                  <div className="relative flex w-full h-[218px] rounded-[20px] shrink-0 overflow-hidden">
                    <img
                      id="Thumbnail"
                      src={data.proof}
                      className="relative size-full object-cover"
                      alt="icon"
                    />
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="absolute transform -translate-x-1/2 left-1/2 bottom-3 flex items-center justify-center rounded-full py-[10px] px-3 gap-[6px] bg-white"
                    >
                      <img
                        src="/assets/images/icons/maximize-3-black.svg"
                        className="size-5 flex shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold text-sm leading-none">
                        PREVIEW
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Treatment Report Section - Only show for completed appointments */}
              {isCompleted && treatmentReport && (
                <div className="flex flex-col gap-4">
                  <p className="font-bold">Treatment Report</p>
                  <div className="flex flex-col rounded-2xl border-2 border-emerald-500 p-5 px-4 gap-4 bg-emerald-50/50">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <svg className="flex size-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold text-sm">Report from your doctor</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-monday-gray">Diagnosis</p>
                        <p className="font-semibold">{treatmentReport.diagnosis}</p>
                      </div>

                      {treatmentReport.prescription && (
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium text-monday-gray">Prescription</p>
                          <p className="font-semibold whitespace-pre-wrap">{treatmentReport.prescription}</p>
                        </div>
                      )}

                      {treatmentReport.doctor_notes && (
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium text-monday-gray">Doctor Notes</p>
                          <p className="font-semibold whitespace-pre-wrap">{treatmentReport.doctor_notes}</p>
                        </div>
                      )}

                      {treatmentReport.next_visit_date && (
                        <div className="flex flex-col gap-1 p-3 bg-monday-blue/10 rounded-xl">
                          <p className="text-sm font-medium text-monday-gray">Next Visit</p>
                          <p className="font-bold text-monday-blue">
                            {format(new Date(treatmentReport.next_visit_date), "dd MMMM yyyy")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* No report yet for completed */}
              {isCompleted && !treatmentReport && (
                <div className="flex flex-col gap-4">
                  <p className="font-bold">Treatment Report</p>
                  <div className="flex flex-col items-center rounded-2xl border border-dashed border-monday-stroke p-6 gap-3 text-center">
                    <svg className="size-12 text-monday-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-monday-gray font-medium">Your doctor hasn't submitted the treatment report yet.</p>
                  </div>
                </div>
              )}

              {/* Rating Section - Show for completed appointments */}
              {isCompleted && data.rated_at && (
                <div className="flex flex-col gap-4">
                  <p className="font-bold">Your Review</p>
                  <div className="flex flex-col gap-4 rounded-2xl border border-monday-stroke p-5">
                    {/* Doctor Rating */}
                    <div className="flex flex-col gap-3 pb-4 border-b border-monday-stroke">
                      <div className="flex items-center gap-2">
                        <img
                          src="/assets/images/icons/profile-circle-grey.svg"
                          className="size-5"
                          alt="doctor"
                        />
                        <p className="font-semibold">Doctor Rating</p>
                      </div>
                      <RatingStars rating={data.doctor_rating || 0} size="md" />
                      {data.doctor_review && (
                        <p className="text-monday-gray">{data.doctor_review}</p>
                      )}
                    </div>

                    {/* Hospital Rating */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <img
                          src="/assets/images/icons/hospital-grey.svg"
                          className="size-5"
                          alt="hospital"
                        />
                        <p className="font-semibold">Hospital Rating</p>
                      </div>
                      <RatingStars rating={data.hospital_rating || 0} size="md" />
                      {data.hospital_review && (
                        <p className="text-monday-gray">{data.hospital_review}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Rating Button - Show for completed unrated appointments */}
              {isCompleted && !data.rated_at && (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setIsRatingModalOpen(true)}
                    className="w-full py-4 rounded-full bg-monday-orange text-white font-semibold text-lg hover:bg-monday-orange/90 transition-colors"
                  >
                    Rate This Appointment
                  </button>
                </div>
              )}

              <div
                id="Bottom-Bar"
                className="flex relative w-full h-[104px] -ml-5"
              >
                <div className="fixed z-30 bottom-0 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
                  <Link
                    to={"/customer/discover"}
                    className="flex items-center w-full justify-center gap-[6px] rounded-full py-4 px-6 bg-monday-blue/10 disabled:bg-monday-stroke"
                  >
                    <span className="font-semibold text-lg leading-none text-monday-blue">
                      Customer Services
                    </span>
                    <img
                      src="/assets/images/icons/messages-blue.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {isPreviewOpen && (
        <ImagePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          src={data.proof}
        />
      )}

      {isRatingModalOpen && (
        <RatingFormModal
          orderId={Number(orderId)}
          doctorName={data.doctor.name}
          hospitalName={data.doctor.hospital.name}
          onClose={() => setIsRatingModalOpen(false)}
        />
      )}
    </>
  );
}

export default MyOrderDetails;
