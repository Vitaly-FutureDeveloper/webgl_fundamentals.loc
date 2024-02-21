#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

// float rectShape(vec2 position, vec2 scale){
// 	scale = vec2(0.5) - scale * 0.5;
// 	vec2 shaper = vec2(step(scale.x, position.x), step(scale.x, position.x));
// 	shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
// 	return shaper.x * shaper.y;
// }

float rectShape(vec2 position, vec2 scale){
	vec2 p = (position - scale) / (1.0 - 2.0 * scale);
	vec2 shaper = step(vec2(0.0), p) - step(vec2(1.0), p);
	return shaper.x * shaper.y;
}


void main(){
	vec2 position = gl_FragCoord.xy / u_resolution;

	vec3 color = vec3(0.0);

	float rect = rectShape(position, vec2(0.2, 0.2));

	color = vec3(rect);

	gl_FragColor = vec4(color, 1.0);
}