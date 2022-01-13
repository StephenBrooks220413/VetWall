const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');

const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedController = require('./middleware/redirectIfAuthenicated');

global.loggedIn = null;

require('dotenv').config();

// middlewares
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(flash());
app.use(fileUpload());
app.use(morgan());

app.use('/posts/store', validateMiddleWare);
app.use(expressSession({
    secret: 'veterans'
}))
app.use("*", (req, res, next)=>{
    loggedIn = req.session.userId;
    next();
})


// DB Connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

if(mongoose){
    console.log('DB connected')
} else {
    console.log('No DB connection')
}

// setting layouts
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Controllers
const gamesController = require('./controllers/games')
const newPostController = require('./controllers/newPost');
const singlePostController = require('./controllers/singlePost');
const blogsController = require('./controllers/blogs');
const storePostController = require('./controllers/storePost');
// users
const userRegisterController = require('./controllers/usersRegister')
const storeNewUserController = require('./controllers/storeUsers');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

// server
app.listen(3000, () => {
    console.log('App listening on port 3000')
})

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/about', (req, res)=>{
    res.render('about');
})

// Blogs
app.get('/posts/new', authMiddleware, newPostController)
app.post('/posts/store',authMiddleware, validateMiddleWare, storePostController)
app.get('/blogs', blogsController)
app.get('/post/:id', singlePostController)

// users
app.post('/users/register', redirectIfAuthenticatedController, storeNewUserController)
app.get('/auth/register', redirectIfAuthenticatedController, userRegisterController)
app.get('/profile', (req, res)=>{
    res.render('profile');
})
app.post('/users/login', redirectIfAuthenticatedController, loginUserController);
app.get('/auth/login', redirectIfAuthenticatedController, loginController);
app.get('/auth/logout', logoutController);

app.use((req, res)=> res.render('notfound'));