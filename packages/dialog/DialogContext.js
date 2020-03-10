import React, { useState } from 'react';
import PropTypes from 'prop-types';

const num = new Date().toISOString().replace(/[-:.]/g, '');
const CONTENT_ID = `dialog-content-${num}`;
const TITLE_ID = `dialog-title-${num}`;

const DialogContext = React.createContext({
  contentId: CONTENT_ID,
  titleId: TITLE_ID,
  setContentId: () => {},
  setTitleId: () => {}
});

function DialogProvider({ children }) {
  const [contentId, setContentId] = useState(CONTENT_ID);
  const [titleId, setTitleId] = useState(TITLE_ID);

  return (
    <DialogContext.Provider
      value={{ contentId, titleId, setContentId, setTitleId }}
    >
      {children}
    </DialogContext.Provider>
  );
}

DialogProvider.propTypes = {
  children: PropTypes.node
};

export { DialogContext, DialogProvider };
