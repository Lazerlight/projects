export function getProperty(el, property) {
  // Returns the value of the property in the element stated by the contructor
  return parseFloat(getComputedStyle(el).getPropertyValue(property));
}

export function setProperty(el, porperty, value) {
  // Updates the property in the element stated by the constructor
  el.style.setProperty(porperty, value);
}

export function incProperty(el, property, inc) {
  // Increments the property in the element stated by the contructor
  setProperty(el, property, getProperty(el, property) + inc);
}
