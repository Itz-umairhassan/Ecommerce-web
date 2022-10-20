const express = require('express')
const app = express();
const exphbs = require('express-handlebars')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const multer = require('multer')
const warning = require('../Ecommerce/strings')

const product_data = require('../Ecommerce/strings')
const price_calculate = require('../Ecommerce/price_calc')
const storage = require('../Ecommerce/multer_uploader')
const upload = multer({ storage: storage })

// Data Base scehma... for users
const users = require('../Ecommerce/Database/mongo_user')
const auth = require('../Ecommerce/authentication');
const cookieParser = require('cookie-parser');
const { parse } = require('path');
const secret = '3812048094ndqbjkebfcneofneofno39dqwo';

// view egnine settings....
const view_path = path.join(__dirname, 'views/layouts')
app.set('view-engine', 'hbs')
app.engine('hbs', exphbs.engine({
    defaultLayout: false,
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
}))

// middlewares....
app.use('/static', express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set('views', view_path)
app.use(cookieParser())

// making servers....

// it will use auth as a middle ware to authenticate the user...
// if user is not authenticated then redirect it to the signUp ortherwise
// render the page...
app.get('/', auth, async (req, res) => {
    const userdata = await users.findOne({ email: res.user.userEmail })
    if (userdata) {
        res.render('home.hbs', {
            product_heading: "Featured Products",
            product_arr: [...product_data]
        })
        return;
    }
    res.redirect('SignUp')
})


app.get('/upload', (req, res) => {
    res.render('up.hbs')
})

app.post('/upload_file', upload.single('myfile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})
// when user click on a product .. grab the product id and then
// render product page by getting data from dataBase...
app.get('/product*/:id', (req, res) => {
    const required = product_data.find(elem => elem.product_id == req.params.id)
    const product_arr = product_data.filter(elem => elem.product_id == req.params.id);
    res.render('product_page.hbs', {
        required,
        product_arr
    })
})

// // when user clicks on buy now button
// app.get('/:id/add_cart', auth, (req, res) => {

//     res.send(`product id is ${req.params.id}`)
// })

// get buying data from the user...
app.post('*/:id/purchase', auth, async (req, res) => {

    try {
        const my_user = await users.findOne({ email: res.user.userEmail })
        const my_object = {
            product_id: req.params.id,
            quantity: req.body.quantity
        }

        if (my_user) {
            await users.updateOne(my_user, {
                $push: {
                    cart: JSON.stringify(my_object)
                }
            })
            res.send("Product is added")
            return;
        } else {
            res.redirect('/logIn')
        }
    } catch (error) {
        console.log(error.message)
        res.status(401).send("something wrong")
    }
})

// when user clicks on the cart.. fetch cart data form data base and 
// product related data also... calculate the price and render the cart
// page
app.get('/getData', auth, async (req, res) => {
    const my_user = await users.findOne({ email: res.user.userEmail })

    try {
        if (my_user) {
            const data = my_user.cart.map(elem => {
                const { product_id, quantity } = JSON.parse(elem)
                return { product_id, quantity }
            })

            if (data) {
                const price_is = await price_calculate(data);

                res.render('cart.hbs', price_is)
            } else {
                res.send("Please add something in cart first")
            }
        } else {
            res.sendStatus("User is not logged in")
        }
    } catch (error) {
        console.log(error)
        res.status(403).send("Something went wrong")
    }
})

// remove an item from the cart...get id of the product.. get user
// then remove specific product from that user's cart...

app.get('/cart/:id/:quant/remove', auth, async (req, res) => {
    const my_user = users.findOne({ email: res.user.userEmail })

    try {

        const to_be_searched = JSON.stringify({
            product_id: req.params.id, quantity: req.params.quant
        })
      
        if (my_user) {

            await users.updateOne(my_user, {
                $pull: { "cart": to_be_searched }
            })
            res.redirect('/getData')
        } else {
            res.redirect('/logIn')
        }
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
})

app.get('/logIn', (req, res) => {
    res.render('log_in.hbs')
})
app.get('/SignUp', (req, res) => {
    res.render('signUp.hbs')
})

app.post('/login_form', async (req, res) => {
    const { userEmail, userPassword } = req.body;
    try {
        const old = await users.findOne({ email: userEmail })

        if (old) {
        
            // await users.updateOne(old, { $push: { cart: JSON.stringify(addition) } })

            const correct_pass = await bcrypt.compare(userPassword, old.password)

            if (correct_pass) {
                const tk = await jwt.sign({ user_id: old._id, userEmail }
                    , secret)
                res.cookie('x-access-token', tk)
                res.send('yes you are ok to go')
            }
            else {
                res.render('log_in.hbs', {
                    error_message: 'Wrong Password'
                })
            }
        }
        else {
            res.render('log_in.hbs', {
                error_message: `Email doesn't exist`
            })
        }
    } catch (error) {
        res.status(403).send(error.message)
    }

})

app.post('/signup_form', async (req, res) => {

    const { userName, userEmail, userPassword } = req.body;

    try {
        const old = await users.findOne({ email: userEmail })
        if (old) {
            res.render('signUp.hbs', {
                error_message: 'Same email in use already'
            })
            return;
        }

        const hashed = await bcrypt.hash(userPassword, 10);

        const newUser = new users({
            name: userName, email: userEmail, password: hashed
        })
        await newUser.save((err, data) => {
            if (err) {
                console.log(err.message)
            }
            else {
                console.log("Successfully stored the data")
            }
        })
        res.redirect('/logIn')
    } catch (error) {
        res.send(`something is wrong ${error.message}`)
    }
})
app.listen(80, () => {
    console.log("Listening at port 80")
})
