import Link from "next/link";
import Image from "next/image";
import EmailForm from "./FormForFooter/Form";
import { getTranslations } from "@/lib/get-translations";

const Footer = async () => {
  const { t } = await getTranslations();
  
  const navigationBtns = [
    { id: 1, label: t('common.footer.nav.SHIPPING'), src: "/shipping" },
    { id: 2, label: t('common.footer.nav.RETURNS'), src: "/returns" },
    { id: 3, label: t('common.footer.nav.FAQS'), src: "/faqs" },
    { id: 4, label: t('common.footer.nav.TERMS'), src: "/terms" },
    { id: 5, label: t('common.footer.nav.PRIVACY'), src: "/privacy" },
  ];

  const socialMediaBtns = [
    { id: 1, src: "/images/instagram.png", alt: "instagramImg", href: "https://www.instagram.com/eleven.el.even?igsh=bnFuOG44bmZpYnlk" },
    { id: 2, src: "/images/tik-tok.png", alt: "TiTok image", href: "/shipping" },
    { id: 3, src: "/images/linkedin.png", alt: "LinkedIn Image", href: "/shipping" },
    { id: 4, src: "/images/discord.png", alt: "discord Logo", href: "/shipping" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-between w-full border-t border-[#e7e4e4] mt-[30px] pt-[30px]">
      
      <EmailForm />

      {/* Навигационные ссылки */}
      <div className="w-full flex flex-row flex-wrap items-center justify-center gap-[15px] mb-5 mt-10 md:mt-[70px] md:gap-0 md:justify-evenly">
        {navigationBtns.map((button) => (
          <Link 
            key={button.id} 
            href={button.src}
            className="text-[6px] md:text-[12px] font-bold text-[#393939] uppercase no-underline text-center antialiased"
            style={{ WebkitTextSizeAdjust: 'none' }} // Tailwind не имеет встроенного класса для этого
          >
            {button.label}
          </Link>
        ))}
      </div>

      {/* Социальные сети */}
      <div className="w-[160px] h-9 flex flex-row items-center justify-between">
        {socialMediaBtns.map((navigation) => (
          <Link
            key={navigation.id}
            href={navigation.href}
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src={navigation.src}
              alt={navigation.alt}
              width={20}
              height={20}
              className="object-contain"
            />
          </Link>
        ))}
      </div>

      {/* Копирайт */}
      <p 
        className="text-[6px] md:text-[8px] mt-5 mb-[15px] text-[#393939]/75 text-center antialiased uppercase"
        style={{ WebkitTextSizeAdjust: 'none' }}
      >
        {t('common.footer.copyright_first')}{currentYear}. {t('common.footer.copyright_second')}
      </p>
    </footer>
  );
};

export default Footer;