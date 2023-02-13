export function getCustomProperty(El, Prop) {
  return parseFloat(getComputedStyle(El).getPropertyValue(Prop)) || 0;
}

export function setCustomProperty(El, Prop, Value) {
  El.style.setProperty(Prop, Value);
}

export function incCustomProperty(El, Prop, Increment) {
  setCustomProperty(El, Prop, getCustomProperty(El, Prop) + Increment);
}
