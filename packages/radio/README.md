# Arterial Radio

[Another React Material Radio](https://arterialjs.org/radios)

## Installation

```zsh
npm install @arterial/radio
```

## Usage

### Styles

#### Sass

```scss
@use "@material/radio/radio.scss" as radio;
@include radio.core-styles;
```

#### CSS

```jsx
import '@material/radio/dist/mdc.radio.css';
```

### JSX

```jsx
import {Radio} from '@arterial/radio';
```

## Basic Radio

```jsx
function Basic() {
  const [value, setValue] = useState('yes');
  return (
    <>
      <Radio
        checked={value === 'yes'}
        id="radio-yes"
        name="radios"
        value="yes"
        onChange={e => setValue(e.target.value)}
      />
      <Radio
        checked={value === 'no'}
        id="radio-no"
        name="radios"
        value="no"
        onChange={e => setValue(e.target.value)}
      />
    </>
  );
}
```

## Other Variants

### Label

```jsx
function Label() {
  const [value, setValue] = useState('yes');
  return (
    <>
      <Radio
        checked={value === 'yes'}
        id="radio-label-yes"
        label="Yes"
        name="radios-label"
        value="yes"
        onChange={e => setValue(e.target.value)}
      />
      <Radio
        checked={value === 'no'}
        id="radio-label-no"
        label="No"
        name="radios-label"
        value="no"
        onChange={e => setValue(e.target.value)}
      />
    </>
  );
}
```

### Align End

```jsx
function AlignEnd() {
  const [value, setValue] = useState('yes');
  return (
    <>
      <Radio
        alignEnd
        checked={value === 'yes'}
        id="radio-align-end-yes"
        label="Yes"
        name="radios-align-end"
        value="yes"
        onChange={e => setValue(e.target.value)}
      />
      <Radio
        alignEnd
        checked={value === 'no'}
        id="radio-align-end-no"
        label="No"
        name="radios-align-end"
        value="no"
        onChange={e => setValue(e.target.value)}
      />
    </>
  );
}
```

### Disabled

```jsx
function Disabled() {
  const [value, setValue] = useState('yes');
  return (
    <>
      <Radio
        checked={value === 'yes'}
        disabled
        id="radio-disabled-yes"
        label="Yes"
        name="radios-disabled"
        value="yes"
        onChange={e => setValue(e.target.value)}
      />
      <Radio
        checked={value === 'no'}
        disabled
        id="radio-disabled-no"
        label="No"
        name="radios-disabled"
        value="no"
        onChange={e => setValue(e.target.value)}
      />
    </>
  );
}
```

## Props

### Radio

| Name      | Type     | Description                                           |
| --------- | -------- | ----------------------------------------------------- |
| alignEnd  | boolean  | Aligns root element on the right side of the label.   |
| checked   | boolean  | Indicates whether the element is checked.             |
| className | string   | Classes to be applied to the root element.            |
| disabled  | boolean  | Indicates whether the element is disabled.            |
| id        | string   | Id of the element.                                    |
| label     | string   | Text to be displayed next to the root element.        |
| onChange  | function | Change event handler.                                 |
| ripple    | boolean  | Enables ripple within root element. Defaults to true. |
| style     | object   | Styles to be applied to the root element.             |
| value     | string   | Value of input.                                       |
