# Arterial Chips

[Another React Material Chips](https://arterialjs.org/chips)

## Installation

```zsh
npm install @arterial/chips
```

## Usage

### Styles

#### Sass

```scss
@use "@material/chips/index.scss" as chips;
@include chips.core-styles;
@include chips.set-core-styles;
```

#### CSS

```jsx
import '@material/chips/dist/mdc.chips.css';
```

### JSX

```jsx
import { Chip, ChipSet } from '@arterial/chips';
```

## Input Chips

Input chips represent a complex piece of information in compact form, such as an entity (person, place, or thing) or text.

```jsx
const CHIPS = ['Alfa', 'Bravo', 'Charlie', 'Delta'];
function Input() {
  const [chips, setChips] = useState(CHIPS);
  function handleKeyDown(e) {
    const text = e.target.value;
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    if (!!text && isEnter) {
      const id = text;
      const newChips = [...chips]; // triggers re-render
      if (newChips.some((c) => c.text === id)) {
        alert('There is already a chip with that name.');
      } else {
        newChips.push({ text, id });
        setChips(newChips);
        e.target.value = '';
      }
    }
  }
  function handleTrailingIconSelect(id) {
    const newChips = chips.filter((c) => c.text !== id);
    setChips(newChips);
  }
  return (
    <div className="input-chips">
      <span className="input-chips__label">Input:</span>
      <ChipSet className="input-chips__chip-set" input>
        <div>
          {chips.map((chip) => (
            <Chip
              id={chip.text}
              key={chip.text}
              text={chip.text}
              trailingIcon="cancel"
              onTrailingIconSelect={handleTrailingIconSelect}
            />
          ))}
        </div>
        <input className="input-chips__input" onKeyDown={handleKeyDown} />
      </ChipSet>
    </div>
  );
}
```

## Choice Chips

Choice chips allow selection of a single chip from a set of options.

```jsx
const CHIPS = ['Alfa', 'Bravo', 'Charlie', 'Delta'];
function Choice() {
  const [selected, setSelected] = useState('');
  return (
    <ChipSet choice>
      {CHIPS.map((chip) => (
        <Chip
          id={chip.text}
          key={chip.text}
          selected={chip.text === selected}
          text={chip.text}
          onSelect={() => setSelected(chip.text)}
        />
      ))}
    </ChipSet>
  );
}
```

## Filter Chips

Filter chips use tags or descriptive words to filter content.

```jsx
const CHIPS = ['Alfa', 'Bravo', 'Charlie', 'Delta'];
function Filter() {
  const [selected, setSelected] = useState(new Set());
  function handleSelect(value) {
    const sel = new Set(selected);
    if (sel.has(value)) sel.delete(value);
    else sel.add(value);
    setSelected(sel);
  }
  return (
    <ChipSet filter>
      {CHIPS.map((chip) => (
        <Chip
          checkmark
          id={chip.text}
          key={chip.text}
          selected={selected.has(chip.text)}
          text={chip.text}
          onSelect={() => handleSelect(chip.text)}
        />
      ))}
    </ChipSet>
  );
}
```

## Action Chips

Action chips offer actions related to primary content. They should appear dynamically and contextually in a UI.

```jsx
import { CircularProgress } from '@arterial/circular-progress';

const CHIPS = ['Alfa', 'Bravo', 'Charlie', 'Delta'];
function Action() {
  const [selected, setSelected] = useState(false);
  const [saving, setSaving] = useState(false);
  function icon() {
    if (saving) return <CircularProgress small />;
    if (selected) return 'favorite';
    return 'favorite_outlined';
  }
  function text() {
    if (selected && saving) return 'Removing from favorites';
    else if (saving) return 'Saving to favorites';
    else if (selected) return 'Saved to favorites';
    else return 'Save to favorites';
  }
  function handleSelect() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSelected(!selected);
    }, 3000);
  }
  return (
    <Chip
      icon={icon()}
      id="action"
      key="action"
      text={text()}
      onSelect={handleSelect}
    />
  );
}
```

## Other Variants

### Icon

Choice chips with icons.

```jsx
const CHIPS = ['Alfa', 'Bravo', 'Charlie', 'Delta'];
function Icon() {
  const [selected, setSelected] = useState('');
  return (
    <ChipSet choice>
      {CHIPS.map((chip) => (
        <Chip
          icon="face"
          id={chip.text}
          key={chip.text}
          selected={chip.text === selected}
          text={chip.text}
          onSelect={() => setSelected(chip.text)}
        />
      ))}
    </ChipSet>
  );
}
```

### Choice and Filter

Choice and filter chips with icons.

```jsx
const CHIPS = ['Alfa', 'Bravo', 'Charlie', 'Delta'];
function ChoiceFilter() {
  const [selected, setSelected] = useState(new Set());
  function handleSelect(value) {
    const sel = new Set(selected);
    if (sel.has(value)) {
      sel.delete(value);
    } else {
      sel.add(value);
    }
    setSelected(sel);
  }
  return (
    <ChipSet choice filter>
      {CHIPS.map((chip) => (
        <Chip
          checkmark
          icon="face"
          id={chip.text}
          key={chip.text}
          selected={selected.has(chip.text)}
          text={chip.text}
          onSelect={() => handleSelect(chip.text)}
        />
      ))}
    </ChipSet>
  );
}
```

## Props

### Chip

| Name                 | Type             | Description                                                                     |
| -------------------- | ---------------- | ------------------------------------------------------------------------------- |
| checkmark            | boolean          | Enables checkmark to be displayed within root element when element is selected. |
| className            | string           | Classes to be applied to the root element.                                      |
| icon                 | string \| node   | Icon to render within root element.                                             |
| id                   | string           | Id of the element.                                                              |
| onSelect             | function         | Select event handler.                                                           |
| onTrailingIconSelect | function         | Trailing icon select event handler.                                             |
| ripple               | boolean          | Enables ripple within root element. Defaults to true.                           |
| selected             | boolean          | Indicates whether the element is selected.                                      |
| text                 | string           | Text to be displayed within root element.                                       |
| trailingIcon         | string \| node   | Icon to render on the right side of the root element.                           |
| tag                  | string \| object | HTML tag to be applied to the root element. Defaults to div.                    |

### ChipSet

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| choice    | boolean          | Enables a choice variant.                                    |
| filter    | boolean          | Enables a filter variant.                                    |
| input     | boolean          | Enables an input variant.                                    |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |
