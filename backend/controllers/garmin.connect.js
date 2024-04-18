// Import
const mongoose  = require('mongoose');
const { GarminConnect } = require('garmin-connect');
const fetch = require('node-fetch');
const crypto = require('crypto');
const axios = require('axios');
const https = require('https');
const puppeteer = require('puppeteer');
// Models
const GarminModel = require('../models/garmin.connect');
const TokenModel = require('../models/garmin.token');
// Garmin Developer API
const consumerKey = process.env.CONS_KEY; // Replace with your consumer key
const consumerSecret = process.env.CONS_SEC; // Replace with your consumer secret
const oauthTimestamp = Math.floor(Date.now() / 1000).toString();
const oauthNonce = Math.random().toString(36).substring(2);

// Acquire Unauthorized Request Token and Token Secret
// Controller function to acquire unauthorized request token and token secret

const acquireUnauthorizeToken = async (req, res, next) => {
    try {
        const url = 'https://connectapi.garmin.com/oauth-service/oauth/request_token';
        
        const oauthParams = {
            oauth_consumer_key: consumerKey,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_nonce: oauthNonce,
            oauth_timestamp: oauthTimestamp,
            oauth_version: '1.0'
        };

        const baseString = `POST&${encodeURIComponent(url)}&${encodeURIComponent(Object.entries(oauthParams).sort().map(([key, value]) => `${key}=${value}`).join('&'))}`;

        const signingKey = `${encodeURIComponent(consumerSecret)}&`;
        const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

        oauthParams.oauth_signature = signature;

        const headers = {
            'Authorization': `OAuth ${Object.entries(oauthParams).map(([key, value]) => `${key}="${encodeURIComponent(value)}"`).join(', ')}`
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Failed to acquire request token');
        }

        const data = await response.text();
        const [oauthToken, oauthTokenSecret] = data.split('&').map(item => item.split('=')[1]);
        res
        .status(200)
        .json(data);
      
    } catch (error) {
        console.error('Error acquiring request token:', error);
        res.status(500).send('Internal Server Error');
    }
}; 

