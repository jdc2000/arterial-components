import React, { useState } from 'react';
import { IconButton } from '..';
import ChromeSvg from './ChromeSvg.js';
import FirefoxSvg from './FirefoxSvg.js';

export default { title: 'IconButton' };

function MyIconButton({ image, svg, toggle }) {
  const [on, setOn] = useState(false);
  let myIcon = toggle ? 'favorite_border' : 'favorite';
  let myOnIcon = 'favorite';
  if (image) {
    myIcon = (
      <img
        src="https://en.facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png"
        alt="facebook"
      />
    );
    myOnIcon = (
      <img
        src="https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png"
        alt="instagram"
      />
    );
  }
  if (svg) {
    myIcon = <FirefoxSvg />;
    myOnIcon = <ChromeSvg />;
  }

  return (
    <IconButton
      icon={myIcon}
      onIcon={myOnIcon}
      on={on}
      onClick={() => {
        if (toggle) {
          setOn(!on);
        }
      }}
    />
  );
}

export const Basic = () => <MyIconButton />;

export const Image = () => <MyIconButton image />;

export const Svg = () => <MyIconButton svg />;

export const Toggle = () => <MyIconButton toggle />;

export const ToggleImage = () => <MyIconButton image toggle />;

export const ToggleSvg = () => <MyIconButton svg toggle />;
