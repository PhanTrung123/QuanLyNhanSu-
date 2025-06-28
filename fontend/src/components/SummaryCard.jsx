import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div
      className={`flex items-center rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 ${color} p-4`}
    >
      <div className="text-4xl p-4 rounded-full bg-white bg-opacity-50 flex justify-center items-center mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{text}</p>
        <p className="text-2xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
