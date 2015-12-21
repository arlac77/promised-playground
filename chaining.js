"use strict";


let all = [1, 2, 3, 4, 5, 6];


initialize('yellow');

function initialize(color) {
  const elem = document.getElementById('sample1');
  elem.innerHTML = all.map(i => `<circle id="c${i}" cx="80" cy="${i*25}" r="10" style="fill: ${color}"/>`).join('');
}

function start() {
  initialize('black');

  var ps = all.map(
    n => new Promise(function (fulfill, reject) {
      const elem = document.getElementById('c' + n);
      elem.setAttribute("style", "fill: red");
      setTimeout(() => {
        elem.setAttribute("style", "fill: blue");
        fulfill(n);
      }, 3000);
    })
  );

  for (let i = 0; i < ps.length - 1; i++) {
    ps[i].then(r => {
      r(ps[i + 1]);
    });
  }

  ps[ps.length - 1].then(v => {
    initialize('black');
  });
}

/*
.reduce((p, c) => {
  return p ? p.then(c) : c;
}).then(
  (v) => console.log(`done`)
);
*/
