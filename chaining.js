"use strict";

var all = [1, 2, 3, 4, 5, 6];

var ps = all.map(
  n => new Promise(function (resolve, reject) {
    let elem = document.getElementById('c' + n);
    elem.setAttribute("style", "fill: red");
    setTimeout(() => {
      elem.setAttribute("style", "fill: blue");
      resolve(n);
    }, 2000);
  })
);

for (let i = 0; i < ps.length - 1; i++) {
  ps[i].then((r) => {
    r(ps[i + 1]);
  });
}

function start() {
  ps[ps.length - 1].then(v => {
    all.forEach(n => document.getElementById('c' + n).setAttribute("style", "fill: black"));
  });
}

/*
.reduce((p, c) => {
  return p ? p.then(c) : c;
}).then(
  (v) => console.log(`done`)
);
*/
