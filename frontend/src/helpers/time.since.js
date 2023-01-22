export const timeSince = (timeStamp) => {

    timeStamp = new Date(timeStamp)
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    var now = new Date(),
        secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if (secondsPast < 60) {
        return secondsPast + 's';
    }
    if (secondsPast < 3600) {
        return rtf.format(-1 * parseInt(secondsPast / 60), 'minute');
    }
    if (secondsPast <= 86400) {
        return rtf.format(-1 * parseInt(secondsPast / 3600), 'hour');
    }
    if (secondsPast <= 2628000) {
        return rtf.format(-1 * parseInt(secondsPast / 86400), 'day');
    }
    if (secondsPast <= 31536000) {
        return rtf.format(-1 * parseInt(secondsPast / 2628000), 'month');
    }
    if (secondsPast > 31536000) {
        return rtf.format(-1 * parseInt(secondsPast / 31536000), 'year');
    }
};