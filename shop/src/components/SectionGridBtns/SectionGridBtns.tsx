import styles from "./SectionGridBtns.module.scss";
import GridItem from "./GridItem/GridItem";
import { getTranslations } from "@/lib/get-translations";

const SectionGridBtns = async () => {
    const { t } = await getTranslations();

    const items = [
        {id:1, href: "/new-in", src: "/images/hoodie.jpg", alt: "frist image link", label: t('common.nav.new_in')},
        {id:2, href: "/sale", src: "/images/jeans.jpg", alt: "frist image link", label: t('common.nav.sale')},
    ]

    return (
        <div className={styles.gridWrapper}>
            {items.map((item) => (
                <GridItem
                key={item.id}
                href={item.href}
                src={item.src}
                alt={item.alt}
                label={item.label}
                />
                ))}
        </div>
    )
}

export default SectionGridBtns