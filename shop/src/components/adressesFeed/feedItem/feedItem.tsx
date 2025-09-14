import styles from "./feedItem.module.scss"

type ItemProps = {
    heading: string,
    firstName: string,
    lastName: string,
    city: string,
    zip: string,
    country: string, 
    province: string, 
    onDelete: () => void;
    onEdit: () => void;
}

const FeedItem: React.FC<ItemProps> = ({heading, firstName, lastName, city, zip, country, province, onDelete, onEdit}) => {

    return (
        <div className={styles.itemWrapper}>
            
            <p className={styles.paragraph}>{firstName} {lastName}</p>
            <p className={styles.paragraph}>{province}</p>
            <p className={styles.paragraph}>{city} {zip}</p>
            <p className={styles.paragraph}>{country}</p>

            <div className={styles.buttonsWrapper}>
                <button onClick={onEdit} className={styles.button}>edit</button>
                <button onClick={onDelete} className={styles.button}>delete</button>
            </div>
        </div>
    )
}

export default FeedItem