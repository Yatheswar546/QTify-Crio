import React from "react";
import styles from "./Card.module.css";
import Chip from "@mui/material/Chip";

function Card({ image, follows, title }){
    return(
        <div className={styles.card}>
            <img src={image} alt={title} className={styles.image} />

            <div className={styles.bottom}>
                <Chip 
                    label={`${follows} Follows`} 
                    size="small" 
                    className={styles.chip}
                />
            </div>

            <p className={styles.title}>{title}</p>
        </div>
    );
}

export default Card;