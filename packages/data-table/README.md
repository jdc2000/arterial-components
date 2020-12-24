# Arterial Data Table

[Another React Material Data Table](https://arterialjs.org/data-tables)

## Installation

```zsh
npm install @arterial/data-table
```

## Usage

### Styles

#### Sass

```scss
@use "@material/data-table/data-table.scss" as data-table;
@include data-table.core-styles;
@include data-table.theme-baseline;
```

#### CSS

```jsx
import '@material/data-table/dist/mdc.data-table.css';
```

### JSX

```jsx
import { DataTable, DataTableCell, DataTableContent, ... } from '@arterial/data-table';
```

## Baseline Data Table

```jsx
const numeric = [false, true, true, true, true];
const header = ['Dessert', 'Calories', 'Fat', 'Carbs', 'Protein (g)'];
const content = [
  ['Frozen yogurt', '159', '6', '24', '4'],
  ['Ice cream sandwich', '237', '9', '37', '4.3'],
  ['Eclair', '262', '16', '24', '6'],
];
function Demo() {
  return (
    <DataTable>
      <DataTableHeader>
        <DataTableHeaderRow>
          {header.map((cellData, cellIndex) => (
            <DataTableHeaderCell
              numeric={numeric[cellIndex]}
              key={`baseline-header-row-${cellData}-cell`}
            >
              {cellData}
            </DataTableHeaderCell>
          ))}
        </DataTableHeaderRow>
      </DataTableHeader>
      <DataTableContent>
        {content.map((rowData, rowIndex) => (
          <DataTableRow key={`baseline-${rowIndex}-row`}>
            {rowData.map((cellData, cellIndex) => (
              <DataTableCell
                numeric={numeric[cellIndex]}
                key={`baseline-${rowIndex}-row-${header[cellIndex]}-cell-${cellData}`}
              >
                {cellData}
              </DataTableCell>
            ))}
          </DataTableRow>
        ))}
      </DataTableContent>
    </DataTable>
  );
}
```

## Checkbox Data Table

```jsx
const numeric = [false, true, true, true, true];
const header = ['Dessert', 'Calories', 'Fat', 'Carbs', 'Protein (g)'];
const content = [
  ['Frozen yogurt', '159', '6', '24', '4'],
  ['Ice cream sandwich', '237', '9', '37', '4.3'],
  ['Eclair', '262', '16', '24', '6'],
];
function initChecked() {
  const checked = {};
  content.forEach((_rowData, rowIndex) => {
    checked[rowIndex] = false;
  });
  return checked;
}
function CheckboxTable() {
  const [headerChecked, setHeaderChecked] = useState('');
  const [bodyChecked, setBodyChecked] = useState(initChecked());
  return (
    <DataTable>
      <DataTableHeader>
        <DataTableHeaderRow>
          {header.map((cellData, cellIndex) => (
            <React.Fragment key={`checkbox-header-row-${cellData}-cell`}>
              {cellIndex === 0 && (
                <DataTableHeaderCell
                  checkbox
                  checkboxId={`${cellData}-checkbox`}
                  checked={headerChecked === 'checked'}
                  indeterminate={headerChecked === 'indeterminate'}
                  onChange={data => {
                    Object.keys(bodyChecked).forEach(key => {
                      bodyChecked[key] = data.checked;
                    });
                    setHeaderChecked(data.checked ? 'checked' : '');
                    setBodyChecked({...bodyChecked});
                  }}
                />
              )}
              <DataTableHeaderCell numeric={numeric[cellIndex]}>
                {cellData}
              </DataTableHeaderCell>
            </React.Fragment>
          ))}
        </DataTableHeaderRow>
      </DataTableHeader>
      <DataTableContent>
        {content.map((rowData, rowIndex) => (
          <DataTableRow
            selected={bodyChecked[rowIndex]}
            key={`checkbox-${rowIndex}-row`}
          >
            {rowData.map((cellData, cellIndex) => (
              <React.Fragment
                key={`checkbox-${rowIndex}-row-${header[cellIndex]}-cell-${cellData}`}
              >
                {cellIndex === 0 && (
                  <DataTableCell
                    checkbox
                    checkboxId={`${cellData}-checkbox`}
                    checked={bodyChecked[rowIndex] === true}
                    onChange={data => {
                      bodyChecked[rowIndex] = data.checked;
                      const values = Object.values(bodyChecked);
                      const checked = values.find(checked => checked);
                      const noneChecked = checked
                        ? false
                        : values.every(checked => !checked);
                      const unchecked = values.find(checked => !checked);
                      const allChecked = unchecked
                        ? false
                        : values.every(checked => checked);
                      let header;
                      if (allChecked) {
                        header = 'checked';
                      } else if (noneChecked) {
                        header = '';
                      } else {
                        header = 'indeterminate';
                      }
                      setHeaderChecked(header);
                      setBodyChecked({...bodyChecked});
                    }}
                  />
                )}
                <DataTableCell numeric={numeric[cellIndex]}>
                  {cellData}
                </DataTableCell>
              </React.Fragment>
            ))}
          </DataTableRow>
        ))}
      </DataTableContent>
    </DataTable>
  );
}
```

## Props

### DataTable

| Name      | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| children  | node   | Elements to be displayed within root element. |
| className | string | Classes to be applied to the root element.    |
| label     | string | Text to be displayed within the root element. |

### DataTableHeader

| Name      | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| children  | node   | Elements to be displayed within root element. |
| className | string | Classes to be applied to the root element.    |

### DataTableHeaderRow

| Name      | Type    | Description                                   |
| --------- | ------- | --------------------------------------------- |
| children  | node    | Elements to be displayed within root element. |
| className | string  | Classes to be applied to the root element.    |
| selected  | boolean | Indicates whether the element is selected.    |

### DataTableHeaderCell

| Name       | Type    | Description                                           |
| ---------- | ------- | ----------------------------------------------------- |
| checkbox   | boolean | Enables checkbox to be displayed within root element. |
| checkboxId | string  | Id of the checkbox.                                   |
| children   | node    | Elements to be displayed within root element.         |
| className  | string  | Classes to be applied to the root element.            |
| numeric    | boolean | Enables a numeric variant.                            |

### DataTableContent

| Name      | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| children  | node   | Elements to be displayed within root element. |
| className | string | Classes to be applied to the root element.    |

### DataTableRow

| Name      | Type    | Description                                   |
| --------- | ------- | --------------------------------------------- |
| children  | node    | Elements to be displayed within root element. |
| className | string  | Classes to be applied to the root element.    |
| selected  | boolean | Indicates whether the element is selected.    |

### DataTableCell

| Name       | Type    | Description                                           |
| ---------- | ------- | ----------------------------------------------------- |
| checkbox   | boolean | Enables checkbox to be displayed within root element. |
| checkboxId | string  | Id of the checkbox.                                   |
| children   | node    | Elements to be displayed within root element.         |
| className  | string  | Classes to be applied to the root element.            |
| numeric    | boolean | Enables a numeric variant.                            |
