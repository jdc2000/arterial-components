import {useState, useEffect} from 'react';
import {TextField, TextFieldHelperText} from '..';
import './textfield.stories.css';

const Meta = {
  title: 'TextField',
  decorators: [
    storyFn => <div className="textfield-container">{storyFn()}</div>,
  ],
};
export default Meta;

function MyTextField({icon, trailingIcon, ...otherProps}) {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (otherProps.disabled) setValue('disabled');
  }, [otherProps.disabled]);
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
  endAligned,
  filled,
  helperText,
  invalid,
  labelFloating,
  maxLength,
  noLabel,
  outlined,
  prefix,
  required,
  suffix,
  textarea,
}) {
  const FILLED = 'Filled';
  const OUTLINED = 'Outlined';
  const props = {
    label: FILLED,
    disabled,
    endAligned,
    helperText,
    invalid,
    labelFloating,
    maxLength,
    noLabel,
    prefix,
    required,
    suffix,
  };
  const oProps = {
    ...props,
    label: OUTLINED,
    outlined: true,
    placeholder: null,
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
      {!filled && !textarea && (
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
  <MyTextFields helperText={<TextFieldHelperText text="Helper Text" />} />
);
export const PersistentHelperText = () => (
  <>
    <MyTextFields
      helperText={<TextFieldHelperText persistent text="Helper Text" />}
    />
    <MyTextFields helperText={{persistent: true, text: 'Helper Text'}} />
  </>
);
export const Invalid = () => (
  <MyTextFields
    helperText={
      <TextFieldHelperText persistent validationMsg text="Helper Text" />
    }
    invalid
    required
  />
);
export const LabelFloating = () => (
  <MyTextFields
    helperText={<TextFieldHelperText persistent text="Helper Text" />}
    labelFloating
  />
);
export const NoLabel = () => (
  <MyTextFields
    helperText={<TextFieldHelperText persistent text="Helper Text" />}
    noLabel
  />
);
export const Disabled = () => (
  <MyTextFields
    disabled
    helperText={<TextFieldHelperText persistent text="Helper Text" />}
  />
);
export const EndAligned = () => (
  <MyTextFields
    helperText={<TextFieldHelperText persistent text="Helper Text" />}
    endAligned
  />
);
export const Prefix = () => (
  <MyTextFields
    helperText={<TextFieldHelperText persistent text="Helper Text" />}
    labelFloating
    prefix="$"
  />
);
export const Suffix = () => (
  <MyTextFields
    helperText={<TextFieldHelperText persistent text="Helper Text" />}
    suffix=".00"
  />
);
export const CharacterCounter = () => (
  <MyTextFields
    helperText={<TextFieldHelperText persistent text="Helper Text" />}
    maxLength={5}
  />
);
export const Textarea = () => (
  <MyTextField
    helperText={<TextFieldHelperText persistent text="Helper Text" />}
    label="Text Area"
    textarea
  />
);
export const TextareaWithCharacterCounter = () => (
  <MyTextField
    helperText={<TextFieldHelperText persistent text="Helper Text" />}
    label="Text Area"
    maxLength={5}
    textarea
  />
);
