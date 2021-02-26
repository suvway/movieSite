const express = require('express')
const router = express.Router();
const { Favorite } = require('../models/Favorite')


router.post('/favoriteNumber', (req, res) => {
    //index.js 에 bodyParser가 있어서 이게 가능한것이다.
    

    Favorite.find({ "movieId": req.body.movieId})
    .exec((err, info) =>{
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true , favoriteNumber: info.length })
    })


})


router.post('/favorited', (req, res) => {
    //내가 이 영화를 좋아요 목록에 넣었는지 db에서 가져오기
    

    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom})
    .exec((err, info) =>{
        if(err) return res.status(400).send(err)

        let result = false;
        if(info.length !== 0){
            result = true
        }

        res.status(200).json({ success: true , favorited: result })
    })


})

router.post('/addToFavorite', (req,res) => {

    //favorite에 새로 저장하기 위해서 새로운 document instance를 생성해서 저장
    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    }) 


})




router.post('/removeFromFavorite', (req,res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, doc) => {
        if(err) res.status(400).send(err)
        return res.status(200).json({ success: true, doc})
    })


})

router.post('/getFavoritedMovie', (req, res) => {
    
    Favorite.find({ 'userFrom': req.body.userFrom})
    .exec((err, favorites) => {
        if(err) res.status(400).send(err)
        return res.status(200).json({ success: true, favorites })
    })
})

module.exports = router;