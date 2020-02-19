import React, { useState } from 'react';
import { Typeahead, Highlighter } from '..';
import {
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '../../list';

export default {
  title: 'Typeahead',
  decorators: [
    storyFn => (
      <div style={{ width: '100vw', height: '100vh' }}>{storyFn()}</div>
    )
  ]
};

const LIST = [
  { code: 'Jan', id: '1', name: 'January' },
  { code: 'Feb', id: '2', name: 'February' },
  { code: 'Mar', id: '3', name: 'March' },
  { code: 'Apr', id: '4', name: 'April' },
  { code: 'May', id: '5', name: 'May' },
  { code: 'Jun', id: '6', name: 'June' },
  { code: 'Jul', id: '7', name: 'July' },
  { code: 'Aug', id: '8', name: 'August' },
  { code: 'Sep', id: '9', name: 'September' },
  { code: 'Oct', id: '10', name: 'October' },
  { code: 'Nov', id: '11', name: 'November' },
  { code: 'Dec', id: '12', name: 'December' }
];

const STRING_LIST = LIST.map(item => item.name);

function MyTypeahead({ highlight, listOfObjects }) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  function handleBodyClick(e) {
    const el = e.target;
    const parentEl = el.parentElement;
    if (!parentEl.className.includes('mdc-text-field')) {
      setOpen(false);
    }
  }
  function handleWindowKeyDown(e) {
    const isEscape = e.key === 'Escape' || e.keyCode === 27;
    if (isEscape) {
      setOpen(false);
    }
  }
  function handleChange(e) {
    console.log('changed');
    setValue(e.target.value);
  }
  function handleFocus(e) {
    console.log('focused');
    setOpen(true);
  }
  function handleSelect(item, index) {
    const val = listOfObjects ? item.name : item;
    console.log('val:', val);
    setOpen(false);
    setValue(val);
  }
  function renderMenuItemChildren(item, matches, index) {
    return (
      <ListItemText>
        <ListItemPrimaryText>
          {highlight ? (
            <Highlighter item={item} itemKey="name" matches={matches[index]} />
          ) : (
            item.name
          )}
        </ListItemPrimaryText>
        <ListItemSecondaryText>
          {highlight ? (
            <Highlighter item={item} itemKey="id" matches={matches[index]} />
          ) : (
            item.id
          )}
        </ListItemSecondaryText>
      </ListItemText>
    );
  }

  const list = listOfObjects ? LIST : STRING_LIST;

  return (
    <Typeahead
      //textfield props
      id="my-typeahead-id"
      label="Typeahead"
      labelClassName="mdc-floating-label--float-above"
      name="month"
      onChange={handleChange}
      onFocus={handleFocus}
      // menu-surface props
      open={open}
      // typeahead props
      filterBy={listOfObjects && ['name', 'id']}
      highlight={highlight}
      list={list}
      twoLine={listOfObjects}
      onBodyClick={handleBodyClick}
      onSelect={handleSelect}
      onWindowKeyDown={handleWindowKeyDown}
      renderListItemChildren={listOfObjects && renderMenuItemChildren}
      value={value}
    />
  );
}

export const WithListOfStrings = () => <MyTypeahead />;
export const WithListOfStringsAndHighlighted = () => <MyTypeahead highlight />;
export const WithListOfObjects = () => <MyTypeahead listOfObjects />;
export const WithListOfObjectsAndHighlighted = () => (
  <MyTypeahead highlight listOfObjects />
);
