#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

bool isPointInsideTriangle(vec2 p, vec2 p1, vec2 p2, vec2 p3){
    // Вычисляем знаки разностей координат для каждой стороны треугольника
    // Вычисляем знак разности координат для первой стороны треугольника.
    float s1 = sign((p1.x - p.x) * (p2.y - p1.y) - (p2.x - p1.x) * (p1.y - p.y));
    float s2 = sign((p2.x - p.x) * (p3.y - p2.y) - (p3.x - p2.x) * (p2.y - p.y)); // 2
    float s3 = sign((p3.x - p.x) * (p1.y - p3.y) - (p1.x - p3.x) * (p3.y - p.y)); // 3

    // Проверяем знаки разностей и определяем, находится ли точка внутри треугольника
    bool hasPositiveSigns = (s1 > 0.0) && (s2 > 0.0) && (s3 > 0.0);
    bool hasNegativeSigns = (s1 < 0.0) && (s2 < 0.0) && (s3 < 0.0);

    // Если все знаки положительные или все знаки отрицательные, точка находится внутри треугольника
    return hasPositiveSigns || hasNegativeSigns;
}

// bool isPointInsideTriangle(vec2 p, vec2 p1, vec2 p2, vec2 p3) {
//     // Вычисляем знаки разностей координат
//     float s1 = (p1.x - p.x) * (p2.y - p1.y) - (p2.x - p1.x) * (p1.y - p.y);
//     float s2 = (p2.x - p.x) * (p3.y - p2.y) - (p3.x - p2.x) * (p2.y - p.y);
//     float s3 = (p3.x - p.x) * (p1.y - p3.y) - (p1.x - p3.x) * (p3.y - p.y);

//     // Проверяем знаки разностей и определяем, находится ли точка внутри треугольника
//     bool isInside = (s1 >= 0.0) && (s2 >= 0.0) && (s3 >= 0.0) || (s1 <= 0.0) && (s2 <= 0.0) && (s3 <= 0.0);
    
//     return isInside;
// }

void main()
{
    // Проверяем, находится ли текущий пиксель внутри треугольника
    vec2 p = gl_FragCoord.xy;
    
    vec2 p1 = vec2(100.0, 100.0);
    vec2 p2 = vec2(200.0, 300.0);
    vec2 p3 = vec2(300.0, 100.0);

    bool insideTriangle = isPointInsideTriangle(p, p1, p2, p3);

    if (insideTriangle)
    {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    else
    {
        discard;
    }
}

