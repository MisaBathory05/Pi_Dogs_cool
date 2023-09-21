import React from "react";
import Card from "../Card/Card";
import styles from "./Cards.module.css"

const Cards = ({combinedDogs, selectedTemperament}) => {
    const filteredCards = combinedDogs.filter(//filtro de acuerdo del temperamenr
        (dog) => dog.temperament && dog.temperament.includes(selectedTemperament)
    );

    return(
        <div className={styles.cardItem}>
            {filteredCards.map((dog) => {
                return (
                    <Card 
                    key={dog._id} 
                    id={dog.id}
                    name={dog.name}
                    temperament={dog.temperament}
                    weight={dog.weight}
                    image={dog.image}
                    />
                );
                })};  
                </div>
             );
            };

            export default Cards;