import { state } from "../state.js";

export function updateAriaAttributes() {
    const input = document.getElementById("search-input");
    const list = document.getElementById("results-list");

    // ARIA
    input.setAttribute("aria-expanded", String(!list.classList.contains("hidden")));
    input.setAttribute(
        "aria-activedescendant",
        state.highlightedIndex >= 0 ? `option-${state.highlightedIndex}` : ""
    );

    if (state.highlightedIndex >= 0) {
        const activeEl = document.getElementById(`option-${state.highlightedIndex}`);
        if (activeEl) {
            activeEl.scrollIntoView({ block: "nearest" });
        }
    }
}
