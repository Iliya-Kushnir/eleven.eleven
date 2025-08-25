import styles from "./ProductsFeed.module.scss"
import Card from "./ProductCard/ProductCard"

const ProductsFeed = () => {

        const cards = [
        {id: 1, maninText: "600 GSM 'ANTHARCITE' HOODIE", price: "$300.00", src: "/images/BannerImage.webp", alt: "card image", href: "/products"},
        {id: 2, maninText: "600 GSM 'MUD GRAY' HOODIE", price: "$300.00", src: "/images/BannerImage.webp", alt: "card image", href: "/products"},
        {id: 3, maninText: "600 GSM 'ASH GRAY' HOODIE", price: "$300.00", src: "/images/BannerImage.webp", alt: "card image", href: "/products"},
        {id: 4, maninText: "600 GSM 'LIGHT HEATHER' HOODIE", price: "$300.00", src: "/images/BannerImage.webp", alt: "card image", href: "/products"},
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
            href={`/products/${card.id}`}
            />
        ))}
        </section>
    )
}

export default ProductsFeed