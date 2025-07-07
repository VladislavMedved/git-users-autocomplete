import { state } from "../state.js";
import { updateUI } from "../ui/render.js";

export function onSelect(user) {
    state.selectedUser = user;
    state.users = [];
    state.highlightedIndex = -1;
    updateUI();
}
