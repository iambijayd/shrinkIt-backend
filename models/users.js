const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    urls: [{type: mongoose.Schema.Types.ObjectId, ref: 'Urls'}]
},{
    collection: 'Users',
});


const User = mongoose.model('user',userSchema);


module.exports = {
    User,
}