const verifyToken =  async (req, res) => {
    const consumerKey = process.env.CONS_KEY;
    const consumerSecret = process.env.CONS_SEC;
    const requestToken =  req.body.oauthToken; // change with data from FE
    const requestTokenSecret = req.body.oauthTokenSecret; // same
    const verifier = req.body.verifier; // same
    console.log(verifier);
    acquireUserAccessToken(consumerKey, consumerSecret, requestToken, requestTokenSecret, verifier)
        .then(data => {
            console.log('User Access Token:', data.oauth_token);
            console.log('User Access Token Secret:', data.oauth_token_secret);
            try {
                const newUserToken = new TokenModel({
                    oauthToken: data.oauth_token,
                    oauthTokenSecret: data.oauth_token_secret,
                    userRef: '65e143047e1864db4e3fe370'
                });
        
                newUserToken.save();
                console.log('User token saved successfully');
            } catch (error) {
                console.error('Error saving user token:', error);
                throw error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

async function acquireUserAccessToken(consumerKey, consumerSecret, requestToken, requestTokenSecret, verifier) {
    try {
        const url = 'https://connectapi.garmin.com/oauth-service/oauth/access_token';

        const oauthParams = {
            oauth_consumer_key: consumerKey,
            oauth_token: requestToken,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_nonce: Math.random().toString(36).substring(2),
            oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
            oauth_version: '1.0',
            oauth_verifier: verifier
        };

        // Generate the signature base string
        const baseString = `POST&${encodeURIComponent(url)}&${encodeURIComponent(Object.entries(oauthParams).sort().map(([key, value]) => `${key}=${value}`).join('&'))}`;

        // Generate the signing key
        const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(requestTokenSecret)}`;

        // Calculate the HMAC-SHA1 signature
        const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

        // Add the signature to the OAuth parameters
        oauthParams.oauth_signature = signature;

        // Generate the Authorization header
        const authorizationHeader = `OAuth ${Object.entries(oauthParams).map(([key, value]) => `${key}="${encodeURIComponent(value)}"`).join(', ')}`;

        // Make the HTTP POST request to acquire the access token
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': authorizationHeader
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to acquire user access token: ${response.statusText}`);
        }

        // Parse the response
        const responseData = await response.text();
        const data = {};
        responseData.split('&').forEach(param => {
            const [key, value] = param.split('=');
            data[key] = value;
        });

        return data;
    } catch (error) {
        console.error('Error acquiring user access token:', error);
        throw error;
    }
}

const Signingrequests  =  async (req, res) => {
    const consumerKey = process.env.CONS_KEY;
    const consumerSecret = process.env.CONS_SEC;
    const accessToken = 'ad0a26f6-b3d8-44bd-ae1a-a9b27d458440';
    const accessTokenSecret = 'NWRfHwtQ86HEjrzmYwSYrKkdWW1T3T6S0se';
    
    const url = 'https://healthapi.garmin.com/wellness-api/rest/user/id';
    const method = 'GET'; // Change method according to your request
    const oauthParams = {
        oauth_consumer_key: consumerKey,
        oauth_token: accessToken,
        oauth_timestamp: Math.floor(Date.now() / 1000), // Current timestamp in seconds
        oauth_nonce: Math.random().toString(36).substring(2), // Generate random nonce
        oauth_version: '1.0',
    };

    signRequest(url, method, oauthParams, consumerSecret, accessTokenSecret)
    .then(headers => {
        console.log('Authorization header:', headers.Authorization);
        // Make the request using fetch or your preferred HTTP client library
    })
    .catch(error => console.error('Error:', error));

}

// Function to sign requests
async function signRequest(url, method, oauthParams, consumerSecret, tokenSecret) {
    try {
        // Set oauth_signature_method
        oauthParams.oauth_signature_method = 'HMAC-SHA1';

        // Generate Signature Base String (SBS)
        const baseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(Object.entries(oauthParams).sort().map(([key, value]) => `${key}=${value}`).join('&'))}`;

        // Generate signing key
        const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;

        // Calculate HMAC-SHA1 signature
        const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

        // Add signature to oauthParams
        oauthParams.oauth_signature = signature;

        // Create Authorization header
        const headers = {
            'Authorization': `OAuth ${Object.entries(oauthParams).map(([key, value]) => `${key}="${encodeURIComponent(value)}"`).join(', ')}`
        };

        return headers;
    } catch (error) {
        console.error('Error signing request:', error);
        throw error;
    }
}

// Function to simulate a ping notification
async function simulatePing() {
    try {
        const pingData = {
            epochs: [{
                userId: process.env.CONS_KEY,
                userAccessToken: "ad0a26f6-b3d8-44bd-ae1a-a9b27d458440",
                uploadStartTimeInSeconds: 1444937651,
                uploadEndTimeInSeconds: 1444937902,
            }]
        };

        const response = await fetch('https://apis.garmin.com/wellnessapi/rest/epochs?uploadStartTimeInSeconds=1444937651&uploadEndTimeInSeconds=1444937902', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(pingData)
        });

        if (!response.ok) {
            throw new Error('Failed to simulate ping');
        }

        const responseData = await response.json();
        console.log('Ping simulated successfully:', responseData);
    } catch (error) {
        console.error('Error simulating ping:', error);
    }
}

// get Data using garmin connect
async function getConnect() {
    // Create a new Garmin Connect Client
        const GCClient = new GarminConnect({
            // username: 'memerlin90@gmail.com',
            // password: 'Imam123imam!'
            username: 'ikawatividya@gmail.com',
            password: 'Musa1710'
        });
        // Uses credentials from garmin.config.json or uses supplied params
        await GCClient.login();
        const userProfile = await GCClient.getUserProfile();
        // Get Heart Rate
        const heartRateData = await GCClient.getHeartRate(new Date('2024-03-01'));
        const newData = new GarminModel(heartRateData)
        console.log(heartRateData);
        newData.save().then(savedData => {
          console.log('Data saved successfully:', savedData);
          // Close the MongoDB connection
          mongoose.connection.close();
      })
      .catch(error => {
          console.error('Error saving data:', error);
          // Close the MongoDB connection
          mongoose.connection.close();
      });
    }
        
    module.exports = {
        getConnect,
        acquireUnauthorizeToken,
        verifyToken,
        Signingrequests,
        simulatePing
    };