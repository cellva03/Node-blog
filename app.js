const express = require('express');
const blogRoutes = require('./routes/blogRoutes')
// const path = require('path'); 
// const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');
// const { get } = require('https');
// const morgan = require('morgan');
const url = 'https://inspiring-chimera-dd4141.netlify.app';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true}));

const dbURI = 'mongodb://Selva:Selva03@blog-shard-00-00.5ihud.mongodb.net:27017,blog-shard-00-01.5ihud.mongodb.net:27017,blog-shard-00-02.5ihud.mongodb.net:27017/selva-blog?ssl=true&replicaSet=atlas-pi94wt-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(()=>{
        console.log('DataBase Connected');
        app.listen( url );
    })
    .catch((e)=>{
        console.log(e);
    })

app.set('view engine', 'ejs');

// app.use(morgan('dev'));

app.use(express.static( __dirname + "/public"));

// app.use((req, res, next) => {
//     console.log(`Path : ${req.path}`);
//     console.log(`Path : ${req.method}`);
//     next();
// })

// app.use((req, res, next) => {
//     console.log('In the Next use');
//     next();
// })

// app.get('/add-blog',(req, res)=>{
//     const blog = new Blog({
//         title:"Hello Sathish",
//         snippet:"Hello from Sathish",
//         body:"Hello World from Sathish"
//     });
//     blog.save()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((e)=>{
//             console.log(e);
//         })
// })
// //Find All the blogs in DB
// app.get('/all-blogs',(req, res)=>{
//     Blog.find()
//         .then((result)=>{
//             res.send(result);
//         })
// })

// //Find a Certain Blogs
// app.get('/single-blog',(req, res)=>{
//     Blog.findById('625aa82a6dcbccead426f694')
//         .then((result)=>{
//             res.send(result)
//         })
// })
app.get('/', (req, res) => {
    // res.send('<p>Hello Sathish</p>')
    // res.status(200).sendFile(path.resolve('../Http/index.html'));
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<h1>Hello sathish from about</h1>')
    // res.status(200).sendFile(path.resolve('../Http/about.html')); 
    res.render('about',{ head: 'About' })
});

// app.get('/about-us', (req, res) => {
    // res.redirect('/about');
// })

app.get('/create', (req, res) => {
    res.render('create',{ head: 'Create' })
})

app.use(blogRoutes);

app.use((req, res) => {
    // res.status(400).sendFile(path.resolve('../Http/404.html'));
    res.status(400).render('404');
})
