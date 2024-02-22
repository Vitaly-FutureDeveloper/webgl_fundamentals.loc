#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Разрешение холста

void main() {
  // Преобразуем координаты фрагмента в диапазон [0, 1]
  vec2 position = gl_FragCoord.xy / u_resolution;

  // Вычисляем расстояние от текущего фрагмента до центра круга
  float distance = length(position - vec2(0.5, 0.5));
    //float distance2 = length(position - vec2(0.1, 0.1));

  // Проверяем, находится ли текущий фрагмент внутри круга
  if (distance <= 0.2 && distance >= 0.1) {
    // Если фрагмент находится внутри круга, устанавливаем цвет пикселя
    gl_FragColor = vec4(0.6, 0.7843, 0.1, 1.0);  // Например, красный цвет
  } else {
    discard;
  }
}