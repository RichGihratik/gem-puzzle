const mainHtml = `
<div class="bg-light w-100 h-100">
    <div class="container py-4 px-3 mx-auto">

        <div class="row text-center my-4">
            <h1 class="display-2">Gem puzzle!</h1>
        </div>

        <div class="row text-center p-3">

            <div class="col-lg-9 p-3">
                <!-- Buttons -->
                <div class="row justify-content-center gy-2 ">
                    <div class="col-sm-auto">
                        <button class="btn btn-dark w-100" id="start-button">Shuffle and start</button>
                    </div>
                    <div class="col-sm-auto">
                        <button class="btn btn-dark w-100" id="stop-button">Stop</button>
                    </div>
                    <div class="col-sm-auto">
                        <button class="btn btn-success w-100" id="sound-button">Sound: <span id="soundState">on</span></button>
                    </div>
                </div>

                <!-- Timer and moves counter -->
                <div class="row justify-content-center m-4">
                    <h4 class="timer">
                        Time passed:
                        <span class="d-block d-sm-inline-block">
                            <span id="minutes">00</span>:<span id="seconds">00</span>
                        </span>
                    </h4>
                    <h4 class="text-nowrap moves-counter">
                        Count of moves: <span id="moves-count">0</span>
                    </h4>
                </div>

                <!-- Gameboard-->
                <div class="row justify-content-center my-4">
                    <div id="gameboard">

                    </div>
                </div>

                <!-- Playfield resize -->
                <div class="btn-group btn-group-sm" role="group" aria-label="Size buttons">
                    <button type="button" class="btn btn-dark" id="resize-button-3x3" disabled>3x3</button>
                    <button type="button" class="btn btn-outline-dark" id="resize-button-4x4">4x4</button>
                    <button type="button" class="btn btn-outline-dark" id="resize-button-5x5">5x5</button>
                    <button type="button" class="btn btn-outline-dark" id="resize-button-6x6">6x6</button>
                    <button type="button" class="btn btn-outline-dark" id="resize-button-7x7">7x7</button>
                    <button type="button" class="btn btn-outline-dark" id="resize-button-8x8">8x8</button>
                </div>
            </div>

            <div class="col-lg-3 p-3">
                <h3>Scoreboard</h3>
                <div id="scoreboard"> 
                    <p id="scoreboard-placeholder" class="lead">
                        Game hasn't played yet...
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
`

module.exports = {
    mainHtml
}