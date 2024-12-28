import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const CancelPurchase = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800 shadow-xl rounded-lg overflow-hidden relative z-10 max-w-md w-full"
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-red-500 w-17 h-17 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-500 mb-2">
            Purchase Cancel
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Your purchase has been successfully canceled. If you have any
            questions or need further assistance, please contact our support
            team.
          </p>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-gray-300 text-center mb-6">
              If you have any questions or need further assistance, please
              contact our support team.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              to={"/"}
              className="w-full bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <ArrowRight className="mr-2" size={18} />
              Return to Shop
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CancelPurchase;
