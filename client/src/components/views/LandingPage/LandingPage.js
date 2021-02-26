import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'
import { Row,Button } from 'antd'

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)
    

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
        
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())//fetch를 통해서 response를 받아오고, 그걸 json화 시켜준다.
        .then(response => {
            console.log(response)
            //setMovies(Movies.concat(response.results)) 이 방법으로 가져온 정보를 더할 수도 있고, 아니면 아래와 같이 하면된다.
            setMovies([...Movies, ...response.results])
            setMainMovieImage(response.results[3])
            setCurrentPage(response.page)
        })//Movie State에 저장
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage + 1}`;
        
        fetchMovies(endpoint)
    }

    return (
        <div style={{ width:'100%', margin:'0'}}>
            {/* Main Image */}
            {/* 랜더링 되기 전에 정보가 있어야 하는데, 랜더링이 먼저 되어야하기 때문에 아래와 같은 조건을 준다. */}
            {MainMovieImage && 
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                title={MainMovieImage.title}
                text={MainMovieImage.overview}
            />
            }
            <div style={{ width:'85%', margin:'1rem auto'}}>
            
                
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie grid card */}
                {/* gutter를 이용해서 gricard 컴포넌트 사이에 간격준다. */}
            <Row gutter={[16, 16]}>
                {Movies && Movies.map((movie, index) => (
                    //poster가 없는 영화는 ?를 이용해서 처리해준다.
                    <React.Fragment key={index}>
                        <GridCards 
                            image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.title}
                            landingPage
                        />
                    </React.Fragment>
                ))}
            </Row>
                
            </div>

            <div>
                <div style={{ display:'flex', justifyContent: 'center'}}>
                    <Button onClick={loadMoreItems}> Load More </Button>
                </div>
            </div>
 
        </div>
    )
}

export default LandingPage

