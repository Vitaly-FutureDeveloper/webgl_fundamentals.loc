#ifdef GL_ES
precision mediump float;
#endif

// Функция для рисования сетки
void drawGrid(vec2 position, float gridSize, float lineWidth)
{   
    // Определяем цвет для закрашивания ячейки
    float fillColor = 0.0; // Черный цвет для закрашивания
    
    // Рисуем горизонтальные и вертикальные линии сетки
    if (mod(position.x, gridSize) < lineWidth || mod(position.y, gridSize) < lineWidth) {
        fillColor = 0.0; //
    } else {
			fillColor = 1.0;
		}
    
    gl_FragColor = vec4(fillColor, fillColor, fillColor, 1.0);
}

void main()
{
    vec2 position = gl_FragCoord.xy;
    
    float gridSize = 100.0; // Размер сетки
    float lineWidth = 1.0; // Толщина линий сетки
    
    drawGrid(position, gridSize, lineWidth);
}