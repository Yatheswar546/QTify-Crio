import React from "react";
import styles from "./Card.module.css";
import { Chip } from "@mui/material";

function Card({ image, follows, title }){
    return(
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={title} className={styles.image} />

                <div className={styles.chip}>
                    <Chip label={`${follows} Follows`} size="small" />
                </div>
            </div>

            <p className={styles.title}>{title}</p>
        </div>
    );
}

export default Card;