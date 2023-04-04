const scoreboardHtml = `
<table class="mx-auto" id="scoreboard-table">
    <thead>
        <tr>
            <th class="score-table__position-cell" scope="score-table__position-row col">#</th>
            <th class="score-table__info-cell" scope="col">Count of Moves</th>
            <th class="score-table__info-cell" scope="col">Time</th>
        </tr>
    </thead>
    <tbody id="scoreboard-body">
    </tbody>
</table>
`

const scoreboardPlaceholderHtml = `
<p id="scoreboard-placeholder" class="lead">
    Game hasn't played yet...
</p>
`

export {
    scoreboardHtml,
    scoreboardPlaceholderHtml
}