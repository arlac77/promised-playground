"use strict";


var all = [1, 2, 3, 4, 5, 6];


initialize('yellow');

function initialize(color) {
  const elem = document.getElementById('sample1');
  elem.innerHTML = all.map(i => `<circle id="c${i}" cx="80" cy="${i*25}" r="10" style="fill: ${color}"/>`).join('');
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
        elem.setAttribute("style", "fill: blue");
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
