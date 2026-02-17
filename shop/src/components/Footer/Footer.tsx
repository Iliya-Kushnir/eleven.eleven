import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import EmailForm from "./FormForFooter/Form";
import { getTranslations } from "@/lib/get-translations";

const Footer =  async () => {
  const { t } = await getTranslations();
  const navigationBtns = [
    { id: 1, label: t('common.footer.nav.SHIPPING'), src: "/shipping" },
    { id: 2, label: t('common.footer.nav.RETURNS'), src: "/returns" },
    { id: 3, label: t('common.footer.nav.FAQS'), src: "/faqs" },
    { id: 4, label: t('common.footer.nav.TERMS'), src: "/terms" },
    {id: 5, label: t('common.footer.nav.PRIVACY'), src: "/privacy" },
  ];

  const socialMediaBtns = [
    {id:1, src: "/images/instagram.png", alt: "instagramImg", href: "https://www.instagram.com/eleven.el.even?igsh=bnFuOG44bmZpYnlk"},
    {id:2, src: "/images/tik-tok.png", alt: "TiTok image", href: "/shipping"},
    {id:3, src: "/images/linkedin.png", alt: "LinkedIn Image", href: "/shipping"},
    {id:4, src: "/images/discord.png", alt: "discord Logo", href: "/shipping"}
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

      <p className={styles.allRights}>{t('common.footer.copyright_first')}{currentYear}. {t('common.footer.copyright_second')}</p>
    </footer>
  );
};

export default Footer;
