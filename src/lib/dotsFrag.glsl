precision mediump float;
uniform vec2 u_mouse; // Mouse position (normalized)
uniform float u_radius; // Mouse interaction radius
uniform vec2 u_resolution;
uniform int u_dark;
uniform int u_color;
uniform vec4 u_box; // The highlighted box
uniform float u_boxBrightness;
uniform vec2 u_scroll; // Actual scroll position for noise
uniform int u_noise;

#include oklch

// Classic Perlin noise helpers
vec2 fade(vec2 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0);
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 *
                vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

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
    float highlight = max(1.0 - smoothstep(0.0, u_radius, dist), pointIsInBox(gl_FragCoord.xy, b) * u_boxBrightness * 0.85);

    // Perlin noise based on world-space dot position (screen pos + scroll)
    float baseBrightness = 0.0;
    if (u_noise == 1) {
        vec2 worldPos = gl_FragCoord.xy + vec2(u_scroll.x, -u_scroll.y);
        float noise = cnoise(worldPos * 0.008) * 0.5 + 0.5; // [0, 1]
        baseBrightness = mix(0.15, 1.0, noise) * 0.35; // subtle: 5%-35%
    }

    // Blend: noise affects base dots, highlights override
    float brightness = max(highlight, baseBrightness);

    // Set dot color using OKLCH-inspired values
    float l = brightness;
    float dark = float(u_dark);
    float color = float(u_color);
    vec3 colored = oklch2rgb(vec3((1.0 - dark) * l + dark * (1.0 - l * 0.75), 0.1332 * color, 226.06));
    gl_FragColor = vec4(colored, 0.75); // RGB based on brightness
}
