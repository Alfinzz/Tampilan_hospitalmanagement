import { Link } from "react-router-dom";

 

const Onboarding = () => { 

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
    <div
      id="Content-Container"
      className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
    >
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex pt-[47px] px-[30px] h-screen overflow-hidden">
          <img
            src="/assets/images/backgrounds/phone.webp"
            className="size-full object-contain object-top"
            alt="background"
          />
        </div>
        <div id="Bottom-Bar" className="flex relative w-full">
          <div className="fixed z-30 bottom-0 flex flex-col gap-6 w-full max-w-[640px] px-5 py-6 bg-white">
            <div className="flex flex-col gap-[10px]">
              <img
                src="/assets/images/logos/logo.svg"
                className="h-[22px] ml-0 mr-auto"
                alt="logo"
              />
              <div className="flex flex-col gap-3">
                <p className="font-extrabold text-[32px] leading-10 capitalize">
                  Quality Doctors,
                  <br /> Trusted Hospitals.
                </p>
                <p className="font-medium text-monday-gray leading-none">
                  — Get the care you deserve
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Link to={'/customer/register'}
                className="flex items-center w-full h-[56px] justify-center gap-[6px] rounded-2xl py-4 px-6 bg-monday-blue"
              >
                <span className="font-semibold text-lg leading-none text-white">
                  Register Account
                </span>
              </Link>
              <Link to={'/customer/login'}
                className="flex items-center w-full h-[56px] justify-center gap-[6px] rounded-2xl py-4 px-6 bg-monday-black"
              >
                <span className="font-semibold text-lg leading-none text-white">
                  Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Onboarding;
