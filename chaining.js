"use strict";


var all = [1, 2, 3];


initialize('yellow');

function initialize(color) {
  const elem = document.getElementById('sample1');
  elem.innerHTML = all.map(i =>
    `<circle id="c${i}" cx="80" cy="${i*25}" r="10" style="fill: ${color}"><animateMotion dur="12s" values="80,${i*25};400,${i*25}"/></circle>`
  ).join('');
}

function setState(elem, color, position) {
  elem.setAttribute("cx", position);
  elem.setAttribute("style", `fill: ${color}`);
}


function delayPromise(resolve, timeout) {
  return new Promise(function (fulfill, reject) {
    setTimeout(() => {
      fulfill(resolve);
    }, 3000);
  });
}

function start() {
  initialize('black');

  var ps = all.map(
    n => {
      const elem = document.getElementById('c' + n);
      return delayPromise(n, 3000).then(function (f) {
        setState(elem, 'blue', 80);
        return f;
      })
    }
  );


  /*
  n => new Promise(function (fulfill, reject) {
    const elem = document.getElementById('c' + n);
    elem.setAttribute("style", "fill: red");
    setTimeout(() => {
      elem.setAttribute("style", "fill: blue");
      fulfill(n);
    }, 3000);
  })*/

  /*
    for (let i = 0; i < ps.length - 1; i++) {
      ps[i].then(r => {
        r(ps[i + 1]);
      });
    }
  */

  ps[ps.length - 1].then(v => {
    initialize('green');
  });
}

/*
.reduce((p, c) => {
  return p ? p.then(c) : c;
}).then(
  (v) => console.log(`done`)
);
*/
