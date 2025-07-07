import { ID_TEMPLATES, ARIA_KEYS, CSS_CLASSES } from "../../constants.js";
import { onSelect } from "../../events/onSelect.js";

export function renderListItem(user, index, highlightedIndex) {
    const li = document.createElement("li");
    li.id = ID_TEMPLATES.OPTION(index);
    li.setAttribute(ARIA_KEYS.ROLE, "option");
    li.setAttribute(ARIA_KEYS.SELECTED, highlightedIndex === index ? "true" : "false");

    // Add highlight class for visual feedback
    if (highlightedIndex === index) {
        li.classList.add(CSS_CLASSES.HIGHLIGHTED);
    }

    li.textContent = user.login;
    li.addEventListener("click", () => onSelect(user));

    return li;
}
