function getId() {
  return new Date().toISOString().replace(/[-:.]/g, '');
}

export function getContentId() {
  return `dialog-content-${getId()}`;
}

export function getTitleId() {
  return `dialog-title-${getId()}`;
}
