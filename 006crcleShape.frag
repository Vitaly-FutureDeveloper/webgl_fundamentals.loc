#ifdef GL_ES
precision mediump float;
#endif

float circleShape(vec2 position, float radius){
	return step(radius, length(position - vec2(300)));
}

void main(){
	vec2 position = gl_FragCoord.xy;

	vec3 color = vec3(0.3, 0.2, 0.3);

	float circle = circleShape(position, 100.0);

	color = vec3(circle);

	gl_FragColor = vec4(color, 1.0);
}