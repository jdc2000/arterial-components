import React from 'react';
import { Icon } from '../../icon/index';
import { TextField, HelperText } from '../index';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import './TextField.stories.css';

export default {
  title: 'TextField',
  decorators: [storyFn => <div className="container">{storyFn()}</div>]
};

function TextFields({ type = 'default', ...props }) {
  if (type === 'default') {
    return (
      <>
        <div>
          <TextField {...props} id="textfield-1" />
        </div>
        <div>
          <TextField {...props} id="textfield-2" icon={<Icon icon="event" />} />
        </div>
        <div>
          <TextField
            {...props}
            id="textfield-3"
            trailingIcon={
              <Icon
                icon="delete"
                tabIndex="0"
                role="button"
                onClick={() => console.log('DELETED!')}
              />
            }
          />
        </div>
      </>
    );
  }
  return (
    <div className="row__inner">
      <div>
        <TextField {...props} id="textfield-1" />
      </div>
      <div>
        <TextField {...props} id="textfield-2" outlined />
      </div>
    </div>
  );
}

export const Filled = () => (
  <div className="row">
    <TextFields label="Standard" />
  </div>
);
export const Outlined = () => (
  <div className="row">
    <TextFields label="Standard123456789" outlined />
  </div>
);
export const WithHelperText = () => (
  <div className="row">
    <TextFields
      type="diff"
      label="Standard"
      helperText={<HelperText>Helper Text</HelperText>}
    />
  </div>
);
export const WithPersistentHelperText = () => (
  <div className="row">
    <TextFields
      type="diff"
      label="Standard"
      helperText={<HelperText persistent>Helper Text</HelperText>}
    />
  </div>
);
export const WithInvalid = () => (
  <div className="row">
    <TextFields
      type="diff"
      label="Standard"
      helperText={
        <HelperText persistent validationMessage>
          Helper Text
        </HelperText>
      }
      required
      valid={false}
    />
  </div>
);
export const WithPersistentFloatingLabel = () => (
  <div className="row">
    <TextFields
      type="diff"
      label="Standard"
      labelClassName="mdc-floating-label--float-above"
      helperText={<HelperText persistent>Helper Text</HelperText>}
    />
  </div>
);
export const WithoutLabel = () => (
  <div className="row">
    <TextFields
      type="diff"
      helperText={<HelperText persistent>Helper Text</HelperText>}
    />
  </div>
);
export const WithCharacterCounter = () => (
  <div className="row">
    <TextFields
      type="diff"
      label="Standard"
      helperText={<HelperText persistent>Helper Text</HelperText>}
      maxLength={5}
    />
  </div>
);
export const Textarea = () => (
  <div className="row">
    <div>
      <TextField
        id="textfield-1"
        label="Standard"
        helperText={<HelperText persistent>Helper Text</HelperText>}
        textarea
      />
    </div>
  </div>
);
export const TextareaWithCharacterCounter = () => (
  <div className="row">
    <div>
      <TextField
        id="textfield-1"
        label="Standard"
        helperText={<HelperText persistent>Helper Text</HelperText>}
        maxLength={5}
        textarea
      />
    </div>
  </div>
);
export const FullWidth = () => (
  <>
    <div style={{ marginBottom: '32px' }}>
      <TextField
        id="textfield-1"
        fullWidth
        helperText={<HelperText persistent>Helper Text</HelperText>}
        placeholder="Standard"
      />
    </div>
    <div>
      <TextField
        id="textfield-1"
        fullWidth
        helperText={<HelperText persistent>Helper Text</HelperText>}
        label="Standard"
        textarea
      />
    </div>
  </>
);
