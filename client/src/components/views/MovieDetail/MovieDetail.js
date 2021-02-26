import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import { Button, Row } from 'antd'
import GridCards from '../commons/GridCards'
import Favorite from './Sections/Favorite'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState(null)
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)


    useEffect(() => {
        //이렇게 하면 param정보를 다 가져올 수 있다.
        //console.log(props.match)
        
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;


        //영화별 정보를 가져온다
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })

        //다른 변수를 이용해서 배우 정보를 불러온다
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setCasts(response.cast)
            })
    

    }, [])

    const toggleActorView = () =>{
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
        
            {/* Header */}
            {/* 전에 만든 MainImage component를 이용한다. */}
            {Movie && 
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.title}
                text={Movie.overview}
            />
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto'}}>

                {/* favorite button */}
                {/* 로그인 할 때 localStorage에 userId를 저장해놨다. */}
                {Movie &&
                <div style={{display:'flex', justifyContent:'flex-end', margin:'1rem'}}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>
                }
                
                {/* Movie Info */}
                {Movie &&
                <MovieInfo movie={Movie} />
                }

                <br />
                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <Button shape={'round'} type={'primary'} onClick={ toggleActorView }> Toggle Actor View </Button>

                </div>
                {ActorToggle && 
                <Row gutter={[16, 16]}>
                {Casts && Casts.map((cast, index) => (
                        //poster가 없는 영화는 ?를 이용해서 처리해준다.
                        <React.Fragment key={index}>
                            <GridCards 
                                image={cast.profile_path ?
                                     `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                characterName={cast.name}
                            />
                        </React.Fragment>
                    ))}
                    </Row>
                }


            </div>

        </div>
    )
}

export default MovieDetail
