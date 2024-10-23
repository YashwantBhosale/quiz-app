import React, { useState } from "react";

const DateTimePicker = ({ label, dateValue, timeValue, onDateChange, onTimeChange, id }) => {
  return (
    <div className="mb-5 max-w-[80%]">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="flex space-x-4">
        <input
          type="date"
          id={`${id}-date`}
          value={dateValue}
          onChange={onDateChange}
          className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          required
        />
        <input
          type="time"
          id={`${id}-time`}
          value={timeValue}
          onChange={onTimeChange}
          className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          required
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
