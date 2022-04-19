const Blog = require('../models/blog.js');
const express = require('express');

const router = express.Router();

router.get('/blogs',(req, res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            // res.send(result);
            res.render('index', { head: 'Home', blogs: result });

        })
        .catch((e)=>{
            console.log(e);
        })
});

router.post('/blogs',(req, res)=> {
    const blog = new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((e)=>{
            console.log(e);
        })
    });

router.delete('/blogs/:id',(req, res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect:'/blogs' })
        })
        .catch((e)=>{
            res.status(400).render('404');
        })
})

router.get('/blogs/:id',(req, res)=>{
    const id = req.params.id;
    // console.log(typeof(id));
    // const ID = mongoose.Types.ObjectId(id);
    Blog.findById(id)
        .then(result=>{
            res.render('details',{head: 'Details',blog : result});
            // res.send(result);
        })
        .catch((e)=>{
            res.status(400).render('404');;
        })
});

module.exports = router;