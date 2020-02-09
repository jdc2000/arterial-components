import React, { useState } from 'react';
import {
  List,
  ListDivider,
  ListGroup,
  ListGroupSubheader,
  ListItem,
  ListItemGraphic,
  ListItemMeta,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemText
} from '..';
import { Icon } from '../../icon';
import '@material/list/dist/mdc.list.css';

export default {
  title: 'List',
  decorators: [storyFn => <div style={{ width: '600px' }}>{storyFn()}</div>]
};

const items = [
  { id: 'inbox' },
  { id: 'star' },
  { id: 'send' },
  { id: 'drafts' }
];
function MyList({ type = 'activated' }) {
  const [selected, setSelected] = useState('star');
  function handleClick(e) {
    console.log(e.target.id);
    setSelected(e.target.id);
  }
  return (
    <List>
      {items.map(item => {
        const listItemProps = {
          activated: type === 'activated' && item.id === selected,
          selected: type === 'selected' && item.id === selected
        };
        return (
          <ListItem
            id={item.id}
            key={item.id}
            onClick={handleClick}
            {...listItemProps}
          >
            <ListItemGraphic graphic={<Icon icon={item.id} />} />
            <ListItemText>
              {item.id.charAt(0).toUpperCase() + item.id.substr(1)}
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
}

export const Basic = () => (
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
);

export const WithTwoLines = () => (
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
        <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
      </ListItemText>
    </ListItem>
  </List>
);

export const WithLeadingIcon = () => (
  <List>
    <ListItem>
      <ListItemGraphic graphic={<Icon icon="wifi" />} />
      <ListItemText>Line item</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemGraphic graphic={<Icon icon="bluetooth" />} />
      <ListItemText>Line item</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemGraphic graphic={<Icon icon="data_usage" />} />
      <ListItemText>Line item</ListItemText>
    </ListItem>
  </List>
);

export const WithActivatedItem = () => <MyList />;

export const WithSelectedItem = () => <MyList type="selected" />;

export const WithTrailingIcon = () => (
  <List>
    <ListItem>
      <ListItemText>Line item</ListItemText>
      <ListItemMeta meta={<Icon icon="info" />} />
    </ListItem>
    <ListItem>
      <ListItemText>Line item</ListItemText>
      <ListItemMeta meta={<Icon icon="info" />} />
    </ListItem>
    <ListItem>
      <ListItemText>Line item</ListItemText>
      <ListItemMeta meta={<Icon icon="info" />} />
    </ListItem>
  </List>
);

export const WithTwoLineAndLeadingIconAndTrailingIconAndDivider = () => (
  <List twoLine>
    <ListItem>
      <ListItemGraphic graphic={<Icon icon="folder" />} />
      <ListItemText>
        <ListItemPrimaryText>Two-line item</ListItemPrimaryText>
        <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
      </ListItemText>
      <ListItemMeta meta={<Icon icon="info" />} />
    </ListItem>
    <ListItem>
      <ListItemGraphic graphic={<Icon icon="folder" />} />
      <ListItemText>
        <ListItemPrimaryText>Two-line item</ListItemPrimaryText>
        <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
      </ListItemText>
      <ListItemMeta meta={<Icon icon="info" />} />
    </ListItem>
    <ListDivider />
    <ListItem>
      <ListItemGraphic graphic={<Icon icon="folder" />} />
      <ListItemText>
        <ListItemPrimaryText>Two-line item</ListItemPrimaryText>
        <ListItemSecondaryText>Secondary text</ListItemSecondaryText>
      </ListItemText>
      <ListItemMeta meta={<Icon icon="info" />} />
    </ListItem>
  </List>
);

export const WithListGroupAndListGroupSubheader = () => (
  <>
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
    </ListGroup>
    <ListGroup>
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
  </>
);
