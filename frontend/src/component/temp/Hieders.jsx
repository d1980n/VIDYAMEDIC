import './Hieders.css';
import React, { useState, useRef, useEffect } from 'react';
function Hieders() {
  window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle('sticky', window.scrollY > 0);
});
      useEffect(() => {
        const menuBtn = document.querySelector('.menu-btn');
        const closeBtn = document.querySelector('.close-btn');
        const menu = document.querySelector('.menu');
      
        const openMenu = () => {
          menu.classList.add('active');
        };
      
        const closeMenu = () => {
          menu.classList.remove('active');
        };
      
        menuBtn.addEventListener("click", openMenu);
        closeBtn.addEventListener("click", closeMenu);
      
        // Cleanup event listeners
        return () => {
          menuBtn.removeEventListener("click", openMenu);
          closeBtn.removeEventListener("click", closeMenu);
        };
      }, []);
  return (
    <body className='heider'>
      <link rel="stylesheet" href="css/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <link rel="stylesheet" href="css/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"/>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <div className='headers'>
    <header>
        <h1 class="logo">SForc</h1>
        <div class="menu">
            <div class="btn">
                <i class="fas fa-times close-btn"></i>
            </div>
            <a href="#Home">Home</a>
            <a href="#contact">Contact</a>
            <a href="#Skills">Skills</a>
            <a href="#project">Project</a>
            <a href="#Education">Education</a>

        </div>
        <div class="btn">
            <i class="fas fa-bars menu-btn"></i>
        </div>
    </header>

    </div>
    </body>
  );
}

export default Hieders;
