var points = []
var mult = 0.002;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(30);

    var density = 100;
    var space = width / density;

    for (var x = 0; x < width; x += space) {
        for (var y = 0; y < height; y += space) {
            var p = createVector(x, y);
            points.push(p);
        }
    }
}

function draw() {
    // Draw a transparent background to fade previous frames slightly
    fill(30, 30, 30, 20); // RGB color with alpha for transparency
    rect(0, 0, width, height);

    noStroke();
    fill(255);

    for (var i = 0; i < points.length; i++) {
        var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 760);
        points[i].add(createVector(cos(angle), sin(angle)));

        // Draw the point as an ellipse
        ellipse(points[i].x, points[i].y, 1);
    }
}
