// import React from "react";
// import SearchSection from "../../components/shared/SearchSection";
// import SubscribeSection from "../../components/shared/SubscribeSection";

// import OutdoorActivities from "./components/OutdoorActivities";
// import MapSection from "../../components/shared/MapSection";

// const AttractionPage = () => {
//   return (
//     <div>
//       <SearchSection />

//       <OutdoorActivities />

//       <SubscribeSection />
//     </div>
//   );
// };

// export default AttractionPage;
// import React from "react";
// import { useParams } from "react-router-dom";
// import SearchSection from "../../components/shared/SearchSection";
// import SubscribeSection from "../../components/shared/SubscribeSection";
// import OutdoorActivities from "./components/OutdoorActivities";
// import AttractionDetail from "./components/AttractionDetail";

// const AttractionPage = ({ campsites }) => {
//   const { attractionId } = useParams();
//   const campsite = campsites[0]; // Only A Step Above RV Park

//   return (
//     <div>
//       <SearchSection />
//       {attractionId ? (
//         <AttractionDetail attractionId={attractionId} campsite={campsite} />
//       ) : (
//         <OutdoorActivities campsite={campsite} />
//       )}
//       <SubscribeSection />
//     </div>
//   );
// };

// export default AttractionPage;
import React from "react";
import { useParams } from "react-router-dom";
import SearchSection from "../../components/shared/SearchSection";
import SubscribeSection from "../../components/shared/SubscribeSection";
import AttractionDetail from "./components/AttractionDetail";
import OutdoorActivities from "./components/OutdoorActivities";

const AttractionPage = ({ campsites }) => {
  const { attractionId } = useParams();
  const campsite = campsites[0];

  return (
    <div>
      <SearchSection />
      {attractionId ? (
        <AttractionDetail />
      ) : (
        <OutdoorActivities campsite={campsite} />
      )}
      <SubscribeSection />
    </div>
  );
};

export default AttractionPage;
