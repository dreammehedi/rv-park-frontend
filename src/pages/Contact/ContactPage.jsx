import React from "react";
import SearchSection from "../../components/shared/SearchSection";
import SubscribeSection from "../../components/shared/SubscribeSection";
import ContactForm from "./components/ContactForm";

const ContactPage = () => {
  return (
    <div>
      <SearchSection contact={true} />
      <ContactForm />
      <SubscribeSection />
    </div>
  );
};

export default ContactPage;
