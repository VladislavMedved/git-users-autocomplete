import { state } from "../state.js";
import { fetchUsers } from "../logic/fetchUsers.js";
import { updateUI } from "../ui/render.js";
import { debounce } from "../logic/debounce.js";
import { ANIMATION } from "../constants.js";
import { onKeyDown } from "./onKeyDown.js";

export function setupInputHandler() {
    const userNameInput = document.querySelector("#search-input");

    userNameInput.addEventListener(
        "input",
        debounce(e => {
            state.query = e.target.value.trim();
            if (state.query.length >= 2) fetchUsers(state.query);
            else {
                state.users = [];
                updateUI();
            }
        }, ANIMATION.DEBOUNCE_DELAY)
    );

    userNameInput.addEventListener("keydown", onKeyDown);
}
