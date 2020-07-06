import React, { useRef, useState } from 'react';
import {
  DataTable,
  DataTableCell,
  DataTableContent,
  DataTableHeader,
  DataTableHeaderCell,
  DataTableRow,
} from '..';

export default { title: 'DataTable' };

const TABLE = [
  ['Dessert', 'Calories', 'Fat', 'Carbs', 'Protein (g)'],
  ['Frozen yogurt', '159', '6', '24', '4'],
  ['Ice cream sandwich', '237', '9', '37', '4.3'],
  ['Eclair', '262', '16', '24', '6'],
];
const [header, ...content] = TABLE;
export const Basic = () => {
  const numerics = useRef(new Map());
  return (
    <DataTable>
      <DataTableHeader>
        <DataTableRow>
          {header.map((cell, cellIndex) => {
            const isNumeric = numerics.current.get(cellIndex) === true;
            return (
              <DataTableHeaderCell numeric={isNumeric}>
                {cell}
              </DataTableHeaderCell>
            );
          })}
        </DataTableRow>
      </DataTableHeader>
      <DataTableContent>
        {content.map((row, rowIndex) => {
          return (
            <DataTableRow>
              {row.map((cell, cellIndex) => {
                const isNumeric = !isNaN(cell);
                numerics.current.set(cellIndex, isNumeric);
                return (
                  <DataTableCell numeric={isNumeric}>{cell}</DataTableCell>
                );
              })}
            </DataTableRow>
          );
        })}
      </DataTableContent>
    </DataTable>
  );
};

function initChecked() {
  const checked = {};
  content.forEach((row, rowIndex) => {
    checked[rowIndex] = false;
  });
  return checked;
}
export const Selection = () => {
  const numerics = useRef(new Map());
  const [headerChecked, setHeaderChecked] = useState('');
  const [bodyChecked, setBodyChecked] = useState(initChecked());
  console.log({ checked: bodyChecked });
  return (
    <DataTable>
      <DataTableHeader>
        <DataTableRow>
          {header.map((cell, cellIndex) => {
            const isNumeric = numerics.current.get(cellIndex) === true;
            return (
              <React.Fragment key={`row-header-cell-${cellIndex}`}>
                {cellIndex === 0 && (
                  <DataTableHeaderCell
                    checkbox
                    checked={headerChecked === 'checked'}
                    indeterminate={headerChecked === 'indeterminate'}
                    onChange={(data) => {
                      Object.keys(bodyChecked).forEach((key) => {
                        bodyChecked[key] = data.checked;
                      });
                      setHeaderChecked(data.checked ? 'checked' : '');
                      setBodyChecked({ ...bodyChecked });
                    }}
                  />
                )}
                <DataTableHeaderCell numeric={isNumeric}>
                  {cell}
                </DataTableHeaderCell>
              </React.Fragment>
            );
          })}
        </DataTableRow>
      </DataTableHeader>
      <DataTableContent>
        {content.map((row, rowIndex) => {
          return (
            <DataTableRow
              selected={bodyChecked[rowIndex]}
              key={`row-${rowIndex}`}
            >
              {row.map((cell, cellIndex) => {
                const isNumeric = !isNaN(cell);
                numerics.current.set(cellIndex, isNumeric);
                return (
                  <React.Fragment key={`row-${rowIndex}-cell-${cellIndex}`}>
                    {cellIndex === 0 && (
                      <DataTableCell
                        checkbox
                        checked={bodyChecked[rowIndex] === true}
                        onChange={(data) => {
                          bodyChecked[rowIndex] = data.checked;
                          const values = Object.values(bodyChecked);
                          const checked = values.find((checked) => checked);
                          const noneChecked = checked
                            ? false
                            : values.every((checked) => !checked);
                          const unchecked = values.find((checked) => !checked);
                          const allChecked = unchecked
                            ? false
                            : values.every((checked) => checked);
                          let header;
                          if (allChecked) {
                            header = 'checked';
                          } else if (noneChecked) {
                            header = '';
                          } else {
                            header = 'indeterminate';
                          }
                          setHeaderChecked(header);
                          setBodyChecked({ ...bodyChecked });
                        }}
                      />
                    )}
                    <DataTableCell numeric={isNumeric}>{cell}</DataTableCell>
                  </React.Fragment>
                );
              })}
            </DataTableRow>
          );
        })}
      </DataTableContent>
    </DataTable>
  );
};
