import React, { useEffect, useState, useRef } from "react";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Section({ title, api }){
    const [data, setData] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(api);
                setData(res.data);
            } catch(error){
                console.log(error);
            }
        };

        fetchData();
    }, [api]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -800, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 800, behavior: "smooth" });
    };

    return(
        <div className={styles.section}>

            <div className={styles.header}>
                <h2>{title}</h2>
                <p 
                    className={styles.toggle}
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "Collapse" : "Show All"}
                </p>
            </div>

            {!showAll ? (
                <div className={styles.carouselWrapper}>
                    <button type="button" className={styles.arrowLeft} onClick={scrollLeft}>
                        <ArrowBackIosIcon />
                    </button>

                    <div className={styles.carousel} ref={scrollRef}>
                        {data.map((item) => (
                            <Card 
                                key={item.id}
                                image={item.image}
                                follows={item.follows}
                                title={item.title}
                            />
                        ))}
                    </div>

                    <button type="button" className={styles.arrowRight} onClick={scrollRight}>
                        <ArrowForwardIosIcon />
                    </button>

                </div>
            ) : (
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
            )}
        </div>
    );
}

export default Section;