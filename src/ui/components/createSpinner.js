import { CSS_CLASSES } from "../../constants.js";

export function createSpinner() {
    const spinner = document.createElement("div");
    spinner.className = CSS_CLASSES.SPINNER;
    spinner.innerHTML = `
        <div class="spinner__inner"></div>
    `;
    return spinner;
}
