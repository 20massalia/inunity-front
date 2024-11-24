"use client";

import React, { useState } from 'react';

export type ToggleSwitchProps = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}
export const ToggleSwitch = ({checked, setChecked} : ToggleSwitchProps) => {
  return (
    <div
      className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
        checked ? 'bg-blue-500' : 'bg-gray-300'
      }`}
      onClick={() => setChecked(!checked)}
    >
      <div
        className={`absolute w-5 h-5 rounded-full bg-white transition-transform transform top-0.5 ${
          checked ? 'translate-x-[26px]' : 'translate-x-0.5'
        }`}
      ></div>
    </div>
  );
};
