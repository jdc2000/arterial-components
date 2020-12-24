# Arterial Tabs

[Another React Material Tab](https://arterialjs.org/tabs)

## Installation

```zsh
npm install @arterial/tabs
```

## Usage

### Styles

#### Sass

```scss
@use "@material/tab-bar/index.scss" as tab-bar;
@use "@material/tab-indicator/index.scss" as tab-indicator;
@use "@material/tab-scroller/index.scss" as tab-scroller;
@use "@material/tab/index.scss" as tab;
@include tab-bar.core-styles;
@include tab-indicator.core-styles;
@include tab-scroller.core-styles;
@include tab.core-styles;
```

#### CSS

```jsx
import '@material/tab-bar/dist/mdc.tab-bar.css';
import '@material/tab-indicator/dist/mdc.tab-indicator.css';
import '@material/tab-scroller/dist/mdc.tab-scroller.css';
import '@material/tab/dist/mdc.tab.css';
```

### JSX

```jsx
import {Tab, TabBar} from '@arterial/tabs';
```

## Regular Tabs

```jsx
function Regular() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={index => setActiveIndex(index)}
    >
      <Tab id="home" label="Home" />
      <Tab id="merchandise" label="Merchandise" />
      <Tab id="about-us" label="About Us" />
    </TabBar>
  );
}
```

## Other Variants

### Min Width

```jsx
function MinWidth() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={index => setActiveIndex(index)}
    >
      <Tab id="home" label="Home" minWidth />
      <Tab id="merchandise" label="Merchandise" minWidth />
      <Tab id="about-us" label="About Us" minWidth />
    </TabBar>
  );
}
```

### Icon

```jsx
function Icon() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={index => setActiveIndex(index)}
    >
      <Tab id="recents" label="Recents" icon="watch_later" />
      <Tab id="nearby" label="Nearby" icon="near_me" />
      <Tab id="favorites" label="Favorites" icon="favorite" />
    </TabBar>
  );
}
```

### Stacked

```jsx
function Stacked() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={index => setActiveIndex(index)}
    >
      <Tab id="recents" label="Recents" icon="watch_later" stacked />
      <Tab id="nearby" label="Nearby" icon="near_me" stacked />
      <Tab id="favorites" label="Favorites" icon="favorite" stacked />
    </TabBar>
  );
}
```

### Stacked and Restricted

```jsx
function StackedRestricted() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={index => setActiveIndex(index)}
    >
      <Tab id="recents" label="Recents" icon="watch_later" restricted stacked />
      <Tab id="nearby" label="Nearby" icon="near_me" restricted stacked />
      <Tab
        id="favorites"
        label="Favorites"
        icon="favorite"
        restricted
        stacked
      />
    </TabBar>
  );
}
```

### Stacked and Restricted

```jsx
function StackedRestricted() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={index => setActiveIndex(index)}
    >
      <Tab id="recents" label="Recents" icon="watch_later" restricted stacked />
      <Tab id="nearby" label="Nearby" icon="near_me" restricted stacked />
      <Tab
        id="favorites"
        label="Favorites"
        icon="favorite"
        restricted
        stacked
      />
    </TabBar>
  );
}
```

### Indicator Fade

```jsx
function IndicatorFade() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={index => setActiveIndex(index)}
    >
      <Tab id="recents" label="Recents" indicatorFade />
      <Tab id="nearby" label="Nearby" indicatorFade />
      <Tab id="favorites" label="Favorites" indicatorFade />
    </TabBar>
  );
}
```

### Indicator Icon

```jsx
function IndicatorIcon() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={index => setActiveIndex(index)}
    >
      <Tab id="recents" label="Recents" indicatorIcon="star" />
      <Tab id="nearby" label="Nearby" indicatorIcon="star" />
      <Tab id="favorites" label="Favorites" indicatorIcon="star" />
    </TabBar>
  );
}
```

### Scrolling

```jsx
function getTabs() {
  const tabs = [];
  for (let i = 0; i < 36; i++) {
    tabs.push(`Tab ${i + 1}`);
  }
  return tabs;
}
function Scrolling() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={index => setActiveIndex(index)}
      scroll
    >
      {getTabs().map(label => (
        <Tab id={label} key={label} label={label} />
      ))}
    </TabBar>
  );
}
```

## Props

### Tab

| Name                        | Type             | Description                                                     |
| --------------------------- | ---------------- | --------------------------------------------------------------- |
| active                      | boolean          | Indicates whether the element is active.                        |
| children                    | node             | Elements to be displayed within root element.                   |
| className                   | string           | Classes to be applied to the root element.                      |
| focused                     | boolean          | Indicates whether the element is focused.                       |
| id                          | string           | Id of the element.                                              |
| indicatorFade               | boolean          | Enables indicator element fade animation.                       |
| indicatorIcon               | boolean          | Icon to render within as indicator element.                     |
| indicatorId                 | boolean          | ID of indicator element.                                        |
| label                       | string           | Text to be displayed within the root element.                   |
| minWidth                    | boolean          | Enables a min width variant.                                    |
| previousIndicatorClientRect | object           | Conains previous indicator element's client rect.               |
| restricted                  | boolean          | Enables a restricted variant.                                   |
| ripple                      | boolean          | Enables ripple within root element. Defaults to true.           |
| stacked                     | boolean          | Enables a stacked variant.                                      |
| tag                         | string \| object | HTML tag to be applied to the root element. Defaults to button. |

### TabBar

| Name                    | Type             | Description                                                           |
| ----------------------- | ---------------- | --------------------------------------------------------------------- |
| activeIndex             | boolean          | Indicates the tab at that index is active.                            |
| children                | node             | Elements to be displayed within root element.                         |
| className               | string           | Classes to be applied to the root element.                            |
| dir                     | ltr \| rtl       | Indicates the directionality of the element's text. Defaults to auto. |
| handleActiveIndexUpdate | function         | Active index update event handler.                                    |
| onKeyDown               | function         | Keydown event handler.                                                |
| tag                     | string \| object | HTML tag to be applied to the root element. Defaults to div.          |
