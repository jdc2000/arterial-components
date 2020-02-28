import React, { useState } from 'react';
import { Radio } from '..';
import '@material/radio/dist/mdc.radio.css';
import '@material/form-field/dist/mdc.form-field.css';

export default { title: 'Radio' };

function MyRadio({ type = 'basic' }) {
  const [value, setValue] = useState('radio-1');
  function handleChange(e) {
    return setValue(e.target.value);
  }
  if (type === 'basic') {
    return (
      <>
        <div style={{ display: 'flex' }}>
          <Radio
            checked={value === 'radio-1'}
            id="radio-1"
            name="radios"
            value="radio-1"
            onChange={handleChange}
          />
          <Radio
            checked={value === 'radio-2'}
            id="radio-2"
            name="radios"
            value="radio-2"
            onChange={handleChange}
          />
        </div>
        <div>Current Value: {value}</div>
      </>
    );
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Radio
          checked={value === 'radio-1'}
          disabled={type === 'disabled'}
          formFieldProps={{ alignEnd: true }}
          id="radio-1"
          label="Radio 1"
          name="radios"
          value="radio-1"
          onChange={handleChange}
        />
        <Radio
          checked={value === 'radio-2'}
          disabled={type === 'disabled'}
          id="radio-2"
          label="Radio 2"
          name="radios"
          value="radio-2"
          onChange={handleChange}
        />
      </div>
      <div>Current Value: {value}</div>
    </>
  );
}

export const Basic = () => <MyRadio />;

export const WithFormField = () => <MyRadio type="formfield" />;

export const Disabled = () => <MyRadio type="disabled" />;
