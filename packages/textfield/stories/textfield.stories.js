import React, { useState } from 'react';
import { HelperText, TextField } from '..';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import './textfield.stories.css';

export default {
  title: 'TextField',
  decorators: [
    storyFn => <div className="textfield-container">{storyFn()}</div>
  ]
};

function MyTextField({ icon, trailingIcon, ...otherProps }) {
  const [value, setValue] = useState('');
  return (
    <div className="textfield--margin-right">
      <TextField
        autoComplete="off"
        icon={icon ? 'event' : null}
        trailingIcon={trailingIcon ? 'delete' : null}
        onTrailingIconAction={trailingIcon ? () => setValue('') : null}
        value={value}
        onChange={e => setValue(e.target.value)}
        {...otherProps}
      />
    </div>
  );
}

function MyTextFields({
  disabled,
  filled,
  fullwidth,
  helperText,
  invalid,
  labelFloating,
  maxLength,
  noLabel,
  outlined,
  prefix,
  required,
  suffix,
  textarea
}) {
  const FILLED = 'Filled';
  const OUTLINED = 'Outlined';
  const props = {
    label: FILLED,
    disabled,
    fullwidth,
    helperText,
    invalid,
    labelFloating,
    maxLength,
    noLabel,
    placeholder: fullwidth ? FILLED : null,
    prefix,
    required,
    suffix
  };
  const oProps = {
    ...props,
    label: OUTLINED,
    outlined: true,
    placeholder: null
  };
  return (
    <>
      {!outlined && !textarea && (
        <div className="textfield-row">
          <MyTextField id="demo-filled" {...props} />
          {!prefix && <MyTextField icon id="demo-filled-icon" {...props} />}
          <MyTextField id="demo-filled-trailing-icon" trailingIcon {...props} />
        </div>
      )}
      {!filled && !textarea && !fullwidth && (
        <div className="textfield-row">
          <MyTextField id="demo-outlined" {...oProps} />
          {!prefix && <MyTextField icon id="demo-outlined-icon" {...oProps} />}
          <MyTextField
            id="demo-outlined-trailing-icon"
            trailingIcon
            {...oProps}
          />
        </div>
      )}
      {textarea && (
        <MyTextField
          label="Text Area"
          helperText={helperText}
          id="demo-textarea"
          maxLength={maxLength}
          textarea
        />
      )}
    </>
  );
}

export const Filled = () => <MyTextFields filled />;
export const Outlined = () => <MyTextFields outlined />;
export const WithHelperText = () => (
  <MyTextFields helperText={<HelperText text="Helper Text" />} />
);
export const PersistentHelperText = () => (
  <MyTextFields helperText={<HelperText persistent text="Helper Text" />} />
);
export const Invalid = () => (
  <MyTextFields
    helperText={<HelperText persistent validationMsg text="Helper Text" />}
    invalid
    required
  />
);
export const LabelFloating = () => (
  <MyTextFields
    helperText={<HelperText persistent text="Helper Text" />}
    labelFloating
  />
);
export const NoLabel = () => (
  <MyTextFields
    helperText={<HelperText persistent text="Helper Text" />}
    noLabel
  />
);
export const Disabled = () => (
  <MyTextFields
    disabled
    helperText={<HelperText persistent text="Helper Text" />}
  />
);
export const CharacterCounter = () => (
  <MyTextFields
    helperText={<HelperText persistent text="Helper Text" />}
    maxLength={5}
  />
);
export const FullWidth = () => (
  <MyTextFields
    fullwidth
    helperText={<HelperText persistent text="Helper Text" />}
  />
);
export const Prefix = () => (
  <MyTextFields
    helperText={<HelperText persistent text="Helper Text" />}
    labelFloating
    prefix="$"
  />
);
export const Suffix = () => (
  <MyTextFields
    helperText={<HelperText persistent text="Helper Text" />}
    suffix=".00"
  />
);
export const Textarea = () => (
  <MyTextField
    helperText={<HelperText persistent text="Helper Text" />}
    label="Text Area"
    textarea
  />
);
export const TextareaWithCharacterCounter = () => (
  <MyTextField
    helperText={<HelperText persistent text="Helper Text" />}
    label="Text Area"
    maxLength={5}
    textarea
  />
);
