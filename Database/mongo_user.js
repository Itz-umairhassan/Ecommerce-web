const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successful connection...")
}).catch(err => {
    console.log(err.message)
})

const user = new mongoose.Schema({
    name: { type: 'string', default: null },
    email: { type: 'string', default: null },
    password: { type: 'string', default: null },
    token: { type: 'string' },
    cart: ['string']
    
})

module.exports = mongoose.model('users', user);
