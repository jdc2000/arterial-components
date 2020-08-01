import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DialogContext = React.createContext({
  contentId: '',
  titleId: '',
  setContentId: () => {},
  setTitleId: () => {},
});

function DialogProvider({ children }) {
  const [contentId, setContentId] = useState('');
  const [titleId, setTitleId] = useState('');

  return (
    <DialogContext.Provider
      value={{ contentId, titleId, setContentId, setTitleId }}
    >
      {children}
    </DialogContext.Provider>
  );
}
DialogProvider.displayName = 'DialogProvider';
DialogProvider.propTypes = {
  children: PropTypes.node,
};

export { DialogContext, DialogProvider };
