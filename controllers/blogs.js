const BlogPost= require('../models/BlogPost');

module.exports = async(req, res) => {
    const blogposts = await await BlogPost.find({}).limit(10).populate('userid').sort({_id: -1});
    console.log(req.session)
    res.render('blogs', {
        blogposts
    })
}