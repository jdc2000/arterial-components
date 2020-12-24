# Arterial Select

[Another React Material Select](https://arterialjs.org/selects)

## Installation

```zsh
npm install @arterial/select
```

## Usage

### Styles

#### Sass

```scss
@use "@material/floating-label/index.scss" as floating-label;
@use "@material/line-ripple/index.scss" as line-ripple;
@use "@material/notched-outline/index.scss" as notched-outline;
@use "@material/select/select.scss" as select;
@use "@material/select/select-helper-text.scss" as select-helper-text;
@use "@material/select/select-icon.scss" as select-icon;
@include floating-label.core-styles;
@include line-ripple.core-styles;
@include notched-outline.core-styles;
@include select-helper-text.helper-text-core-styles;
@include select-icon.icon-core-styles;
@include select.core-styles;
```

#### CSS

```jsx
import '@material/select/dist/mdc.select.css';
```

### JSX

```jsx
import {Select} from '@arterial/select';
```

## Filled Select

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function Filled() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="Filled"
      label="Filled"
      onSelect={handleSelect}
      options={OPTIONS}
      value={value}
    />
  );
}
```

## Outlined Select

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function Outlined() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="Outlined"
      label="Outlined"
      onSelect={handleSelect}
      options={OPTIONS}
      outlined
      value={value}
    />
  );
}
```

## Other Variants

### Leading Icon

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function LeadingIcon() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      icon="restaurant_menu"
      id="filled-leading-icon"
      label="Filled"
      onSelect={handleSelect}
      options={OPTIONS}
      value={value}
    />
  );
}
```

### Invalid

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function Invalid() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="filled-invalid"
      invalid
      label="Filled"
      onSelect={handleSelect}
      options={OPTIONS}
      value={value}
    />
  );
}
```

### Label Floating

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function LabelFloating() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="filled-label-floating"
      label="Filled"
      labelFloating
      onSelect={handleSelect}
      options={OPTIONS}
      value={value}
    />
  );
}
```

### Menu Width

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function MenuWidth() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="filled-menu-width"
      label="Filled"
      menuWidth="100%"
      onSelect={handleSelect}
      options={OPTIONS}
      value={value}
    />
  );
}
```

### No Label

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function NoLabel() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="filled-no-label"
      onSelect={handleSelect}
      options={OPTIONS}
      value={value}
    />
  );
}
```

### Placeholder

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function Placeholder() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="filled-placeholder"
      label="Filled"
      onSelect={handleSelect}
      options={OPTIONS}
      placeholder="Placeholder"
      value={value}
    />
  );
}
```

### Required

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function Required() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="filled-required"
      label="Filled"
      onSelect={handleSelect}
      options={OPTIONS}
      required
      value={value}
    />
  );
}
```

### Loader

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function Loader() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  function handleSelect(option) {
    setValue(option.value);
  }
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
        style={{marginBottom: '8px'}}
      />
      <Select
        disabled={loading}
        id="filled-loader"
        label="Filled"
        labelFloating
        onSelect={handleSelect}
        options={OPTIONS}
        placeholder={loading ? 'Loading...' : null}
        trailingIcon={loading ? <CircularProgress small /> : null}
        value={value}
      />
    </>
  );
}
```

### Disabled

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function Disabled() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      disabled
      id="filled-disabled"
      label="Filled"
      onSelect={handleSelect}
      options={OPTIONS}
      value={value}
    />
  );
}
```

### Helper Text Object

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function HelperTextObject() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      helperText={{
        validationMsg: true,
        validationMsgPersistent: true,
        text: 'Helper text as object.',
      }}
      id="filled-helper-text-object"
      label="Filled"
      onSelect={handleSelect}
      options={OPTIONS}
      value={value}
    />
  );
}
```

### Helper Text Component

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function HelperTextComponent() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      helperText={
        <HelperText
          validationMsgPersistent
          validationMsg
          text="Helper text as component."
        />
      }
      id="filled-helper-text-component"
      label="Filled"
      onSelect={handleSelect}
      options={OPTIONS}
      value={value}
    />
  );
}
```

### Pre-selected Option

```jsx
const OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function PreSelected() {
  const [value, setValue] = useState('banana');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="filled-pre-selected"
      label="Filled"
      onSelect={handleSelect}
      options={OPTIONS}
      value={value}
    />
  );
}
```

### Disabled Options

```jsx
const DISABLED_OPTIONS = [
  {text: 'Apple', value: 'apple', disabled: true},
  {text: 'Banana', value: 'banana'},
  {text: 'Orange', value: 'orange'},
];
function DisabledOptions() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="filled-disabled-options"
      label="Filled"
      onSelect={handleSelect}
      options={DISABLED_OPTIONS}
      value={value}
    />
  );
}
```

### Enhanced Options

The option object in the options array must have text and value props. The option object also accepts disabled, graphic, node, and meta props. The graphic and meta props will appear as they do on a list item component. The node prop is for any element/elements to be displayed to right of list item text.
You can use selectedText to convert an node that displays an icon into text when the option is selected. For example if you have a lock icon in your option, then you can use selectedText to make it appear as '(Private)'.

```jsx
const ENHANCED_OPTIONS = [
  {text: 'Apple', value: 'apple'},
  {text: 'Banana', value: 'banana'},
  {
    text: 'Orange',
    value: 'orange',
    node: (
      <Icon
        icon="favorite"
        style={{color: 'rgba(0,0,0,.38)', marginLeft: '8px'}}
      />
    ),
    selectedText: 'Orange (Favorite)',
  },
];
function EnhancedOptions() {
  const [value, setValue] = useState('');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <Select
      id="filled-enhanced-options"
      label="Filled"
      onSelect={handleSelect}
      options={ENHANCED_OPTIONS}
      value={value}
    />
  );
}
```

## Props

### Select

| Name          | Type           | Description                                                           |
| ------------- | -------------- | --------------------------------------------------------------------- |
| children      | node           | Elements to be displayed within root element.                         |
| className     | string         | Classes to be applied to the root element.                            |
| disabled      | boolean        | Indicates whether the element is disabled.                            |
| helperText    | node           | Gives context about a select, such as how the selection will be used. |
| icon          | string \| node | Icon to render within root element.                                   |
| id            | string         | Id of the element.                                                    |
| invalid       | boolean        | Indicates the select is invalid.                                      |
| label         | string         | Text to be displayed within the root element.                         |
| labelFloating | boolean        | Inidcates whether the elements label is floating.                     |
| menuWidth     | string         | Sets the menu width of the select.                                    |
| onSelect      | function       | Select event handler.                                                 |
| options       | object\*       | Items to be displayed as a menu list.                                 |
| outlined      | boolean        | Enables an outlined variant.                                          |
| placeholder   | string         | Text to be displayed in the select when it has no value set.          |
| required      | boolean        | Indicates whether the select is required.                             |
| style         | object         | Styles to be applied to the root element.                             |
| trailingIcon  | string \| node | Icon to render on the right side of the root element.                 |
| value         | string         | Value of input.                                                       |

> NOTE: Options shape is { disabled: boolean, graphic: node, meta: node, node: node, secondaryText: string, selectedText: string, text: string, value: string }

### HelperText

| Name                    | Type    | Description                                        |
| ----------------------- | ------- | -------------------------------------------------- |
| className               | string  | Classes to be applied to the root element.         |
| id                      | string  | Id of the element.                                 |
| validationMsg           | boolean | Indicates the helper text is a validation message. |
| validationMsgPersistent | boolean | Makes the helper text permanently visible.         |
| text                    | string  | Text to be displayed.                              |
