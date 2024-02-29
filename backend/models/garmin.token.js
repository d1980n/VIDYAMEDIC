const mongoose  = require("mongoose");

const TokenSchema = new mongoose.Schema({
    UnoauthToken: {
        type: String,
        required: true
    },
    UnoauthTokenSecret: {
        type: String,
        required: true
    },
    verifier: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    verifier: {
        type: String,
        required: true
    },
    authToken: {
        type: String,
        required: true
    },
    authTokenSecret: {
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