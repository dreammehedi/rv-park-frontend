import React from "react";
import { Link } from "react-router-dom";
import { useGetLogoAndFaviconQuery } from "../../services/api/settings/logoApiSlice";

const Logo = () => {
  const { data: footerLogo } = useGetLogoAndFaviconQuery();

  return (
    <Link to="/">
      <div className="flex justify-center items-center">
        <img
          src={`${footerLogo?.payload[0]?.footerLogo}` || "/rvlog.png"}
          alt={`${footerLogo?.payload[0]?.footerLogoPublicId}` || "/rvlog.png"}
          className="w-32 h-32 object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
