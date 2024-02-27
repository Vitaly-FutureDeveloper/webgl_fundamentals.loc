#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

const float PI = 3.1415926535;

float polygonShape (vec2 position, float radius, float sides) {
    position = position * 2.0 - 1.0;
    float angle = atan(position.x, position.y);
    float slice = PI * 2.0 / sides;

    return step(radius, cos(floor(0.5 + angle / slice) * slice - angle) * length(position));
}

mat2 rotate(float angle){
	return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main(){
    vec2 position = gl_FragCoord.xy / u_resolution;
    
    vec3 color = vec3(0.0, 0.2, 0.3);

    position -= vec2(0.5);
		position = rotate(3.1415) * position;
		position += vec2(0.5);

		float polygon = polygonShape(position, 0.6, 5.0);

    color = vec3(polygon);

    gl_FragColor = vec4(color, 1.0);
}