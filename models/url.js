const mongoose = require("mongoose");


const urlSchema = new mongoose.Schema({
    originalurl: {
        type: String,
        require: true,
    },
    shorturl: {
        type: String,
        require: true
    }
},
{
    collection: "Urls"
});

const Url = mongoose.model('Urls',urlSchema);

module.exports = {
    Url,
}

