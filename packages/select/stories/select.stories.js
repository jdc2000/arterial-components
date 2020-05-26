import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Select, HelperText } from '..';
import { CircularProgress } from '../../circular-progress';
import './select.stories.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/select/dist/mdc.select.css';

export default {
  title: 'Select',
  decorators: [
    storyFn => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: 'calc(100vh - 40px)'
        }}
      >
        {storyFn()}
      </div>
    )
  ]
};

const OPTIONS = [
  { text: '', value: '' },
  { text: 'Bread, Cereal, Rice, and Pasta', value: 'grains' },
  { text: 'Vegetables', value: 'vegetables' },
  { text: 'Fruit', value: 'fruit' }
];
const OPTIONS_WITH_ICON = [
  {
    text: 'Bread, Cereal, Rice, and Pasta',
    selectedText: 'Bread, Cereal, Rice, and Pasta (Private)',
    icon: 'lock',
    value: 'grains',
    disabled: true
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
  fullWidth,
  helperText,
  icon,
  id = 'demo',
  invalid,
  labelFloated,
  noLabel,
  optionIcon,
  outlined,
  progress,
  required,
  isDelayedSelected,
  isSelected
}) {
  const [value, setValue] = useState('');
  function handleSelect({ value }) {
    setValue(value);
  }
  const classes = classNames('select', {
    'select--full-width': fullWidth,
    'select--icon': !fullWidth && icon,
    'select--margin-right': !fullWidth
  });
  const isLoading = progress || (isDelayedSelected && value === '');
  const options = optionIcon ? OPTIONS_WITH_ICON : OPTIONS;

  useEffect(() => {
    if (isDelayedSelected) {
      setTimeout(() => {
        setValue(options[2].value);
      }, 2000);
    } else if (isSelected) {
      setValue(options[2].value);
    }
  }, [isDelayedSelected, isSelected, options]);

  return (
    <Select
      className={classes}
      disabled={disabled || isLoading}
      helperText={helperText}
      icon={icon ? 'local_dining' : null}
      id={id}
      invalid={invalid}
      label={noLabel ? null : 'Pick a Food Group'}
      labelFloated={noLabel ? null : labelFloated || isLoading}
      menuWidth={!fullWidth ? 'inherit' : null}
      onSelect={handleSelect}
      options={options}
      outlined={outlined}
      placeholder={isLoading ? 'Loading...' : ''}
      required={required}
      trailingIcon={isLoading ? <CircularProgress size="xsmall" /> : null}
      value={value}
    />
  );
}
export const Filled = () => (
  <div className="select-container">
    <MySelect />
    <MySelect icon id="demo-icon" />
  </div>
);
export const Outlined = () => (
  <div className="select-container">
    <MySelect outlined />
    <MySelect icon id="demo-icon" outlined />
  </div>
);
export const WithHelperText = () => (
  <>
    <div className="select-container">
      <MySelect helperText={<HelperText text="Helper Text" />} />
      <MySelect
        icon
        id="demo-icon"
        helperText={<HelperText text="Helper Text" />}
      />
    </div>
    <div className="select-container">
      <MySelect
        id="demo-outlined"
        outlined
        helperText={<HelperText text="Helper Text" />}
      />
      <MySelect
        icon
        id="demo-outlined-icon"
        outlined
        helperText={<HelperText text="Helper Text" />}
      />
    </div>
  </>
);
export const WithPersistentHelperText = () => (
  <>
    <div className="select-container">
      <MySelect helperText={<HelperText persistent text="Helper Text" />} />
      <MySelect
        icon
        id="demo-icon"
        helperText={<HelperText persistent text="Helper Text" />}
      />
    </div>
    <div className="select-container">
      <MySelect
        id="demo-outlined"
        outlined
        helperText={<HelperText persistent text="Helper Text" />}
      />
      <MySelect
        icon
        id="demo-outlined-icon"
        outlined
        helperText={<HelperText persistent text="Helper Text" />}
      />
    </div>
  </>
);
export const Invalid = () => (
  <>
    <div className="select-container">
      <MySelect
        invalid
        required
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
      <MySelect
        icon
        id="demo-icon"
        invalid
        required
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
    </div>
    <div className="select-container">
      <MySelect
        id="demo-outlined"
        invalid
        outlined
        required
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
      <MySelect
        icon
        id="demo-outlined-icon"
        invalid
        outlined
        required
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
    </div>
  </>
);
export const WithPersistentFloatingLabel = () => (
  <>
    <div className="select-container">
      <MySelect
        labelFloated
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
      <MySelect
        icon
        id="demo-icon"
        labelFloated
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
    </div>
    <div className="select-container">
      <MySelect
        id="demo-outlined"
        outlined
        labelFloated
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
      <MySelect
        icon
        id="demo-outlined-icon"
        outlined
        labelFloated
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
    </div>
  </>
);
export const WithoutLabel = () => (
  <>
    <div className="select-container">
      <MySelect
        noLabel
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
      <MySelect
        icon
        id="demo-icon"
        noLabel
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
    </div>
    <div className="select-container">
      <MySelect
        id="demo-outlined"
        outlined
        noLabel
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
      <MySelect
        icon
        id="demo-outlined-icon"
        outlined
        noLabel
        helperText={
          <HelperText persistent validationMessage text="Helper Text" />
        }
      />
    </div>
  </>
);
export const Disabled = () => (
  <>
    <div className="select-container">
      <MySelect disabled />
      <MySelect disabled icon id="demo-icon" />
    </div>
    <div className="select-container">
      <MySelect disabled id="demo-outlined" outlined />
      <MySelect disabled icon id="demo-outlined-icon" outlined />
    </div>
  </>
);
export const OptionWithIcon = () => (
  <>
    <div className="select-container">
      <MySelect optionIcon fullWidth />
    </div>
    <div className="select-container">
      <MySelect icon id="demo-icon" optionIcon fullWidth />
    </div>
    <div className="select-container">
      <MySelect id="demo-outlined-icon" outlined optionIcon fullWidth />
    </div>
    <div className="select-container">
      <MySelect icon id="demo-outlined-icon" outlined optionIcon fullWidth />
    </div>
  </>
);
export const Selected = () => (
  <>
    <div className="select-container">
      <MySelect optionIcon fullWidth isSelected />
    </div>
    <div className="select-container">
      <MySelect icon id="demo-icon" optionIcon fullWidth isSelected />
    </div>
    <div className="select-container">
      <MySelect id="demo-outlined" outlined optionIcon fullWidth isSelected />
    </div>
    <div className="select-container">
      <MySelect
        icon
        id="demo-outlined-icon"
        outlined
        optionIcon
        fullWidth
        isSelected
      />
    </div>
  </>
);
export const LoadingSelected = () => (
  <>
    <div className="select-container">
      <MySelect optionIcon fullWidth isDelayedSelected />
    </div>
    <div className="select-container">
      <MySelect icon id="demo-icon" optionIcon fullWidth isDelayedSelected />
    </div>
    <div className="select-container">
      <MySelect
        id="demo-outlined"
        outlined
        optionIcon
        fullWidth
        isDelayedSelected
      />
    </div>
    <div className="select-container">
      <MySelect
        icon
        id="demo-outlined-icon"
        outlined
        optionIcon
        fullWidth
        isDelayedSelected
      />
    </div>
  </>
);
export const Loading = () => (
  <>
    <div className="select-container">
      <MySelect progress fullWidth />
    </div>
    <div className="select-container">
      <MySelect icon id="demo-icon" progress fullWidth />
    </div>
    <div className="select-container">
      <MySelect id="demo-outlined" outlined progress fullWidth />
    </div>
    <div className="select-container">
      <MySelect icon id="demo-outlined-icon" outlined progress fullWidth />
    </div>
  </>
);