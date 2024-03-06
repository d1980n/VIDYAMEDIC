// Import
const mongoose  = require('mongoose');
const { GarminConnect } = require('garmin-connect');
const fetch = require('node-fetch');
const crypto = require('crypto');
const axios = require('axios');
const puppeteer = require('puppeteer');
// Models
const GarminModel = require('../models/garmin.connect');
const TokenModel = require('../models/garmin.token');
// Garmin Developer API
const consumerKey = process.env.CONS_KEY; // Replace with your consumer key
const consumerSecret = process.env.CONS_SEC; // Replace with your consumer secret
const oauthTimestamp = Math.floor(Date.now() / 1000);
const oauthNonce = crypto.randomBytes(16).toString('hex');

// Acquire Unauthorized Request Token and Token Secret
// Controller function to acquire unauthorized request token and token secret
const acquireRequestToken = async (req, res) => {
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
        // Redirect to authorization page with oauthToken
        // res.redirect(`https://connect.garmin.com/oauthConfirm?oauth_token=${oauthToken}`);

        // curl -X POST http://localhost:3000/garminconnect/acquireToken
        // Token Testing oauth_token=90ce03e8-4c0b-4f14-9ab0-ccbad8cb7eb1
        // Verifier Testing oauth_verifier=FWEv47HDOS


        // Puppet to auto accept
        // const browser = await puppeteer.launch({ headless: false }); // Launch browser in non-headless mode for debugging
        // const page = await browser.newPage();
    
        // // Navigate to the Garmin Connect OAuth confirmation page
        // const oauthCallback = encodeURIComponent('https://your.callback.url'); // Replace with your callback URL
        // await page.goto(`https://connect.garmin.com/oauthConfirm?oauth_token=${oauthToken}`);
    
        // // Wait for the page to load
        // // await page.waitForNavigation();
    
        // // Extract the verifier from the redirected URL
        // const redirectURL = page.url();
        // const urlParams = new URLSearchParams(new URL(redirectURL).search);
        // const oauthVerifier = urlParams.get('oauth_verifier');
    
        // console.log('OAuth Verifier:', oauthVerifier);
    
        // await browser.close();


        //  Acquire User Access Token and Token Secret 
     
        // Signing Requests

        // Get User ID


    } catch (error) {
        console.error('Error acquiring request token:', error);
        res.status(500).send('Internal Server Error');
    }
};




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
        acquireRequestToken,
    };