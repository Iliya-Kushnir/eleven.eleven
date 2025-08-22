import styles from "./ProductsFeed.module.scss"
import Card from "./ProductCard/ProductCard"

const ProductsFeed = () => {

    const cards = [
        {id: 1, maninText: "Hoodie XL", price: "300$", src: "/images/BannerImage.webp", alt: "card image", href: "/products"},
        {id: 2, maninText: "Hoodie XL", price: "300$", src: "/images/BannerImage.webp", alt: "card image", href: "/products"},
        {id: 3, maninText: "Hoodie XL", price: "300$", src: "/images/BannerImage.webp", alt: "card image", href: "/products"},
        {id: 4, maninText: "Hoodie XL", price: "300$", src: "/images/BannerImage.webp", alt: "card image", href: "/products"},
    ]

    return (
        <section className={styles.productsSection}>
            {cards.map((card)=> (
            <Card
            key={card.id}
            src={card.src}
            alt={card.alt}
            heading={card.maninText}
            price={card.price}
            href={card.href}
            />
        ))}
        </section>
    )
}

export default ProductsFeed