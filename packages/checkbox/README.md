# Arterial Checkbox

[Another React Material Checkbox](https://arterialjs.org/checkboxes)

## Installation

```zsh
npm install @arterial/checkbox
```

## Usage

### Styles

#### Sass

```scss
@use "@material/checkbox/index.scss" as checkbox;
@include checkbox.core-styles;
```

#### CSS

```jsx
import '@material/checkbox/dist/mdc.checkbox.css';
```

### JSX

```jsx
import {Checkbox} from '@arterial/checkbox';
```

## Checked Checkbox

```jsx
function Checked() {
  const [checked, setChecked] = useState(true);
  return (
    <Checkbox
      checked={checked}
      id="checkbox-checked"
      onChange={e => setChecked(e.target.checked)}
    />
  );
}
```

## Unchecked Checkbox

```jsx
function Unchecked() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      id="checkbox-unchecked"
      onChange={e => setChecked(e.target.checked)}
    />
  );
}
```

## Indeterminate Checkbox

```jsx
function Indeterminate() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  return (
    <Checkbox
      checked={checked}
      id="checkbox-indeterminate"
      indeterminate={indeterminate}
      onChange={e => {
        setChecked(e.target.checked);
        setIndeterminate(e.target.indeterminate);
      }}
    />
  );
}
```

## Other Variants

### Label

```jsx
function Label() {
  const [checked, setChecked] = useState(true);
  return (
    <Checkbox
      checked={checked}
      id="checkbox-label"
      label="Checkbox"
      onChange={e => setChecked(e.target.checked)}
    />
  );
}
```

### Align End

```jsx
function AlignEnd() {
  const [checked, setChecked] = useState(true);
  return (
    <Checkbox
      alignEnd
      checked={checked}
      id="checkbox-align-end"
      label="Checkbox"
      onChange={e => setChecked(e.target.checked)}
    />
  );
}
```

### Disabled

```jsx
<Checkbox
  disabled
  id="checkbox-disabled"
  label="Checkbox"
  onChange={() => {}}
/>
```

## Props

### Checkbox

| Name          | Type     | Description                                           |
| ------------- | -------- | ----------------------------------------------------- |
| alignEnd      | boolean  | Aligns root element on the right side of the label.   |
| checked       | boolean  | Indicates whether the element is checked.             |
| className     | string   | Classes to be applied to the root element.            |
| disabled      | boolean  | Indicates whether the element is disabled.            |
| id            | string   | Id of the element.                                    |
| indeterminate | bool     | Indicates whether the checkbox is indeterminate.      |
| label         | string   | Text to be displayed next to the root element.        |
| onChange      | function | Change event handler.                                 |
| ripple        | boolean  | Enables ripple within root element. Defaults to true. |
| style         | object   | Styles to be applied to the root element.             |
| value         | string   | Value of input.                                       |
