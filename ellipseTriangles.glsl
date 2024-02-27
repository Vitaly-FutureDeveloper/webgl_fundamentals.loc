#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.14159;
vec2 u_Center = vec2(0.2, 0.2);
float u_Radius = 0.5; 
const int u_NumSegments = 8;

void main() {
    

    vec2 normalizedCoord = (gl_FragCoord.xy - u_Center) / u_Radius;  // Нормализуем координаты

    float angle = 2.0 * PI / float(u_NumSegments);  // Рассчитываем угол между сегментами
    float cosAngle = cos(angle);
    float sinAngle = sin(angle);

    vec2 vertex = vec2(1.0, 0.0);  // Исходная вершина

    for (int i = 0; i < u_NumSegments; i++) {
        // Рисуем треугольник с помощью трех вершин
        vec2 v1 = vertex;
        vec2 v2 = vec2(vertex.x * cosAngle - vertex.y * sinAngle, vertex.x * sinAngle + vertex.y * cosAngle);
        vec2 v3 = vec2(vertex.x * cosAngle + vertex.y * sinAngle, -vertex.x * sinAngle + vertex.y * cosAngle);

        // Передаем треугольник на выход
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);  // Устанавливаем цвет треугольника
        gl_FragColor.a = 1.0;  // Устанавливаем непрозрачность треугольника

        // Обновляем вершину для следующего сегмента
        vertex = v2;

        // Выводим треугольник
        gl_Position = vec4(v1 * u_Radius + u_Center, 0.0, 1.0);
        //EmitVertex();

        // gl_Position = vec4(v2 * u_Radius + u_Center, 0.0, 1.0);
        // EmitVertex();

        // gl_Position = vec4(v3 * u_Radius + u_Center, 0.0, 1.0);
        // EmitVertex();

        // EndPrimitive();
    }
}