import { Input, message } from "antd";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useCreateSubscriptionMutation } from "../../services/api/settings/contactSlice";

const SubscribeSection = () => {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");

  // Handle client-side rendering for Ant Design
  useEffect(() => {
    setMounted(true);
  }, []);

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  const handleSubscribe = async () => {
    if (!email) {
      message.info("Email is required!");
      return;
    }
    try {
      const response = await createSubscription({ email }).unwrap();
      if (response?.success) {
        message.success(response?.message || "Subscribed successfully");
        setEmail("");
      } else {
        message.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 my-16">
      <div className="relative w-full  overflow-hidden  shadow-lg">
        {/* Background image */}
        <div className="relative h-80">
          <img
            src="https://willowtreervr.com/wp-content/uploads/2023/08/RV-Sites.jpg"
            alt="Scenic RV camping landscape"
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <h2 className="text-white text-3xl md:text-5xl font-serif font-bold mb-10 text-center drop-shadow-lg">
              Stay in the Loop with
              <br />
              Exclusive RV Offers
            </h2>

            <div className="flex flex-col sm:flex-row w-full max-w-lg mx-auto ">
              <Input
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow h-12 rounded-lg text-base text-black"
                style={{ padding: "0 16px" }}
              />
              <button
                onClick={handleSubscribe}
                className="bg-yellow-500 text-white px-6 py-3 flex items-center justify-center gap-2  hover:bg-yellow-600 transition-colors duration-300 h-12 text-base font-medium"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
