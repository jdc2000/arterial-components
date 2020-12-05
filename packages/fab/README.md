# Arterial FAB

[Another React Material FAB](https://arterialjs.org/fabs)

## Installation

```zsh
npm install @arterial/fab
```

## Usage

### Styles

#### Sass

```scss
@use "@material/fab/index.scss" as fab;
@include fab.core-styles;
```

#### CSS

```jsx
import '@material/fab/dist/mdc.fab.css';
```

### JSX

```jsx
import {Fab} from '@arterial/fab';
```

## Regular FAB

```jsx
<Fab icon="favorite" />
```

## Mini FAB

A mini FAB should be used on smaller screens. Mini FABs can also be used to create visual continuity with other screen elements.

```jsx
<Fab icon="favorite" mini />
```

## Extended FAB

The extended FAB is wider, and it includes a text label.

```jsx
<Fab extended icon="add" label="Create" />
```

## Other Variants

### Trailing Icon

```jsx
<Fab extended label="Create" trailingIcon="add" />
```

### Text

Unlike standard FABs, extended FABs don't require an icon.

```jsx
<Fab extended label="Create" />
```

## Props

### Fab

| Name         | Type             | Description                                                     |
| ------------ | ---------------- | --------------------------------------------------------------- |
| className    | string           | Classes to be applied to the root element.                      |
| exited       | boolean          | Animates FAB out of view.                                       |
| extended     | boolean          | Enables a extended variant.                                     |
| icon         | string \| node   | Icon to render within root element.                             |
| label        | string           | Text to be displayed within the root element.                   |
| outlined     | boolean          | Enables an outlined variant.                                    |
| mini         | boolean          | Enables a mini variant.                                         |
| ripple       | boolean          | Enables ripple within root element. Defaults to true.           |
| tag          | string \| object | HTML tag to be applied to the root element. Defaults to button. |
| trailingIcon | string \| node   | Icon to render on the right side of the root element.           |
