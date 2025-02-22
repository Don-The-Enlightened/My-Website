Function.prototype.bind = Function.prototype.bind ||
  function (a) {
    var b = this;
    return function (c) {
      c instanceof Array ||
      (c = [
        c
      ]);
      b.apply(a, c)
    }
  };
(
  function () {
    function a(a) {
      this.el = a;
      a = a.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
      for (var b = 0; b < a.length; b++) c.call(this, a[b])
    }
    if (
      !(
        'undefined' === typeof window.Element ||
        'classList' in document.documentElement
      )
    ) {
      var b = Array.prototype,
        c = b.push,
        d = b.splice,
        e = b.join;
      a.prototype = {
        add: function (a) {
          this.contains(a) ||
          (c.call(this, a), this.el.className = this.toString())
        },
        contains: function (a) {
          return - 1 != this.el.className.indexOf(a)
        },
        item: function (a) {
          return this[a] ||
            null
        },
        remove: function (a) {
          if (this.contains(a)) {
            for (var b = 0; b < this.length && this[b] != a; b++);
            d.call(this, b, 1);
            this.el.className = this.toString()
          }
        },
        toString: function () {
          return e.call(this, ' ')
        },
        toggle: function (a) {
          this.contains(a) ? this.remove(a) : this.add(a);
          return this.contains(a)
        }
      };
      window.DOMTokenList = a;
      (
        function (a, b, c) {
          Object.defineProperty ? Object.defineProperty(a, b, {
            get: c
          }) : a.__defineGetter__(b, c)
        }
      ) (
        HTMLElement.prototype,
        'classList',
        function () {
          return new a(this)
        }
      )
    }
  }
) ();
(
  function () {
    for (
      var a = 0,
        b = [
          'webkit',
          'moz'
        ],
        c = 0;
      c < b.length &&
      !window.requestAnimationFrame;
      ++c
    ) window.requestAnimationFrame = window[b[c] + 'RequestAnimationFrame'],
      window.cancelAnimationFrame = window[b[c] + 'CancelAnimationFrame'] ||
        window[b[c] + 'CancelRequestAnimationFrame'];
    window.requestAnimationFrame ||
    (
      window.requestAnimationFrame = function (b, c) {
        var d = (new Date).getTime(),
          e = Math.max(0, 16 - (d - a)),
          h = window.setTimeout(function () {
            b(d + e)
          }, e);
        a = d + e;
        return h
      }
    );
    window.cancelAnimationFrame ||
    (window.cancelAnimationFrame = function (a) {
      clearTimeout(a)
    })
  }
) ();
(
  function () {
    var a = self.navigator,
      b = String,
      c = Object.prototype.hasOwnProperty,
      d = {},
      e = {},
      f = /^\s*application\/(?:vnd\.oftn\.|x-)?l10n\+json\s*(?:$|;)/i,
      g = Array.prototype.indexOf ||
        function (a) {
          for (var b = this.length, c = 0; c < b; c++) if (c in this && this[c] === a) return c;
          return - 1
        },
      h = function (a) {
        var b = new r;
        b.open('GET', a, !1);
        b.send(null);
        return 200 !== b.status ? (
          setTimeout(
            function () {
              var b = Error('Unable to load localization data: ' + a);
              b.name = 'Localization Error';
              throw b;
            },
            0
          ),
            {
            }
        ) : JSON.parse(b.responseText)
      },
      p = b.toLocaleString = function (a) {
        if (0 < arguments.length && 'number' !== typeof a) if ('string' === typeof a) p(h(a));
        else if (!1 === a) e = {};
        else {
          var f;
          for (l in a) if (c.call(a, l)) {
            var g = a[l];
            var l = l.toLowerCase();
            l in e &&
            !1 !== g ||
            (e[l] = {});
            if (!1 !== g) {
              if ('string' === typeof g) if (0 === b.locale.toLowerCase().indexOf(l)) g = h(g);
              else {
                l in d ||
                (d[l] = []);
                d[l].push(g);
                continue
              }
              for (f in g) c.call(g, f) &&
              (e[l][f] = g[f])
            }
          }
        }
        return Function.prototype.toLocaleString.apply(b, arguments)
      },
      u,
      n = b.prototype.toLocaleString = function () {
        if ('undefined' === typeof this) return this;
        var a = u,
          c = b[a ? 'defaultLocale' : 'locale'].toLowerCase().split('-'),
          f = c.length,
          g = this.valueOf();
        u = !1;
        do {
          var k = c.slice(0, f).join('-');
          if (k in d) {
            for (var m, q = k, r = d[q], v = 0, t = r.length; v < t; v++) m = {},
              m[q] = h(r[v]),
              p(m);
            delete d[q]
          }
          if (k in e && g in e[k]) return e[k][g]
        } while (1 < f--);
        return !a &&
        b.defaultLocale ? (u = !0, n.call(g)) : g
      };
    if (
      'undefined' === typeof XMLHttpRequest &&
      'undefined' !== typeof ActiveXObject
    ) {
      var q = ActiveXObject;
      var r = function () {
        try {
          return new q('Msxml2.XMLHTTP.6.0')
        } catch (w) {
        }
        try {
          return new q('Msxml2.XMLHTTP.3.0')
        } catch (w) {
        }
        try {
          return new q('Msxml2.XMLHTTP')
        } catch (w) {
        }
        throw Error('XMLHttpRequest not supported by this browser.');
      }
    } else r = XMLHttpRequest;
    b.defaultLocale = b.defaultLocale ||
      '';
    b.locale = a &&
      (a.language || a.userLanguage) ||
      '';
    if ('undefined' !== typeof document) {
      a = document.getElementsByTagName('link');
      for (var t = a.length, k; t--; ) {
        var m = a[t];
        k = (m.getAttribute('rel') || '').toLowerCase().split(/\s+/);
        f.test(m.type) &&
        (
          - 1 !== g.call(k, 'localizations') ? p(m.getAttribute('href')) : - 1 !== g.call(k, 'localization') &&
            (
              k = {},
                k[(m.getAttribute('hreflang') || '').toLowerCase()] = m.getAttribute('href'),
                p(k)
            )
        )
      }
    }
  }
) ();
function Localize(a) {
  return ('%' + a).toLocaleString()
}
function LocalizeElement(a) {
  var b = document.getElementsByClassName(a);
  b[0] &&
  (b[0].innerHTML = Localize(a))
}
String.toLocaleString({
  it: {
    '%game-intro': 'Join <strong>Carti!</strong>',
    '%restart-button': 'New Game',
    '%keep-playing-button': 'Keep going',
    '%retry-button': 'Retry',
    '%game-won': 'You win!',
    '%game-over': 'Game over!',
    '%tweet1': 'I scored "',
    '%tweet2': ' at 2048 Carti #2048game',
    '%tile-legend': '<strong class="important">Tile Legend:</strong>',
    '%2': 'vanilla birthday',
    '%4': 'bubblegum pink',
    '%8': 'sunshine vanilla',
    '%16': 'valrhona blonde ganache',
    '%32': 'chocolare peanut butter cheesecake',
    '%64': 'chocolate mint fudge',
    '%128': 'chocolate spider web',
    '%256': 'toasted marshmallow',
    '%512': 'cookies and creme',
    '%1024': 'chocolate sundae',
    '%2048': 'white chocolate peppermint',
    '%4096': '2017 Confetti Vanilla',
    '%8192': 'Rainbow',
    '%p0': 'vanilla birthday',
    '%p4': 'bubblegum pink',
    '%p8': 'sunshine vanilla',
    '%p16': 'valrhona blonde ganache',
    '%p32': 'choc. peanut butter cheesecake',
    '%p64': 'choc. mint fudge',
    '%p128': 'choc. spider web',
    '%p256': 'toasted marshmallow',
    '%p512': 'cookies and creme',
    '%p1024': 'choc. sundae',
    '%p2048': 'white choc. peppermint',
    '%p4096': '2017 Confetti Vanilla',
    '%p8192': 'Rainbow'
  },
  en: {
    '%game-intro': 'Join the <strong>Carti!</strong>',
    '%restart-button': 'New Game',
    '%keep-playing-button': 'Keep going',
    '%retry-button': 'Retry',
    '%game-won': 'You win!',
    '%game-over': 'Game over!',
    '%tweet1': 'I scored "',
    '%tweet2': ' at 2048 Carti #2048game',
    '%tile-legend': '<strong class="important">Tile Legend:</strong>',
    '%2': 'vanilla birthday',
    '%4': 'bubblegum pink',
    '%8': 'sunshine vanilla',
    '%16': 'valrhona blonde ganache',
    '%32': 'chocolare peanut butter cheesecake',
    '%64': 'chocolate mint fudge',
    '%128': 'chocolate spider web',
    '%256': 'toasted marshmallow',
    '%512': 'cookies and creme',
    '%1024': 'chocolate sundae',
    '%2048': 'white chocolate peppermint',
    '%4096': '2017 Confetti Vanilla',
    '%8192': 'Rainbow',
    '%p0': 'vanilla birthday',
    '%p4': 'bubblegum pink',
    '%p8': 'sunshine vanilla',
    '%p16': 'valrhona blonde ganache',
    '%p32': 'choc. peanut butter cheesecake',
    '%p64': 'choc. mint fudge',
    '%p128': 'choc. spider web',
    '%p256': 'toasted marshmallow',
    '%p512': 'cookies and creme',
    '%p1024': 'choc. sundae',
    '%p2048': 'white choc. peppermint',
    '%p4096': '2017 Confetti Vanilla',
    '%p8192': 'Rainbow'
  }
});
function KeyboardInputManager() {
  this.events = {};
  window.navigator.msPointerEnabled ? (
    this.eventTouchstart = 'MSPointerDown',
      this.eventTouchmove = 'MSPointerMove',
      this.eventTouchend = 'MSPointerUp'
  ) : (
    this.eventTouchstart = 'touchstart',
      this.eventTouchmove = 'touchmove',
      this.eventTouchend = 'touchend'
  );
  this.listen()
}
KeyboardInputManager.prototype.on = function (a, b) {
  this.events[a] ||
  (this.events[a] = []);
  this.events[a].push(b)
};
KeyboardInputManager.prototype.emit = function (a, b) {
  var c = this.events[a];
  c &&
  c.forEach(function (a) {
    a(b)
  })
};
KeyboardInputManager.prototype.listen = function () {
  var a = this,
    b = {
      38: 0,
      39: 1,
      40: 2,
      37: 3,
      75: 0,
      76: 1,
      74: 2,
      72: 3,
      87: 0,
      68: 1,
      83: 2,
      65: 3
    };
  document.addEventListener(
    'keydown',
    function (c) {
      var d = c.altKey ||
          c.ctrlKey ||
          c.metaKey ||
          c.shiftKey,
        f = b[c.which];
      d ||
      void 0 === f ||
      (c.preventDefault(), a.emit('move', f));
      d ||
      82 !== c.which ||
      a.restart.call(a, c)
    }
  );
  this.bindButtonPress('.retry-button', this.restart);
  this.bindButtonPress('.restart-button', this.restart);
  this.bindButtonPress('.keep-playing-button', this.keepPlaying);
  var c,
    d,
    e = document.getElementsByClassName('game-container') [0];
  e.addEventListener(
    this.eventTouchstart,
    function (a) {
      !window.navigator.msPointerEnabled &&
      1 < a.touches.length ||
      1 < a.targetTouches ||
      (
        window.navigator.msPointerEnabled ? (c = a.pageX, d = a.pageY) : (c = a.touches[0].clientX, d = a.touches[0].clientY),
          a.preventDefault()
      )
    }
  );
  e.addEventListener(this.eventTouchmove, function (a) {
    a.preventDefault()
  });
  e.addEventListener(
    this.eventTouchend,
    function (b) {
      if (
        !(
          !window.navigator.msPointerEnabled &&
          0 < b.touches.length ||
          0 < b.targetTouches
        )
      ) {
        if (window.navigator.msPointerEnabled) {
          var e = b.pageX;
          var f = b.pageY
        } else e = b.changedTouches[0].clientX,
          f = b.changedTouches[0].clientY;
        e -= c;
        b = Math.abs(e);
        f -= d;
        var p = Math.abs(f);
        10 < Math.max(b, p) &&
        a.emit('move', b > p ? 0 < e ? 1 : 3 : 0 < f ? 2 : 0)
      }
    }
  )
};
KeyboardInputManager.prototype.restart = function (a) {
  a.preventDefault();
  this.emit('restart')
};
KeyboardInputManager.prototype.keepPlaying = function (a) {
  a.preventDefault();
  this.emit('keepPlaying')
};
KeyboardInputManager.prototype.crowd = function (a) {
  a.preventDefault();
  this.emit('crowd')
};
KeyboardInputManager.prototype.bindButtonPress = function (a, b) {
  var c = document.querySelector(a);
  c.addEventListener('click', b.bind(this));
  c.addEventListener(this.eventTouchend, b.bind(this))
};
function HTMLActuator() {
  this.tileContainer = document.querySelector('.tile-container');
  this.scoreContainer = document.querySelector('.score-container');
  this.scorePoints = document.querySelector('.score-points');
  this.bestContainer = document.querySelector('.best-container');
  this.bestPoints = document.querySelector('.best-points');
  this.messageContainer = document.querySelector('.game-message');
  this.sharingContainer = document.querySelector('.score-sharing');
  this.points = this.score = 0
}
HTMLActuator.prototype.actuate = function (a, b) {
  var c = this;
  window.requestAnimationFrame(
    function () {
      c.clearContainer(c.tileContainer);
      a.cells.forEach(function (a) {
        a.forEach(function (a) {
          a &&
          c.addTile(a)
        })
      });
      c.updateScore(b.score, b.points);
      c.updateBestScore(b.bestScore, b.bestPoints);
      b.terminated &&
      (b.over ? c.message(!1) : b.won && c.message(!0))
    }
  )
};
HTMLActuator.prototype.continueGame = function () {
  this.clearMessage()
};
HTMLActuator.prototype.clearContainer = function (a) {
  for (; a.firstChild; ) a.removeChild(a.firstChild)
};
HTMLActuator.prototype.addTile = function (a) {
  var b = this,
    c = document.createElement('div'),
    d = document.createElement('div'),
    e = document.createElement('img'),
    f = this.positionClass(a.previousPosition || {
      x: a.x,
      y: a.y
    }),
    g = [
      'tile',
      'tile-' + a.value,
      f
    ];
  2048 < a.value &&
  g.push('tile-super');
  this.applyClasses(c, g);
  d.classList.add('tile-inner');
  e.src = '/img/' + a.value + '.jpg';
  d.appendChild(e);
  a.previousPosition ? window.requestAnimationFrame(
    function () {
      g[2] = b.positionClass({
        x: a.x,
        y: a.y
      });
      b.applyClasses(c, g)
    }
  ) : a.mergedFrom ? (
    g.push('tile-merged'),
      this.applyClasses(c, g),
      a.mergedFrom.forEach(function (a) {
        b.addTile(a)
      })
  ) : (g.push('tile-new'), this.applyClasses(c, g));
  c.appendChild(d);
  this.tileContainer.appendChild(c)
};
HTMLActuator.prototype.applyClasses = function (a, b) {
  a.setAttribute('class', b.join(' '))
};
HTMLActuator.prototype.normalizePosition = function (a) {
  return {
    x: a.x + 1,
    y: a.y + 1
  }
};
HTMLActuator.prototype.positionClass = function (a) {
  a = this.normalizePosition(a);
  return 'tile-position-' + a.x + '-' + a.y
};
HTMLActuator.prototype.updateScore = function (a, b) {
  this.clearContainer(this.scoreContainer);
  this.clearContainer(this.scorePoints);
  var c = a - this.score;
  this.score = a;
  var d = b - this.points;
  this.points = b;
  this.scorePoints.textContent = this.points;
  this.scoreContainer.textContent = Localize('p' + this.score);
  0 < c &&
  (
    c = document.createElement('div'),
      c.classList.add('score-addition'),
      c.textContent = Localize('p' + this.score),
      this.scoreContainer.appendChild(c)
  );
  0 < d &&
  (
    c = document.createElement('div'),
      c.classList.add('score-addition'),
      c.textContent = '+' + d,
      this.scorePoints.appendChild(c)
  )
};
HTMLActuator.prototype.updateBestScore = function (a, b) {
  this.bestContainer.textContent = Localize('p' + a);
  this.bestPoints.textContent = b
};
HTMLActuator.prototype.message = function (a) {
  a = a ? 'game-won' : 'game-over';
  var b = Localize(a);
  this.messageContainer.classList.add(a);
  this.messageContainer.getElementsByTagName('p') [0].textContent = b;
  this.clearContainer(this.sharingContainer);
  this.sharingContainer.appendChild(this.scoreTweetButton());
  twttr.widgets.load()
};
HTMLActuator.prototype.clearMessage = function () {
  this.messageContainer.classList.remove('game-won');
  this.messageContainer.classList.remove('game-over')
};
HTMLActuator.prototype.scoreTweetButton = function () {
  var a = document.createElement('a');
  a.classList.add('twitter-share-button');
  a.setAttribute('href', 'https://twitter.com/share');
  a.setAttribute('data-url', 'https://2048Carti.org');
  a.setAttribute('data-counturl', 'https://2048Carti.org');
  a.textContent = 'Tweet';
  var b = Localize('tweet1') + Localize(this.score).toUpperCase() + '", ' + this.points + ' Kcal ' + Localize('tweet2');
  a.setAttribute('data-text', b);
  return a
};
function Grid(a, b) {
  this.size = a;
  this.cells = b ? this.fromState(b) : this.empty()
}
Grid.prototype.empty = function () {
  for (var a = [], b = 0; b < this.size; b++) for (var c = a[b] = [], d = 0; d < this.size; d++) c.push(null);
  return a
};
Grid.prototype.fromState = function (a) {
  for (var b = [], c = 0; c < this.size; c++) for (var d = b[c] = [], e = 0; e < this.size; e++) {
    var f = a[c][e];
    d.push(f ? new Tile(f.position, f.value) : null)
  }
  return b
};
Grid.prototype.randomAvailableCell = function () {
  var a = this.availableCells();
  if (a.length) return a[Math.floor(Math.random() * a.length)]
};
Grid.prototype.availableCells = function () {
  var a = [];
  this.eachCell(function (b, c, d) {
    d ||
    a.push({
      x: b,
      y: c
    })
  });
  return a
};
Grid.prototype.eachCell = function (a) {
  for (var b = 0; b < this.size; b++) for (var c = 0; c < this.size; c++) a(b, c, this.cells[b][c])
};
Grid.prototype.cellsAvailable = function () {
  return !!this.availableCells().length
};
Grid.prototype.cellAvailable = function (a) {
  return !this.cellOccupied(a)
};
Grid.prototype.cellOccupied = function (a) {
  return !!this.cellContent(a)
};
Grid.prototype.cellContent = function (a) {
  return this.withinBounds(a) ? this.cells[a.x][a.y] : null
};
Grid.prototype.insertTile = function (a) {
  this.cells[a.x][a.y] = a
};
Grid.prototype.removeTile = function (a) {
  this.cells[a.x][a.y] = null
};
Grid.prototype.withinBounds = function (a) {
  return 0 <= a.x &&
    a.x < this.size &&
    0 <= a.y &&
    a.y < this.size
};
Grid.prototype.serialize = function () {
  for (var a = [], b = 0; b < this.size; b++) for (var c = a[b] = [], d = 0; d < this.size; d++) c.push(this.cells[b][d] ? this.cells[b][d].serialize() : null);
  return {
    size: this.size,
    cells: a
  }
};
function Tile(a, b) {
  this.x = a.x;
  this.y = a.y;
  this.value = b ||
    2;
  this.mergedFrom = this.previousPosition = null
}
Tile.prototype.savePosition = function () {
  this.previousPosition = {
    x: this.x,
    y: this.y
  }
};
Tile.prototype.updatePosition = function (a) {
  this.x = a.x;
  this.y = a.y
};
Tile.prototype.serialize = function () {
  return {
    position: {
      x: this.x,
      y: this.y
    },
    value: this.value
  }
};
window.fakeStorage = {
  _data: {
  },
  setItem: function (a, b) {
    return this._data[a] = String(b)
  },
  getItem: function (a) {
    return this._data.hasOwnProperty(a) ? this._data[a] : void 0
  },
  removeItem: function (a) {
    return delete this._data[a]
  },
  clear: function () {
    return this._data = {}
  }
};
function LocalStorageManager() {
  this.bestScoreKey = 'bestScoreCarti';
  this.bestPointsKey = 'bestPointsCarti';
  this.gameStateKey = 'gameStateCarti';
  this.storage = this.localStorageSupported() ? window.localStorage : window.fakeStorage
}
LocalStorageManager.prototype.localStorageSupported = function () {
  var a = window.localStorage;
  try {
    return a.setItem('test', '1'),
      a.removeItem('test'),
      !0
  } catch (b) {
    return !1
  }
};
LocalStorageManager.prototype.getBestScore = function () {
  return this.storage.getItem(this.bestScoreKey) ||
    0
};
LocalStorageManager.prototype.setBestScore = function (a) {
  this.storage.setItem(this.bestScoreKey, a)
};
LocalStorageManager.prototype.getBestPoints = function () {
  return this.storage.getItem(this.bestPointsKey) ||
    0
};
LocalStorageManager.prototype.setBestPoints = function (a) {
  this.storage.setItem(this.bestPointsKey, a)
};
LocalStorageManager.prototype.getGameState = function () {
  var a = this.storage.getItem(this.gameStateKey);
  return a ? JSON.parse(a) : null
};
LocalStorageManager.prototype.setGameState = function (a) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(a))
};
LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey)
};
function GameManager(a, b, c, d) {
  this.size = a;
  this.inputManager = new b;
  this.storageManager = new d;
  this.actuator = new c;
  this.startTiles = 2;
  this.inputManager.on('move', this.move.bind(this));
  this.inputManager.on('restart', this.restart.bind(this));
  this.inputManager.on('keepPlaying', this.keepPlaying.bind(this));
  this.setup()
}
function kcal(a) {
  var b = [
    ,
    ,
    200,
    ,
    250,
    ,
    ,
    ,
    320
  ];
  b[16] = 400;
  b[32] = 500;
  b[64] = 650;
  b[128] = 820;
  b[256] = 1000;
  b[512] = 1200;
  b[1024] = 1500;
  b[2048] = 2000;
  b[4096] = 3000;
  b[8192] = 5000;
  return b[a]
}
GameManager.prototype.restart = function () {
  this.storageManager.clearGameState();
  this.actuator.continueGame();
  this.setup()
};
GameManager.prototype.crowd = function () {
  this.storageManager.clearGameState();
  this.actuator.continueGame();
  this.grid = new Grid(this.size);
  this.points = this.score = 0;
  this.keepPlaying = this.won = this.over = !1;
  this.actuate();
  for (var a = 0, b = 0; 3 > b; b++) for (var c = 0; 4 > c; c++) {
    a++;
    var d = Math.pow(2, a),
      e = new Tile({
        x: c,
        y: b
      }, d);
    8192 >= d &&
    this.grid.insertTile(e)
  }
};
GameManager.prototype.keepPlaying = function () {
  this.keepPlaying = !0;
  this.actuator.continueGame()
};
GameManager.prototype.isGameTerminated = function () {
  return this.over ||
  this.won &&
  !this.keepPlaying ? !0 : !1
};
GameManager.prototype.setup = function () {
  var a = this.storageManager.getGameState();
  a ? (
    this.grid = new Grid(a.grid.size, a.grid.cells),
      this.score = a.score,
      this.points = a.points,
      this.over = a.over,
      this.won = a.won,
      this.keepPlaying = a.keepPlaying
  ) : (
    this.grid = new Grid(this.size),
      this.points = this.score = 0,
      this.keepPlaying = this.won = this.over = !1,
      this.addStartTiles()
  );
  this.localizeElements();
  this.fillLegend();
  this.actuate()
};
GameManager.prototype.localizeElements = function () {
  var a = [
      'game-intro',
      'restart-button',
      'retry-button',
      'keep-playing-button',
      'tile-legend'
    ],
    b;
  for (b in a) LocalizeElement(a[b])
};
GameManager.prototype.fillLegend = function () {
  for (
    var a = document.getElementsByClassName('tile-legend'),
      b = 1;
    13 >= b;
    b++
  ) {
    var c = Math.pow(2, b),
      d = document.createElement('div'),
      e = document.createElement('div'),
      f = document.createElement('div'),
      g = document.createElement('img'),
      h = document.createElement('p');
    d.classList.add('legend-row');
    e.classList.add('legend-grid');
    f.classList.add('legend-cell');
    f.classList.add('cell-' + c);
    g.src = '/img/' + c + '.jpg';
    f.appendChild(g);
    e.appendChild(f);
    d.appendChild(e);
    h.textContent = Localize(c) + '  (' + kcal(c) + ' Kcal)';
    d.appendChild(h);
    a[0].appendChild(d)
  }
};
GameManager.prototype.addStartTiles = function () {
  for (var a = 0; a < this.startTiles; a++) this.addRandomTile()
};
GameManager.prototype.addRandomTile = function () {
  if (this.grid.cellsAvailable()) {
    var a = 0.9 > Math.random() ? 2 : 4;
    a = new Tile(this.grid.randomAvailableCell(), a);
    this.grid.insertTile(a)
  }
};
GameManager.prototype.actuate = function () {
  this.storageManager.getBestScore() < this.score &&
  this.storageManager.setBestScore(this.score);
  this.storageManager.getBestPoints() < this.points &&
  this.storageManager.setBestPoints(this.points);
  this.over ? this.storageManager.clearGameState() : this.storageManager.setGameState(this.serialize());
  this.actuator.actuate(
    this.grid,
    {
      score: this.score,
      points: this.points,
      over: this.over,
      won: this.won,
      bestScore: this.storageManager.getBestScore(),
      bestPoints: this.storageManager.getBestPoints(),
      terminated: this.isGameTerminated()
    }
  )
};
GameManager.prototype.serialize = function () {
  return {
    grid: this.grid.serialize(),
    score: this.score,
    points: this.points,
    over: this.over,
    won: this.won,
    keepPlaying: this.keepPlaying
  }
};
GameManager.prototype.prepareTiles = function () {
  this.grid.eachCell(function (a, b, c) {
    c &&
    (c.mergedFrom = null, c.savePosition())
  })
};
GameManager.prototype.moveTile = function (a, b) {
  this.grid.cells[a.x][a.y] = null;
  this.grid.cells[b.x][b.y] = a;
  a.updatePosition(b)
};
GameManager.prototype.move = function (a) {
  var b = this;
  if (!this.isGameTerminated()) {
    var c,
      d,
      e = this.getVector(a),
      f = this.buildTraversals(e),
      g = !1;
    this.prepareTiles();
    f.x.forEach(
      function (a) {
        f.y.forEach(
          function (f) {
            c = {
              x: a,
              y: f
            };
            if (d = b.grid.cellContent(c)) {
              f = b.findFarthestPosition(c, e);
              var h = b.grid.cellContent(f.next);
              if (h && h.value === d.value && !h.mergedFrom) {
                var n = new Tile(f.next, 2 * d.value);
                n.mergedFrom = [
                  d,
                  h
                ];
                b.grid.insertTile(n);
                b.grid.removeTile(d);
                d.updatePosition(f.next);
                b.points += 2 * kcal(d.value);
                n.value >
                b.score &&
                (b.score = n.value);
                if (2048 === n.value || 2048 === n.value) b.won = !0
              } else b.moveTile(d, f.farthest);
              b.positionsEqual(c, d) ||
              (g = !0)
            }
          }
        )
      }
    );
    g &&
    (
      this.addRandomTile(),
      this.movesAvailable() ||
      (this.over = !0),
        this.actuate()
    )
  }
};
GameManager.prototype.getVector = function (a) {
  return {
    0: {
      x: 0,
      y: - 1
    },
    1: {
      x: 1,
      y: 0
    },
    2: {
      x: 0,
      y: 1
    },
    3: {
      x: - 1,
      y: 0
    }
  }
    [
    a
    ]
};
GameManager.prototype.buildTraversals = function (a) {
  for (var b = {
    x: [],
    y: []
  }, c = 0; c < this.size; c++) b.x.push(c),
    b.y.push(c);
  1 === a.x &&
  (b.x = b.x.reverse());
  1 === a.y &&
  (b.y = b.y.reverse());
  return b
};
GameManager.prototype.findFarthestPosition = function (a, b) {
  do {
    var c = a;
    a = {
      x: c.x + b.x,
      y: c.y + b.y
    }
  } while (this.grid.withinBounds(a) && this.grid.cellAvailable(a));
  return {
    farthest: c,
    next: a
  }
};
GameManager.prototype.movesAvailable = function () {
  return this.grid.cellsAvailable() ||
    this.tileMatchesAvailable()
};
GameManager.prototype.tileMatchesAvailable = function () {
  for (var a, b = 0; b < this.size; b++) for (var c = 0; c < this.size; c++) if (a = this.grid.cellContent({
    x: b,
    y: c
  })) for (var d = 0; 4 > d; d++) {
    var e = this.getVector(d);
    if (
      (e = this.grid.cellContent({
        x: b + e.x,
        y: c + e.y
      })) &&
      e.value === a.value
    ) return !0
  }
  return !1
};
GameManager.prototype.positionsEqual = function (a, b) {
  return a.x === b.x &&
    a.y === b.y
};
window.requestAnimationFrame(
  function () {
    new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager)
  }
);
