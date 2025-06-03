import SearchSection from "../../components/shared/SearchSection";
import SubscribeSection from "../../components/shared/SubscribeSection";
import RVActivities from "../Home/components/RVActivities";

const AdventureAndPeacePage = ({ campsites }) => {
  return (
    <>
      <SearchSection />
      <RVActivities campsites={campsites} />
      <SubscribeSection />
    </>
  );
};

export default AdventureAndPeacePage;
