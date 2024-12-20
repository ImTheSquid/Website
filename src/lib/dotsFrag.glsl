precision mediump float;
uniform vec2 u_mouse; // Mouse position (normalized)
uniform float u_radius; // Mouse interaction radius
uniform vec2 u_resolution;
uniform int u_dark;

#include oklch

void main() {
    // Calculate distance from mouse
    float dist = distance(gl_FragCoord.xy, vec2(u_mouse.x, u_resolution.y - u_mouse.y));

    // Calculate brightness (closer = brighter)
    float brightness = 1.0 - smoothstep(0.0, u_radius, dist);

    // Set dot color using OKLCH-inspired values
    float l = brightness;
    float dark = float(u_dark);
    gl_FragColor = vec4(oklch2rgb(vec3((1.0 - dark) * l + dark * (1.0 - l * 0.75), 0.1332, 226.06)), 1.0); // RGB based on brightness
}
