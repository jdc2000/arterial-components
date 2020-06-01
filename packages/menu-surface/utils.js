let cachedCssTransformPropertyName;
export function getTransformPropertyName(globalObj, forceRefresh = false) {
  if (cachedCssTransformPropertyName === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    cachedCssTransformPropertyName =
      'transform' in el.style ? 'transform' : 'WebkitTransform';
  }
  return cachedCssTransformPropertyName;
}
