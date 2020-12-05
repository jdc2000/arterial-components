# Arterial Menu Surface

[Another React Material Menu Surface](https://arterialjs.org/menus)

## Installation

```zsh
npm install @arterial/menu-surface
```

## Usage

### Styles

#### Sass

```scss
@use "@material/menu-surface/index.scss" as menu-surface;
@use "@material/menu/index.scss" as menu;
@include menu-surface.core-styles;
@include menu.core-styles;
```

#### CSS

```jsx
import '@material/menu-surface/dist/mdc.menu-surface.css';
import '@material/menu/dist/mdc.menu.css';
```

### JSX

```jsx
import {MenuSurface, MenuSurfaceAnchor, Corner} from '@arterial/menu-surface';
```

## Regular Menu

```jsx
function Regular() {
  const anchorRef = useRef();
  const arterialRef = useRef();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function handleBodyClick(e) {
      const {arterial} = e.target.dataset;
      if (!arterial) {
        setOpen(false);
      }
    }
    function handleWindowKeyDown(e) {
      const {arterial} = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        setOpen(false);
      }
    }
    document.body.addEventListener('click', handleBodyClick);
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);
  return (
    <MenuSurfaceAnchor ref={anchorRef}>
      <Button label="Open Menu" onClick={() => setOpen(!open)} />
      <MenuSurface anchorRef={anchorRef} data-arterial="regular" open={open}>
        <List data-arterial="regular">
          <ListItem>
            <ListItemText>Menu Item 1</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Menu Item 2</ListItemText>
          </ListItem>
        </List>
      </MenuSurface>
    </MenuSurfaceAnchor>
  );
}
```

## Other Variants

### Fixed

```jsx
function Fixed() {
  const anchorRef = useRef();
  const arterialRef = useRef();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function handleBodyClick(e) {
      const {arterial} = e.target.dataset;
      if (!arterial) {
        setOpen(false);
      }
    }
    function handleWindowKeyDown(e) {
      const {arterial} = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        setOpen(false);
      }
    }
    document.body.addEventListener('click', handleBodyClick);
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);
  return (
    <MenuSurfaceAnchor ref={anchorRef}>
      <Button label="Open Menu" onClick={() => setOpen(!open)} />
      <MenuSurface
        anchorRef={anchorRef}
        data-arterial="fixed"
        fixed
        open={open}
      >
        <List data-arterial="fixed">
          <ListItem>
            <ListItemText>Menu Item 1</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Menu Item 2</ListItemText>
          </ListItem>
        </List>
      </MenuSurface>
    </MenuSurfaceAnchor>
  );
}
```

### Quick Open

```jsx
function QuickOpen() {
  const anchorRef = useRef();
  const arterialRef = useRef('quickOpen');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function handleBodyClick(e) {
      const {arterial} = e.target.dataset;
      if (!arterial) {
        setOpen(false);
      }
    }
    function handleWindowKeyDown(e) {
      const {arterial} = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        setOpen(false);
      }
    }
    document.body.addEventListener('click', handleBodyClick);
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);
  return (
    <MenuSurfaceAnchor ref={anchorRef}>
      <Button
        data-arterial="quickOpen"
        label="Open Menu"
        onClick={() => setOpen(!open)}
        unelevated
      />
      <MenuSurface
        anchorRef={anchorRef}
        data-arterial="quickOpen"
        open={open}
        quickOpen
      >
        <List data-arterial="quickOpen">
          <ListItem>
            <ListItemText>Menu Item 1</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Menu Item 2</ListItemText>
          </ListItem>
        </List>
      </MenuSurface>
    </MenuSurfaceAnchor>
  );
}
```

### Right Click

```jsx
function RightClick() {
  const anchorRef = useRef();
  const arterialRef = useRef('rightClick');
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  useEffect(() => {
    function handleBodyClick(e) {
      const {arterial} = e.target.dataset;
      if (!arterial) {
        setOpen(false);
      }
    }
    function handleWindowKeyDown(e) {
      const {arterial} = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        setOpen(false);
      }
    }
    function handleRightClick(e) {
      e.preventDefault();
      setPosition({x: e.clientX, y: e.clientY});
      setOpen(true);
    }
    document.body.addEventListener('click', handleBodyClick);
    window.addEventListener('keydown', handleWindowKeyDown);
    document
      .getElementById('right-click-demo')
      .addEventListener('contextmenu', handleRightClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
      window.removeEventListener('keydown', handleWindowKeyDown);
      document
        .getElementById('right-click-demo')
        .removeEventListener('contextmenu', handleRightClick);
    };
  }, []);
  return (
    <MenuSurface
      anchorRef={anchorRef}
      data-arterial="rightClick"
      open={open}
      position={position}
    >
      <List data-arterial="rightClick">
        <ListItem>
          <ListItemText>Menu Item 1</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Menu Item 2</ListItemText>
        </ListItem>
      </List>
    </MenuSurface>
  );
}
```

### Bottom Left

```jsx
function BottomLeft() {
  const anchorRef = useRef();
  const arterialRef = useRef('bottomLeft');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function handleBodyClick(e) {
      const {arterial} = e.target.dataset;
      if (!arterial) {
        setOpen(false);
      }
    }
    function handleWindowKeyDown(e) {
      const {arterial} = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        setOpen(false);
      }
    }
    document.body.addEventListener('click', handleBodyClick);
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);
  return (
    <MenuSurfaceAnchor ref={anchorRef}>
      <Button
        data-arterial="bottomLeft"
        label="Open Menu"
        onClick={() => setOpen(!open)}
        unelevated
      />
      <MenuSurface
        anchorCorner={Corner.BOTTOM_LEFT}
        anchorRef={anchorRef}
        data-arterial="bottomLeft"
        open={open}
      >
        <List data-arterial="bottomLeft">
          <ListItem>
            <ListItemText>Menu Item 1</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Menu Item 2</ListItemText>
          </ListItem>
        </List>
      </MenuSurface>
    </MenuSurfaceAnchor>
  );
}
```

### Top Right

```jsx
function TopRight() {
  const anchorRef = useRef();
  const arterialRef = useRef('topRight');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function handleBodyClick(e) {
      const {arterial} = e.target.dataset;
      if (!arterial) {
        setOpen(false);
      }
    }
    function handleWindowKeyDown(e) {
      const {arterial} = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        setOpen(false);
      }
    }
    document.body.addEventListener('click', handleBodyClick);
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);
  return (
    <MenuSurfaceAnchor ref={anchorRef}>
      <Button
        data-arterial="topRight"
        label="Open Menu"
        onClick={() => setOpen(!open)}
        unelevated
      />
      <MenuSurface
        anchorCorner={Corner.TOP_RIGHT}
        anchorRef={anchorRef}
        data-arterial="topRight"
        open={open}
      >
        <List data-arterial="topRight">
          <ListItem>
            <ListItemText>Menu Item 1</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Menu Item 2</ListItemText>
          </ListItem>
        </List>
      </MenuSurface>
    </MenuSurfaceAnchor>
  );
}
```

### Bottom Right

```jsx
function BottomRight() {
  const anchorRef = useRef();
  const arterialRef = useRef('bottomRight');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function handleBodyClick(e) {
      const {arterial} = e.target.dataset;
      console.log(arterial);
      if (!arterial) {
        setOpen(false);
      }
    }
    function handleWindowKeyDown(e) {
      const {arterial} = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        setOpen(false);
      }
    }
    document.body.addEventListener('click', handleBodyClick);
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);
  return (
    <MenuSurfaceAnchor ref={anchorRef} style={{width: 'max-content'}}>
      <Button
        data-arterial="bottomRight"
        label="Open Menu"
        onClick={() => setOpen(!open)}
        unelevated
      />
      <MenuSurface
        anchorCorner={Corner.BOTTOM_RIGHT}
        anchorRef={anchorRef}
        data-arterial="bottomRight"
        open={open}
      >
        <List data-arterial="bottomRight">
          <ListItem>
            <ListItemText>Menu Item 1</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Menu Item 2</ListItemText>
          </ListItem>
        </List>
      </MenuSurface>
    </MenuSurfaceAnchor>
  );
}
```

## Props

### MenuSurface

| Name         | Type                         | Description                                                             |
| ------------ | ---------------------------- | ----------------------------------------------------------------------- |
| anchorCorner | Corner                       | Corner of the menu surface to which menu surface is attached to anchor. |
| anchorMargin | { top, right, bottom, left } | Sets the margin between the menu surface and the anchor.                |
| anchorRef    | Ref                          | A reference to the anchor element.                                      |
| children     | node                         | Elements to be displayed within root element.                           |
| className    | string                       | Classes to be applied to the root element.                              |
| dir          | ltr \| rtl                   | Indicates the directionality of the element's text. Defaults to auto.   |
| fixed        | boolean                      | Enables the fixed variant.                                              |
| open         | boolean                      | Indicates the menu surface is open.                                     |
| originCorner | Corner                       | Corner of the menu surface to attach to the anchor.                     |
| position     | { x, y }                     | Sets the anchors absolute position.                                     |
| quickOpen    | boolean                      | Disables the open/close animation of the menu surface.                  |
| style        | object                       | Styles to be applied to the root element.                               |
| tag          | string \| object             | HTML tag to be applied to the root element. Defaults to div.            |

### MenuSurfaceAnchor

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |
