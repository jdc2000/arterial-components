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
import { Checkbox } from '../../checkbox';
import { Icon } from '../../icon';
import { IconButton } from '../../icon-button';
import { Radio } from '../../radio';
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
    const id = e.target.id || e.target.parentElement.id;
    console.log(id);
    setSelected(id);
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
            <ListItemGraphic graphic={item.id} />
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

export const TwoLine = () => (
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

export const Activated = () => <MyList />;

export const Selected = () => <MyList type="selected" />;

export const Graphic = () => (
  <List tag="div">
    <ListItem tag="div">
      <ListItemGraphic graphic="wifi" />
      <ListItemText>Graphic as icon</ListItemText>
    </ListItem>
    <ListItem htmlFor="check" tag="label">
      <ListItemGraphic graphic={<Checkbox id="check" onChange={() => {}} />} />
      <ListItemText>Graphic with checkbox</ListItemText>
    </ListItem>
    <ListItem htmlFor="radio" tag="label">
      <ListItemGraphic graphic={<Radio id="radio" onChange={() => {}} />} />
      <ListItemText>Graphic with radio</ListItemText>
    </ListItem>
  </List>
);

function Test(props) {
  return <div className="test">{props.children}</div>;
}
export const Meta = () => (
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
        meta={<IconButton icon="more_vert" style={{ marginRight: '-12px' }} />}
      />
    </ListItem>
    <ListItem htmlFor="checkbox" tag="label">
      <ListItemText>Meta with checkbox</ListItemText>
      <ListItemMeta
        meta={
          <Checkbox
            id="checkbox"
            onChange={() => {}}
            style={{ marginRight: '-8px' }}
          />
        }
      />
    </ListItem>
    <ListItem htmlFor="radio" tag="label">
      <ListItemText>Meta with radio</ListItemText>
      <ListItemMeta
        meta={<Radio id="radio" onChange={() => {}} />}
        style={{ marginRight: '-8px' }}
      />
    </ListItem>
  </List>
);

export const TwoLineWithLeadingAndTrailingIcon = () => (
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
);

export const GroupAndGroupSubheader = () => (
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
