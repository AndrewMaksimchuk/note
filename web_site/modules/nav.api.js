export function toggleNavPanel(callback) {
  const buttonHide = document.getElementById("button-hide");
  const root = document.querySelector(":root");
  const rs = getComputedStyle(root);

  if (rs.getPropertyValue("--nav-width") === "50ch") {
    root.style.setProperty("--nav-width", "1ch");
    buttonHide.firstElementChild.textContent = "Show navigation panel";
    buttonHide?.setAttribute("title", "Click for show side panel");
  } else {
    root.style.setProperty("--nav-width", "50ch");
    buttonHide.firstElementChild.textContent = "Hide navigation panel";
    buttonHide?.setAttribute("title", "Click for hide side panel");
  }

  callback && typeof callback === "function" && callback();
}
