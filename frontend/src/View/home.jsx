import React, { useState ,useEffect } from "react";
function Home() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    useEffect(() => {
      const circles = document.querySelectorAll('.circle');
  
      circles.forEach(circle => {
        const randomTop = Math.floor(Math.random() * window.innerHeight);
        const randomLeft = Math.floor(Math.random() * window.innerWidth);
        
        circle.style.top = `${randomTop}px`;
        circle.style.left = `${randomLeft}px`;
      });
  
      // Clean-up function
      return () => {
        circles.forEach(circle => {
          circle.style.top = '';
          circle.style.left = '';
        });
      };
    }, []);
    useEffect(() => {
        document.body.classList.add('loginPage');
    
        // Clean-up function
        return () => {
          document.body.classList.remove('loginPage');
        };
      }, []);
  return (
    <html className='loginss'>
         <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"></link>
      <body className="login">
        <div class="containerss">
          <div class="light-effect"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        

        
      </body>
    </html>
  );
}
export default Home;
