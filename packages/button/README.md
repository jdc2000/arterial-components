# Arterial Button

[Another React Material Button](https://arterialjs.org/buttons)

## Installation

```zsh
npm install @arterial/button
```

## Usage

### Styles

#### Sass

```scss
@use '@material/button/index.scss' as button;
@include button.core-styles;
```

#### CSS

```jsx
import '@material/button/dist/mdc.button.css';
```

### JSX

```jsx
import { Button } from '@arterial/button';
```

## Text Button

Text buttons are typically used for less-pronounced actions, including those located:

- In dialogs
- In cards

```jsx
<Button label="Text" />
```

## Outlined Button

Outlined buttons are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.

```jsx
<Button label="Outlined" outlined />
```

## Contained Button

Contained buttons are high-emphasis, distinguished by their use of elevation and fill. They contain actions that are primary to your app.

```jsx
<Button label="Unelevated" unelevated />
<Button label="Raised" raised />
```

## Other Variants

### Icon

Buttons can place icons next to text labels to both clarify an action and call attention to a button.

```jsx
<Button label="Text" icon="favorite" />
<Button label="Outlined" outlined icon="favorite" />
<Button label="Unelevated" unelevated icon="favorite" />
<Button label="Raised" raised icon="favorite" />
```

### Trailing Icon

Certain icons make more sense to appear after the button's text label rather than before.

```jsx
<Button label="Text" trailingIcon="favorite" />
<Button label="Outlined" outlined trailingIcon="favorite" />
<Button label="Unelevated" unelevated trailingIcon="favorite" />
<Button label="Raised" raised trailingIcon="favorite" />
```

### Disabled

Disabled buttons cannot be interacted with and have no visual interaction effect.

```jsx
<Button label="Text" disabled />
<Button label="Outlined" outlined disabled />
<Button label="Unelevated" unelevated disabled />
<Button label="Raised" raised disabled />
```

### Loader

```jsx
import { CircularProgress } from '@arterial/circular-progress';

<Button label="Text" icon={<CircularProgress small />} />
<Button label="Outlined" outlined icon={<CircularProgress small />} />
<Button label="Unelevated" unelevated icon={<CircularProgress small />} />
<Button label="Raised" raised icon={<CircularProgress small />} />
```

### Anchor

```jsx
<Button label="Text" tag="a" href="/" />
<Button label="Outlined" outlined tag="a" href="/" />
<Button label="Unelevated" unelevated tag="a" href="/" />
<Button label="Raised" raised tag="a" href="/" />
```

### React Router Link

```jsx
import { Link } from 'react-router-dom';

<Button label="Text" tag={Link} to="/" />
<Button label="Outlined" outlined tag={Link} to="/" />
<Button label="Unelevated" unelevated tag={Link} to="/" />
<Button label="Raised" raised tag={Link} to="/" />
```

## Props

### Button

| Name         | Type             | Description                                                     |
| ------------ | ---------------- | --------------------------------------------------------------- |
| className    | string           | Classes to be applied to the root element.                      |
| icon         | string \| node   | Icon to render within root element.                             |
| label        | string           | Text to be displayed within the root element.                   |
| outlined     | boolean          | Enables an outlined variant.                                    |
| raised       | boolean          | Enables a raised variant.                                       |
| ripple       | boolean          | Enables ripple within root element. Defaults to true.           |
| style        | object           | Styles to be applied to the root element.                       |
| tag          | string \| object | HTML tag to be applied to the root element. Defaults to button. |
| trailingIcon | string \| node   | Icon to render on the right side of the root element.           |
| unelevated   | boolean          | Enables an unelevated variant.                                  |
