const User = require("../models/User")
const Song = require("../models/Song")
const Rating = require("../models/Rating")
const SongRating = require("../models/SongRating")
const Recommendation =require("./Recommendation")
const jsrecommender = require("js-recommender");
class UserController {

    

    home(req,res)
    {
        res.send('day la home user')
    }

    async UserPost(req,res)
    {     
        try {
            const update = await SongRating.findOne({
                user: req.body.user,
                song : req.body.song,
            })
            if(update)
            {
                SongRating.findOneAndUpdate({ "user": req.body.user,"song" : req.body.song,}, { "$set": {"rating" : req.body.rating}}).exec(function(err, book){
                    if(err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                             res.status(200).send("update");
                    }
                 });
            }
            else{

                const songRating = new SongRating({
                user: req.body.user,
                song : req.body.song,
                rating : req.body.rating
                
            })
            res.send("tao moi")
            const saveSongRating = await songRating.save();
            res.status(200).send(req.body.user)
        }
        } catch (error) {
            res.status(400).send(error)
        }

    }

    async UserGet(req,res,next)
    {
        
    
        try {
            
            var recom = []
            var userRatiing = {
            }
        
            //var recommender = new jsrecommender.Recommender();
                
            var table = new jsrecommender.Table();
        
        
            // table.setCell('[movie-name]', '[user]', [score]);
            var SongRatings = await SongRating.find()
            await SongRatings.forEach((item)=>{
                    table.setCell(item.song,item.user,item.rating)
                    console.log("1")
            })
            console.log("2")
            var recommender = new jsrecommender.Recommender({
                alpha: 0.01, // learning rate  0.001
                lambda: 0.01, // regularization parameter  0.001
                iterations: 100, // maximum number of iterations in the gradient descent algorithm  1000
                kDim: 7 // number of hidden features for each   7
            });
            var model = recommender.fit(table);
        
            var predicted_table = recommender.transform(table);
        
            var userId = req.params.id
        
            var songRa = []
            console.log("2")
            for (var i = 0; i < predicted_table.columnNames.length; ++i) {
                var user = predicted_table.columnNames[i];
                var allSongAnhRating = []
                console.log("2.5")
                for (var j = 0; j < predicted_table.rowNames.length; ++j) {
                    var song = predicted_table.rowNames[j];
                    var songAndRating={
                        song:song,
                        rating:Math.round(predicted_table.getCell(song, user))
                        
                    }
                    console.log("3")
                    allSongAnhRating.push(songAndRating)
                    
                }
                allSongAnhRating.sort(function(a, b){
                    return b.rating - a.rating;
                });
                userRatiing={
                    user:user,
                    songRating: allSongAnhRating
                }
               
                recom.push(userRatiing)
        
            }
            console.log("4")
            
            var result = recom.filter((item)=>{
                return item["user"]===userId
            })
            var result1 = result[0].songRating
            var result2 = result1.slice(0,6)
            var songRa = []
            result2.forEach((item)=>{
                songRa.push(item.song)
            })
        
            const songs= await Song.find({ma:songRa})
            
            res.json(songs)
            
        
            
        } catch (error) {
            next(error)
        }
    }

      


    async ngheNhieu(req,res)
    {
        const songs = await Song.find().sort({luotNghe:-1}).limit(3)
        res.send(songs)
    }
    async allSong(req,res)
    {
        let user = req.params.id
        const song = await Song.find().limit(5)
        res.json(song)
        
    }

    async login(req,res){
        const user = await User.findOne({userName:req.body.userName})  
        if(!user) return res.json({
            status: 400,
            "thongbao":"userNameNotExists"
        })
        const KTPassWord = await req.body.passWord === user.passWord ? true : false
        if(!KTPassWord)
        {
            return res.json({
                status: 400,
                "thongbao":"passWordNotExists"
            })
        }
        res.json({
            status: 200,
            userName:user.userName
        })

    }
    async register(req,res){
        const userNameExit = await User.findOne({userName:req.body.userName})   
        if(userNameExit) return res.json({
            status: 400,
            "thongbao":"userNameExists"
        })
        const user = new User({
                name: req.body.name,
                userName : req.body.userName,
                passWord : req.body.passWord
            });
            try {
                const saveUser = await user.save();
                res.status(200).json({
                    userName:user.userName
                })
                return res.redirect('/home' ,{userName:userName});
            } catch (error) {
                res.status(400).send(error)
    }
        
        
    }
}

module.exports = new UserController