const mongoose  = require("mongoose");

const TokenSchema = new mongoose.Schema({
    oauthToken: {
        type: String,
        required: true
    },
    oauthTokenSecret: {
        type: String,
        required: true
    },
    userRef:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const TokenConnect = mongoose.model("UserAccessToken", TokenSchema);
module.exports = TokenConnect;