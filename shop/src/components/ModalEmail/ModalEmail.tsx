"use client"

import { useEffect, useState } from "react"
import styles from "./ModalEmail.module.scss"
import EmailForm from "../Footer/FormForFooter/Form"
import Image from "next/image"

const ModalEmail = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Блокируем скролл, пока модалка открыта
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleClose = () => setIsOpen(false)

  return (
    <div
      className={`${styles.ModalOverlay} ${isOpen ? styles.active : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.ModalWrapper} ${isOpen ? styles.active : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <EmailForm />

        <Image
          className={styles.img}
          alt="Banner Image"
          src="/images/BannerImage.webp"
          width={400}
          height={500}
        />

        <p className={styles.closeBtn} onClick={handleClose}>
          X
        </p>
      </div>
    </div>
  )
}

export default ModalEmail
