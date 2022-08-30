import { format, intervalToDuration } from "date-fns";

(() => {
  const startDate = new Date('2022-08-24t13:30');
  const endDate = new Date('2022-09-12t13:30');

  const fullRangeDuration = intervalToDuration({ start: startDate, end: endDate})

  const fullHrs = (fullRangeDuration.days * 24) + fullRangeDuration.hours
  const fullSecs = (fullRangeDuration.days * 24 * 60 * 60) + (fullRangeDuration.hours * 60 * 60) + (fullRangeDuration.minutes * 60) + fullRangeDuration.seconds

  function updateDate() {
    let today = new Date();
    const duration = intervalToDuration({ start: today, end: endDate });

    const hrsRemaining = (duration.days * 24) + duration.hours;
    const [minsRemaining, secsRemaining] = format(
      new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, duration.minutes, duration.seconds),
      'mm:ss'
    ).split(':');
    const yesoDiv = document.getElementById('yeso-div');

    yesoDiv.innerHTML = getTimeDiv(hrsRemaining, minsRemaining, secsRemaining);

    const hrsCovered = fullHrs - hrsRemaining;
    const fullSecsRemaining = (duration.days * 24 * 60 * 60) + (duration.hours * 60 * 60) + (duration.minutes * 60) + duration.seconds
    const coveredSecs = fullSecs - fullSecsRemaining;
    const coveredPercent = `${((coveredSecs / fullSecs) * 100).toFixed(2)}%`
    yesoDiv.innerHTML = yesoDiv.innerHTML + getTimeDiv(hrsCovered, undefined, undefined, "t-div-left")
    yesoDiv.innerHTML = yesoDiv.innerHTML + getTimeDiv(fullHrs, undefined, undefined, "t-div-right")
    yesoDiv.innerHTML = yesoDiv.innerHTML + getTimeDiv(coveredPercent, undefined, undefined, "t-div-up")

  }

  window.addEventListener('load', () => {
    setInterval(updateDate, 1000);
  });
})();

function getTimeDiv(hrs, mins = "", secs = "", className = "") {
  return `
       <div class="time-div ${className}">
        <span>
            ${ hrs }
            ${ !!mins.length ? `: ${ mins } :` : ""}
        <span/>
        ${secs.length ? `<span class="t-secs">${ secs }</span>` : ""}
       </div>
    `.replace(/[\n\t ]/, "");
}







