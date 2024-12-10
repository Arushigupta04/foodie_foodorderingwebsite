import React from 'react';
import './HomePage.css'; 

import video from './image/video.mp4';
import heartIcon from './image/heart.png';
import eat34 from './image/eat34.png';
import eat37 from './image/eat37.png';
import eat36 from './image/eat36.png';
import tasty1 from './image/tasty1.jpg';
import tasty2 from './image/tasty2.jpg';
import tasty3 from './image/tasty3.jpg';
import tasty4 from './image/tasty4.jpg';
import food1 from './image/food1.jpg';
import food2 from './image/food2.jpg';
import food3 from './image/food3.jpg';
import food4 from './image/food4.jpg';
import food5 from './image/food5.webp';
import food6 from './image/food6.jpg';
import food7 from './image/food7.jpg';
import food8 from './image/food8.jpg';
import food9 from './image/food9.jpg';
import food10 from './image/food10.jpg';
import food11 from './image/food11.jpg';
import food12 from './image/food12.jpg';

function HomePage() {
  
  return (
    <div className='container-main'>
      <div className="video">
        <video height="400px" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="divv2">
        <div className="div2">
          <div className="left">
            <div className="card card1#">
              <div className="heading">
                <h3> <i className='bx bxs-bowl-hot'></i></h3>
                <h2 >2Cr+ Meals</h2>
              </div>
              <div className="text">
                <p>served and we are not stopping!</p>
              </div>
            </div>
            <div className="card card2">
              <div className="heading">
                <h3> <i className='bx bx-store-alt'></i></h3>
                <h2>300+ Stores</h2>
              </div>
              <div className="text">
                <p>In Mumbai,Delhi NCR,Pune etc.</p>
              </div>
            </div>
            <div className="card card3">
              <div className="heading">
                <h3><i className='bx bxs-timer'></i></h3>
                <h2>28 Minutes</h2>
              </div>
              <div className="text">
                <p>Superfast delivery, we reach you before your hunger goes.</p>
              </div>
            </div>
            <div className="card card4">
              <div className="heading">
                <h3><i className='bx bx-star'></i></h3>
                <h2>4.3 <i className='bx bxs-star bx-tada bx-rotate-90' id="star"></i></h2>
              </div>
              <div className="text">
                <p>Rated & 11000+ 5-star reviews that keep us motivated.</p>
              </div>
            </div>
          </div>
          <div className="righttt">
            <h1>India's Largest</h1>
            <h2>Dhakad Meals Brand</h2>
            <p>Irresistible meals in</p>
            <p>All-in-1 meals, Biryanis, Curries, Parathas, Desserts & more delivered piping hot.</p>
          </div>
        </div>
      </div>
      <div className="divvv3">
        <h1>Order Now</h1>
      </div>
      <div className="div3">
        <a href="/menu" className="images image1">
          <img src={food1} height="100%" width="100%" alt="food1" />
        </a>
        <a href="/menu" className="images image2">
          <img src={food2} height="100%" width="100%" alt="food2" />
        </a>
        <a href="/menu" className="images image3">
          <img src={food3} height="100%" width="100%" alt="food3" />
        </a>
        <a href="/menu" className="images image4">
          <img src={food4} height="100%" width="100%" alt="food4" />
        </a>
        <a href="/menu" className="images image5">
          <img src={food5} height="100%" width="100%" alt="food5" />
        </a>
        <a href="/menu" className="images image6">
          <img src={food6} height="100%" width="100%" alt="food6" />
        </a>
        <a href="/menu" className="images image7">
          <img src={food7} height="100%" width="100%" alt="food7" />
        </a>
        <a href="/menu" className="images image8">
          <img src={food8} height="100%" width="100%" alt="food8" />
        </a>
        <a href="/menu" className="images image9">
          <img src={food9} height="100%" width="100%" alt="food9" />
        </a>
        <a href="/menu" className="images image10">
          <img src={food10} height="100%" width="100%" alt="food10" />
        </a>
        <a href="/menu" className="images image11">
          <img src={food11} height="100%" width="100%" alt="food11" />
        </a>
        <a href="/menu" className="images image12">
          <img src={food12} height="100%" width="100%" alt="food12" />
        </a>
      </div>
      <div className="divv4">
        <div className="text">
          <img src={heartIcon} height="60px" width="60px" alt="heart" />
          <div className="font">
            <h1>
              Over <span>20L+<br /> happy customers</span><br />
              and counting...
            </h1>
          </div>
        </div>
        <div className="boxes">
          <div className="box box1">
            <img src={eat34} height="50%" width="100%" alt="eat34" />
            <div className="des">
              <p>There is something about FOODIE meals that make my mouth watery.</p>
              <p>- Rohan Mishra</p>
            </div>
          </div>
          <div className="box box2">
            <img src={eat37} height="50%" width="100%" alt="eat37" />
            <div className="des">
              <p>The food is delicious and delivery is super fast!</p>
              <p>- Nitika Verma</p>
            </div>
          </div>
          <div className="box box3">
            <img src={eat36} height="50%" width="100%" alt="eat36" />
            <div className="des">
              <p>I am a pure Desi food lover. Thanks FOODIE!</p>
              <p>- Anamika Shah</p>
            </div>
          </div>
        </div>
      </div>
      <div className="temp"></div>
      <div className="divv5">
        <div className="sub11">
          <div className="subb">
            <h1>
              When in<br />
              doubt, <br />
              <span>Order Dhakad!</span>
            </h1>
            <p>
              Too lazy to cook or bored of ghar ka khana? Tired of scrolling through restaurants or stuck on a con-call? Whatever the reason, When In Doubt, Order Desi!
            </p>
            <p>
              From Dal Makhni to Amritsari Chole Chawal to Butter Chicken to Gulab Jamun, we have all of your delicious Desi Meals.
            </p>
          </div>
        </div>
        <div className="sub2">
          <div className="subb21">
            <div>
              <img src={tasty1} height="257px" width="200px" alt="tasty1" />
            </div>
            <div>
              <img src={tasty2} height="355px" width="262px" alt="tasty2" />
            </div>
          </div>
          <div className="subb22">
            <div>
              <img src={tasty3} height="166px" width="166px" alt="tasty3" />
            </div>
            <div>
              <img src={tasty4} height="200px" width="200px" alt="tasty4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
