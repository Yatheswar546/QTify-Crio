import React, { useEffect, useState, useRef } from "react";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Tabs, Tab } from "@mui/material";

function Section({ title, api, isSongSection = false }){
    const [data, setData] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("all");

    const scrollRef = useRef(null);

    useEffect(() => {

        if(isSongSection){
            const fetchGenres = async () => {
                try{
                    const res = await axios.get(
                        "https://qtify-backend.labs.crio.do/genres"
                    );
                    setGenres(res.data.data);
                } catch (error){
                    console.log(error);
                }
            };

            fetchGenres();
        }

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

    const filteredData = selectedGenre === "all" ? data : data.filter((item) => item.genre.key === selectedGenre);

    return(
        <div className={styles.section}>

            <div className={styles.header}>
                <h2>{title}</h2>

                {isSongSection && (
                    <Tabs
                        value={selectedGenre}
                        onChange={(e, newValue) => setSelectedGenre(newValue)}
                        textColor="inherit"
                        TabIndicatorProps={{ style: { backgroundColor: "#34C94B" } }}
                    >
                        <Tab label="All" value="all" />
                            {genres.map((g) => (
                                <Tab key={g.key} label={g.label} value={g.key} />
                            ))}
                    </Tabs>
                )}

                {!isSongSection && (
                    <p 
                        className={styles.toggle}
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Collapse" : "Show All"}
                    </p>
                )}
            </div>

            {isSongSection || !showAll ? (
                <div className={styles.carouselWrapper}>
                    <button type="button" className={styles.arrowLeft} onClick={scrollLeft}>
                        <ArrowBackIosIcon />
                    </button>

                    <div className={styles.carousel} ref={scrollRef}>
                        {filteredData.map((item) => (
                            <Card 
                                key={item.id}
                                image={item.image}
                                follows={item.likes || item.follows}
                                title={item.title}
                                type={isSongSection ? "song" : "album"}
                            />
                        ))}
                    </div>

                    <button type="button" className={styles.arrowRight} onClick={scrollRight}>
                        <ArrowForwardIosIcon />
                    </button>

                </div>
            ) : (
                <div className={styles.grid}>
                    {filteredData.map((item) => (
                        <Card 
                            key={item.id}
                            image={item.image}
                            follows={item.likes || item.follows}
                            title={item.title}
                            type={isSongSection ? "song" : "album"}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Section;