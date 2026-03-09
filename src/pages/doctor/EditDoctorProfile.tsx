import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDoctorProfile, useUpdateDoctorProfile } from "../../hooks/useDoctorAppointments";

function EditDoctorProfile() {
 const navigate = useNavigate();
 const { data: profile, isLoading } = useDoctorProfile();
 const updateProfile = useUpdateDoctorProfile();

 const [about, setAbout] = useState("");
 const [photoFile, setPhotoFile] = useState<File | null>(null);
 const [photoPreview, setPhotoPreview] = useState<string | null>(null);
 const [isInitialized, setIsInitialized] = useState(false);

 // Initialize form with existing data
 if (profile && !isInitialized) {
  setAbout(profile.about || "");
  setIsInitialized(true);
 }

 const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
   setPhotoFile(file);
   const reader = new FileReader();
   reader.onloadend = () => {
    setPhotoPreview(reader.result as string);
   };
   reader.readAsDataURL(file);
  }
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("about", about);
  if (photoFile) {
   formData.append("photo", photoFile);
  }

  try {
   await updateProfile.mutateAsync(formData);
   navigate("/doctor/profile");
  } catch (error) {
   console.error("Failed to update profile:", error);
  }
 };

 if (isLoading) return <p className="p-8">Loading...</p>;

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
       <Link to="/doctor/profile" className="size-11 flex shrink-0">
        <img
         src="/assets/images/icons/mobile-back-button.svg"
         className="size-full"
         alt="icon"
        />
       </Link>
       <h1 className="font-bold text-lg leading-none text-center">Edit Profile</h1>
       <div className="size-11 flex shrink-0" />
      </div>
     </div>
    </div>

    <main className="flex flex-col flex-1">
     <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
      {/* Photo Upload */}
      <div className="flex flex-col items-center gap-4">
       <div className="relative">
        <div className="flex size-28 rounded-full overflow-hidden border-4 border-monday-green bg-monday-background">
         <img
          src={photoPreview || profile?.photo || "/assets/images/icons/profile-2user-grey.svg"}
          className="size-full object-cover"
          alt="avatar"
         />
        </div>
        <label
         htmlFor="photo"
         className="absolute bottom-0 right-0 flex items-center justify-center size-10 rounded-full bg-monday-green cursor-pointer hover:bg-monday-green/90 transition-colors"
        >
         <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
         </svg>
        </label>
        <input
         type="file"
         id="photo"
         accept="image/jpeg,image/png,image/jpg"
         onChange={handlePhotoChange}
         className="hidden"
        />
       </div>
       <p className="text-sm text-monday-gray">Tap camera icon to change photo</p>
      </div>

      {/* Name (Read Only) */}
      <div className="flex flex-col gap-2">
       <label className="font-semibold">Name</label>
       <div className="flex items-center rounded-2xl border border-monday-stroke p-4 bg-monday-background">
        <p className="text-monday-gray">{profile?.name}</p>
       </div>
       <p className="text-xs text-monday-gray">Name cannot be changed. Contact admin if needed.</p>
      </div>

      {/* Specialist (Read Only) */}
      <div className="flex flex-col gap-2">
       <label className="font-semibold">Specialist</label>
       <div className="flex items-center rounded-2xl border border-monday-stroke p-4 bg-monday-background">
        <p className="text-monday-gray">{profile?.specialist?.name}</p>
       </div>
      </div>

      {/* Hospital (Read Only) */}
      <div className="flex flex-col gap-2">
       <label className="font-semibold">Hospital</label>
       <div className="flex items-center rounded-2xl border border-monday-stroke p-4 bg-monday-background">
        <p className="text-monday-gray">{profile?.hospital?.name}</p>
       </div>
      </div>

      {/* About */}
      <div className="flex flex-col gap-2">
       <label htmlFor="about" className="font-semibold">About</label>
       <textarea
        id="about"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        placeholder="Tell patients about yourself..."
        rows={5}
        className="rounded-2xl border border-monday-stroke p-4 resize-none focus:outline-none focus:ring-2 focus:ring-monday-green/50"
        maxLength={1000}
       />
       <p className="text-xs text-monday-gray text-right">{about.length}/1000</p>
      </div>

      {/* Submit Button */}
      <div className="flex relative w-full h-[104px] mt-4">
       <div className="fixed z-30 bottom-0 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
        <button
         type="submit"
         disabled={updateProfile.isPending}
         className="flex items-center w-full justify-center rounded-full py-4 px-6 bg-monday-green disabled:bg-monday-gray"
        >
         <span className="font-semibold text-lg leading-none text-white">
          {updateProfile.isPending ? "Saving..." : "Save Changes"}
         </span>
        </button>
       </div>
      </div>
     </form>
    </main>
   </div>
  </div>
 );
}

export default EditDoctorProfile;
