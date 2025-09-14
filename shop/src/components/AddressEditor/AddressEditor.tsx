"use client";
import { useState } from "react";
import DefaultButton from "@/components/defaultButton/defaultButton";
import EditForm from "@/components/AddressEditor/AddressEditor";

export default function AddressesManager() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-[165px] h-[50px]">
        <DefaultButton
          label="ADD NEW ADDRESSES"
          onClick={() => setIsOpen(true)} // 👉 открытие формы
        />
      </div>

      <EditForm 
        open={isOpen}
        onClose={() => setIsOpen(false)} // 👉 закрытие формы
      />
    </>
  );
}
