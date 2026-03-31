import React, { useEffect, useState } from "react";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import axios from "axios";

function Section({ title }){
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(
                    "https://qtify-backend.labs.crio.do/albums/top"
                );
                setData(res.data);
            } catch(error){
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className={styles.section}>

            <div className={styles.header}>
                <h2>{title}</h2>
                <p className={styles.collapse}>Collapse</p>
            </div>

            <div className={styles.grid}>
                {data.map((item) => (
                    <Card 
                        key={item.id}
                        image={item.image}
                        follows={item.follows}
                        title={item.title}
                    />
                ))}
            </div>

        </div>
    );
}

export default Section;