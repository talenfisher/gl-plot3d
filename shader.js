var createShader = require('gl-shader')

var vertSrc = `
    precision mediump float;
    attribute vec2 position;
    varying vec2 uv;
    void main() {
    uv = position;
        gl_Position = vec4(position, 0, 1);
    }
`;

var fragSrc = `
    precision mediump float;

    uniform sampler2D accumBuffer;
    varying vec2 uv;

    void main() {
        vec4 accum = texture2D(accumBuffer, 0.5 * (uv + 1.0));
        gl_FragColor = min(vec4(1,1,1,1), accum);
    }
`;

module.exports = function(gl) {
  return createShader(gl, vertSrc, fragSrc, null, [ { name: 'position', type: 'vec2'}])
}
