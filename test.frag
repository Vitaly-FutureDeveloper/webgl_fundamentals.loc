#ifdef GL_ES
precision mediump float;
#endif

// Функция для рисования сетки
void drawGrid(vec2 position, float gridSize, float lineWidth)
{
    // Вычисляем координаты ячейки в сетке
    vec2 cellPosition = floor(position / gridSize) * gridSize;
    
    // Определяем цвет для закрашивания ячейки
    float fillColor = 0.0; // Черный цвет для закрашивания
    
    // Рисуем горизонтальные и вертикальные линии сетки
    if (mod(position.x, gridSize) < lineWidth || mod(position.y, gridSize) < lineWidth) {
        fillColor = 1.0; // Белый цвет для закрашивания
    }
    
    gl_FragColor = vec4(fillColor, fillColor, fillColor, 1.0);
}

// Функция для рисования круга
void drawCircle(vec2 position, float radius, vec3 color)
{
    float dist = length(position - gl_FragCoord.xy);
    
    if (dist < radius) {
        gl_FragColor = vec4(color, 1.0);
    }
}

void main()
{
    vec2 position = gl_FragCoord.xy;
    
    float gridSize = 10.0; // Размер сетки
    float lineWidth = 1.0; // Толщина линий сетки
    
    drawGrid(position, gridSize, lineWidth);
    
    vec2 circleCenter = vec2(150.0, 500.0); // Центр круга
    float circleRadius = 100.0; // Радиус круга
    vec3 circleColor = vec3(1.0, 0.0, 0.0); // Красный цвет круга
    
    drawCircle(circleCenter, circleRadius, circleColor);
}