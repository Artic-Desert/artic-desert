// import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import lottie from 'lottie-web';
import mask from '../../assets/mask.svg';
import './Welcome.css';

export const Welcome: React.FC = () => {
  const client_id = '71c6863d3d338f86fe07';

  const container: any = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../assets/lottie/teamlottie.json'),
    });
  }, []);

  return (
    <div className="welcome-wrapper">
      <div className="company-name">
        <h1 className="top"> &lt;Arctic </h1>
        <h1 className="bot"> Desert/&gt; </h1>
      </div>
      {/* <div className="main-title">
        <h1>home of collaborative development.</h1>
      </div> */}
      <div className="lottie-container" ref={container}></div>
      <button className="login-button">
        <a
          className="a-tag"
          href={`https://github.com/login/oauth/authorize?client_id=${client_id}`}>
          <span>Login with GitHub</span>
        </a>
        <AiOutlineGithub fontSize="45px" />
      </button>
      {/* <img className="mask" src={mask} alt="" /> */}
    </div>
  );
};
