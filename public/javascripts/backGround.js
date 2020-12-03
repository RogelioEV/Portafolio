var app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "0xFFFFFF",
  antialias: true
});
for (let i = 0; i < 3; i++) {
  app.stage.addChild(new Donnut(app));
  app.stage.addChild(new MultiCircle(app));
  app.stage.addChild(new ConcentricCircles(app));
  app.stage.addChild(new Cross(app));
}
for (let i = 0; i < 8; i++) app.stage.addChild(new Line(app));
// var c = new BasicShape(app);
// c.x = c.y = 500;
// c.dx = c.dy = 0;
// app.stage.addChild(c);
app.replaceShape = function(shape) {
  switch (shape) {
    case 1:
      app.stage.addChild(new Line(app));
      break;
    case 2:
      app.stage.addChild(new Donnut(app));
      break;
    case 3:
      app.stage.addChild(new ConcentricCircles(app));
      break;
    case 4:
      app.stage.addChild(new MultiCircle(app));
      break;
    case 5:
      app.stage.addChild(new Cross(app));
      break;
    default:
      break;
  }
};
app.ticker.add(() => {
  app.stage.children.forEach(c => {
    if (typeof c.animate === "function") c.animate();
  });
});
$(".background").append(app.view);

window.addEventListener("resize", () => {
  app.width = document.documentElement.clientWidth;
  app.height = document.documentElement.clientHeight;
  console.log("ola");
});
