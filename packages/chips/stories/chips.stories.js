import React, { useState } from 'react';
import { Chip, ChipSet } from '..';

export default { title: 'Chips' };

const ALFA = 'Alfa';
const BRAVO = 'Bravo';
const CHARLIE = 'Charlie';
const DELTA = 'Delta';
const CHIPS = [
  { text: ALFA, id: ALFA },
  { text: BRAVO, id: BRAVO },
  { text: CHARLIE, id: CHARLIE },
  { text: DELTA, id: DELTA },
];

function MyChips({ checkmark, choice, filter, noIcon }) {
  const [selected, setSelected] = useState(new Set());
  function handleSelect(id) {
    let newSelected;
    if (choice && !filter) {
      newSelected = new Set([id]);
    } else if (filter) {
      newSelected = new Set(selected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
    }
    setSelected(newSelected);
  }
  return (
    <>
      <ChipSet choice={choice} filter={filter}>
        {CHIPS.map((chip) => (
          <Chip
            checkmark={checkmark}
            icon={noIcon ? null : 'face'}
            id={chip.id}
            key={chip.id}
            selected={selected.has(chip.id)}
            text={chip.text}
            onSelect={() => handleSelect(chip.id)}
          />
        ))}
      </ChipSet>
    </>
  );
}

function MyInputChips() {
  const [chips, setChips] = useState(CHIPS);
  function handleKeyDown(e) {
    const text = e.target.value;
    if (!!text && (e.key === 'Enter' || e.keyCode === 13)) {
      const id = text;
      const newChips = [...chips]; // triggers re-render
      if (newChips.some((c) => c.id === id)) {
        console.error('There is already a chip which has same key.');
      } else {
        newChips.push({ text, id });
        setChips(newChips);
        e.target.value = '';
      }
    }
  }
  function handleTrailingIconSelect(id) {
    const newChips = chips.filter((c) => c.id !== id);
    setChips(newChips);
  }
  return (
    <>
      <div
        id="wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.6)',
          color: 'rgba(0, 0, 0, 0.6)',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <span>Input:</span>
        <ChipSet input>
          <div>
            {chips.map((chip) => (
              <Chip
                id={chip.id}
                key={chip.id}
                text={chip.text}
                trailingIcon="cancel"
                onTrailingIconSelect={handleTrailingIconSelect}
                onSelect={() => console.log(`${chip.id} selected`)}
              />
            ))}
          </div>
          <input
            type="text"
            onKeyDown={handleKeyDown}
            style={{
              color: 'rgba(0, 0, 0, 0.6)',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              fontWeight: 400,
              letterSpacing: '0.0178571429em',
              textDecoration: 'inherit',
              textGransform: 'inherit',
              height: '32px',
              position: 'relative',
              alignSelf: 'center',
              boxSizing: 'border-box',
              borderWidth: 0,
              outline: 'none',
            }}
          />
        </ChipSet>
      </div>
    </>
  );
}

export const Choice = () => <MyChips choice />;

export const FilterWithoutLeadingIcon = () => (
  <MyChips checkmark filter noIcon />
);

export const FilterWithLeadingIcon = () => <MyChips checkmark filter />;

export const FilterWithColor = () => <MyChips checkmark choice filter />;

export const Input = () => <MyInputChips />;
