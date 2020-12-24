# Arterial Snackbar

[Another React Material Snackbar](https://arterialjs.org/snackbars)

## Installation

```zsh
npm install @arterial/snackbar
```

## Usage

### Styles

#### Sass

```scss
@use "@material/snackbar/index.scss" as snackbar;
@include snackbar.core-styles;
```

#### CSS

```jsx
import '@material/snackbar/dist/mdc.snackbar.css';
```

### JSX

```jsx
import {Snackbar} from '@arterial/snackbar';
```

## Regular Snackbar

```jsx
function Regular() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open" onClick={() => setOpen(true)} unelevated />
      <Snackbar
        label="Can't send photo. Retry in 5 seconds."
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
```

## Other Variants

### Dismiss

```jsx
function Dismiss() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open" onClick={() => setOpen(true)} unelevated />
      <Snackbar
        dismiss
        label="Can't send photo. Retry in 5 seconds."
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
```

### Action and Dismiss

```jsx
function ActionDismiss() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open" onClick={() => setOpen(true)} unelevated />
      <Snackbar
        action="Retry"
        dismiss
        label="Can't send photo. Retry in 5 seconds."
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
```

### Leading

```jsx
function Leading() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open" onClick={() => setOpen(true)} unelevated />
      <Snackbar
        action="Retry"
        dismiss
        label="Can't send photo. Retry in 5 seconds."
        leading
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
```

### Leading

```jsx
function Stacked() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open" onClick={() => setOpen(true)} unelevated />
      <Snackbar
        action="Retry"
        dismiss
        label="Can't send photo. Retry in 5 seconds."
        onClose={() => setOpen(false)}
        open={open}
        stacked
      />
    </>
  );
}
```

## Props

### Snackbar

| Name      | Type     | Description                                                |
| --------- | -------- | ---------------------------------------------------------- |
| action    | string   | Text to be displayed within action button of root element. |
| className | string   | Classes to be applied to the root element.                 |
| dismiss   | boolean  | Enables dismiss icon to be displayed within root element.  |
| label     | string   | Text to be displayed within the root element.              |
| leading   | boolean  | Enables a leading variant.                                 |
| onClose   | function | Close event handler.                                       |
| open      | boolean  | Indicates whether the element is open.                     |
| stacked   | boolean  | Enables a stacked variant.                                 |
