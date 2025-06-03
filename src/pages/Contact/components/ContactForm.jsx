import { Button, Form, Input, Spin, message } from "antd";
import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import {
  useCreateContactMutation,
  useGetContactQuery,
} from "../../../services/api/settings/contactSlice";
import { useGetSocialMediaQuery } from "../../../services/api/settings/socialMediaSlice";

const { TextArea } = Input;

const ContactForm = () => {
  const [form] = Form.useForm();
  const { data: contactInformation, isLoading: contactInformationLoading } =
    useGetContactQuery();
  const contactInformationData = contactInformation?.payload[0];

  const { data: socialMedia, isLoading: socialMediaLoading } =
    useGetSocialMediaQuery();
  const socialMediaData = socialMedia?.payload[0];

  const [createContact, { isLoading: createContactLoading }] =
    useCreateContactMutation();

  const handleSubmit = async (values) => {
    try {
      const response = await createContact(values).unwrap();
      if (response?.success) {
        message.success(response?.message || "Message sent successfully");
        form.resetFields();
      } else {
        message.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  if (contactInformationLoading || socialMediaLoading) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <Spin />
      </div>
    );
  }

  return (
    <div className="bg-white py-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left - Contact Form */}
        <div className="md:col-span-2">
          <p className="text-yellow-500 text-sm font-semibold">
            Contact with us
          </p>
          <h1 className="text-4xl font-bold mt-2 mb-6">Send us a Message</h1>

          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Name is required!" }]}
            >
              <Input placeholder="Enter Your Name" size="large" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: "Phone is required!" }]}
            >
              <Input
                type="number"
                placeholder="Enter Your Phone Number"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Email is required!" }]}
            >
              <Input placeholder="Enter Your Email" size="large" />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Subject is required!" }]}
            >
              <Input placeholder="Enter Your Subject" size="large" />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Message is required!" }]}
              className="col-span-2"
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter Your Message"
                size="large"
              />
            </Form.Item>

            <Form.Item className="col-span-2 ml-auto flex justify-end">
              <button
                type="primary"
                htmlType="submit"
                loading={createContactLoading}
                size="large"
                className="bg-yellow-500 text-white px-6 py-3 flex items-center justify-center gap-2  hover:bg-yellow-600 transition-colors duration-300 h-12 text-base font-medium"
              >
                {createContactLoading ? "Sending..." : "Send Message"}
              </button>
            </Form.Item>
          </Form>
        </div>

        {/* Right - Contact Info Section */}
        <div className="bg-gray-100 p-6">
          <h3 className="text-2xl font-semibold mb-4">Direct Contact Info</h3>

          {/* Phone */}
          <div className="flex items-center gap-3 mb-4">
            <FaPhone className="text-yellow-500 text-lg" />
            <span className="text-gray-700 text-lg">
              {contactInformationData?.phoneNumber}
            </span>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 mb-4">
            <FaMapMarkerAlt className="text-yellow-500 text-lg mt-1" />
            <span className="text-gray-700 text-lg">
              {contactInformationData?.address}
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 mb-6">
            <FaEnvelope className="text-yellow-500 text-lg" />
            <span className="text-gray-700 text-lg">
              {contactInformationData?.email}
            </span>
          </div>

          {/* Social Media Links */}
          <h3 className="text-2xl font-semibold mb-3">Social Media Links</h3>
          <div className="flex gap-4 flex-wrap">
            <a
              href={socialMediaData?.facebookLink}
              target="_blank"
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaFacebook className="text-black" />
              </div>
              <span>Facebook</span>
            </a>
            <a
              href={socialMediaData?.instagramLink}
              target="_blank"
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaInstagram className="text-black" />
              </div>
              <span>Instagram</span>
            </a>

            <a
              href={socialMediaData?.twitterLink}
              target="_blank"
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaTwitter className="text-black" />
              </div>
              <span>Twitter</span>
            </a>

            <a
              href={socialMediaData?.linkedinLink}
              target="_blank"
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaLinkedin className="text-black" />
              </div>
              <span>Linkedin</span>
            </a>

            <a
              href={socialMediaData?.youtubeLink}
              target="_blank"
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaYoutube className="text-black" />
              </div>
              <span>Youtube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
