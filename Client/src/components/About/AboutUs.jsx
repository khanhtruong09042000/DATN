import React from 'react';
import './aboutUs.css'

const AboutUs = () => {
  return <div className='about'>
      <div className="label">
          About Us
      </div>
      <div className="container">
          <div className="imgContainer">
          <img src="https://images.pexels.com/photos/11402832/pexels-photo-11402832.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" className='ima' />
          <div className="desc">Trương Văn Khánh</div>
          <div className="desc">Lớp : Điện tử-07 K63</div>
          </div>
          <div className="imgContainer">
          <img src="https://images.pexels.com/photos/15031717/pexels-photo-15031717.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"  className='ima'/>
          <div className="desc">Trần Tuấn Anh</div>
          <div className="desc">Lớp : Điện tử-08 K63</div>
          </div>
      </div>
  </div>;
};

export default AboutUs;
