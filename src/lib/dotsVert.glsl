precision mediump float;
attribute vec2 a_position; // Dot position (normalized)
uniform vec2 u_resolution; // Canvas resolution
uniform vec2 u_mouse;
uniform float u_radius;
void main() {
    // Convert position to clip space [-1, 1]
    vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = 4.0 + max(0.0, u_radius - distance(a_position, u_mouse)) / 25.0; // Base dot size
}
