"use client";

import { useState } from "react";
import DefaultButton from "@/components/defaultButton/defaultButton";
import CreateAddressFrom from "@/components/CreateAddressForm/CreateAddressForm";
import styles from "./AddressesManager.module.scss";
import { useLanguage } from "@/context/LanguageContext";

export default function AddressesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <div className="w-[165px] h-[60px]">
        <DefaultButton
          label={t('addresses.add_address')}
          onClick={() => setIsOpen(true)}  
        />
      </div>

    <div className={styles.formWrapper}>
      <CreateAddressFrom 
        open={isOpen}
        onClose={() => setIsOpen(false)} 
      />
    </div>
    </>
  );
}
