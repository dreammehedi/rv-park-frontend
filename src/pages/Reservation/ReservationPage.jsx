import React from "react";
import SearchSection from "../../components/shared/SearchSection";
import SubscribeSection from "../../components/shared/SubscribeSection";
import RVOptions from "./components/RVOptions";
import BookingForm from "./components/BookingForm";

const ReservationPage = ({ campsites }) => {
  return (
    <div>
      <SearchSection />
      <RVOptions campsites={campsites} />
      {/* <BookingForm campsites={campsites} /> */}
      <SubscribeSection />
    </div>
  );
};

export default ReservationPage;
