"use client";
import { useState } from "react";
import styles from "./ShoppingCartBtn.module.scss"
import Image from "next/image";

const  ShoppingCart = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(!open)} className={`${styles.shoppingButton} ${open ? styles.open : ""}`}>
        <Image
        src="/images/parcel.png"
        alt="shoppingCart"
        width={30}
        height={30}
        />
      </button>

            {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

        {/* меню */}
        <aside className={`${styles.sidebar} ${open ? styles.show : ""}`}>
        </aside>
    </>
  )
}

export default ShoppingCart