import './App.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GasCarClub() {
  const [isActive, setIsActive] = useState(true);
  const [userName, setUserName] = useState('');

  const { name } = useParams();

  const togglePopup = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {

    // Menambahkan kelas no-scroll pada body saat popup aktif
    if (isActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup effect saat komponen dibersihkan
    return () => document.body.classList.remove('no-scroll');
  }, [isActive]);


  return (
    <>
      <div className={`cover ${isActive ? 'active' : ''}`}>
        <img src='images/logo.svg' alt='Kalyan Maison'/>
        <button onClick={togglePopup}>Open Invitation</button>
      </div>
      <div className='home'>
        <div className='section_1'>
          <img src='images/single_logo.svg' className='logo_single'/>
          <h1>Breakfast Invitation</h1>
          <img src='images/invitation_logo.png' className='invitation_logo'/>
          <div className='invite_layout'>
            <div className='invite_heading'>
              <h3>Dear <font>Gas Car Club</font></h3>
            </div>
            <div className='invite_content'>
              <p>We are thrilled to announce the opening of our new branch at Kalyan Maison! We are excited to welcome you back to indulge in the familiar flavors of our Shisha, now in an upgraded and even more comfortable setting.</p>
              <p>As one of our most cherished patrons, we extend an exclusive invitation for you to be among the first to experience our new lounge before it officially opens to the public.</p>
            </div>
          </div>
        </div>
        <div className='section_2'>
          <img src='images/line.svg' className='line'/>
          <div className='date'>
            <h4>Tuesday</h4>
            <h1>22 December 2024</h1>
            <div className='date_layout'>
              <p>03:00 AM</p>
              <div className='date_line'></div>
              <p>Valid for 2 pax</p>
            </div>
            <div className='date_layout_start'>
              <p>*Table is available until 06:00 am</p>
            </div>
          </div>
        </div>
        <div className='section_3'>
          <div className='map'>
            <h1>Kalyan Maison</h1>
            <p>Jl. Gunawarman No. 16 Jakarta Selatan <br/>12210</p>
            <a href='/'><button>https://kalyan.maison/</button></a>
            <div className='map_layout'>
              <img src='images/map_bg.png' alt='Kalyan Maison Location'/>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2115.5909037706433!2d106.80576848281414!3d-6.236022184974651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1feeaf6e8cb%3A0xc35057763b01ca40!2sKalyan%20Maison%20Gunawarman!5e0!3m2!1sen!2sid!4v1734547226556!5m2!1sen!2sid" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div className='desc_footer'>
            <p>Your support is incredibly important to us, and we're genuinely thrilled to have you with us as we step into this exciting new chapter. We're eagerly looking forward to welcoming you to our lounge and sincerely hope you find our new venue enjoyable. Your unwavering support has been invaluable, and we can't wait to continue this journey together in the future. Thank you for being a part of our story.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default GasCarClub;
