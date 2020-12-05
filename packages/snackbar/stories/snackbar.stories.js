import {useState} from 'react';
import {Snackbar} from '..';
import {Button} from '../../button';

export const Meta = {
  title: 'Snackbar',
  decorators: [storyFn => <div style={{height: '100vh'}}>{storyFn()}</div>],
};
export default Meta;

function MySnackbar({action, dismiss = true, leading, stacked}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open Snackbar" onClick={() => setOpen(true)} unelevated />
      <Snackbar
        action={action}
        dismiss={dismiss}
        label="Can't send photo. Retry in 5 seconds."
        leading={leading}
        open={open}
        onClose={action => {
          console.log('onClose:', action);
          setOpen(false);
        }}
        stacked={stacked}
      />
    </>
  );
}

export const Basic = () => <MySnackbar />;
export const ActionOnly = () => <MySnackbar action="Retry" dismiss={false} />;
export const Leading = () => <MySnackbar action="Retry" leading />;
export const Stacked = () => <MySnackbar action="Retry" stacked />;
