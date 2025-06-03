import { Spin } from "antd";
import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useGetContactQuery } from "../../services/api/settings/contactSlice";
import { useGetSiteConfigurationQuery } from "../../services/api/settings/siteConfigurationSlice";
import { useGetSocialMediaQuery } from "../../services/api/settings/socialMediaSlice";
import Logo from "./Logo";

const Footer = () => {
  const { data: siteConfiguration, isLoading: siteConfigurationLoading } =
    useGetSiteConfigurationQuery();
  const siteConfigurationData = siteConfiguration?.payload[0];

  const { data: socialMedia, isLoading: socialMediaLoading } =
    useGetSocialMediaQuery();
  const socialMediaData = socialMedia?.payload[0];

  const { data: contactInformation, isLoading: contactInformationLoading } =
    useGetContactQuery();
  const contactInformationData = contactInformation?.payload[0];

  if (
    siteConfigurationLoading ||
    socialMediaLoading ||
    contactInformationLoading
  ) {
    return (
      <div className="flex justify-center items-center h-[20vh]">
        <Spin />
      </div>
    );
  }

  return (
    <footer className="bg-black/90 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Left Section: Logo and Text */}
        <div className="flex flex-col items-start">
          <div className="w-24 h-24  flex items-center justify-center mb-4">
            <Logo />
          </div>
          <p className="text-sm max-w-xs">
            {siteConfigurationData?.description || ""}
          </p>
        </div>

        {/* Middle Section: Social Media Links */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4">SOCIAL MEDIA LINKS</h3>
          <div className="flex flex-col gap-3">
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

        {/* Right Section: Contact Info */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4">CONTACT INFO</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaPhoneAlt className="text-black" />
              </div>
              <span>{contactInformationData?.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaMapMarkerAlt className="text-black" />
              </div>
              <span>{contactInformationData?.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaEnvelope className="text-black" />
              </div>
              <span>{contactInformationData?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-gray-500 mt-6 pt-4 text-center text-sm">
        {siteConfigurationData?.copyRights || ""}
      </div>
    </footer>
  );
};

export default Footer;
