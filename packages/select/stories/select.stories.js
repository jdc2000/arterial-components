import React, { useState } from 'react';
import { Select, HelperText } from '..';
import { CircularProgress } from '../../circular-progress';
import '@material/list/dist/mdc.list.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/select/dist/mdc.select.css';

export default {
  title: 'Select',
  decorators: [
    storyFn => (
      <div style={{ display: 'flex', width: '400px', height: '400px' }}>
        {storyFn()}
      </div>
    )
  ]
};

const OPTIONS = [
  { text: '', value: '' },
  { text: 'Bread, Cereal, Rice, and Pasta', value: 'grains' },
  { text: 'Vegetables', value: 'vegetables', disabled: true },
  { text: 'Fruit', value: 'fruit' }
];
const OPTIONS_WITH_ICON = [
  { text: '', value: '' },
  {
    text: 'Bread, Cereal, Rice, and Pasta',
    selectedText: 'Bread, Cereal, Rice, and Pasta (Private)',
    icon: 'lock',
    value: 'grains'
  },
  { text: 'Vegetables', value: 'vegetables' },
  {
    text: 'Fruit',
    selectedText: 'Fruit (Private)',
    icon: 'lock',
    value: 'fruit'
  }
];

function MySelect({
  disabled,
  helperText,
  icon,
  id = 'demo',
  invalid,
  labelFloated,
  noLabel,
  optionIcon,
  outlined,
  progress,
  required
}) {
  const [selected, setSelected] = useState(-1);
  function handleSelect({ index }) {
    setSelected(index);
  }
  const options = optionIcon ? OPTIONS_WITH_ICON : OPTIONS;
  let value = '';
  if (options[selected]) {
    value = options[selected].selectedText || options[selected].text;
  }
  return (
    <Select
      disabled={disabled || progress}
      helperText={helperText}
      icon={icon ? 'local_dining' : null}
      id={id}
      invalid={invalid}
      label={noLabel ? null : 'Pick a Food Group'}
      labelFloated={noLabel ? null : labelFloated || progress}
      onSelect={handleSelect}
      options={options}
      outlined={outlined}
      placeholder={progress ? 'Loading...' : ''}
      required={required}
      trailingIcon={progress ? <CircularProgress size="xsmall" /> : null}
      value={value}
      style={{ width: icon ? '246.453px' : '200px', marginRight: '64px' }}
    />
  );
}
export const Filled = () => (
  <>
    <MySelect />
    <MySelect icon id="demo-2" />
  </>
);
export const Outlined = () => (
  <>
    <MySelect outlined />
    <MySelect icon id="demo-2" outlined />
  </>
);
export const Disabled = () => (
  <>
    <MySelect disabled />
    <MySelect disabled id="demo-outlined" outlined />
  </>
);
export const WithHelperText = () => (
  <>
    <MySelect helperText={<HelperText>Helper Text</HelperText>} />
    <MySelect
      id="demo-outlined"
      outlined
      helperText={<HelperText>Helper Text</HelperText>}
    />
  </>
);
export const WithPersistentHelperText = () => (
  <>
    <MySelect helperText={<HelperText persistent>Helper Text</HelperText>} />
    <MySelect
      id="demo-outlined"
      outlined
      helperText={<HelperText persistent>Helper Text</HelperText>}
    />
  </>
);
export const Invalid = () => (
  <>
    <MySelect
      invalid
      required
      helperText={
        <HelperText persistent validationMessage>
          Helper Text
        </HelperText>
      }
    />
    <MySelect
      id="demo-outlined"
      invalid
      outlined
      required
      helperText={
        <HelperText persistent validationMessage>
          Helper Text
        </HelperText>
      }
    />
  </>
);
export const WithPersistentFloatingLabel = () => (
  <>
    <MySelect
      labelFloated
      helperText={<HelperText persistent>Helper Text</HelperText>}
    />
    <MySelect
      id="demo-outlined"
      outlined
      labelFloated
      helperText={<HelperText persistent>Helper Text</HelperText>}
    />
  </>
);
export const WithoutLabel = () => (
  <>
    <MySelect
      noLabel
      helperText={<HelperText persistent>Helper Text</HelperText>}
    />
    <MySelect
      id="demo-outlined"
      outlined
      noLabel
      helperText={<HelperText persistent>Helper Text</HelperText>}
    />
  </>
);
export const OptionWithIcon = () => <MySelect optionIcon />;
export const WithCircularProgress = () => <MySelect progress />;
