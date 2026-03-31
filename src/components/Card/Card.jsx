import React from "react";
import styles from "./Card.module.css";
import Chip from "@mui/material/Chip";

function Card({ image, follows, title, type }){
    return(
        <div className={styles.card}>
            <img src={image} alt={title} className={styles.image} />

            <div className={styles.bottom}>
                <Chip 
                    label={
                        type === "song"
                        ? `${follows} Likes`
                        : `${follows} Follows`
                    } 
                    size="small" 
                    className={styles.chip}
                />
            </div>

            <p className={styles.title}>{title}</p>
        </div>
    );
}

export default Card;