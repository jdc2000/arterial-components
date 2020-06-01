import React, { useState, useEffect, useRef } from 'react';
import { Corner, MenuSurface, MenuSurfaceAnchor } from '..';
import { Button } from '../../button';
import { List, ListItem, ListItemText } from '../../list';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import '@material/button/dist/mdc.button.css';
import '@material/list/dist/mdc.list.css';

export default {
  title: 'MenuSurface',
  decorators: [
    storyFn => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '150px'
        }}
      >
        {storyFn()}
      </div>
    )
  ]
};

function MyMenuSurface({ anchorCorner, basic, fixed, quickOpen, rightClick }) {
  const anchorRef = useRef();
  const arterialRef = useRef('1');
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!basic) {
      function handleBodyClick(e) {
        const { arterial } = e.target.dataset;
        if (!arterial) {
          setOpen(false);
        }
      }
      function handleWindowKeyDown(e) {
        const { arterial } = e.target.dataset;
        const isEscape = e.key === 'Escape' || e.keyCode === 27;
        const isTab = e.key === 'Tab' || e.keyCode === 9;
        if ((isEscape || isTab) && arterial === arterialRef.current) {
          setOpen(false);
        }
      }
      function handleRightClick(e) {
        e.preventDefault();
        setPosition({ x: e.clientX, y: e.clientY });
        setOpen(true);
      }
      if (rightClick) {
        window.addEventListener('contextmenu', handleRightClick);
      }
      document.body.addEventListener('click', handleBodyClick);
      window.addEventListener('keydown', handleWindowKeyDown);
      return () => {
        if (rightClick) {
          window.removeEventListener('contextmenu', handleRightClick);
        }
        document.body.removeEventListener('click', handleBodyClick);
        window.removeEventListener('keydown', handleWindowKeyDown);
      };
    }
  }, [basic, rightClick]);

  function Surface() {
    return (
      <MenuSurface
        data-arterial="1"
        anchorCorner={anchorCorner}
        anchorRef={anchorRef}
        fixed={fixed}
        open={open || basic}
        position={position}
        quickOpen={quickOpen || basic}
      >
        <List data-arterial="1">
          <ListItem data-arterial="1" onClick={() => setOpen(false)}>
            <ListItemText data-arterial="1">Menu Item 1</ListItemText>
          </ListItem>
          <ListItem data-arterial="1" onClick={() => setOpen(false)}>
            <ListItemText data-arterial="1">Menu Item 2</ListItemText>
          </ListItem>
        </List>
      </MenuSurface>
    );
  }

  return rightClick ? (
    <Surface />
  ) : (
    <MenuSurfaceAnchor data-arterial="1" ref={anchorRef}>
      <Button
        id="button"
        label="Open"
        onClick={() => setOpen(!open)}
        unelevated
      />
      <Surface />
    </MenuSurfaceAnchor>
  );
}

export const Basic = () => <MyMenuSurface basic />;
export const Menu = () => <MyMenuSurface />;
export const Fixed = () => <MyMenuSurface fixed />;
export const QuickOpen = () => <MyMenuSurface quickOpen />;
export const RightClick = () => <MyMenuSurface rightClick />;
export const OpenBottomLeft = () => (
  <MyMenuSurface anchorCorner={Corner.BOTTOM_LEFT} />
);
export const OpenTopRight = () => (
  <MyMenuSurface anchorCorner={Corner.TOP_RIGHT} />
);
export const OpenBottomRight = () => (
  <MyMenuSurface anchorCorner={Corner.BOTTOM_RIGHT} />
);
