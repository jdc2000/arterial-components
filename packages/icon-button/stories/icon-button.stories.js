import {useState} from 'react';
import {IconButton} from '..';
import ChromeSvg from './ChromeSvg.js';
import FirefoxSvg from './FirefoxSvg.js';

const Meta = {title: 'IconButton'};
export default Meta;

function MyIconButton({image, svg, toggle}) {
  const [on, setOn] = useState(false);
  let myIcon = toggle ? 'favorite_border' : 'favorite';
  let myIconOn = 'favorite';
  if (image) {
    myIcon = (
      <img
        src="https://en.facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png"
        alt="facebook"
      />
    );
    myIconOn = (
      <img
        src="https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png"
        alt="instagram"
      />
    );
  }
  if (svg) {
    myIcon = <FirefoxSvg />;
    myIconOn = <ChromeSvg />;
  }

  return (
    <IconButton
      icon={myIcon}
      iconOn={myIconOn}
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
