import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useGetAboutUsQuery } from "../../services/api/pages/aboutUsSlice";
import {
  useGetOurJourneyItemsQuery,
  useGetOurJourneyQuery,
} from "../../services/api/pages/ourJourneySlice";
import { useGetWhyChooseUsQuery } from "../../services/api/pages/whyChooseUsSlice";
import { useGetRvCampsitesQuery } from "../../services/api/pages/rvCampsitesSlice";
import { NavLink } from "react-router-dom";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({
    intro: false,
    journey: false,
    values: false,
    cta: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["intro", "journey", "values", "cta"];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.75) {
            setIsVisible((prev) => ({ ...prev, [section]: true }));
          }
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { data: campsiteData, isLoading: campsiteLoading } =
    useGetRvCampsitesQuery();
  const combinedData = [
    ...(campsiteData?.payload || []).map((item) => ({
      id: item._id,
      title: item.title,
      shortDescription: item.description?.substring(0, 100) + "...",
      longDescription: item.description,
      image: item.image || "/placeholder.svg",
      type: "campsite",
      redirectPath: `/reservation-details/${item._id}`,
      cta: item.cta || "Book Now",
    })),
  ];
  const { data: aboutUs, isLoading: aboutUsLoading } = useGetAboutUsQuery();
  const aboutUsData = aboutUs?.payload[0];

  const { data: ourJourney, isLoading: ourJourneyLoading } =
    useGetOurJourneyQuery();
  const ourJourneyData = ourJourney?.payload[0];

  const { data: ourJourneyItems, isLoading: ourJourneyItemsLoading } =
    useGetOurJourneyItemsQuery();
  const ourJourneyItemsData = ourJourneyItems?.payload;

  const { data: whyChooseUs, isLoading: whyChooseUsLoading } =
    useGetWhyChooseUsQuery();

  const whyChooseUsData = whyChooseUs?.payload;

  if (
    aboutUsLoading ||
    ourJourneyLoading ||
    ourJourneyItemsLoading ||
    whyChooseUsLoading
  ) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <Spin />
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Introduction Section - Dark Background with Light Text */}
      <section id="intro" className="py-24 md:py-32 bg-[#2a2a2a] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div
            className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              isVisible.intro
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <div className="w-24 h-1 bg-yellow-500 mb-8"></div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {aboutUsData?.title}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {aboutUsData?.description}
              </p>
              <NavLink to="/attractions">
                <button className="bg-yellow-500 text-gray-900 px-8 py-3 font-medium hover:bg-yellow-400 transition-colors duration-300">
                  DISCOVER MORE
                </button>
              </NavLink>
            </div>
            <div className="relative h-[400px] md:h-full max-h-[500px] overflow-hidden border-8 border-white">
              <img
                src={aboutUsData?.image}
                alt={aboutUsData?.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company History Section - White Background with Bold Typography */}
      <section id="journey" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div
            className={`transition-all duration-1000 ${
              isVisible.journey
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-16">
              <div className="md:w-1/2">
                <div className="sticky top-24">
                  <div className="w-24 h-1 bg-yellow-500 mb-8"></div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                    {ourJourneyData?.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {ourJourneyData?.description}
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 space-y-8">
                {ourJourneyItemsData?.map((ourJourneyItem) => {
                  return (
                    <div
                      key={ourJourneyItem?._id}
                      className="relative h-[300px] overflow-hidden border-l-8 border-yellow-500 pl-8"
                    >
                      <img
                        src={ourJourneyItem?.image}
                        alt={ourJourneyItem?.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-8 right-0 bg-white p-4">
                        <p className="text-gray-900 font-medium">
                          {ourJourneyItem?.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section - Alternating Background */}
      <section id="values" className="py-24 md:py-32 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div
            className={`transition-all duration-1000 ${
              isVisible.values
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the difference at Wilderness RV Park with our
                commitment to excellence
              </p>
            </div>

            {whyChooseUsLoading ? (
              <div className="flex justify-center items-center h-[40vh]">
                <Spin />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                {whyChooseUsData?.map((section, index) => (
                  <div
                    key={index}
                    className={`p-8 flex flex-col items-start text-left border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="mb-6 p-4 bg-[#2a2a2a]">
                      <div className="text-yellow-500 text-4xl">
                        <img
                          src={section?.image}
                          alt={section?.title}
                          className="w-14 h-14"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {section.description}
                    </p>
                    <div className="mt-6 w-12 h-1 bg-yellow-500"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section - Bold Black Background */}
      <section
        id="cta"
        className="py-24 md:py-32 bg-[#2a2a2a] text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508739773434-c26b3d09e206?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-[#2a2a2a] opacity-80"></div>

        <div
          className={`max-w-7xl mx-auto px-4 md:px-8 relative z-10 transition-all duration-1000 ${
            isVisible.cta
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-2/3">
              <div className="w-24 h-1 bg-yellow-500 mb-8"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your RV Adventure Starts Here
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Book your spot at Wilderness RV Park and immerse yourself in the
                beauty of nature with all the comforts of home.
              </p>
              {/* <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white hover:text-yellow-500 transition-colors duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-yellow-500 transition-colors duration-300"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-yellow-500 transition-colors duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div> */}
            </div>
            <div className="md:w-1/3">
              <div className="bg-white p-8 text-black">
                <h3 className="text-2xl font-bold mb-4">Reserve Your Spot</h3>
                <p className="text-gray-600 mb-6">
                  Join us for an unforgettable RV experience in nature's
                  paradise.
                </p>

                {combinedData.map((item) => (
                  <NavLink key={item.id} to={item.redirectPath}>
                    <button className="w-full bg-yellow-500 text-black px-6 py-4 text-lg font-bold hover:bg-yellow-400 transition-colors duration-300">
                      {item.cta}
                    </button>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
