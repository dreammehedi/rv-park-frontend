import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select, DatePicker, Button } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { campsiteData } from "../../../data";
import "antd/dist/reset.css"; // Import Ant Design styles

const { Option } = Select;

const BookingForm = ({ campsites }) => {
  const navigate = useNavigate();
  const campsite = campsites[0]; // Only A Step Above RV Park

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: null,
    checkOut: null,
    paymentOption: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date ? date.format("DD/MM/YYYY") : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.checkIn ||
      !formData.checkOut ||
      !formData.paymentOption
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (
      new Date(formData.checkIn.split("/").reverse().join("-")) >=
      new Date(formData.checkOut.split("/").reverse().join("-"))
    ) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    // Navigate to checkout with booking data
    navigate(`/checkout/${campsite.id}`, { state: { booking: formData } });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white py-5">
      <div className="w-full md:w-1/2">
        <img
          src={campsite.image}
          alt="Booking"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 p-10">
        <div className="text-green-600 text-sm font-semibold">Booking Now</div>
        <h1 className="text-4xl font-bold mt-2">
          Book Your Stay at {campsite.title}
        </h1>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                placeholder="Enter Your Name"
                size="large"
                className="h-12"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter Your Email"
                size="large"
                className="h-12"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="Enter Your Phone Number"
                size="large"
                className="h-12"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Selected Spot
              </label>
              <Select
                defaultValue={campsite.title}
                size="large"
                className="w-full"
                disabled
              >
                <Option value={campsite.title}>{campsite.title}</Option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Check-in
              </label>
              <DatePicker
                className="w-full"
                size="large"
                format="DD/MM/YYYY"
                onChange={(date) => handleDateChange("checkIn", date)}
                disabledDate={(current) =>
                  current && current < new Date().setHours(0, 0, 0, 0)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Check-out
              </label>
              <DatePicker
                className="w-full"
                size="large"
                format="DD/MM/YYYY"
                onChange={(date) => handleDateChange("checkOut", date)}
                disabledDate={(current) =>
                  current &&
                  (current <
                    new Date(
                      formData.checkIn?.split("/").reverse().join("-")
                    ) ||
                    current <= new Date().setHours(0, 0, 0, 0))
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Options
            </label>
            <Select
              placeholder="Stripe / PayPal"
              size="large"
              className="w-full"
              onChange={(value) => handleChange("paymentOption", value)}
            >
              <Option value="stripe">Stripe</Option>
              <Option value="paypal">PayPal</Option>
              <Option value="credit-card">Credit Card</Option>
              <Option value="bank-transfer">Bank Transfer</Option>
            </Select>
          </div>

          <div className="flex items-center justify-end mt-8">
            <button className="w-full bg-yellow-500 text-white py-3  hover:bg-yellow-600 transition-colors duration-200">
              Check Availability
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
