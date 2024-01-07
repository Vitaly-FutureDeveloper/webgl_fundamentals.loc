"use strict";

function createProgram(gl, vertexShader, fragmentShader) {
	var program = gl.createProgram();

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	var success = gl.getProgramParameter(program, gl.LINK_STATUS);

	if (success) return program;

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}

function createShader(gl, type, source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

	if (success) return shader;

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

// возврат случайного целого числа значением от 0 до range-1
function randomInt(range) {
	return Math.floor(Math.random() * range);
}

function setRectangle(gl, x, y, width, height, color, program) {
	var x1 = x;
	var x2 = x + width;
	var y1 = y;
	var y2 = y + height;

	// ПРИМ.: gl.bufferData(gl.ARRAY_BUFFER, ...) воздействует
	// на буфер, который привязан к точке привязке `ARRAY_BUFFER`,
	// но таким образом у нас будет один буфер. Если бы нам понадобилось
	// несколько буферов, нам бы потребовалось привязать их сначала к `ARRAY_BUFFER`.

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
		x1, y1,
		x2, y1,
		x1, y2,
		x1, y2,
		x2, y1,
		x2, y2]), gl.STATIC_DRAW);

	var colorUniformLocation = gl.getUniformLocation(program, "u_color");
	gl.uniform4f(colorUniformLocation, ...color);

	var primitiveType = gl.TRIANGLES;
	var offset = 0;
	var count = 6;
	gl.drawArrays(primitiveType, offset, count);
}

function main() {
	var canvas = document.querySelector('#canvas');

	var gl = canvas.getContext("webgl");
	if (!gl) {
		throw new Error("Не работает webgl");
	}

	var POSITIONS = [
		10, 20,
		80, 20,
		10, 30,
		10, 30,
		80, 20,
		80, 30,
	];

	var vertexShaderSource = document.querySelector('#vertex-shader-2d').text;
	var fragmentShaderSource = document.querySelector('#fragment-shader-2d').text;

	var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	var program = createProgram(gl, vertexShader, fragmentShader);

	var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
	var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
	var colorUniformLocation = gl.getUniformLocation(program, "u_color");

	var positionBuffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(POSITIONS), gl.STATIC_DRAW);

//webglUtils.resizeCanvasToDisplaySize(gl.canvas);

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.useProgram(program);

	gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
	gl.uniform4f(colorUniformLocation, 0.4, 0.2, 1, 1);

	gl.enableVertexAttribArray(positionAttributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Привязываем буфер положений

// Указываем атрибуту, как получать данные от positionBuffer (ARRAY_BUFFER)
	var size = 2; // 2 компоненты на итерацию
	var type = gl.FLOAT; // наши данные - 32-битные числа с плавающей точкой
	var normalize = false; // не нормализовать данные
	var stride = 0; // 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
	var offset = 0; // начинать с начала буфера

	gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

	var primitiveType = gl.TRIANGLES;
	var offset = 0;
	var count = 6;
	gl.drawArrays(primitiveType, offset, count);

	setRectangle(gl, 100, 50, 50, 40, [0.4, 0.2, 0.4, 1], program);
	setRectangle(gl, 160, 200, 50, 40, [0.8, 0.2, 0.4, 1], program);
	setRectangle(gl, 250, 60, 70, 40, [0.4, 0.9, 0.4, 1], program);
}

main();








