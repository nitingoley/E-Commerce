import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 bottom-0 fixed text-gray-900  py-4  ">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xl font-bold">
          © {new Date().getFullYear()} E-Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
