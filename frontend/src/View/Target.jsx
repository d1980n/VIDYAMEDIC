import React, { useState, useEffect, useRef } from 'react';
const Target = () => {
  const [currentSound, setCurrentSound] = useState(null);
  const [previousSound, setPreviousSound] = useState(null);
  // const [nextQueue, setNextQueue] = useState([]); // State untuk menyimpan antrian selanjutnya
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);

  const fetchSoundFromTarget = () => {
    fetch('http://localhost:3000/api/target') // ganti URL dengan URL API kamu
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.id) {
          setCurrentSound(data);
          // Menyimpan data antrian selanjutnya (misalnya 3 item)
          // setNextQueue(data.nomorAntrian || []); // Pastikan API mengembalikan antrian selanjutnya
        } else {
          console.log("Tidak ada ID suara saat ini.");
        }
      })
      .catch(error => {
        console.error('Error fetching sound:', error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSoundFromTarget();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSound && currentSound.sound !== previousSound) {
      setPreviousSound(currentSound.sound);

      setIsIntroPlaying(true);
      const introAudio = new Audio('source/audio/intro.mp3');
      introAudio.play().then(() => {
        introAudio.onended = () => {
          setIsIntroPlaying(false);
          const mainAudio = new Audio(`source/audio/${currentSound.sound}`);
          mainAudio.play().catch(error => console.error('Error playing audio:', error));
        };
      }).catch(error => {
        console.error('Error playing intro audio:', error);
        const mainAudio = new Audio(`source/audio/${currentSound.sound}`);
        mainAudio.play().catch(error => console.error('Error playing audio:', error));
      });
    }
  }, [currentSound]);




  
  

  return (
    <div className='container-target'>
      <div className="left-side">
        <div className="card-target">
          {currentSound ? (
            <div>
              <h1 className='title-target'>Antrian Nomor :</h1>
              <p className='number-target'>{currentSound.id}</p>
            </div>
          ) : (
            <p className='waiting-target'>Menunggu suara yang dikirim...</p>
          )}
        </div>
        {/* <div className="next-queue">
          <h2 className='next-title'>Antrian Selanjutnya:</h2>
          {nextQueue.length > 0 ? (
            <ul className='queue-list'>
              {nextQueue.map((item, index) => (
                <li key={index} className='queue-item'>Nomor Antrian: {item.id}</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada antrian selanjutnya.</p>
          )}
        </div> */}
      </div>
      <div className="right-side">
        <iframe 
          width="90%" 
          height="50%" 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
          
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
    </div>
  );
};

export default Target;
