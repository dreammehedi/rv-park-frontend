// import React from "react";
// import Hero from "./components/Hero";
// import Features from "./components/Features";
// import SearchSection from "../../components/shared/SearchSection";
// import RVActivities from "./components/RVActivities";

// import LocalAttractionSlider from "./components/LocalAttractionSlider";

// import SubscribeSection from "../../components/shared/SubscribeSection";
// import MapSection from "../../components/shared/MapSection";

// const Home = () => {
//   return (
//     <div>
//       <Hero />
//       <Features />
//       <SearchSection />

//       <RVActivities />

//       <LocalAttractionSlider />
//       <SubscribeSection />
//     </div>
//   );
// };

// export default Home;
import { Spin } from "antd";
import React from "react";
import { Helmet } from "react-helmet-async";
import SearchSection from "../../components/shared/SearchSection";
import SubscribeSection from "../../components/shared/SubscribeSection";
import { useGetSeoConfigurationQuery } from "../../services/api/settings/siteConfigurationSlice";
import Features from "./components/Features";
import Hero from "./components/Hero";
import LocalAttractionSlider from "./components/LocalAttractionSlider";
import RVActivities from "./components/RVActivities";

const Home = ({ campsites }) => {
  const { data: getSeo, isLoading: seoDataLoading } =
    useGetSeoConfigurationQuery();
  const getSeoData = getSeo?.payload[0];
  if (seoDataLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin />
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>{getSeoData?.title || "Rv Park"}</title>
        <meta name="description" content={getSeoData?.description || ""} />
        <meta name="keywords" content={getSeoData?.keywords || ""} />
        <meta
          property="og:title"
          content="A Step Above RV Park in Mountain View, MO"
        />
        <meta
          property="og:description"
          content={getSeoData?.siteDescription || ""}
        />
        <meta
          property="og:image"
          content="https://astepabovervpark.com/images/og-image.jpg"
        />
        <link rel="canonical" href="https://astepabovervpark.com/" />
        <meta name="robots" content="index,follow" />
      </Helmet>
      <Hero />
      <Features campsites={campsites} />
      <SearchSection />
      <RVActivities campsites={campsites} />
      <LocalAttractionSlider />
      <SubscribeSection />
    </div>
  );
};

export default Home;
