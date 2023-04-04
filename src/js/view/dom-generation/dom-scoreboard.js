import { scoreboardHtml, scoreboardPlaceholderHtml } from "../../../html/scoreboard.js";

import { timeFormat } from "../../common/utils.js";

import { generateDom } from "./dom-utils.js";

function addResult(element, position, result) {
    let row = document.createElement("tr");

    let child = document.createElement("th");
    child.scope = "row";
    child.innerText = `${position}`;
    row.appendChild(child);

    child = document.createElement("td");
    child.innerText = String(result.movesCount);
    row.appendChild(child);

    child = document.createElement("td");
    child.innerText = timeFormat(result.minutes, result.seconds);
    row.appendChild(child);

    element.appendChild(row);
}

function generateScoreboard(element, scoreboard) {
    element.innerHTML = "";
    let tableBody = undefined;

    if (scoreboard.length === 0) {
        generateDom(element, scoreboardPlaceholderHtml);
    }
    else {
        let elements = generateDom(element, scoreboardHtml);
        tableBody = elements.scoreboardBody;

        let index = 1;
        for (let item of scoreboard) addResult(tableBody, index++, item);
    }
}

export {
    generateScoreboard
}

