"use strict";


var all = [1, 2, 3, 4, 5, 6];

initialize('yellow');

function initialize(color) {
  const elem = document.getElementById('sample1');
  elem.innerHTML = all.map(id =>
    `<circle id="c${id}" cx="80" cy="${id*25}" r="10" style="fill: ${color}"></circle>`
  ).join('');
}

function setState(id, color, position, run) {
  const elem = document.getElementById('c' + id);

  elem.setAttribute("cx", position);
  elem.setAttribute("cy", id * 25);
  elem.setAttribute("style", `fill: ${color}`);
  if (run) {
    elem.innerHTML = `<animateMotion dur="12s" values="${position},${id*25};400,${id*25}"/></circle>`;
  } else {
    elem.innerHTML = '';
  }
}

function delayedPromise(delay, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), delay);
  })
}

function start() {
  all.reduce((previous, id) => {
    return previous.then(f => {
      setState(id, 'blue', 80, true);
    }).then(() => delayedPromise(2000));
  }, Promise.resolve()).then(
    () => initialize('yellow')
  );
}
