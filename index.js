// Получение контекста WebGL
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

// Вершинный шейдер
const vertexShaderSource = `
attribute vec2 a_position;

void main() {
    gl_Position = vec4(vec2(100, 200), 0.0, 1.0);
}
`;

// Фрагментный шейдер
const fragmentShaderSource = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

bool isPointInsideTriangle(vec2 p, vec2 p1, vec2 p2, vec2 p3){
    float s1 = sign(p.x - p2.x) * sign(p.y - p1.y) - sign(p.x - p1.x) * sign(p.y - p2.y);
    float s2 = sign(p.x - p3.x) * sign(p.y - p2.y) - sign(p.x - p2.x) * sign(p.y - p3.y);
    float s3 = sign(p.x - p1.x) * sign(p.y - p3.y) - sign(p.x - p3.x) * sign(p.y - p1.y);

    bool hasPositiveSigns = (s1 > 0.0) && (s2 > 0.0) && (s3 > 0.0);
    bool hasNegativeSigns = (s1 < 0.0) && (s2 < 0.0) && (s3 < 0.0);

    return hasPositiveSigns || hasNegativeSigns;
}

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
        gl_FragColor = vec4(0.8314, 1.0, 0.8824, 1.0);
    }
}
`;

// Создание и компиляция вершинного шейдера
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

// Создание и компиляция фрагментного шейдера
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Создание и привязка программы шейдеров
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// Установка атрибута позиции вершин
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [
    0, 0,
    0, 0.5,
    0.5, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Очистка холста и отрисовка треугольника
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);