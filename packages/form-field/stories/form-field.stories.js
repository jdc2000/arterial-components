import {useState} from 'react';
import {Checkbox} from '../../checkbox';
import {FormField} from '..';

const Meta = {title: 'FormField'};
export default Meta;

export const Basic = () => {
  const [checked, setChecked] = useState(false);
  return (
    <FormField>
      <Checkbox
        id="checkbox-1"
        value="checkbox-1"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />
      <label htmlFor="checkbox-1">Checkbox 1</label>
    </FormField>
  );
};

export const AlignEnd = () => {
  const [checked, setChecked] = useState(false);
  return (
    <FormField alignEnd>
      <Checkbox
        id="checkbox-1"
        value="checkbox-1"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />
      <label htmlFor="checkbox-1">Checkbox 1</label>
    </FormField>
  );
};
