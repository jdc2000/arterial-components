# Arterial List

[Another React Material List](https://arterialjs.org/lists)

## Installation

```zsh
npm install @arterial/list
```

## Usage

### Styles

#### Sass

```scss
@use "@material/list/index.scss" as list;
@include list.core-styles;
```

#### CSS

```jsx
import '@material/list/dist/mdc.list.css';
```

### JSX

```jsx
import { List, ListItem, ListItemText, ... } from '@arterial/list';
```

## Single-line List

Single-line list items contain a maximum of one line of text.

```jsx
<List>
  <ListItem>
    <ListItemText>Single-line item</ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>Single-line item</ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>Single-line item</ListItemText>
  </ListItem>
</List>
```

## Two-line List

Two-line list items contain a maximum of two lines of text.

```jsx
<List twoLine>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Two-line item</ListItemPrimaryText>
      <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Two-line item</ListItemPrimaryText>
      <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Two-line item</ListItemPrimaryText>
      <ListItemSecondaryText>Secondary text</ListItemSecondaryText
    </ListItemText>
  </ListItem>
</List>
```

## Other Variants

### Dense

```jsx
<List dense>
  <ListItem>
    <ListItemText>Dense item</ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>Dense item</ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>Dense item</ListItemText>
  </ListItem>
</List>
```

### Non-interactive

```jsx
<List nonInteractive>
  <ListItem>
    <ListItemText>Non-interactive item</ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>Non-interactive item</ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>Non-interactive item</ListItemText>
  </ListItem>
</List>
```

### Avatar

```jsx
import Avatar from 'avatar.png';

<List avatarList>
  <ListItem>
    <ListItemGraphic graphic={<img src={Avatar} alt="avatar" />} />
    <ListItemText>Avatar item</ListItemText>
  </ListItem>
  <ListItem>
    <ListItemGraphic graphic={<img src={Avatar} alt="avatar" />} />
    <ListItemText>Avatar item</ListItemText>
  </ListItem>
  <ListItem>
    <ListItemGraphic graphic={<img src={Avatar} alt="avatar" />} />
    <ListItemText>Avatar item</ListItemText>
  </ListItem>
</List>;
```

### Activated

```jsx
const ITEMS = ['inbox', 'star', 'send', 'drafts'];
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.substring(1);
}
function Activated() {
  const [activated, setActivated] = useState('star');
  return (
    <List>
      {ITEMS.map(item => (
        <ListItem
          activated={activated === item}
          id={item}
          key={item}
          onClick={() => setActivated(item)}
        >
          {capitalize(item)}
        </ListItem>
      ))}
    </List>
  );
}
```

### Selected

```jsx
const ITEMS = ['inbox', 'star', 'send', 'drafts'];
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.substring(1);
}
function Selected() {
  const [selected, setSelected] = useState('star');
  return (
    <List>
      {ITEMS.map(item => (
        <ListItem
          id={item}
          key={item}
          onClick={() => setSelected(item)}
          selected={selected === item}
        >
          {capitalize(item)}
        </ListItem>
      ))}
    </List>
  );
}
```

### Graphic

```jsx
import {Checkbox} from '@arterial/checkbox';
import {Radio} from '@arterial/radio';

<List tag="div">
  <ListItem tag="div">
    <ListItemGraphic graphic="wifi" />
    <ListItemText>Graphic as icon</ListItemText>
  </ListItem>
  <ListItem tag="label">
    <ListItemGraphic
      graphic={<Checkbox id="graphic-check" onChange={() => {}} />}
    />
    <ListItemText>Graphic with checkbox</ListItemText>
  </ListItem>
  <ListItem tag="label">
    <ListItemGraphic
      graphic={<Radio id="graphic-radio" onChange={() => {}} />}
    />
    <ListItemText>Graphic with radio</ListItemText>
  </ListItem>
</List>;
```

### Metadata

```jsx
import {Checkbox} from '@arterial/checkbox';
import {Radio} from '@arterial/radio';

<List tag="div">
  <ListItem tag="div">
    <ListItemText>Meta as text</ListItemText>
    <ListItemMeta meta="info" />
  </ListItem>
  <ListItem tag="div">
    <ListItemText>Meta with icon component</ListItemText>
    <ListItemMeta meta={<Icon icon="info" />} />
  </ListItem>
  <ListItem tag="div">
    <ListItemText>Meta with two icon components</ListItemText>
    <ListItemMeta
      meta={
        <>
          <Icon icon="info" />
          <Icon icon="info" />
        </>
      }
    />
  </ListItem>
  <ListItem tag="div">
    <ListItemText>Meta with icon button</ListItemText>
    <ListItemMeta
      meta={<IconButton icon="more_vert" style={{marginRight: '-12px'}} />}
    />
  </ListItem>
  <ListItem tag="label">
    <ListItemText>Meta with checkbox</ListItemText>
    <ListItemMeta
      meta={
        <Checkbox
          id="meta-checkbox"
          onChange={() => {}}
          style={{marginRight: '-8px'}}
        />
      }
    />
  </ListItem>
  <ListItem tag="label">
    <ListItemText>Meta with radio</ListItemText>
    <ListItemMeta
      meta={<Radio id="meta-radio" onChange={() => {}} />}
      style={{marginRight: '-8px'}}
    />
  </ListItem>
</List>;
```

### Graphic and Metadata

```jsx
<List twoLine>
  <ListItem>
    <ListItemGraphic graphic="folder" />
    <ListItemText>
      <ListItemPrimaryText>Two-line item</ListItemPrimaryText>
      <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
    </ListItemText>
    <ListItemMeta meta="info" />
  </ListItem>
  <ListItem>
    <ListItemGraphic graphic="folder" />
    <ListItemText>
      <ListItemPrimaryText>Two-line item</ListItemPrimaryText>
      <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
    </ListItemText>
    <ListItemMeta meta="info" />
  </ListItem>
  <ListDivider />
  <ListItem>
    <ListItemGraphic graphic="folder" />
    <ListItemText>
      <ListItemPrimaryText>Two-line item</ListItemPrimaryText>
      <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
    </ListItemText>
    <ListItemMeta meta="info" />
  </ListItem>
</List>
```

### Grouped

```jsx
<ListGroup>
  <ListGroupSubheader>List 1</ListGroupSubheader>
  <List>
    <ListItem>
      <ListItemText>Line item</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Line item</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Line item</ListItemText>
    </ListItem>
  </List>
  <ListGroupSubheader>List 2</ListGroupSubheader>
  <List>
    <ListItem>
      <ListItemText>Line item</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Line item</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Line item</ListItemText>
    </ListItem>
  </List>
</ListGroup>
```

## Props

### List

| Name           | Type             | Description                                                 |
| -------------- | ---------------- | ----------------------------------------------------------- |
| avatarList     | boolean          | Enables an avatar list variant.                             |
| children       | node             | Elements to be displayed within root element.               |
| className      | string           | Classes to be applied to the root element.                  |
| dense          | boolean          | Enables a dense variant.                                    |
| nonInteractive | boolean          | Enables a non-interactive variant.                          |
| twoLine        | boolean          | Enables a two-line variant.                                 |
| tag            | string \| object | HTML tag to be applied to the root element. Defaults to ul. |

### ListItem

| Name      | Type             | Description                                                 |
| --------- | ---------------- | ----------------------------------------------------------- |
| activated | boolean          | Indicates whether the element is activated.                 |
| children  | node             | Elements to be displayed within root element.               |
| className | string           | Classes to be applied to the root element.                  |
| disabled  | boolean          | Indicates whether the element is disabled.                  |
| selected  | boolean          | Indicates whether the element is selected.                  |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to li. |

### ListItemText

| Name      | Type             | Description                                                   |
| --------- | ---------------- | ------------------------------------------------------------- |
| children  | node             | Elements to be displayed within root element.                 |
| className | string           | Classes to be applied to the root element.                    |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to span. |

### ListItemPrimaryText

| Name      | Type             | Description                                                   |
| --------- | ---------------- | ------------------------------------------------------------- |
| children  | node             | Elements to be displayed within root element.                 |
| className | string           | Classes to be applied to the root element.                    |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to span. |

### ListItemSecondaryText

| Name      | Type             | Description                                                   |
| --------- | ---------------- | ------------------------------------------------------------- |
| children  | node             | Elements to be displayed within root element.                 |
| className | string           | Classes to be applied to the root element.                    |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to span. |

### ListItemGraphic

| Name      | Type             | Description                                                   |
| --------- | ---------------- | ------------------------------------------------------------- |
| className | string           | Classes to be applied to the root element.                    |
| graphic   | node             | Elements to be displayed within root element.                 |
| style     | object           | Styles to be applied to the root element.                     |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to span. |

### ListItemMeta

| Name      | Type             | Description                                                   |
| --------- | ---------------- | ------------------------------------------------------------- |
| className | string           | Classes to be applied to the root element.                    |
| meta      | node             | Elements to be displayed within root element.                 |
| style     | object           | Styles to be applied to the root element.                     |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to span. |

### ListGroup

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| className | string           | Classes to be applied to the root element.                   |
| children  | node             | Elements to be displayed within root element.                |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### ListGroupSubheader

| Name      | Type             | Description                                                 |
| --------- | ---------------- | ----------------------------------------------------------- |
| className | string           | Classes to be applied to the root element.                  |
| children  | node             | Elements to be displayed within root element.               |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to h3. |

### ListDivider

| Name      | Type             | Description                                                 |
| --------- | ---------------- | ----------------------------------------------------------- |
| className | string           | Classes to be applied to the root element.                  |
| children  | node             | Elements to be displayed within root element.               |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to li. |
