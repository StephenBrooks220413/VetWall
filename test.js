const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})

BlogPost.create({
    title: "test title",
    article: "test article body for message"
}, (error, blogpost)=>{
    console.log(error, blogpost)
})