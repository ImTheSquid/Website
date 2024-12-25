// OKLCH to RGB, thanks Hazel
#define PI 3.1415926535

vec3 oklch2oklab(vec3 lch) {
    return vec3(
        lch.x,
        lch.y * cos(lch.z * PI / 180.0),
        lch.y * sin(lch.z * PI / 180.0)
    );
}
vec3 oklab2xyz(vec3 lab) {
    vec3 LMSg = mat3(
            1.0, 1.0, 1.0,
            0.3963377773761749, -0.1055613458156586, -0.0894841775298119,
            0.2158037573099136, -0.0638541728258133, -1.2914855480194092
        ) * lab;
    vec3 LMS = vec3(pow(LMSg.x, 3.0), pow(LMSg.y, 3.0), pow(LMSg.z, 3.0));
    return mat3(
        1.2268798758459243, -0.0405757452148008, -0.0763729366746601,
        -0.5578149944602171, 1.1122868032803170, -0.4214933324022432,
        0.2813910456659647, -0.0717110580655164, 1.5869240198367816
    ) * LMS;
}
vec3 xyz2rgbLinear(vec3 xyz) {
    return mat3(
        3.2409699419045226, -0.9692436362808796, 0.05563007969699366,
        -1.537383177570094, 1.8759675015077202, -0.20397695888897652,
        -0.4986107602930034, 0.04155505740717559, 1.0569715142428786
    ) * xyz;
}
vec3 srgbLinear2rgb(vec3 lch) {
    return vec3(
        abs(lch.r) > 0.0031308 ?
        (lch.r < 0.0 ? -1.0 : 1.0) * (1.055 * pow(abs(lch.r), (1.0 / 2.4)) - 0.055) :
        12.92 * lch.r,
        abs(lch.g) > 0.0031308 ?
        (lch.g < 0.0 ? -1.0 : 1.0) * (1.055 * pow(abs(lch.g), (1.0 / 2.4)) - 0.055) :
        12.92 * lch.g,
        abs(lch.b) > 0.0031308 ?
        (lch.b < 0.0 ? -1.0 : 1.0) * (1.055 * pow(abs(lch.b), (1.0 / 2.4)) - 0.055) :
        12.92 * lch.b
    );
}
vec3 oklch2rgb(vec3 lch)
{
    return srgbLinear2rgb(xyz2rgbLinear(oklab2xyz(oklch2oklab(lch))));
}
