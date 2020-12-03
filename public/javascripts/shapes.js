var colors = ["0xeb4292", "0xff924f", "0x4a1dff", "0x3bebe3", "0x40ff33"];
function rng(min, max, neg) {
  neg = neg || false;

  if (Math.random() < 0.5 && neg)
    return -Math.floor(Math.random() * (max - min) + min);
  else return Math.floor(Math.random() * (max - min) + min);
}
PIXI.Graphics.prototype.spawnPoint = function() {
  switch (rng(0, 4)) {
    case 0:
      this.x = 0 - this.getBounds().width / this.p;
      this.y = rng(0, window.innerWidth);
      this.dx = rng(2, 4);
      this.dy = rng(2, 4, true);
      break;
    case 1:
      this.y = 0 - this.getBounds().height / this.p;
      this.x = rng(0, window.innerWidth);
      this.dy = rng(2, 4);
      this.dx = rng(2, 4, true);
      break;
    case 2:
      this.x = window.innerWidth + this.getBounds().width / this.p;
      this.y = rng(0, window.innerWidth);
      this.dx = -rng(2, 4);
      this.dy = rng(2, 4, true);
      break;
    case 3:
      this.x = rng(0, window.innerWidth);
      this.y = window.innerHeight + this.getBounds().height / this.p;
      this.dy = -rng(2, 4);
      this.dx = rng(2, 4, true);
      break;
  }
  this.da = 0;
};
PIXI.Graphics.prototype.animate = function() {
  this.x += this.dx;
  this.y += this.dy;
  this.angle += this.da;
  if (this.checkCollitions(this.p)) {
    this.app.replaceShape(this.type);
    this.destroy();
  }
};
PIXI.Graphics.prototype.checkCollitions = function(pivot) {
  return (
    this.x - this.getBounds().width / pivot > window.innerWidth ||
    this.y + this.getBounds().height / pivot < 0 ||
    this.x + this.getBounds().width / pivot < 0 ||
    this.y - this.getBounds().height / pivot > window.innerHeight
  );
};
class Line extends PIXI.Graphics {
  constructor(app) {
    super();
    this.app = app;
    this.init();
  }
  init() {
    this.color = colors[rng(0, colors.length)];
    this.type = 1;
    this.p = 1;
    this.w = 30;
    this.h = rng(550, 800);
    this.angle = 60;
    this.spd = rng(3, 7);
    this.dx = Math.cos(Math.PI / 6) * this.spd;
    this.dy = -Math.sin(Math.PI / 6) * this.spd;
    this.da = 0;
    this.beginFill(this.color)
      .lineStyle(1, this.color)
      .drawRoundedRect(0, 0, this.w, this.h, 18)
      .endFill();
    if (rng(0, 2)) {
      this.x = rng(0, window.innerWidth);
      this.y = window.innerHeight;
    } else {
      this.y = rng(0, window.innerWidth);
      this.x = 0;
    }
  }
}
class Donnut extends PIXI.Graphics {
  constructor(app) {
    super();
    this.app = app;
    this.init();
  }
  init() {
    this.c = colors[rng(0, colors.length)];
    this.type = 2;
    this.p = 2;
    this.radius = rng(50, 200);
    this.rm = this.radius * 0.75;
    this.beginFill(this.c)
      .lineStyle(1, this.c)
      .drawCircle(0, 0, this.radius)
      .endFill()
      .beginHole()
      .drawCircle(0, 0, this.rm)
      .endHole()
      .spawnPoint();
  }
}
class ConcentricCircles extends PIXI.Graphics {
  constructor(app) {
    super();
    this.app = app;
    this.init();
  }
  init() {
    this.color = colors[rng(0, colors.length)];
    this.type = 3;
    this.p = 2;
    this.c = rng(3, 6);
    this.radius = rng(50, 200);
    this.beginFill(this.color, 0).lineStyle(3, this.color);
    for (let i = 1; i <= this.c; i++)
      this.drawCircle(0, 0, (this.radius * i) / this.c);
    this.endFill().spawnPoint();
  }
}
class MultiCircle extends PIXI.Graphics {
  constructor(app) {
    super();
    this.app = app;
    this.init();
  }
  init() {
    this.color = colors[rng(0, colors.length)];
    this.p = 2;
    this.type = 4;
    this.radius = rng(100, 200);
    this.c = rng(8, 13);
    this.s = (this.radius * 2) / this.c;
    this.beginFill(this.color).lineStyle(1, this.color);
    for (let i = 0; i < this.c; i++) {
      for (let j = 0; j < this.c; j++) {
        this.drawCircle(
          -this.radius + this.s * (i + 1 / 6),
          -this.radius + this.s * (j + 1 / 6),
          (this.s * 1) / 3
        );
      }
    }
    this.endFill().spawnPoint();
    this.angle = rng(0, 90);
    this.da = rng(5, 10) / 10;
  }
}
class Cross extends PIXI.Graphics {
  constructor(app) {
    super();
    this.app = app;
    this.init();
  }
  init() {
    this.color = colors[rng(0, colors.length)];
    this.radius = rng(100, 300);
    this.p = 2;
    this.type = 5;
    this.ratio = 3.5;
    this.beginFill(this.color)
      .lineStyle(1, this.color)
      .drawRoundedRect(
        -this.radius / 2,
        -this.radius / (this.ratio * 2),
        this.radius,
        this.radius / this.ratio,
        this.radius / (this.ratio * 1.85)
      )
      .drawRoundedRect(
        -this.radius / (this.ratio * 2),
        -this.radius / 2,
        this.radius / this.ratio,
        this.radius,
        this.radius / (this.ratio * 1.85)
      )
      .endFill()
      .spawnPoint();
    this.da = rng(1, 3);
  }
}
class BasicShape extends PIXI.Graphics {
  constructor(app) {
    super();
    this.app = app;
    this.init();
  }
  init() {
    this.color = colors[rng(0, colors.length)];
    this.p = 2;
    this.type = 6;
    this.radius = rng(100, 200);
    if (Math.random() < 0.5) this.beginFill("0xffffff");
    else this.beginFill(this.color);
    this.lineStyle(1, this.color);
    switch (rng(1, 3)) {
      case 1:
        this.drawRect(0, 0, this.radius, this.radius);
        break;
      case 2:
        this.drawCircle(0, 0, this.radius);
        break;
      case 3:
        this.drawPolygon([
          new PIXI.Point(-this.radius, (Math.sqrt(3) * this.radius) / 12),
          new PIXI.Point(this.radius, (Math.sqrt(3) * this.radius) / 12),
          new PIXI.Point(0, (Math.sqrt(3) * 5 * this.radius) / 12)
        ]);
      default:
        break;
    }

    this.da = 0;
  }
}
