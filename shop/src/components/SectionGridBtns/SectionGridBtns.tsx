import styles from "./SectionGridBtns.module.scss"
import GridItem from "./GridItem/GridItem"

const SectionGridBtns = () => {

    const items = [
        {id:1, href: "/new-in", src: "/images/hoodie.jpg", alt: "frist image link", label: "NEW IN"},
        {id:2, href: "/sale", src: "/images/jeans.jpg", alt: "frist image link", label: "SALE"},
        {id:3, href: "/products", src: "/images/techFleece.avif", alt: "frist image link", label: "WHOLESOME"}
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