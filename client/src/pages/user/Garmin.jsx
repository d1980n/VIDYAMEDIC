import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { json } from 'express';


export default function Profile() {
  const [formData, setFormData] = useState({
    oauthToken: '',
    oauthTokenSecret: '',
    verifier: ''
  });
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [UnauthorizeToken, setUnauthorizeToken ] = useState({});
  const [UnauthorizeTokenSecret, setUnauthorizeTokenSecret ] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUnauthorizeToken = async () => {
    try {
      const res = await fetch('http://localhost:3000/garminConnect/acquireUnauthorizeToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
        });
      const data = await res.json();
      const Token = JSON.stringify(data);
      const [oauthToken, oauthTokenSecret] = Token.split('&').map(item => item.split('=')[1]);
      if (data.success === false) {
        console.log("error")
        return;
      } 
      setUnauthorizeToken(oauthToken);
      setUnauthorizeTokenSecret(oauthTokenSecret);
      console.log(Token);
      window.open(`https://connect.garmin.com/oauthConfirm?oauth_token=${oauthToken}`)
    } catch (error) {
        console.log("error", error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/garminConnect/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success === false) {
        console.log("error", error)
        return;
      }
     
    } catch (error) {
      console.log("error", error)
    }
  };
    
  return (
    <div className='p-3 max-w-lg mx-auto'>
          <div className="flex flex-col gap-3">
            <h1 className='text-3xl font-semibold text-center my-7'>Connect to Garmin</h1>
              <button onClick={handleUnauthorizeToken} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                  Dapatkan Unauthorize Token
              </button>
              <br />
            
        </div>
      
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            id='oauthToken'
            name='oauthToken'
            placeholder='Oauth Token'
            className='bg-slate-100 rounded-lg p-3'
            value={UnauthorizeToken}
            onChange={handleChange}
          />
             <input
            type='text'
            id='oauthTokenSecret'
            placeholder='Oauth Token Secret'
            name='oauthTokenSecret'
            className='bg-slate-100 rounded-lg p-3'
            value={UnauthorizeTokenSecret}
            onChange={handleChange}
          />
          <input
            type='text'
            id='verifier'
            placeholder='Verifier'
            name='verifier'
            className='bg-slate-100 rounded-lg p-3'
            value={formData.verifier}
            onChange={handleChange}
          />
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Verify Token
          </button>
        </form>
        <br />

        <div className="p-3 max-w-lg mx-auto">
          <h3>User Access Token: </h3>
          <h3>User Access Token Secret: </h3>
        </div>
    </div>
  );
}
