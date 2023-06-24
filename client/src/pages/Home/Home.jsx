import React from 'react';
import AboutUs from '../../components/About/AboutUs';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar_L';
import Slide from '../../components/Slide/Slide';

const Home = () => {
  return <div>
      <Navbar/>
      <Slide/>
      <AboutUs/>
      <Footer/>
  </div>;
};

export default Home;
