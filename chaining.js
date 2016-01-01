"use strict";


var all = [1, 2, 3, 4, 5];

initialize('green');

function initialize(color) {
  const elem = document.getElementById('sample1');
  elem.innerHTML = all.map(id =>
    `<circle id="c${id}" cx="50" cy="${id*25}" r="10" style="fill: ${color}"></circle>`
  ).join('');
}

function setState(id, color, position, run) {
  const elem = document.getElementById('c' + id);

  if (position !== undefined) {
    elem.setAttribute("cx", position);
  }

  elem.setAttribute("cy", id * 25);
  elem.setAttribute("style", `fill: ${color}`);
  if (run) {
    elem.innerHTML = `<animateMotion dur="12s" values="0,0;400,0"/></circle>`;
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
      setState(id, 'blue', 50, true);
    }).then(() => delayedPromise(2000).then(r => {
      setState(id, 'black', undefined, false);
      return r;
    }));
  }, Promise.resolve()).then(
    () => initialize('green')
  );
}
