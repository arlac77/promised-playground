"use strict";

const ps = [1, 2, 3, 4, 5, 6].map(
  n => new Promise(function (resolve, reject) {
    console.log(`start ${n}`);
    setTimeout(() => {
      console.log(`resolve ${n}`);
      resolve(n);
    }, 1000);
  })
);

for (let i = 0; i < ps.length - 1; i++) {
  ps[i].then((r) => {
    console.log('then');
    r(ps[i + 1]);
  });
}

ps[ps.length - 1].then(v => console.log(`done`));

/*
.reduce((p, c) => {
  return p ? p.then(c) : c;
}).then(
  (v) => console.log(`done`)
);
*/
