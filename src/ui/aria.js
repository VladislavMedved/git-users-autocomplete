import { state } from "../state.js";
import { ARIA_KEYS, ID_TEMPLATES, CSS_CLASSES } from "../constants.js";

export function updateAriaAttributes() {
    const input = document.getElementById("search-input");
    const list = document.getElementById("results-list");

    // ARIA
    input.setAttribute(ARIA_KEYS.EXPANDED, String(!list.classList.contains(CSS_CLASSES.HIDDEN)));
    input.setAttribute(
        ARIA_KEYS.ACTIVE_DESCENDANT,
        state.highlightedIndex >= 0 ? ID_TEMPLATES.OPTION(state.highlightedIndex) : ""
    );

    if (state.highlightedIndex >= 0) {
        const activeEl = document.getElementById(ID_TEMPLATES.OPTION(state.highlightedIndex));
        if (activeEl) {
            activeEl.scrollIntoView({ block: "nearest" });
        }
    }
}
