import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';
import useFetch from '../../../hooks/useFetch';

import "./style.scss"

const HeroBanner = () => {
    const [showSearch, setShowSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        //console.log(url)
        // const bg = 
        // url.backdrop + 
        // data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
        // setBackground(bg);
        const bg =
            'https://image.tmdb.org/t/p/original' +
            data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
        setBackground(bg);
    }, [data]);

    // const searchQueryHandler = (event) => {
    //     if (event.key === "Enter" && query.length > 0) {
    //         navigate(`/search/${query}`);
    //     }
    // };

    const searchQueryHandler = async (event) => {
        if (event.key === "Enter" && query.length > 0) {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
              options
            );
            const data = await response.json();
            setSearchResults(data.results);
            setShowSearch(true);
          } catch (error) {
            console.error(error);
          }
        }
      }

    return (
        <div className='heroBanner'>
            {!loading && <div className='backdrop-img'>
                <Img src={background} />
            </div>}

            <div className="opacity-layer"></div>

            <ContentWrapper>
                {/* <div className='wrapper'> */}
                <div className='heroBannerContent'>
                    <span className='title'>Movixperience...</span>
                    <span className='subTitle'>
                        Distinctive and immersive cinematic experience. <br/>
                        Millions of movies, TV shows and people to discover.
                        Explore now!
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder='Search for a movie or TV show...'
                            onKeyUp={searchQueryHandler}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button>Search</button>
                    </div>
                </div>
                {/* </div> */}
            </ContentWrapper>

        </div>
    )
}

export default HeroBanner