function DemoShowcase() {
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-auto">
      <div className="flex gap-8 p-8 min-w-max mx-auto">
        {/* HOSPITALS & DOCTORS Section */}
        <div className="flex flex-col gap-4">
          <div className="bg-indigo-700 text-white font-bold text-2xl px-6 py-4 rounded-t-2xl">
            HOSPITALS & DOCTORS
          </div>
          <div className="flex gap-4">
            {/* Hospital Details */}
            <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-white p-4 border-b">
                <h3 className="font-bold text-center">Hospital Details</h3>
              </div>
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src="/assets/images/hospitals/hospital1.png"
                  className="w-full h-full object-cover"
                  alt="hospital"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/320x200/4F46E5/white?text=Hospital";
                  }}
                />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-full bg-orange-500 py-1 px-2 gap-1">
                    <img src="/assets/images/icons/star-sliced-white.svg" className="w-4 h-4" alt="star" />
                    <p className="font-semibold text-white text-sm">4.8</p>
                  </div>
                  <p className="font-semibold text-gray-600 text-sm">2040 Reviews</p>
                </div>
                <div>
                  <p className="font-bold text-lg">Green Mastery Hospital</p>
                  <div className="flex items-center gap-1 text-gray-600">
                    <img src="/assets/images/icons/location-grey.svg" className="w-5 h-5" alt="location" />
                    <p className="text-sm">Bogor (32902)</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Your local and emergency hospital is ready to provide the best service with
                  modern facilities.
                </p>
              </div>
            </div>

            {/* Hospital Doctors */}
            <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-white p-4 border-b">
                <h3 className="font-bold text-center">Hospital Doctors</h3>
              </div>
              <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <img
                        src={`/assets/images/doctors/doctor${i}.png`}
                        className="w-full h-full object-cover"
                        alt="doctor"
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/48x48/4F46E5/white?text=Dr`;
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">Dr. Nurse Brenda</p>
                      <p className="text-xs text-gray-600 truncate">10 years experience</p>
                    </div>
                    <div className="flex items-center rounded-full bg-orange-500 py-1 px-2 gap-1">
                      <img src="/assets/images/icons/star-sliced-white.svg" className="w-3 h-3" alt="star" />
                      <p className="font-semibold text-white text-xs">4.8</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctors Details */}
            <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-white p-4 border-b">
                <h3 className="font-bold text-center">Doctors Details</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img
                      src="/assets/images/doctors/doctor1.png"
                      className="w-full h-full object-cover"
                      alt="doctor"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/64x64/4F46E5/white?text=Dr";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Dr. Wanda Kendrick</p>
                    <p className="text-sm text-gray-600">Heart Specialist</p>
                  </div>
                  <div className="flex items-center rounded-full bg-orange-500 py-1 px-2 gap-1">
                    <img src="/assets/images/icons/star-sliced-white.svg" className="w-4 h-4" alt="star" />
                    <p className="font-semibold text-white text-sm">5.0</p>
                  </div>
                </div>
                <hr />
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Youth and appointments I'll Brenda started work in patient with good experience
                    8 years so far.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-orange-50 rounded-xl p-3 text-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <img src="/assets/images/icons/house-blue.svg" className="w-6 h-6" alt="icon" />
                      </div>
                      <p className="font-semibold text-sm">Consultation</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <img src="/assets/images/icons/help-desk-blue.svg" className="w-6 h-6" alt="icon" />
                      </div>
                      <p className="font-semibold text-sm">Dental Service</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-3 text-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <img src="/assets/images/icons/weight-blue.svg" className="w-6 h-6" alt="icon" />
                      </div>
                      <p className="font-semibold text-sm">Health Service</p>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-full">
                  Rp 120,000
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOOK DOCTOR Section */}
        <div className="flex flex-col gap-4">
          <div className="bg-indigo-700 text-white font-bold text-2xl px-6 py-4 rounded-t-2xl">
            BOOK DOCTOR
          </div>
          <div className="flex gap-4">
            {/* Hospital Doctors (Step) */}
            <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-white p-4 border-b">
                <h3 className="font-bold text-center text-sm">Hospital Doctors (Step)</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                    <img
                      src="/assets/images/hospitals/hospital1.png"
                      className="w-full h-full object-cover"
                      alt="hospital"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/48x48/4F46E5/white?text=H";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">Green Mastery Hospital</p>
                    <p className="text-xs text-gray-600">Bogor (32902)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-sm">Choose Date</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["16 Dec", "17 Dec", "18 Dec"].map((date, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl text-center border-2 ${i === 0 ? "border-indigo-600 bg-indigo-50" : "border-gray-200"
                          }`}
                      >
                        <p className={`font-bold text-sm ${i === 0 ? "text-indigo-600" : ""}`}>
                          {date}
                        </p>
                        <p className="text-xs text-gray-600">Mon</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-sm">Choose Time</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["10:30", "11:30", "13:30", "14:30", "15:30", "16:30"].map((time, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-xl text-center border ${i === 0
                          ? "border-indigo-600 bg-indigo-50"
                          : i >= 4
                            ? "border-gray-200 bg-gray-100"
                            : "border-gray-200"
                          }`}
                      >
                        <p className={`font-bold text-xs ${i === 0 ? "text-indigo-600" : ""}`}>
                          {time}
                        </p>
                        <p
                          className={`text-xs ${i >= 4 ? "text-gray-400" : i === 0 ? "text-gray-600" : "text-indigo-600"
                            }`}
                        >
                          {i >= 4 ? "Soldout" : "Available"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Review and Checklist */}
            <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-white p-4 border-b">
                <h3 className="font-bold text-center text-sm">Review and Checklist</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="border rounded-xl p-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <img
                        src="/assets/images/doctors/doctor1.png"
                        className="w-full h-full object-cover"
                        alt="doctor"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/48x48/4F46E5/white?text=Dr";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Dr. Wanda</p>
                      <p className="text-xs text-gray-600">Heart Specialist</p>
                    </div>
                    <div className="flex items-center rounded-full bg-orange-500 py-1 px-2">
                      <img src="/assets/images/icons/star-sliced-white.svg" className="w-3 h-3" alt="star" />
                      <p className="font-semibold text-white text-xs ml-1">5.0</p>
                    </div>
                  </div>
                  <hr />
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-bold">16 Dec 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time</span>
                      <span className="font-bold">10:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price</span>
                      <span className="font-bold">Rp 120,000</span>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax 11%</span>
                      <span className="font-bold">Rp 13,200</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Grand Total</span>
                      <span className="text-red-600">Rp 133,200</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-xl p-3">
                  <p className="font-bold text-sm mb-3">Booking Details</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-xs text-gray-600">Good Doctor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-xs text-gray-600">Available Schedule</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-xs text-gray-600">Great Hospital</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-full text-sm">
                  Continue Payment
                </button>
              </div>
            </div>

            {/* Booking Finished */}
            <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-white p-4 border-b">
                <h3 className="font-bold text-center text-sm">Booking Finished</h3>
              </div>
              <div className="p-6 space-y-4 flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="text-center space-y-2">
                  <h2 className="font-bold text-xl">Booking Successful!</h2>
                  <p className="text-sm text-gray-600">
                    Your appointment has been confirmed. Check your email for details.
                  </p>
                </div>
                <div className="w-full space-y-2">
                  <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-full text-sm">
                    View My Orders
                  </button>
                  <button className="w-full border-2 border-indigo-600 text-indigo-600 font-semibold py-3 rounded-full text-sm">
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VIEW MY ORDER Section */}
        <div className="flex flex-col gap-4">
          <div className="bg-indigo-700 text-white font-bold text-2xl px-6 py-4 rounded-t-2xl">
            VIEW MY ORDER
          </div>
          <div className="flex gap-4">
            {/* My Order (On Going) */}
            <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-white p-4 border-b">
                <h3 className="font-bold text-center text-sm">My Order (On Going)</h3>
              </div>
              <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {[
                  { status: "Waiting", color: "orange" },
                  { status: "Approved", color: "green" },
                  { status: "Waiting", color: "orange" },
                ].map((order, i) => (
                  <div key={i} className="border rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                          <img
                            src={`/assets/images/doctors/doctor${i + 1}.png`}
                            className="w-full h-full object-cover"
                            alt="doctor"
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/40x40/4F46E5/white?text=Dr";
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-xs">Dr. Wanda Kendrick</p>
                          <p className="text-xs text-gray-600">Heart Specialist</p>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-bold ${order.color === "orange"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                          }`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <hr />
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-semibold">16 Dec 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time</span>
                        <span className="font-semibold">10:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total</span>
                        <span className="font-semibold text-red-600">Rp 133,200</span>
                      </div>
                    </div>
                    <button className="w-full bg-indigo-50 text-indigo-600 font-semibold py-2 rounded-full text-xs">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details (Waiting) */}
            <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-white p-4 border-b">
                <h3 className="font-bold text-center text-sm">Order Details (Waiting)</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-orange-500 p-3 flex items-center gap-2">
                  <img src="/assets/images/icons/timer-grey.svg" className="w-5 h-5 invert" alt="timer" />
                  <p className="text-white text-xs font-bold">
                    New Appointment is Confirmed
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="font-bold text-sm">Booking Review</p>
                  <div className="border rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <img
                          src="/assets/images/doctors/doctor1.png"
                          className="w-full h-full object-cover"
                          alt="doctor"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/48x48/4F46E5/white?text=Dr";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Dr. Wanda</p>
                        <p className="text-xs text-gray-600">Heart Specialist</p>
                      </div>
                      <div className="flex items-center rounded-full bg-orange-500 py-1 px-2">
                        <img src="/assets/images/icons/star-sliced-white.svg" className="w-3 h-3" alt="star" />
                        <p className="font-semibold text-white text-xs ml-1">5.0</p>
                      </div>
                    </div>
                    <hr />
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-600 font-bold rounded">
                          Waiting
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID</span>
                        <span className="font-bold">12345</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-bold">16 Dec 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time</span>
                        <span className="font-bold">10:30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details (Proof) */}
            <div className="w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-white p-4 border-b">
                <h3 className="font-bold text-center text-sm">Order Details (Proof)</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="border rounded-xl p-3">
                  <p className="font-bold text-sm mb-3">Hospital Details</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                      <img
                        src="/assets/images/hospitals/hospital1.png"
                        className="w-full h-full object-cover"
                        alt="hospital"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/48x48/4F46E5/white?text=H";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">Green Mastery</p>
                      <p className="text-xs text-gray-600">Bogor (32902)</p>
                    </div>
                    <div className="flex items-center rounded-full bg-orange-500 py-1 px-2">
                      <img src="/assets/images/icons/star-sliced-white.svg" className="w-3 h-3" alt="star" />
                      <p className="font-semibold text-white text-xs ml-1">4.8</p>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div className="w-full h-32 bg-gray-200 rounded-xl overflow-hidden">
                    <img
                      src="https://placehold.co/300x128/E5E7EB/9CA3AF?text=Map+Location"
                      className="w-full h-full object-cover"
                      alt="map"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Hospital local, Jl. Raya Bogor 32902 Indonesia
                  </p>
                </div>

                <div className="border rounded-xl p-3">
                  <p className="font-bold text-sm mb-3">Proof of Payment</p>
                  <div className="space-y-2 text-xs mb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Name</span>
                      <span className="font-bold">Amba Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Account</span>
                      <span className="font-bold">Bimore Care</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Number</span>
                      <span className="font-bold">555 300 2003</span>
                    </div>
                  </div>
                  <div className="w-full h-32 bg-indigo-100 rounded-xl overflow-hidden relative">
                    <img
                      src="https://placehold.co/300x128/C7D2FE/4F46E5?text=Payment+Proof"
                      className="w-full h-full object-cover"
                      alt="proof"
                    />
                    <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs font-semibold">
                      PREVIEW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoShowcase;
