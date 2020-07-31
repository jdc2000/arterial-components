# Arterial Text Field

[Another React Material Text Field](https://arterialjs.org/text-fields)

## Installation

```zsh
npm install @arterial/textfield
```

## Usage

### Styles

#### Sass

```scss
@use "@material/floating-label/index.scss" as floating-label;
@use "@material/line-ripple/index.scss" as line-ripple;
@use "@material/notched-outline/index.scss" as notched-outline;
@use "@material/textfield/helper-text/index.scss" as textfield-helper-text;
@use "@material/textfield/character-count/index.scss" as textfield-character-count;
@use "@material/textfield/icon/index.scss" as textfield-icon;
@use "@material/textfield/index.scss" as textfield;
@include floating-label.core-styles;
@include line-ripple.core-styles;
@include notched-outline.core-styles;
@include textfield-helper-text.helper-text-core-styles;
@include textfield-character-count.character-count-core-styles;
@include textfield-icon.icon-core-styles;
@include textfield.core-styles;
```

#### CSS

```jsx
import '@material/textfield/dist/mdc.textfield.css';
```

### JSX

```jsx
import { TextField, HelperText } from '@arterial/textfield';
```

## Filled Text Field

Filled text fields have more visual emphasis than outlined text fields, making them stand out when surrounded by other content and components.

```jsx
function Filled() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      id="filled"
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```

## Outlined Text Field

Outlined text fields have less visual emphasis than filled text fields. When they appear in places like forms, where many text fields are placed together, their reduced emphasis helps simplify the layout.

```jsx
function Outlined() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      id="outlined"
      label="Outlined"
      onChange={(e) => setValue(e.target.value)}
      outlined
      value={value}
    />
  );
}
```

## Other Variants

### Helper Text Object

```jsx
function HelperTextObject() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={{
        persistent: true,
        validationMsg: true,
        text: 'Helper text as object.',
      }}
      id="filled-helper-text-object"
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```

### Helper Text Component

```jsx
function HelperTextComponent() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-helper-text-component"
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```

### Leading Icon

```jsx
function LeadingIcon() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      icon="calendar_today"
      id="filled-leading-icon"
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```

### Trailing Icon

```jsx
function TrailingIcon() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-trailing-icon"
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      trailingIcon="search"
      value={value}
    />
  );
}
```

### Trailing Icon Action

```jsx
function TrailingIconAction() {
  const [value, setValue] = useState('');
  return (
    <TextField
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-trailing-icon"
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      onTrailingIconAction={() => setValue('')}
      trailingIcon="delete"
      value={value}
    />
  );
}
```

### Invalid

```jsx
function Invalid() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-invalid"
      invalid
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```

### Label Floating

```jsx
function LabelFloating() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-label-floating"
      label="Filled"
      labelFloating
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```

### Full Width

```jsx
function FullWidth() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      fullwidth
      id="filled-fullwidth"
      onChange={(e) => setValue(e.target.value)}
      placeholder="Filled"
      value={value}
    />
  );
}
```

### No Label

```jsx
function NoLabel() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-no-label"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```

### Disabled

```jsx
function Disabled() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      disabled
      id="filled-disabled"
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```

### Placeholder

```jsx
function Placeholder() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-placeholder"
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      placeholder="Placeholder"
      value={value}
    />
  );
}
```

### Required

```jsx
function Required() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-required"
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      required
      value={value}
    />
  );
}
```

### Loader

```jsx
function Loader() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        label="Start Loader"
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        }}
        style={{ marginBottom: '8px' }}
      />
      <Textfield
        disabled={loading}
        helperText={
          <HelperText
            persistent
            validationMsg
            text="Helper text as component."
          />
        }
        id="filled-loader"
        label="Filled"
        labelFloating
        onChange={(e) => setValue(e.target.value)}
        placeholder={loading ? 'Loading...' : null}
        trailingIcon={loading ? <CircularProgress small /> : null}
        value={value}
      />
    </>
  );
}
```

### Pre-filled

```jsx
function PreFilled() {
  const [value, setValue] = useState('pre-filled');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-pre-filled"
      label="Filled"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```

### Prefix

```jsx
function Prefix() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-prefix"
      label="Filled"
      labelFloating
      onChange={(e) => setValue(e.target.value)}
      prefix="$"
      value={value}
    />
  );
}
```

### Suffix

```jsx
function Suffix() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-suffix"
      label="Filled"
      labelFloating
      onChange={(e) => setValue(e.target.value)}
      suffix=".00"
      value={value}
    />
  );
}
```

### Character Count

```jsx
function CharacterCount() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="filled-suffix"
      label="Filled"
      maxLength={5}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
```

### Textarea

```jsx
function Textarea() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="textarea"
      onChange={(e) => setValue(e.target.value)}
      textarea
      value={value}
    />
  );
}
```

### Textarea Character Count

```jsx
function TextareaCharacterCount() {
  const [value, setValue] = useState('');
  return (
    <Textfield
      helperText={
        <HelperText persistent validationMsg text="Helper text as component." />
      }
      id="textarea"
      maxLength={5}
      onChange={(e) => setValue(e.target.value)}
      textarea
      value={value}
    />
  );
}
```

## Props

### TextField

| Name                 | Type             | Description                                                           |
| -------------------- | ---------------- | --------------------------------------------------------------------- |
| children             | node             | Elements to be displayed within root element.                         |
| className            | string           | Classes to be applied to the root element.                            |
| disabled             | boolean          | Indicates whether the element is disabled.                            |
| helperText           | node             | Gives context about a select, such as how the selection will be used. |
| icon                 | string \| node   | Icon to render within root element.                                   |
| id                   | string           | Id of the element.                                                    |
| invalid              | boolean          | Indicates the select is invalid.                                      |
| fullwidth            | string           | Sets the text field to full width.                                    |
| label                | string           | Text to be displayed within the root element.                         |
| labelFloating        | boolean          | Indicates whether the elements label is floating.                     |
| maxLength            | string \| number | Maximum length in characters of the value. Enables character counter. |
| noLabel              | boolean          | Enables no label variant.                                             |
| onChange             | function         | Change event handler.                                                 |
| onFocus              | function         | Focus event handler.                                                  |
| onIconAction         | function         | Icon action event handler.                                            |
| onTrailingIconAction | function         | Trailing icon action event handler.                                   |
| outlined             | boolean          | Enables an outlined variant.                                          |
| placeholder          | string           | Text to be displayed in the select when it has no value.              |
| prefix               | string           | Text to be displayed before value.                                    |
| style                | object           | Styles to be applied to the root element.                             |
| suffix               | string           | Text to be displayed after value.                                     |
| textarea             | boolean          | Enables text area variant.                                            |
| trailingIcon         | string \| node   | Icon to render on the right side of the root element.                 |
| type                 | string           | Determines type of text field. Defaults to text.                      |
| value                | string           | Value of input.                                                       |

### HelperText

| Name          | Type    | Description                                        |
| ------------- | ------- | -------------------------------------------------- |
| className     | string  | Classes to be applied to the root element.         |
| id            | string  | Id of the element.                                 |
| persistent    | boolean | Makes the helper text permanently visible.         |
| validationMsg | boolean | Indicates the helper text is a validation message. |
| text          | string  | Text to be displayed.                              |
