// import { Outlet } from "react-router-dom";
// import Footer from "../components/shared/Footer";
// import Navbar from "../components/shared/Navbar";
// import useScrollToTop from "../hooks/useScrollToTop";

// import ReactGA from "react-ga4";
// import TagManager from "react-gtm-module";
// function RootLayout() {
//   useScrollToTop();

//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <div className="min-h-screen">
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default RootLayout;

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import useScrollToTop from "../hooks/useScrollToTop";

import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import { useGetGtmGaConfigurationQuery } from "./../services/api/settings/siteConfigurationSlice";

function RootLayout() {
  useScrollToTop();
  const { data } = useGetGtmGaConfigurationQuery();
  const gtmGaData = data?.payload[0];

  console.log(gtmGaData?.gtmId, "gtmGaData");
  console.log(gtmGaData?.gaId, "gaId");
  useEffect(() => {
    if (gtmGaData) {
      if (gtmGaData.gtmId) {
        TagManager.initialize({ gtmId: gtmGaData.gtmId });
      }

      if (gtmGaData.gaId) {
        ReactGA.initialize(gtmGaData.gaId);
      }
    }
  }, [gtmGaData]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
