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
          width: '100vw',
          height: '100vh',
          paddingTop: window.innerHeight / 12,
          paddingLeft: window.innerWidth / 12
        }}
      >
        {storyFn()}
      </div>
    )
  ]
};
function MyMenuSurface({
  anchorCorner,
  basic,
  direction,
  fixed,
  quickOpen,
  rightClick
}) {
  const anchorEl = useRef();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);

  const anchor = !rightClick;

  useEffect(() => {
    if (!basic) {
      function handleClick(e) {
        const el = e.target;
        const parentEl = el.parentElement;
        if (parentEl.id !== 'button') {
          setOpen(false);
        }
      }
      function handleKeyDown(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
          setOpen(false);
        }
      }
      function handleRightClick(e) {
        e.preventDefault();
        setOpen(true);
        setPosition({ x: e.clientX, y: e.clientY });
      }
      document.body.addEventListener('click', handleClick);
      window.addEventListener('keydown', handleKeyDown);
      if (rightClick) {
        window.addEventListener('contextmenu', handleRightClick);
      }
      return () => {
        document.body.removeEventListener('click', handleClick);
        window.removeEventListener('keydown', handleKeyDown);
        if (rightClick) {
          window.removeEventListener('contextmenu', handleRightClick);
        }
      };
    }
  }, [basic, rightClick]);

  function MyMenuSurfaceBody() {
    return (
      <>
        {!rightClick && !basic && (
          <Button
            id="button"
            label="Open"
            onClick={() => setOpen(!open)}
            unelevated
          />
        )}
        <MenuSurface
          anchorElement={anchorEl}
          anchorCorner={anchorCorner}
          position={position}
          direction={direction}
          fixed={fixed}
          open={open || basic}
          quickOpen={quickOpen || basic}
        >
          <List>
            <ListItem onClick={() => setOpen(false)}>
              <ListItemText>Menu Item 1</ListItemText>
            </ListItem>
            <ListItem onClick={() => setOpen(false)}>
              <ListItemText>Menu Item 2</ListItemText>
            </ListItem>
          </List>
        </MenuSurface>
      </>
    );
  }

  return anchor ? (
    <MenuSurfaceAnchor ref={anchorEl} style={{ width: 'max-content' }}>
      <MyMenuSurfaceBody />
    </MenuSurfaceAnchor>
  ) : (
    <div style={{ width: 'max-content' }}>
      <MyMenuSurfaceBody />
    </div>
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
