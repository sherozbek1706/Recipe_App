import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "./../pages.css";
import {motion} from "framer-motion";
function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("Instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
    console.log(details);
  }, [params.name]);

  return (
    <Resipecont
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header">
        <h2>{details.title}</h2>
        <img src={details.image} />
      </div>
      <div className="info">
        <div className="button-items">
          <button
            className={activeTab === "Instructions" ? "active" : ""}
            onClick={() => {
              setActiveTab("Instructions");
            }}
          >
            Instructions
          </button>
          <button
            className={activeTab === "Ingredients" ? "active" : ""}
            onClick={() => {
              setActiveTab("Ingredients");
            }}
          >
            Ingredients
          </button>
        </div>
        {activeTab === "Instructions" && (
          <div className="Instruction">
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h4 dangerouslySetInnerHTML={{ __html: details.instructions }}></h4>
          </div>
        )}
        {activeTab === "Ingredients" && (
          <div className="Ingredients">
            <ul>
              {details.extendedIngredients.map((ingredient) => {
                return <li key={ingredient.id}>{ingredient.original}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </Resipecont>
  );
}

const Resipecont = styled(motion.div)`
  text-decoration: none;
`;

export default Recipe;
