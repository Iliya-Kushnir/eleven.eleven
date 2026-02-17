"use client"; // 1. Обязательно для клиентских событий

import styles from "./feedItem.module.scss";
// 2. Импортируем хук вместо серверной функции
import { useLanguage } from "@/context/LanguageContext"; 

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

// 3. Убираем async
const FeedItem: React.FC<ItemProps> = ({
    heading, firstName, lastName, city, zip, country, province, onDelete, onEdit
}) => {
    // 4. Используем хук (он работает синхронно)
    const { t } = useLanguage(); 

    return (
        <div className={styles.itemWrapper}>
            <p className={styles.paragraph}>{firstName} {lastName}</p>
            <p className={styles.paragraph}>{province}</p>
            <p className={styles.paragraph}>{city} {zip}</p>
            <p className={styles.paragraph}>{country}</p>

            <div className={styles.buttonsWrapper}>
                <button onClick={onEdit} className={styles.button}>
                    {t('addresses.addresses_feed.edit')}
                </button>
                <button onClick={onDelete} className={styles.button}>
                    {t('addresses.addresses_feed.delete')}
                </button>
            </div>
        </div>
    );
};

export default FeedItem;