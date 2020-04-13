import React, { useState } from 'react';
import { Tab, TabBar } from '..';
import '@material/tab-bar/dist/mdc.tab-bar.css';
import '@material/tab/dist/mdc.tab.css';
import '@material/tab-scroller/dist/mdc.tab-scroller.css';
import '@material/tab-indicator/dist/mdc.tab-indicator.css';

export default {
  title: 'Tabs',
  decorators: [
    storyFn => <div style={{ width: '100%', height: '100vh' }}>{storyFn()}</div>
  ]
};

const HOME = 'Home';
const MERCHANDISE = 'Merchandise';
const ABOUT_US = 'About Us';
const RECENTS = 'Recents';
const NEARBY = 'Nearby';
const FAVORITES = 'Favorites';

const basicTabs = [
  { label: HOME },
  { label: MERCHANDISE },
  { label: ABOUT_US }
];
const iconTabs = [
  { label: RECENTS, icon: 'access_time' },
  { label: NEARBY, icon: 'near_me' },
  { label: FAVORITES, icon: 'favorite' }
];

function MyTabs({ minWidth, restricted, scrolling, stacked, icons }) {
  let tabs = icons ? iconTabs : basicTabs;
  if (scrolling) {
    tabs = [];
    for (let i = 0; i < 36; i++) {
      tabs.push({ label: `Tab ${i + 1}` });
    }
  }
  const [activeIndex, setActiveIndex] = useState(0);

  function updateActiveIndex(index) {
    setActiveIndex(index);
  }

  return (
    <TabBar
      activeIndex={activeIndex}
      handleActiveIndexUpdate={updateActiveIndex}
    >
      {tabs.map(({ label, icon }) => (
        <Tab
          icon={icon}
          id={label}
          key={label}
          label={label}
          minWidth={minWidth}
          restricted={restricted}
          stacked={stacked}
        />
      ))}
    </TabBar>
  );
}

export const Basic = () => <MyTabs />;
export const MinWidth = () => <MyTabs minWidth />;
export const WithIcon = () => <MyTabs icons />;
export const Stacked = () => <MyTabs icons stacked />;
export const StackedAndRestricted = () => <MyTabs icons stacked restricted />;
export const Scrolling = () => <MyTabs minWidth scrolling />;
