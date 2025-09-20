"use client"

import { useEffect, useState } from "react"
import styles from "./ModalEmail.module.scss"
import EmailForm from "../Footer/FormForFooter/Form"
import Image from "next/image"

const ModalEmail = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Автоматически открываем при заходе на сайт
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500) // задержка 0.5s
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setIsOpen(false)

  return (
    <div
      className={`${styles.ModalOverlay} ${isOpen ? "active" : ""}`}
      onClick={handleClose} // клик по фону закроет
    >
      <div
        className={styles.ModalWrapper}
        onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике внутри
      >
        <EmailForm />

        <Image
          className={styles.img}
          alt="Banner Image"
          src="/images/BannerImage.webp"
          width={400}
          height={250}
        />

        <p className={styles.closeBtn} onClick={handleClose}>
          X
        </p>
      </div>
    </div>
  )
}

export default ModalEmail
