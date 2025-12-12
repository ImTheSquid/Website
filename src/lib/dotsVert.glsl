precision mediump float;
attribute vec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_radius;
uniform vec4 u_box;
uniform float u_boxBrightness;
uniform vec2 u_scrollOffset;

float pointIsInBox(vec2 point, vec4 box) {
    vec2 withinBounds = step(box.xy, point) * step(point, box.zw);
    return withinBounds.x * withinBounds.y;
}

void main() {
    // Apply scroll offset
    vec2 position = a_position - u_scrollOffset;

    // Convert position to clip space [-1, 1]
    vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;
    vec4 b = u_box;
    b.y = u_resolution.y - b.y;
    b.w = u_resolution.y - b.w;
    vec4 boxClip = vec4(b.xy / u_resolution, b.zw / u_resolution) * 2.0 - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    gl_PointSize = 4.0 + max(max(0.0, u_radius - distance(position, u_mouse)), pointIsInBox(clipSpace * vec2(1, -1), boxClip) * u_radius * u_boxBrightness * 0.5) / 20.0;
}
