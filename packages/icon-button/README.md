# Arterial Icon Button

[Another React Material Icon Button](https://arterialjs.org/icon-buttons)

## Installation

```zsh
npm install @arterial/icon-button
```

## Usage

### Styles

#### Sass

```scss
@use "@material/icon-button/index.scss" as icon-button;
@include icon-button.core-styles;
```

#### CSS

```jsx
import '@material/icon-button/dist/mdc.icon-button.css';
```

### JSX

```jsx
import {IconButton} from '@arterial/icon-button';
```

## Regular Icon Button

```jsx
<IconButton icon="favorite" />
```

## Toggle Button

```jsx
function Toggle() {
  const [on, setOn] = useState(false);
  return (
    <IconButton
      icon="favorite_border"
      iconOn="favorite"
      on={on}
      onClick={() => setOn(!on)}
    />
  );
}
```

## Other Variants

### Image

Icon buttons can be used with img tags.

```jsx
<IconButton
  icon={
    <img
      src="https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png"
      alt="instagram"
    />
  }
/>
```

### Toggle Image

Icon button toggles can be used with img tags.

```jsx
function ToggleImage() {
  const [on, setOn] = useState(false);
  return (
    <IconButton
      icon={
        <img
          src="https://en.facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png"
          alt="facebook"
        />
      }
      iconOn={
        <img
          src="https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png"
          alt="instagram"
        />
      }
      on={on}
      onClick={() => setOn(!on)}
    />
  );
}
```

### SVG

Icon buttons can be used with svgs.

```jsx
<IconButton icon={<FirefoxSvg />} />
```

### Toggle SVG

Icon button toggles can be used with svgs.

```jsx
function ToggleSvg() {
  const [on, setOn] = useState(false);
  return (
    <IconButton
      icon={<ChromeSvg />}
      iconOn={<FirefoxSvg />}
      on={on}
      onClick={() => setOn(!on)}
    />
  );
}
```

## Props

### IconButton

| Name      | Type             | Description                                                        |
| --------- | ---------------- | ------------------------------------------------------------------ |
| className | string           | Classes to be applied to the root element.                         |
| icon      | string \| node   | Icon to render within root element. Displays when toggle is "off". |
| iconOn    | string \| node   | Icon to render within root element. Displays when toggle is "on".  |
| label     | string           | Sets the aria-label on root element.                               |
| on        | boolean          | Indicates the toggle is on.                                        |
| style     | object           | Styles to be applied to the root element.                          |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to button.    |
