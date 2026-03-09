import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import apiClient from "../../api/axiosConfig";

interface Notification {
 id: number;
 type: "appointment_approved" | "appointment_rejected" | "appointment_completed" | "appointment_reminder";
 title: string;
 message: string;
 read: boolean;
 created_at: string;
 appointment_id?: number;
}

// Hook to fetch notifications
const useNotifications = () => {
 return useQuery<Notification[]>({
  queryKey: ["notifications"],
  queryFn: async () => {
   const response = await apiClient.get("/notifications");
   return response.data.data;
  },
 });
};

function CustomerInbox() {
 const { user } = useAuth();
 const { data: notifications, isLoading, isError } = useNotifications();

 if (!user) return <p className="p-8">User not logged in.</p>;

 const getNotificationIcon = (type: string) => {
  switch (type) {
   case "appointment_approved":
    return "/assets/images/icons/check-green.svg";
   case "appointment_rejected":
    return "/assets/images/icons/close-circle-red.svg";
   case "appointment_completed":
    return "/assets/images/icons/tick-circle-green.svg";
   case "appointment_reminder":
    return "/assets/images/icons/notification-circle.svg";
   default:
    return "/assets/images/icons/notification-circle.svg";
  }
 };

 const getNotificationColor = (type: string) => {
  switch (type) {
   case "appointment_approved":
    return "bg-monday-green/10 border-monday-green";
   case "appointment_rejected":
    return "bg-monday-red/10 border-monday-red";
   case "appointment_completed":
    return "bg-emerald-500/10 border-emerald-500";
   case "appointment_reminder":
    return "bg-monday-orange/10 border-monday-orange";
   default:
    return "bg-monday-blue/10 border-monday-blue";
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
       <Link to="/customer/discover" className="size-11 flex shrink-0">
        <img
         src="/assets/images/icons/mobile-back-button.svg"
         className="size-full"
         alt="icon"
        />
       </Link>
       <h1 className="font-bold text-lg leading-none text-center">
        Inbox
       </h1>
       <div className="size-11 flex shrink-0" />
      </div>
     </div>
    </div>

    <main className="flex flex-col flex-1 p-5 gap-4">
     {isLoading && (
      <div className="flex items-center justify-center py-20">
       <p className="text-monday-gray">Loading notifications...</p>
      </div>
     )}

     {isError && (
      <div className="flex flex-col items-center justify-center gap-4 py-10">
       <img
        src="/assets/images/icons/note-remove-grey.svg"
        className="size-16 opacity-50"
        alt="icon"
       />
       <p className="text-monday-gray text-center">
        Unable to load notifications
       </p>
      </div>
     )}

     {!isLoading && !isError && notifications && notifications.length > 0 ? (
      <div className="flex flex-col gap-3">
       {notifications.map((notification) => (
        <div
         key={notification.id}
         className={`flex items-start gap-4 rounded-2xl border-l-4 p-4 bg-white ${getNotificationColor(notification.type)} ${!notification.read ? "ring-2 ring-monday-blue/20" : ""
          }`}
        >
         <div className="flex size-12 rounded-full bg-monday-background items-center justify-center shrink-0">
          <img
           src={getNotificationIcon(notification.type)}
           className="size-6"
           alt="icon"
          />
         </div>
         <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between">
           <p className="font-bold text-sm">{notification.title}</p>
           {!notification.read && (
            <span className="flex size-2 rounded-full bg-monday-blue shrink-0 mt-1" />
           )}
          </div>
          <p className="text-monday-gray text-sm leading-relaxed">
           {notification.message}
          </p>
          <p className="text-monday-gray/70 text-xs">
           {format(new Date(notification.created_at), "dd MMM yyyy, HH:mm")}
          </p>
          {notification.appointment_id && (
           <Link
            to={`/customer/my-orders/${notification.appointment_id}`}
            className="text-monday-blue text-sm font-semibold mt-1"
           >
            View Appointment →
           </Link>
          )}
         </div>
        </div>
       ))}
      </div>
     ) : (
      !isLoading && !isError && (
       <div className="flex flex-col items-center justify-center gap-4 py-20 bg-white rounded-2xl">
        <img
         src="/assets/images/icons/direct-inbox-grey-fill-opacity.svg"
         className="size-20 opacity-30"
         alt="icon"
        />
        <div className="flex flex-col gap-2 items-center text-center">
         <p className="font-bold text-lg text-monday-gray">No Notifications</p>
         <p className="text-monday-gray text-sm max-w-[250px]">
          You don't have any notifications yet. We'll notify you about your appointments here.
         </p>
        </div>
       </div>
      )
     )}
    </main>

    {/* Bottom Navigation */}
    <div id="Menu-Bar" className="flex relative h-[100px] w-full">
     <div className="fixed bottom-0 z-30 h-[100px] w-full max-w-[640px] grid grid-cols-2 gap-4 items-center">
      <div className="backdrop absolute flex justify-center w-full h-full drop-shadow-2xl">
       <img
        src="/assets/images/backgrounds/Subtract-menu-bar.svg"
        className="h-full"
        alt=""
       />
       <div className="absolute h-full w-1/3 bg-white left-0 border-t border-monday-stroke" />
       <div className="absolute h-full w-1/3 bg-white right-0 border-t border-monday-stroke" />
      </div>
      <div className="relative grid grid-cols-2 justify-evenly pr-[30px] h-full px-6">
       <Link to="/customer/discover" className="group menu">
        <div className="flex flex-col h-full items-center gap-2 pt-6">
         <img
          src="/assets/images/icons/home-grey-fill-opacity.svg"
          className="flex size-6 shrink-0"
          alt="icon"
         />
         <span className="font-semibold leading-none text-monday-gray">
          Home
         </span>
        </div>
       </Link>
       <Link to="/customer/my-orders" className="group menu">
        <div className="flex flex-col h-full items-center gap-2 pt-6">
         <img
          src="/assets/images/icons/stickynote-grey-fill-opacity.svg"
          className="flex size-6 shrink-0"
          alt="icon"
         />
         <span className="font-semibold leading-none text-monday-gray">
          Orders
         </span>
        </div>
       </Link>
      </div>
      <a
       href="#"
       className="flex size-[60px] shrink-0 absolute transform -translate-x-1/2 left-1/2 -top-[30px]"
      >
       <img
        src="/assets/images/icons/Nav.svg"
        className="size-full object-contain"
        alt="icon"
       />
      </a>
      <div className="relative grid grid-cols-2 justify-evenly pr-[30px] h-full px-6">
       <Link to="/customer/inbox" className="group menu active">
        <div className="flex flex-col h-full items-center gap-2 pt-6">
         <img
          src="/assets/images/icons/direct-inbox-blue-fill-opacity.svg"
          className="flex size-6 shrink-0"
          alt="icon"
         />
         <span className="font-semibold leading-none text-monday-blue">
          Inbox
         </span>
         <img
          src="/assets/images/icons/menu-active-icon.svg"
          className="mt-auto mb-0 mx-auto"
          alt="active"
         />
        </div>
       </Link>
       <Link to="/customer/settings" className="group menu">
        <div className="flex flex-col h-full items-center gap-2 pt-6">
         <img
          src="/assets/images/icons/setting-2-grey-fill-opacity.svg"
          className="flex size-6 shrink-0"
          alt="icon"
         />
         <span className="font-semibold leading-none text-monday-gray">
          Settings
         </span>
        </div>
       </Link>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

export default CustomerInbox;
