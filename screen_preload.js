function applyStyle() {
  const sizePadding = "30px";
  document.body.style.paddingLeft  = sizePadding;
  document.body.style.paddingTop   = sizePadding;
  document.body.style.paddingRight = sizePadding;
}

window.addEventListener('DOMContentLoaded', () => {
  applyStyle();
  const btnPresent = document.getElementById("button-toggle-present");
  btnPresent?.click();
});
