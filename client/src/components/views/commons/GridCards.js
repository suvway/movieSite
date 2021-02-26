import React from 'react'
import { Col } from 'antd'
import DefaultImage from '../../../thumbnail/1.jpg'


function GridCards(props) {

    
    //if 조건절을 줘서 landingPage에서 부를 떄와 movieDetail에서 부를 때를 나눠준다.
    if(props.landingPage){
        return (//24 사이즈가 풀사이즈 사이즈 별로 한 컴포넌트가 차지하는 사이즈
            <Col lg={6} md={8} sm={12} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px'}} src={props.image ? props.image : DefaultImage} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        )
    } else { 
        return (//24 사이즈가 풀사이즈 사이즈 별로 한 컴포넌트가 차지하는 사이즈
            <Col lg={6} md={8} sm={12} xs={24}>
                <div style={{ position: 'relative' }}>{props.Image}
                        <img style={{ width: '100%', height: '320px'}} src={props.image ? props.image : DefaultImage} alt={props.characterName} />
                </div>
            </Col>
        )
    }



}

export default GridCards
