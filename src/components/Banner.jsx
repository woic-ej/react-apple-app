import { useEffect, useState } from 'react';
import axios from '../api/axios';
import requests from '../api/request';
import styled from "styled-components"

import './Banner.css';

const Banner = () => {

  const [movie, setMovie] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async() => {
    const response = await axios.get(requests.fetchNowPlaying);
    const movieId = 
     response.data.results[
        Math.floor(Math.random() * response.data.results.length)
    ].id;

    //특정 영화의 더 상세한 정보 가져오기 (비디오 정보 포함)
    const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
        params: {append_to_response: "videos"}
    })
    setMovie(movieDetail);
}   

const truncate = (str, n) => {
    return str.length > n ? str.substring(0,n) + "..." : str; 
}
if(!movie) {
    return (
        <div>
            loading...
        </div>
    )
}

if(!isClicked){
    return(
        <div
            className='banner'
            style={{
                backgroundImage: `url("http://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                backgroundPosition: `top center`,
                backgroundSize: 'cover'
            }}
        >
            <div className='banner__contents'>
                <h1 className='banner__title'>
                    {movie.title || movie.name || movie.original_name}
                </h1>
                <div className='banner__buttons'>
                    {movie.videos?.results[0]?.key ?
                    <button
                    className='banner__button play'
                    onClick={() => {
                        setIsClicked(true);
                    }}
                    >
                    Play
                    </button> 
                    :null  
                }
                </div>
                <p className='banner__description'>
                    {truncate(movie.overview,100)}
                </p>
            </div>
            <div className='banner__fadeBottom'></div>
        </div>
    )
} else {
    return (
        <>
          <Container>
            <HomeContainer>
              <Iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&mute=1`}></Iframe>
            </HomeContainer>
          </Container>
          <button onClick={() => setIsClicked(false)}>
            X
          </button>
        </>

    )
}
}

const Container = styled.div`
    display: flex;
    justify-contente: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`

const Iframe = styled.iframe`
    width:100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
`
export default Banner
