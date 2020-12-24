import {useState} from 'react';
import {Icon} from '../../icon';
import {Typeahead} from '..';
import './typeahead.stories.css';

const Meta = {
  title: 'Typeahead',
  decorators: [
    storyFn => <div className="typeahead-container">{storyFn()}</div>,
  ],
};
export default Meta;

const lock = (
  <Icon className="mdc-list-item__graphic typeahead-lock" icon="lock" />
);

function getOptions({meta, node, secondary}) {
  const options = [];
  const months = [
    ['January', 'Garnet'],
    ['February', 'Amethyst'],
    ['March', 'Aquamarine'],
    ['April', 'Diamond'],
    ['May', 'Emerald'],
    ['June', 'Pearl or Alexandrite'],
    ['July', 'Ruby'],
    ['August', 'Peridot'],
    ['September', 'Sapphire'],
    ['October', 'Tourmaline or Opal'],
    ['November', 'Topaz or Citrine'],
    ['December', 'Tanzanite, Zircon or Turquoise'],
  ];
  for (let i = 0; i < months.length; i++) {
    const [month, birthStone] = months[i];
    options.push({
      text: month,
      value: month.slice(0, 3).toLowerCase(),
      ...(secondary && {secondaryText: birthStone}),
      ...(node && {node: lock, selectedText: `${month} (Private)`}),
      ...(meta && {meta: (i + 1).toString().padStart(2, '0')}),
    });
  }
  return options;
}

function MyTypeahead({highlight, meta, node, secondary}) {
  const [value, setValue] = useState('');
  const options = getOptions({meta, node, secondary});
  const menuWidth = secondary && meta && !node ? '300px' : null;
  const keys = [];
  if (secondary) keys.push('secondaryText');
  if (node) keys.push('selectedText');
  function handleSelect(option) {
    setValue(option.value);
  }
  return (
    <div className="typeahead-row">
      <Typeahead
        highlight={highlight}
        id="typeahead"
        label="Typeahead"
        labelFloating
        menuWidth={menuWidth}
        options={options}
        searchOptions={{keys}}
        value={value}
        onChange={val => setValue(val)}
        onSelect={handleSelect}
      />
    </div>
  );
}
export const Options = () => <MyTypeahead />;
export const OptionsWithSecondaryText = () => <MyTypeahead secondary />;
export const OptionsWithNodes = () => <MyTypeahead node />;
export const OptionsWithMeta = () => <MyTypeahead meta />;
export const OptionsWithHighlighter = () => <MyTypeahead highlight />;
export const OptionsWithSecondaryTextAndHighlighter = () => (
  <MyTypeahead highlight secondary />
);
