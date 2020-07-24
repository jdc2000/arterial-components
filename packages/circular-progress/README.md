# Arterial Circular Progress

[Another React Material Circular Progress](https://arterialjs.org/circular-progress)

## Installation

```zsh
npm install @arterial/circular-progress
```

## Usage

### Styles

#### Sass

```scss
@use "@material/circular-progress/index.scss" as circular-progress;
@include circular-progress.core-styles;
```

#### CSS

```jsx
import '@material/circular-progress/dist/mdc.circular-progress.css';
```

### JSX

```jsx
import { CircularProgress } from '@arterial/circular-progress';
```

## Determinate Progress

Determinate circular indicators fill the invisible, circular track with color, as the indicator moves from 0 to 360 degrees.

```jsx
<CircularProgress progress={0.25} />
<CircularProgress progress={0.5} />
<CircularProgress progress={0.75} />
<CircularProgress progress={1} />
```

## Indeterminate Progress

Indeterminate circular indicators grow and shrink in size while moving along the invisible track.

```jsx
<CircularProgress />
<CircularProgress medium />
<CircularProgress small />
```

## Other Variants

### Four Colors

```jsx
<CircularProgress fourColors />
<CircularProgress fourColors medium />
<CircularProgress fourColors small />
```

### Custom Four Colors

```jsx
// scss
// @use '@material/circular-progress/mixins' as circular-progress-mixins;
// $colors: (purple, pink, teal, gray);
// .mdc-circular-progress {
//   @include circular-progress-mixins.indeterminate-colors($colors);
// }

// jsx
<CircularProgress fourColors />
<CircularProgress fourColors medium />
<CircularProgress fourColors small />
```

### Buttons

```jsx
import { Button } from '@arterial/button'

<Button
  icon={<CircularProgress small />}
  label="Text"
/>
<Button
  icon={<CircularProgress small />}
  outlined
  label="Outlined"
/>
<Button
  icon={<CircularProgress small />}
  unelevated
  label="Unelevated"
/>
<Button
  icon={<CircularProgress small />}
  raised
  label="Raised"
/>
```

### Chips

```jsx
import { Chip, ChipSet } from '@arterial/chip';

<ChipSet choice>
  <Chip icon={<CircularProgress small />} text="Alfa" />
  <Chip icon={<CircularProgress small />} selected text="Bravo" />
</ChipSet>;
```

## Props

### CircularProgress

| Name       | Type    | Description                                                       |
| ---------- | ------- | ----------------------------------------------------------------- |
| children   | node    | Elements to be displayed within root element.                     |
| className  | string  | Classes to be applied to the root element.                        |
| closed     | boolean | Hides the circular progress indicator.                            |
| fourColors | boolean | Enables a four colors variant.                                    |
| label      | boolean | Sets the aria label of the element. Defaults to Progress Bar.     |
| medium     | boolean | Sets the stroke and container sizes for the medium-sized variant. |
| progress   | number  | Sets the progress bar length.                                     |
| small      | boolean | Sets the stroke and container sizes for the small variant.        |
