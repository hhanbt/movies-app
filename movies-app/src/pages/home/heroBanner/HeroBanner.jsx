import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';
import useFetch from '../../../hooks/useFetch';
import "./style.scss"

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const navigate = useNavigate();
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg =
            'https://image.tmdb.org/t/p/original' +
            data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
        setBackground(bg);
    }, [data]);

    const searchQueryHandler = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const handleSearchChange = async (event) => {
        const query = event.target.value;
        setQuery(query);

        if (query.trim() === '') {
            setShowRecommendations(false);
            return;
        }

        try {
            const searchOptions = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWQ0MmY0MDc3OGUzOTM2MjFjODBjYjgzOWM2ZmVjZiIsInN1YiI6IjY1NzI4YzA2NmY2YTk5MDBmZjllMDQzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ooY6CMs2ATQ4Dd-NFBjo1ZDlYg6ACXyAIlqBchZVTHE', // Thay YOUR_API_KEY bằng API key của bạn
                },
            };

            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`, searchOptions);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const top5Results = data.results.slice(0, 5);
                setSearchResults(top5Results);
                setShowRecommendations(true);
            } else {
                setShowRecommendations(false);
            }
        } catch (error) {
            console.error(error);
            setShowRecommendations(false);
        }
    };

    const handleRecommendationClick = (movie) => {
        setQuery(movie.title); // You may adjust this based on the structure of your movie object
        setShowRecommendations(false);
        searchQueryHandler();
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            searchQueryHandler();
        } else {
            handleSearchChange(event);
        }
    };

    return (
        <div className='heroBanner'>
            {!loading && <div className='backdrop-img'>
                <Img src={background} />
            </div>}

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className='heroBannerContent'>
                    <span className='title'>Movixperience...</span>
                    <span className='subTitle'>
                        Distinctive and immersive cinematic experience. <br />
                        Millions of movies, TV shows and people to discover.
                        Explore now!
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder='Search for a movie or TV show...'
                            onKeyUp={handleKeyUp}
                            onChange={handleSearchChange}
                            value={query}
                        />
                        <button type='submit' onClick={searchQueryHandler}>Search</button>
                    </div>
                    <div className='suggestedMovies'>
                        {showRecommendations && (
                            <div className="suggestedMoviesDetail">
                                <ul>
                                    {searchResults.map((movie, index) => (
                                        <li key={index} onClick={() => handleRecommendationClick(movie)}>
                                            <p>
                                                {movie.title}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner;
