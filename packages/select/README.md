# `Arterial Select`

Another React Material Select

## Install

```
npm i @arterial/select
```

## Usage

### Basic

The select options must be an array of objects. The objects must have `text` and `value` props.

```jsx
import { Select } from '@arterial/select';
const [value, setValue] = useState('');
const options = [
  { text: 'Apple', value: 'apple' },
  { text: 'Banana', value: 'banana' },
  { text: 'Orange', value: 'orange' }
];
function handleSelect(option) {
  setValue(option.value);
}
<Select
  id="Filled"
  label="Filled"
  onSelect={handleSelect}
  options={options}
  value={value}
/>;
```

### Outlined

```jsx
<Select
  id="Outlined"
  label="Outlined"
  onSelect={handleSelect}
  options={options}
  outlined
  value={value}
/>
```

### Pre-selected option

```jsx
const [value, setValue] = useState('apple'); // pre-selected value
const options = [
  { text: 'Apple', value: 'apple' },
  { text: 'Banana', value: 'banana' },
  { text: 'Orange', value: 'orange' }
];
function handleSelect(option) {
  setValue(option.value);
}
<Select
  id="Filled"
  label="Filled"
  onSelect={handleSelect}
  options={options}
  value={value}
/>;
```

### Required

```jsx
<Select
  id="Filled"
  label="Filled"
  onSelect={handleSelect}
  options={options}
  required
  value={value}
/>
```

### Disabled

```jsx
<Select
  disabled
  id="Filled"
  label="Filled"
  onSelect={handleSelect}
  options={options}
  value={value}
/>
```

### Disabled options

```jsx
const options = [
  { text: 'Apple', value: 'apple', disabled: true }, // Sets option as disabled
  { text: 'Banana', value: 'banana' },
  { text: 'Orange', value: 'orange' }
];
<Select
  id="Filled"
  label="Filled"
  onSelect={handleSelect}
  options={options}
  value={value}
/>;
```

### Enhanced options

The option object in the options array must have `text` and `value` props. It also accepts `disabled`, `graphic`, `icon`, `iconStyle`, and `meta` props. The `graphic` and `meta` props will appear as they do on a menu item element. The `icon` prop is for an icon to appear after the `text`. You can style that icon with the `iconStyle` prop.

You can use `selectedText` to convert an `icon` into text when the option is selected. For example if you have a lock icon in your option, then you can use `selectedText` to make it appear as '(Private)'.

```jsx
const options = [
  {
    text: 'Apple',
    value: 'apple',
    icon: 'lock',
    selectedText: 'Apple (Private)'
  },
  { text: 'Banana', value: 'banana' },
  { text: 'Orange', value: 'orange' }
];
<Select
  id="Filled"
  label="Filled"
  onSelect={handleSelect}
  options={options}
  value={value}
/>;
```

### Select with Helper Text

```jsx
import { Select, HelperText } from '@arterial/select';
<Select
  helperText={<HelperText text="Helper text" />}
  id="Filled"
  label="Filled"
  onSelect={handleSelect}
  options={options}
  value={value}
/>;
```

### Select with Leading Icons

```jsx
<Select
  icon="calendar_today"
  id="Filled"
  label="Filled"
  onSelect={handleSelect}
  options={options}
  value={value}
/>
```

### Select with No Label

```jsx
<Select id="Filled" onSelect={handleSelect} options={options} value={value} />
```

## Props

| Prop Name    | Type                | Description                                                  |
| ------------ | ------------------- | ------------------------------------------------------------ |
| className    | String              | An optional class added to the select element.               |
| disabled     | Boolean             | Disables the select.                                         |
| helperText   | HelperText / Object | Element to appear as helper text of the select element.      |
| icon         | Node                | Element to appear as leading icon of the select element.     |
| id           | String              | Id of the `<input>` element.                                 |
| invalid      | Boolean             | Sets select element as invalid.                              |
| label        | Node                | Label element that appears as the floating label.            |
| labelFloated | Boolean             | Sets floating label to floated.                              |
| menuWidth    | String              | Sets menu width. Defaults to the select elements width.      |
| onSelect     | (option) => void    | Callback for when option is selected.                        |
| options      | Object[]            | Array of objects. Object must have `text` and `value` props. |
| outlined     | Boolean             | Enables outlined variant.                                    |
| placeholder  | string              | Content to be appear when select is empty.                   |
| required     | Boolean             | Sets select element as required.                             |
| style        | Object              | Sets the style of the select element.                        |
| trailingIcon | Node                | Element to appear as trailing icon instead of dropdown icon. |
| value        | String              | Sets the selected text element of the select                 |
