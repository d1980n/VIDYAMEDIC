import './home.css';
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import Heiders from '../temp/Hieders'
import TabListAdd from '../temp/TabListAdd'
import im1 from './image/im1.jpg';
import im2 from './image/im2.png';
import im3 from './image/im3.png';
function Home() {
  return(
    
    <body className='home'>
     <header className='head'>
      <Heiders/>
    </header> 
      
      <div className='all'>


    {/* Bigbar */}
    <div className='bigbar'>
      <div className='content1'>
        <h1>Shoping more Easy with SFORC</h1>
        <h3>Shoping with joy</h3>
        <input class="srch" type="Search" placeholder="Search"/>
      </div>
      <div className='content2'>
        <img className='im3' src={im3} alt="" />
      </div>
    </div>
    {/* end bigbar */}



    {/* categoty start */}
    <div className='category'>
      <h1 className='subj'>Categories</h1>
      <div className='card'>
      <Link>
        <div className='card-ch'>
         <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="3vh"
      width="3vh"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
        <p>Key Category</p>
        </div>
        </Link>
        <Link>
        <div className='card-ch'>
         <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="3vh"
      width="3vh"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
        <p>Key Category</p>
        </div>
        </Link>
        <Link>
        <div className='card-ch'>
         <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="3vh"
      width="3vh"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
        <p>Key Category</p>
        </div>
        </Link>
        <Link>
        <div className='card-ch'>
         <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="3vh"
      width="3vh"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
        <p>Key Category</p>
        </div>
        </Link>
        <Link>
        <div className='card-ch'>
         <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="3vh"
      width="3vh"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
        <p>Key Category</p>
        </div>
        </Link> 
        <Link>
        <div className='card-ch'>
         <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="3vh"
      width="3vh"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
        <p>Key Category</p>
        </div>
        </Link>
        <Link>
        <div className='card-ch'>
         <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="3vh"
      width="3vh"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
        <p>Key Category</p>
        </div>
        </Link>
      </div>
      
    </div>
    
    
    {/* categoty end */}

    {/* tab list start */}
    <div className='TablistS'>
      <h1 className='subj'>Add</h1>
      <TabListAdd/>
    </div>  
   
    {/* tab list end */}

    {/* Carousel
    <div class="container1">
        <div class="wrapper1">
            <img src={im1} className='udin1'/>
            <img src={im2} className='udin1'/>
            <img src={im1} className='udin1'/>
            <img src={im2} className='udin1'/>
        </div>
    </div> */}
    
    </div>
    </body>
    
  );
  

}

export default Home;