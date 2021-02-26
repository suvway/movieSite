import { Button, Popover } from 'antd'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './FavoritePage.css'
import {IMAGE_BASE_URL} from '../../Config'
import NoImage from '../../../thumbnail/1.jpg'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoriteMovie()
        
    }, [])
    //무비 정보를 불러오는 펑션을 하나 만들어서 로딩 할 떄와 제거 할 때 모두 쓴다.
    const fetchFavoriteMovie = () => {
        Axios.post('/api/favorite/getFavoritedMovie', {userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setFavorites(response.data.favorites)
            } else {
                alert('좋아요 정보를 가져오는데 실패했습니다.')
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success){
                fetchFavoriteMovie()
            } else {
                alert('리스트에서 지우는 것을 실패했습니다.')
            }
        })
    }


    const renderCards = Favorites.map((favorite, index) =>{

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : {NoImage}
                }
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <th>{favorite.movieTitle}</th>
            </Popover>
            <th>{favorite.movieRunTime}</th>
            {/* 화살표 함수로 펑션을 생성하고, 파라미터를 같이 보내서 위에서 바로 활용 할 수 있게 한다. */}
            {/* 랜더링 별로 다른 값을 가지는 파라미터를 이용해서 기능을 처리할 수 있게 만든다. */}
            <th><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></th>
        </tr>
    })


    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favorite</th>
                    </tr>
                </thead>
                <tbody>
                
                {renderCards}

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
