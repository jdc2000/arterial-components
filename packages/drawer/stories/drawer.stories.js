import {useState} from 'react';
import {List, ListItem, ListItemGraphic, ListItemText} from '../../list';
import {
  TopAppBar,
  TopAppBarIcon,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection,
} from '../../top-app-bar';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerAppContent,
} from '..';
import './drawer.stories.css';

const Meta = {
  title: 'Drawer',
  decorators: [
    storyFn => (
      <div style={{display: 'flex', height: '100vh', margin: '-8px'}}>
        {storyFn()}
      </div>
    ),
  ],
};
export default Meta;

const items = [{id: 'inbox'}, {id: 'star'}, {id: 'send'}, {id: 'drafts'}];

function MyDrawer({appbar, dissmisible, header, modal}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('star');
  let appTitle = 'Permanent';
  if (dissmisible) {
    appTitle = 'Dismissible';
  } else if (modal) {
    appTitle = 'Modal';
  }
  function handleClick(e) {
    console.log(e.target.id);
    setSelected(e.target.id);
    if (modal) {
      setOpen(false);
    }
  }
  return (
    <>
      <Drawer
        dismissible={dissmisible}
        modal={modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {header && (
          <DrawerHeader className={appbar ? 'app-bar' : ''}>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerSubtitle>Subtitle</DrawerSubtitle>
          </DrawerHeader>
        )}
        <DrawerContent>
          <List>
            {items.map(item => {
              return (
                <ListItem
                  id={item.id}
                  key={item.id}
                  onClick={handleClick}
                  selected={item.id === selected}
                >
                  <ListItemGraphic graphic={item.id} />
                  <ListItemText>
                    {item.id.charAt(0).toUpperCase() + item.id.substr(1)}
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </DrawerContent>
      </Drawer>
      {appbar && (
        <>
          <DrawerAppContent>
            <TopAppBar>
              <TopAppBarRow>
                <TopAppBarSection>
                  {(dissmisible || modal) && (
                    <TopAppBarIcon
                      nav
                      icon="menu"
                      onClick={() => setOpen(!open)}
                    />
                  )}
                  <TopAppBarTitle>{appTitle}</TopAppBarTitle>
                </TopAppBarSection>
              </TopAppBarRow>
            </TopAppBar>

            <main className="main-content">
              <TopAppBarFixedAdjust>App Content</TopAppBarFixedAdjust>
            </main>
          </DrawerAppContent>
        </>
      )}
    </>
  );
}

export const Permanent = () => <MyDrawer />;
export const PermanentWithHeader = () => <MyDrawer header />;
export const PermanentWithTopAppBar = () => <MyDrawer header appbar />;
export const Dissmisible = () => <MyDrawer header appbar dissmisible />;
export const Modal = () => <MyDrawer header appbar modal />;
