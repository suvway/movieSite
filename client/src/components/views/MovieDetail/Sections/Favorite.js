import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import Axios from 'axios'



function Favorite(props) {


    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime 
    }

    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response =>{
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!setFavorited)

                } else {
                    alert('좋아요 리스트에서 지우는 것을 실패했습니다.')
                }
            })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response =>{
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1 )
                    setFavorited(!Favorited)
                } else {
                    alert('좋아요 리스트에서 추가하는 것을 실패했습니다.')
                }
            })
        }
    }

    useEffect(() => {


        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('좋아요 갯수를 가져오는데 실패했습니다')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('좋아요 정보를 가져오는데 실패했습니다')
                }
            })

    }, [])



    return (
        <div>
           <Button onClick={onClickFavorite}>{Favorited ? "Not Favorited" : "Add to Favorited"} {FavoriteNumber} </Button> 
        </div>
    )
}

export default Favorite
