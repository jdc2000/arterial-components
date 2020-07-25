# Arterial Dialog

[Another React Material Dialog](https://arterialjs.org/dialogs)

## Installation

```zsh
npm install @arterial/dialog
```

## Usage

### Styles

#### Sass

```scss
@use "@material/dialog/index.scss" as dialog;
@include dialog.core-styles;
```

#### CSS

```jsx
import '@material/dialog/dist/mdc.dialog.css';
```

### JSX

```jsx
import { Dialog, DialogActions, DialogButton, ... } from '@arterial/dialog';
```

## Alert Dialog

Alert dialogs interrupt users with urgent information, details, or actions.

```jsx
function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open Alert" onClick={() => setOpen(true)} unelevated />
      <AlertDialog
        title="Alert"
        content="Discard draft?"
        confirmingButtonLabel="Discard"
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
```

## Simple Dialog

Simple dialogs can display items that are immediately actionable when selected. They don’t have text buttons.

```jsx
function SimpleDialogDemo() {
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <Button label="Open Dialog" onClick={() => setOpen(true)} unelevated />
      <SimpleDialog
        title="Select an account"
        content={
          <List>
            <ListItem onClick={handleClose}>
              <ListItemGraphic graphic="person" />
              <ListItemText>user1@example.com</ListItemText>
            </ListItem>
            <ListItem onClick={handleClose}>
              <ListItemGraphic graphic="person" />
              <ListItemText>user2@example.com</ListItemText>
            </ListItem>
            <ListItem onClick={handleClose}>
              <ListItemGraphic graphic="add" />
              <ListItemText>Add account</ListItemText>
            </ListItem>
          </List>
        }
        onClose={handleClose}
        open={open}
      />
    </>
  );
}
```

## Confirmation Dialog

Confirmation dialogs give users the ability to provide final confirmation of a choice before committing to it, so they have a chance to change their minds if necessary.

```jsx
function ConfirmationDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open Dialog" onClick={() => setOpen(true)} unelevated />
      <ConfirmationDialog
        title="Reset settings?"
        content="This will reset your device to its default factory settings."
        confirmingButtonLabel="Accept"
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}
```

## Other Variants

### Scrollable

```jsx
function Scrollable() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        label="Open Scrollable"
        onClick={() => setOpen(true)}
        unelevated
      />
      <Dialog onClose={() => setOpen(false)} open={open} scrollable>
        <DialogTitle>The Wonderful Wizard of Oz</DialogTitle>
        <DialogContent>...</DialogContent>
        <DialogActions>
          <DialogButton label="Decline" onSelect={() => setOpen(false)} />
          <DialogButton label="Accept" onSelect={() => setOpen(false)} />
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Stacked Actions

Stacked buttons accommodate longer button text. Confirming actions appear above dismissive actions.

```jsx
function Stacked() {
  const [open, setOpen] = useState(false);
  function handleClose(action) {
    if (action === 'ok') {
      // Turn on speed boost
    }
    setOpen(false);
  }
  return (
    <>
      <Button label="Open Stacked" onClick={() => setOpen(true)} unelevated />
      <Dialog open={open} onClose={handleClose} stacked>
        <DialogTitle>Use location service?</DialogTitle>
        <DialogContent>...</DialogContent>
        <DialogActions>
          <DialogButton
            action="ok"
            label="Turn on speed boost"
            onSelect={handleClose}
          />
          <DialogButton label="No thanks" onSelect={handleClose} />
        </DialogActions>
      </Dialog>
    </>
  );
}
```

## Props

### Dialog

| Name       | Type             | Description                                                  |
| ---------- | ---------------- | ------------------------------------------------------------ |
| children   | node             | Elements to be displayed within root element.                |
| className  | string           | Classes to be applied to the root element.                   |
| onClose    | function         | Close event handler.                                         |
| open       | boolean          | Indicates whether the element is open.                       |
| scrollable | boolean          | Indicates whether the dialog content is scrollable.          |
| stacked    | boolean          | Indicates whether the dialog actions are stacked.            |
| tag        | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### DialogTitle

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| id        | string           | Id of the element.                                           |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### DialogContent

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| id        | string           | Id of the element.                                           |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### DialogActions

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### DialogButton

| Name      | Type     | Description                                                   |
| --------- | -------- | ------------------------------------------------------------- |
| action    | string   | Action to be passed as an argument for onClose event handler. |
| className | string   | Classes to be applied to the root element.                    |
| onSelect  | function | Select event handler.                                         |
