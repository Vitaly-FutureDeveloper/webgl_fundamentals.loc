#ifdef GL_ES
precision mediump float;
#endif


const float PI = 3.1415926535;

const float INNER_RADIUS = 80.0;
const float OUTHER_RADIUS = 150.0;

const vec2 POSITION = vec2(300.0, 300.0);
const float ROTATION = PI / 1.0;

const float START_ANGLE = 0.0;
const float END_ANGLE = PI * 1.1;


mat2 rotate(float angle){
	return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float circleShape(vec2 position, float innerRadius, float outerRadius) {
    float distance = length(position - POSITION);
    if (distance < innerRadius || distance > outerRadius) {
        discard;  // Фрагмент вне круга
    } else {
        float angle = atan(position.y - POSITION.y, position.x - POSITION.x);
				float normalizedAngle = mod(angle, PI * 2.0);  // Нормализуем угол с использованием оператора модуля %
        if (normalizedAngle >= START_ANGLE && normalizedAngle <= END_ANGLE) {
          	return 1.0;  // Фрагмент внутри сектора круга (жёлтый)
        } else {
            return 0.0;  // Фрагмент вне сектора круга (чёрный)
        }
    }
}


void main(){
		vec2 position = gl_FragCoord.xy;

    vec3 color = vec3(0.9843, 1.0, 0.0);

		position -= POSITION;
		position = rotate(ROTATION) * position;
		position += POSITION;

    float ring = circleShape(position, INNER_RADIUS, OUTHER_RADIUS);

		color *= ring;

    gl_FragColor = vec4(color, 1.0);
}