import { state } from "../state.js";
import { updateUI } from "../ui/render.js";
import { onSelect } from "./onSelect.js";

export function onKeyDown(e) {
    const { users, highlightedIndex } = state;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        state.highlightedIndex = (highlightedIndex + 1) % users.length;
        updateUI();
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        state.highlightedIndex = (highlightedIndex - 1 + users.length) % users.length;
        updateUI();
    } else if (e.key === "Enter") {
        e.preventDefault();
        if (users[highlightedIndex]) {
            onSelect(users[highlightedIndex]);
        }
    }
}
