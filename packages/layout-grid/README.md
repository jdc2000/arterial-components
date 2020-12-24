# Arterial Layout Grid

[Another React Material Layout Grid](https://arterialjs.org/layout-grids)

## Installation

```zsh
npm install @arterial/layout-grid
```

## Usage

### Styles

#### Sass

```scss
@use "@material/layout-grid/mdc-layout-grid.scss";
```

#### CSS

```jsx
import '@material/layout-grid/dist/mdc.layout-grid.css';
```

### JSX

```jsx
import {Grid, GridRow, GridCell} from '@arterial/layout-grid';
```

## Regular Layout Grid

```jsx
<Grid className="grid grid--regular">
  <GridRow>
    <GridCell className="grid-cell"></GridCell>
    <GridCell className="grid-cell"></GridCell>
    <GridCell className="grid-cell"></GridCell>
  </GridRow>
</Grid>
```

## Other Variants

### Left Aligned

```jsx
<Grid className="grid grid--regular" align="left">
  <GridRow>
    <GridCell className="grid-cell"></GridCell>
    <GridCell className="grid-cell"></GridCell>
    <GridCell className="grid-cell"></GridCell>
  </GridRow>
</Grid>
```

### Right Aligned

```jsx
<Grid className="grid grid--regular" align="right">
  <GridRow>
    <GridCell className="grid-cell"></GridCell>
    <GridCell className="grid-cell"></GridCell>
    <GridCell className="grid-cell"></GridCell>
  </GridRow>
</Grid>
```

### Columns

```jsx
<Grid className="grid">
  <GridRow>
    <GridCell className="grid-cell" span={6}></GridCell>
    <GridCell className="grid-cell" span={3}></GridCell>
    <GridCell className="grid-cell" span={2}></GridCell>
    <GridCell className="grid-cell" span={1}></GridCell>
    <GridCell className="grid-cell" span={3}></GridCell>
    <GridCell className="grid-cell" span={1}></GridCell>
    <GridCell className="grid-cell" span={8}></GridCell>
  </GridRow>
</Grid>
```

### Cell Alignment

```jsx
<Grid className="grid grid--cell-alignment">
  <GridRow className="grid-inner">
    <GridCell className="grid-cell grid-cell--alignment" align="top"></GridCell>
    <GridCell
      className="grid-cell grid-cell--alignment"
      align="middle"
    ></GridCell>
    <GridCell
      className="grid-cell grid-cell--alignment"
      align="bottom"
    ></GridCell>
  </GridRow>
</Grid>
```

## Props

### Grid

| Name             | Type             | Description                                                  |
| ---------------- | ---------------- | ------------------------------------------------------------ |
| align            | left \| right    | Specifies alignment of the whole grid. Defaults to center.   |
| children         | node             | Elements to be displayed within root element.                |
| className        | string           | Classes to be applied to the root element.                   |
| fixedColumnWidth | boolean          | Enables a fixed width column variant.                        |
| tag              | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### GridRow

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### GridCell

| Name        | Type                     | Description                                                  |
| ----------- | ------------------------ | ------------------------------------------------------------ |
| align       | tope \| middle \| bottom | Specifies alignment of the whole grid. Defaults to center.   |
| children    | node                     | Elements to be displayed within root element.                |
| className   | string                   | Classes to be applied to the root element.                   |
| order       | number                   | Specifies order of the cell.                                 |
| span        | number                   | Specifies the number of columns the cell spans.              |
| spanDesktop | number                   | Specifies the number of columns the cell spans on a desktop. |
| spanPhone   | number                   | Specifies the number of columns the cell spans on a phone.   |
| spanTablet  | number                   | Specifies the number of columns the cell spans on a tablet.  |
| tag         | string \| object         | HTML tag to be applied to the root element. Defaults to div. |
