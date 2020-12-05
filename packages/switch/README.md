# Arterial Switch

[Another React Material Switch](https://arterialjs.org/switches)

## Installation

```zsh
npm install @arterial/switch
```

## Usage

### Styles

#### Sass

```scss
@use "@material/switch/index.scss" as switch;
@include switch.core-styles;
```

#### CSS

```jsx
import '@material/switch/dist/mdc.switch.css';
```

### JSX

```jsx
import {Switch} from '@arterial/switch';
```

## Checked Switch

```jsx
function Checked() {
  const [checked, setChecked] = useState(true);
  return (
    <Switch
      checked={checked}
      id="switch-checked"
      onChange={() => setChecked(!checked)}
    />
  );
}
```

## Unchecked Switch

```jsx
function Unchecked() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      id="switch-unchecked"
      onChange={() => setChecked(!checked)}
    />
  );
}
```

## Other Variants

### Label

```jsx
function Label() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      id="switch-label"
      label="Switch"
      onChange={() => setChecked(!checked)}
    />
  );
}
```

### Align End

```jsx
function AlignEnd() {
  const [checked, setChecked] = useState(true);
  return (
    <Switch
      alignEnd
      checked={checked}
      id="switch-align-end"
      label="Switch"
      onChange={() => setChecked(!checked)}
    />
  );
}
```

### Disabled

```jsx
function Disabled() {
  const [checked, setChecked] = useState(true);
  return (
    <Switch
      checked={checked}
      disabled
      id="switch-disabled"
      label="Switch"
      onChange={() => setChecked(!checked)}
    />
  );
}
```

## Props

### Switch

| Name      | Type     | Description                                         |
| --------- | -------- | --------------------------------------------------- |
| alignEnd  | boolean  | Aligns root element on the right side of the label. |
| checked   | boolean  | Indicates whether the element is checked.           |
| className | string   | Classes to be applied to the root element.          |
| disabled  | boolean  | Indicates whether the element is disabled.          |
| id        | string   | Id of the element.                                  |
| label     | string   | Text to be displayed next to the root element.      |
| onChange  | function | Change event handler.                               |
| style     | object   | Styles to be applied to the root element.           |
| value     | string   | Value of input.                                     |
