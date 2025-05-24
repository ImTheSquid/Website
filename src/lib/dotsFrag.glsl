precision mediump float;
uniform vec2 u_mouse; // Mouse position (normalized)
uniform float u_radius; // Mouse interaction radius
uniform vec2 u_resolution;
uniform int u_dark;
uniform int u_color;
uniform vec4 u_box; // The highlighted box
uniform float u_boxBrightness;

#include oklch

float pointIsInBox(vec2 point, vec4 box) {
    vec2 withinBounds = step(box.xy, point) * step(point, box.zw);
    return withinBounds.x * withinBounds.y;
}

void main() {
    // Calculate distance from mouse
    float dist = distance(gl_FragCoord.xy, vec2(u_mouse.x, u_resolution.y - u_mouse.y));

    // Calculate brightness (closer = brighter)
    vec4 b = u_box;
    b.w = u_resolution.y - b.w;
    b.y = u_resolution.y - b.y;
    float brightness = max(1.0 - smoothstep(0.0, u_radius, dist), pointIsInBox(gl_FragCoord.xy, b) * u_boxBrightness * 0.75);

    // Set dot color using OKLCH-inspired values
    float l = brightness;
    float dark = float(u_dark);
    float color = float(u_color);
    vec3 colored = oklch2rgb(vec3((1.0 - dark) * l + dark * (1.0 - l * 0.75), 0.1332 * color, 226.06));
    gl_FragColor = vec4(colored, 1.0); // RGB based on brightness
}
