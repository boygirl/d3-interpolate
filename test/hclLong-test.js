var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../");

tape("interpolateHclLong(a, b) converts a and b to HCL colors", function(test) {
  test.equal(interpolate.interpolateHclLong("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(interpolate.interpolateHclLong("steelblue", color.hcl("brown"))(1), color.rgb("brown") + "");
  test.equal(interpolate.interpolateHclLong("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("interpolateHclLong(a, b) interpolates in HCL and returns an RGB hexadecimal string", function(test) {
  test.equal(interpolate.interpolateHclLong("steelblue", "#f00")(.2), "#0090ae");
  test.end();
});

tape("interpolateHclLong(a, b) does not use the shortest path when interpolating hue", function(test) {
  var i = interpolate.interpolateHclLong(color.hcl(10, 50, 50), color.hcl(350, 50, 50));
  test.equal(i(0.0), "#c44f6a");
  test.equal(i(0.2), "#9c6f1d");
  test.equal(i(0.4), "#2e8745");
  test.equal(i(0.6), "#008aa5");
  test.equal(i(0.8), "#4376ca");
  test.equal(i(1.0), "#bd5187");
  test.end();
});

tape("interpolateHclLong(a, b) uses a’s hue when b’s hue is undefined", function(test) {
  test.equal(interpolate.interpolateHclLong("#f60", color.hcl(NaN, NaN, 0))(.5), "#9b0000");
  test.equal(interpolate.interpolateHclLong("#6f0", color.hcl(NaN, NaN, 0))(.5), "#008100");
  test.end();
});

tape("interpolateHclLong(a, b) uses b’s hue when a’s hue is undefined", function(test) {
  test.equal(interpolate.interpolateHclLong(color.hcl(NaN, NaN, 0), "#f60")(.5), "#9b0000");
  test.equal(interpolate.interpolateHclLong(color.hcl(NaN, NaN, 0), "#6f0")(.5), "#008100");
  test.end();
});

tape("interpolateHclLong(a, b) uses a’s chroma when b’s chroma is undefined", function(test) {
  test.equal(interpolate.interpolateHclLong("#ccc", color.hcl(NaN, NaN, 0))(.5), "#616161");
  test.equal(interpolate.interpolateHclLong("#f00", color.hcl(NaN, NaN, 0))(.5), "#a60000");
  test.end();
});

tape("interpolateHclLong(a, b) uses b’s chroma when a’s chroma is undefined", function(test) {
  test.equal(interpolate.interpolateHclLong(color.hcl(NaN, NaN, 0), "#ccc")(.5), "#616161");
  test.equal(interpolate.interpolateHclLong(color.hcl(NaN, NaN, 0), "#f00")(.5), "#a60000");
  test.end();
});

tape("interpolateHclLong(a, b) uses b’s luminance when a’s luminance is undefined", function(test) {
  test.equal(interpolate.interpolateHclLong(null, color.hcl(20, 80, 50))(0.5), "#ea134d");
  test.end();
});

tape("interpolateHclLong(a, b) uses zero when b’s luminance is undefined", function(test) {
  test.equal(interpolate.interpolateHclLong(color.hcl(20, 80, 50), null)(0.5), "#990019");
  test.end();
});
