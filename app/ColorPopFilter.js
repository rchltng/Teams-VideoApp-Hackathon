class ColorPopFilter extends ImageFilter {
    constructor() {
      super();
    }
  
    getFragmentShader() {
      return "\
        precision highp float;\
        uniform sampler2D texture;\
        varying vec2 v_texCoord;\
        void main() {\
            vec4 color = texture2D(texture, v_texCoord);\
            \
            /* hue adjustment, wolfram alpha: RotationTransform[angle, {1, 1, 1}][{x, y, z}] */\
            float angle = -0.5 * 3.14159265;\
            float s = sin(angle), c = cos(angle);\
            vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;\
            float len = length(color.rgb);\
            color.rgb = vec3(\
                dot(color.rgb, weights.xyz),\
                dot(color.rgb, weights.zxy),\
                dot(color.rgb, weights.yzx)\
            );\
            \
            /* saturation adjustment */\
            float average = (color.r + color.g + color.b) / 3.0;\
            if (0. > 0.0) {\
                color.rgb += (average - color.rgb) * (1.0 - 1.0 / (1.001 - 0.7));\
            } else {\
                color.rgb += (average - color.rgb) * (-0.7);\
            }\
            \
            gl_FragColor = color;\
        }\
    ";
    }
  }
  