function singleNumTimeFormat(number) {
    return number < 10 ? '0' + String(number) : String(number);
}

function timeFormat(minutes, seconds) {
    return singleNumTimeFormat(minutes) + ' : ' + singleNumTimeFormat(seconds);
}

export {
    singleNumTimeFormat,
    timeFormat
}