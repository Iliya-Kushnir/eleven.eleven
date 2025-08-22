import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import EmailForm from "./FormForFooter/Form"

const Footer = () => {
  const navigationBtns = [
    { id: 1, label: "shipping", src: "/shipping" },
    { id: 2, label: "returns", src: "/returns" },
    { id: 3, label: "faqs", src: "/faqs" },
    { id: 4, label: "terms", src: "/terms" },
  ];

  const socialMediaBtns = [
    {id:1, src: "/shipping", alt: "instagramImg", href: "/shipping"},
    {id:2, src: "/shipping", alt: "TiTok image", href: "/shipping"},
    {id:3, src: "/shipping", alt: "LinkedIn Image", href: "/shipping"},
    {id:4, src: "/shipping", alt: "discord Logo", href: "/shipping"}
  ]

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerWrapper}>

        <EmailForm />

    <div className={styles.navigationbtnsWrapper}>

      {navigationBtns.map((button) => (
          <Link key={button.id} className={styles.linkStyles} href={button.src}>
            {button.label}
          </Link>

      ))}

      </div>

      <div className={styles.socialMedia}>
        {socialMediaBtns.map((navigation) => (
          <Link
            className={styles.navigationLink}
            key={navigation.id}
            href={navigation.href}
          >
            <Image
              className={styles.imageNav}
              src={navigation.src}
              alt={navigation.alt}
              width={20}
              height={20}
            />
          </Link>
        ))}
      </div>

      <p className={styles.allRights}>VELOUR GARMENTS © {currentYear}. ALL RIGHTS RESERVED.</p>
    </footer>
  );
};

export default Footer;
