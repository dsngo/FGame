import { ICONS } from "./constants";

const toggleHighlighted = (iconIdx, isShow) =>
  document
    .querySelector(`.${ICONS[iconIdx]}-icon`)
    .classList.toggle("highlighted", isShow);

export default function initButtons(handleUserAction) {
  let selectedIconIdx = 0;

  function buttonClick({ target }) {
    if (target.classList.contains("left-btn")) {
      toggleHighlighted(selectedIconIdx, false);
      selectedIconIdx = (2 + selectedIconIdx) % ICONS.length;
      toggleHighlighted(selectedIconIdx, true);
    } else if (target.classList.contains("right-btn")) {
      toggleHighlighted(selectedIconIdx, false);
      selectedIconIdx = (1 + selectedIconIdx) % ICONS.length;
      toggleHighlighted(selectedIconIdx, true);
    } else {
      handleUserAction(ICONS[selectedIconIdx]);
    }
  }

  document.querySelector(".button").addEventListener("click", buttonClick);
}
