import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import MediaCard from "./MediaCard";
import { Grid, Button, Typography } from "@mui/material";
import "./User.css"

function User() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

  const params = useParams();
  const { categoryList } = params; 

  useEffect(() => {
    if (categoryList) {
      getNews(categoryList); 
    } else {
      getNews("International");
    }
  }, [categoryList]);

  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const getNews = (query) => {
    const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_433029b986a5af2ab37010195e62c15be156e&q=${query}&language=en`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API Response:", response.data);

        setArticles(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    getNews(searchQuery);
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
    setCurrentPage(1);
    getNews(category);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <PrimarySearchAppBar
        handleSearch={handleSearch}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        categories={["general", "business", "entertainment", "health", "science", "sports", "technology"]}
        handleCategoryClick={handleCategoryClick}
      />

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(articles.length / articlesPerPage) },
          (_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
              variant="outlined"
              color="primary"
            >
              {index + 1}
            </Button>
          )
        )}
      </div>
      {/* card component  */}

      <div className="container">
        <Grid container spacing={2}>
          {currentArticles.map((value, index) => (
            <Grid item xs={4} key={index}>
              <MediaCard
                imageUrl={value.image_url}
                title={value.title}
                description={value.description}
                link={value.link}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default User;
