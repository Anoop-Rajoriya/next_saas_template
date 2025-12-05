import React from "react";

type Props = {
  children: React.ReactNode;
};

// function Container({ children }: Props) {
//   return (
//     <div className="min-h-screen bg-app-bg text-text-main transition-colors duration-300 relative font-josefin">
//       <div
//         id="bg"
//         className="absolute top-0 left-0 w-full h-[200px] md:h-[300px] bg-mobile md:bg-desktop bg-cover bg-no-repeat bg-center"
//       >
//         <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-transparent/60 to-[#181824]"></div>
//       </div>
//       <main className="relative z-10 container mx-auto px-6 py-10">
//         {children}
//       </main>
//     </div>
//   );
// }

function Container({ children }: Props) {
  return (
    <div className="min-h-screen bg-app-bg text-text-main font-josefin relative">
      <div
        id="bg"
        className="absolute top-0 left-0 w-full min-h-1/2 md:min-h-2/5 bg-mobile md:bg-desktop bg-cover bg-no-repeat bg-center opacity-80"
      >
        <div
          id="mask"
          className="absolute inset-0 bg-linear-to-b from-app-bg/20 via-app-bg/60 to-app-bg"
        ></div>
      </div>
      <main className="relative z-10 container mx-auto">{children}</main>
    </div>
  );
}

export default Container;
