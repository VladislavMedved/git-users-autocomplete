import { state } from "../state.js";
import { fetchUsers } from "../logic/fetchUsers.js";
import { updateUI } from "../ui/render.js";
import { debounce } from "../logic/debounce.js";

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
        }, 400)
    );

    userNameInput.addEventListener("keydown", onKeyDown);
}

import { onKeyDown } from "./onKeyDown.js";
