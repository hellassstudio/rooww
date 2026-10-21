// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const S = React;
const B = { jsx: _jsx, jsxs: _jsxs };

var ad=8,od=4,sd=24,cd=1.2,ld=.7,ud=.015,dd=2.4,fd=60,pd=100,md=16,hd=.78,gd=[`#1e3fd8`,`#f6f8ff`,`#a5d8ff`,`#38bdf8`],_d=` =+xX0S8#@`,vd=`"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,yd={horizon:0,pinch:1,rise:2,eclipse:3,full:4},X={none:0,wave:1,burst:2},bd=`#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,xd=`
float hash12(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
`,Sd=`#version 300 es
precision highp float;
precision highp int;
uniform float uAspect;
uniform float uTime;
uniform int uShape;
uniform vec3 uRamp[8];
uniform int uCount;
uniform float uScale;
uniform float uSoftness;
uniform float uFlow;
uniform vec2 uSeed;
uniform vec4 uTrail[24];
uniform float uRadius;
uniform vec4 uClicks[4];
uniform int uClickEffect;
uniform float uIntro;
uniform float uFrame;
in vec2 vUv;
layout(location = 0) out vec4 outColor;
layout(location = 1) out vec4 outAux;
${xd}
vec2 hash22(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.103, 0.0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.xx + q.yz) * q.zy) * 2.0 - 1.0;
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(hash22(i), f);
  float b = dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return 0.5 + 0.5 * mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec3 labToRgb(vec3 lab) {
  float l = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
  float m = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
  float s = lab.x - 0.0894841775 * lab.y - 1.2914855480 * lab.z;
  l = l * l * l;
  m = m * m * m;
  s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}

vec3 encode(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

vec3 horizon(vec2 p, float time, out float order) {
  float span = 0.5 * max(uAspect, 1.0);
  float x = p.x / span;
  float arch = -0.17 - 0.2 * x * x + 0.02 * sin(time * 0.6);
  float soft = mix(0.05, 0.22, uSoftness);
  float edge = p.y - arch;
  float rim = 0.38 * smoothstep(-soft, 0.42, edge);
  vec2 sun = vec2(0.08 * sin(time * 0.31) * span, 0.58);
  float spread = length((p - sun) / vec2(0.95 * span, 0.75));
  float sky = mix(0.55, 1.0, smoothstep(0.2, 0.95, spread));
  order = clamp(edge * 1.3, 0.0, 1.0);
  return vec3(rim, sky, smoothstep(0.18, 0.62, edge));
}

vec3 pinch(vec2 p, float time, out float order) {
  float span = 0.5 * max(uAspect, 0.75);
  float x = p.x / span;
  float sway = 0.02 * sin(x * 1.7 + time * 0.55);
  float breathe = 1.0 + 0.06 * sin(time * 0.8);
  float width = (0.13 + 0.22 * x * x) * breathe * mix(0.85, 1.2, uSoftness);
  float y = abs(p.y - sway) / width;
  float t = exp(-pow(y, 2.2)) * (0.42 + 0.58 * exp(-x * x * 1.8));
  order = clamp(abs(p.y - sway) * 2.4 + abs(x) * 0.3, 0.0, 1.0);
  return vec3(t, t, 0.0);
}

vec3 rise(vec2 p, float time, out float order) {
  float wide = max(uAspect, 0.9);
  vec2 center = vec2(0.05 * sin(time * 0.45) * wide, -0.7);
  vec2 radius = vec2(0.82 * wide, 0.64 * (1.0 + 0.04 * sin(time * 0.8)));
  float d = length((p - center) / radius);
  float soft = mix(0.6, 1.15, uSoftness);
  float t = clamp(pow(clamp(1.0 - d, 0.0, 1.0), soft) * 1.35, 0.0, 1.0);
  order = clamp((d - 0.2) * 1.3, 0.0, 1.0);
  return vec3(t, t, 0.0);
}

vec3 eclipse(vec2 p, float time, out float order) {
  float fit = min(1.0, uAspect * 1.25);
  float r = 0.23 * fit * (1.0 + 0.015 * sin(time * 0.9));
  float angle = atan(p.y, p.x);
  float rays = noise(vec2(cos(angle), sin(angle)) * 2.2 + time * 0.08) * 0.8 + 0.6;
  float d = length(p) - r;
  float reach = mix(0.07, 0.15, uSoftness) * rays * fit;
  float t = smoothstep(-0.006, 0.006 + 0.02 * uSoftness, d) * exp(-max(d, 0.0) / reach);
  order = clamp(d * 2.0, 0.0, 1.0);
  return vec3(t, t, 0.0);
}

vec3 fullField(vec2 p, float time, out float order) {
  float n1 = noise(p * 1.8 + vec2(time * 0.15, -time * 0.1));
  float n2 = noise(p * 3.4 - vec2(time * 0.08, time * 0.12));
  float t = 0.42 + 0.58 * (n1 * 0.6 + n2 * 0.4);
  order = 0.0;
  return vec3(t, t, 0.5);
}

vec4 tone(float t) {
  float x = smoothstep(0.3, 1.0, t) * float(uCount - 1);
  int index = int(floor(x));
  return vec4(mix(uRamp[index], uRamp[min(index + 1, uCount - 1)], fract(x)), smoothstep(0.0, 0.38, t));
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  float time = uTime;
  vec2 q = p / uScale;
  vec2 warp = vec2(
    noise(q * 1.6 + uSeed + vec2(0.0, time * 0.3)),
    noise(q * 1.6 + uSeed.yx + vec2(4.3, -time * 0.24))
  ) - 0.5;
  q += warp * uFlow * (uShape == 3 ? 0.04 : 0.18);
  float order = 0.0;
  vec3 shape;
  if (uShape == 0) shape = horizon(q, time, order);
  else if (uShape == 1) shape = pinch(q, time, order);
  else if (uShape == 2) shape = rise(q, time, order);
  else if (uShape == 3) shape = eclipse(q, time, order);
  else shape = fullField(q, time, order);

  float reveal = clamp((uIntro * 1.45 - order) / 0.45, 0.0, 1.0);
  reveal = reveal * reveal * (3.0 - 2.0 * reveal);

  float scramble = 0.0;
  for (int i = 0; i < 24; i++) {
    vec4 point = uTrail[i];
    if (point.z <= 0.0) continue;
    vec2 d = p - point.xy;
    scramble = max(scramble, point.z * exp(-dot(d, d) / (uRadius * uRadius)));
  }
  for (int i = 0; i < 4; i++) {
    vec4 c = uClicks[i];
    if (c.w <= 0.0) continue;
    float d = length(p - c.xy);
    if (uClickEffect == 1) {
      scramble = max(scramble, exp(-pow((d - c.z * 0.75) / 0.06, 2.0)) * c.w);
    } else if (uClickEffect == 2) {
      float size = 0.08 + 0.22 * (1.0 - exp(-c.z * 5.0));
      scramble = max(scramble, (1.0 - smoothstep(size * 0.6, size, d)) * c.w);
    }
  }
  vec2 t = clamp(shape.xy * mix(0.7, 1.0, reveal), 0.0, 1.0);
  vec4 mixed = mix(tone(t.x), tone(t.y), shape.z);
  vec3 color = encode(labToRgb(mixed.rgb));
  float alpha = mixed.a * reveal;
  float dither = (hash12(gl_FragCoord.xy + uFrame * 13.7) - 0.5) / 255.0;
  outColor = clamp(vec4(color * alpha + dither, alpha + dither), 0.0, 1.0);
  outAux = vec4(reveal, scramble, 0.0, 1.0);
}`,Cd=`
uniform sampler2D uField;
uniform sampler2D uAux;
uniform sampler2D uAtlas;
uniform vec2 uResolution;
uniform vec2 uCell;
uniform vec2 uOffset;
uniform vec2 uAtlasGrid;
uniform float uCount;
uniform float uDensity;
uniform float uOpacity;
uniform float uFlicker;
uniform float uDepth;
uniform float uGlyphTime;
uniform float uSeedValue;
uniform float uLight;
${xd}
float sampleGlyph(float index, vec2 local, vec2 coord, float soft) {
  float column = mod(index, uAtlasGrid.x);
  float row = floor(index / uAtlasGrid.x);
  vec2 atlasUv = vec2((column + local.x) / uAtlasGrid.x, (row + 1.0 - local.y) / uAtlasGrid.y);
  vec2 continuous = coord / uAtlasGrid;
  float scale = exp2(soft);
  return textureGrad(uAtlas, atlasUv, dFdx(continuous) * scale, dFdy(continuous) * scale).a;
}

vec4 glyphAt(vec2 px) {
  vec2 coord = (px - uOffset) / uCell;
  vec2 cell = floor(coord);
  vec2 local = coord - cell;
  vec2 uv = clamp(((cell + 0.5) * uCell + uOffset) / uResolution, vec2(0.0), vec2(1.0));
  vec4 field = texture(uField, uv);
  vec4 aux = texture(uAux, uv);
  vec3 visible = uLight > 0.5 ? field.rgb + (1.0 - field.a) : field.rgb;
  float luma = dot(visible, vec3(0.2126, 0.7152, 0.0722));
  float value = uLight > 0.5 ? clamp((1.0 - luma) * 1.5, 0.0, 1.0) : luma;
  float pick = hash12(cell + uSeedValue * 7.31);
  float level = hash12(cell * 1.73 + 4.1 + uSeedValue);
  float tick = floor(uGlyphTime * 9.0 + level * 9.0);
  float wobble = (hash12(cell * 2.31 + tick * 17.7) - 0.5) * uFlicker * 0.4 + (level - 0.5) * 0.1;
  float tone = clamp(pow(value, 0.75) + wobble, 0.0, 1.0);
  float index = floor(tone * (uCount - 1.0) + 0.5);
  float decode = max(aux.g, 1.0 - aux.r);
  if (decode > 0.02) {
    float frame = floor(uGlyphTime * 20.0);
    if (hash12(cell * 3.7 + frame * 5.3) < decode * 1.25) index = 1.0 + floor(hash12(cell + frame * 1.37) * (uCount - 1.0));
  }
  float present = step(pick, uDensity * mix(1.0, 0.3 + tone * 1.1, 0.55));
  float cutoff = smoothstep(0.03, 0.1, value);
  float focus = step(hash12(cell * 0.71 + 9.2 + uSeedValue), uDepth);
  float coverage = sampleGlyph(index, local, coord, focus * 1.2);
  float alpha = uOpacity * present * cutoff * coverage * mix(1.0, 0.35 + 0.65 * level, 0.55) * (1.0 - focus * 0.5);
  if (uLight < 0.5) {
    vec3 light = field.rgb * 0.55 + vec3(0.03) * field.a;
    return vec4(light * alpha, 0.6 * field.a * alpha);
  }
  vec3 ink = visible * 0.8;
  return vec4(ink * alpha, alpha);
}
`,wd=`#version 300 es
precision highp float;
uniform float uDownscale;
in vec2 vUv;
out vec4 outColor;
${Cd}
void main() {
  outColor = glyphAt(gl_FragCoord.xy * uDownscale);
}`,Td=`#version 300 es
precision highp float;
uniform sampler2D uSource;
uniform vec2 uStep;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec4 sum = texture(uSource, vUv) * 0.2270270270;
  sum += texture(uSource, vUv + uStep * 1.3846153846) * 0.3162162162;
  sum += texture(uSource, vUv - uStep * 1.3846153846) * 0.3162162162;
  sum += texture(uSource, vUv + uStep * 3.2307692308) * 0.0702702703;
  sum += texture(uSource, vUv - uStep * 3.2307692308) * 0.0702702703;
  outColor = sum;
}`,Ed=`#version 300 es
precision highp float;
uniform sampler2D uHalo;
uniform float uGlow;
uniform float uGradient;
uniform float uGrain;
uniform float uFrame;
in vec2 vUv;
out vec4 outColor;
${Cd}
void main() {
  vec4 base = texture(uField, vUv) * uGradient;
  vec4 glyph = glyphAt(gl_FragCoord.xy);
  vec4 halo = texture(uHalo, vUv) * uGlow;
  vec4 color;
  if (uLight < 0.5) {
    color = base + glyph + halo;
  } else {
    color = glyph + base * (1.0 - glyph.a);
    color += halo * 0.6 * (1.0 - color.a);
  }
  float grain = (hash12(gl_FragCoord.xy + uFrame * vec2(17.0, 59.0)) + hash12(gl_FragCoord.xy * 1.31 + uFrame * 7.0) - 1.0) * uGrain;
  float body = clamp(color.a, 0.0, 1.0);
  color.rgb = clamp(color.rgb, 0.0, 1.0);
  outColor = vec4(color.rgb, 1.0);
}`,Dd=(e,t,n)=>Math.min(n,Math.max(t,e)),Od=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,kd=([e,t,n])=>{let r=Od(e),i=Od(t),a=Od(n),o=Math.cbrt(.4122214708*r+.5363325363*i+.0514459929*a),s=Math.cbrt(.2119034982*r+.6806995451*i+.1073969566*a),c=Math.cbrt(.0883024619*r+.2817188376*i+.6299787005*a);return[.2104542553*o+.793617785*s-.0040720468*c,1.9779984951*o-2.428592205*s+.4505937099*c,.0259040371*o+.7827717662*s-.808675766*c]},Ad=(e,t,n)=>{let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null},jd=(e,t)=>{let n=Ad(e,e.VERTEX_SHADER,bd),r=Ad(e,e.FRAGMENT_SHADER,t),i=e.createProgram();if(!n||!r||!i)return null;if(e.attachShader(i,n),e.attachShader(i,r),e.linkProgram(i),e.deleteShader(n),e.deleteShader(r),!e.getProgramParameter(i,e.LINK_STATUS))return e.deleteProgram(i),null;let a={},o=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let t=0;t<o;t++){let n=e.getActiveUniform(i,t);if(!n)continue;let r=n.name.replace(/\[0\]$/,``);a[r]=e.getUniformLocation(i,r)}return{program:i,uniforms:a}},Md=(e,t)=>({textures:Array.from({length:t},()=>{let t=e.createTexture();return e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),t}),framebuffer:e.createFramebuffer(),width:0,height:0}),Nd=(e,t,n,r)=>{(t.width!==n||t.height!==r)&&(t.width=n,t.height=r,e.bindFramebuffer(e.FRAMEBUFFER,t.framebuffer),t.textures.forEach((t,i)=>{e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,n,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+i,e.TEXTURE_2D,t,0)}),e.bindFramebuffer(e.FRAMEBUFFER,null))},Pd=(e,t,n)=>{let r=[...new Set([...t].filter(e=>e!==`
`&&e!==`\r`))];r.length||r.push(` `);let i=`300 ${Math.round(pd*hd)}px ${n}`,a=Math.min(md,r.length),o=Math.ceil(r.length/a),s=document.createElement(`canvas`);s.width=fd*a,s.height=pd*o;let c=s.getContext(`2d`);c&&(c.font=i,c.textAlign=`center`,c.textBaseline=`middle`,c.fillStyle=`#fff`,r.forEach((e,t)=>{let n=t%a,r=Math.floor(t/a);c.fillText(e,n*fd+fd/2,r*pd+pd/2+3)}));let l=e.createTexture();return e.bindTexture(e.TEXTURE_2D,l),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,s),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),{texture:l,count:r.length,grid:[a,o]}},Fd=({colors:e=gd,shape:t=`horizon`,characters:n=_d,cellSize:r=18,density:i=.8,glyphOpacity:a=.85,glow:o=.2,depthOfField:s=0,flicker:c=.2,softness:l=.5,scale:u=1,flow:d=.5,speed:f=1,gradientOpacity:p=.9,grain:m=.08,variation:h=0,mouseInteraction:g=!0,scrambleRadius:_=.1,clickEffect:v=`wave`,intro:y=!0,lightMode:b=!1,fontFamily:x=vd,dpr:C,className:ee=``,style:w,...te})=>{let T=(0,S.useRef)(null),ne=(0,S.useRef)(null),re=(0,S.useRef)(null),ie=(Array.isArray(e)&&e.length?e:gd).slice(0,ad),ae={colors:ie.length>1?ie:[ie[0],ie[0]],shape:yd[t]??0,characters:n||_d,cellSize:Dd(r,6,64),density:Dd(i,0,1),glyphOpacity:Dd(a,0,1),glow:Dd(o,0,2),depthOfField:Dd(s,0,1),flicker:Dd(c,0,1),softness:Dd(l,0,1),scale:Dd(u,.4,2.5),flow:Dd(d,0,2),speed:Math.max(0,f),gradientOpacity:Dd(p,0,1),grain:Dd(m,0,.4),variation:Math.max(0,h),mouseInteraction:g,scrambleRadius:Dd(_,.02,.4),clickEffect:X[v]??1,intro:y,lightMode:b,fontFamily:x||vd,dpr:C},oe=(0,S.useRef)(ae);return oe.current=ae,(0,S.useEffect)(()=>{let e=T.current,t=ne.current,n=t?.getContext(`webgl2`,{alpha:!1,antialias:!1,depth:!1,stencil:!1});if(!e||!t||!n)return;let r=jd(n,Sd),i=jd(n,wd),a=jd(n,Td),o=jd(n,Ed);if(!r||!i||!a||!o)return;let s=n.createVertexArray(),c=Md(n,2),l=Md(n,1),u=Md(n,1),d=document.createElement(`canvas`).getContext(`2d`,{willReadFrequently:!0}),f=new Map,p=e=>{let t=String(e),n=f.get(t);if(n)return n;let r=[0,0,0];if(d){d.clearRect(0,0,1,1),d.fillStyle=`#000000`,d.fillStyle=t,d.fillRect(0,0,1,1);let[e,n,i]=d.getImageData(0,0,1,1).data;r=[e/255,n/255,i/255]}return f.set(t,r),r},m=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1,h={width:1,height:1,ratio:1},g=new Float32Array(24),_=new Float32Array(16),v=[],y=new Float32Array(96),b=[],x={x:0,y:0,inside:!1},S=null,C=``,ee=``,w=0,te=0,ie=oe.current.intro&&!m?0:1,ae=0,se=0,ce=0,E=0,le=!0,ue=!1,de=()=>{let e=oe.current,t=`${e.fontFamily}|${e.characters}`;t===C&&S||(C=t,S&&n.deleteTexture(S.texture),S=Pd(n,e.characters,e.fontFamily),document.fonts?.load?.(`300 64px ${e.fontFamily}`,e.characters).then(()=>{ue||C!==t||(S&&n.deleteTexture(S.texture),S=Pd(n,e.characters,e.fontFamily),me())},()=>{}))},fe=()=>{let e=oe.current,t=e.colors.join(`,`);t!==ee&&(ee=t,e.colors.forEach((e,t)=>g.set(kd(p(e)),t*3)))},pe=(e,t,r)=>{if(!S)return;let i=oe.current,a=e.uniforms,o=i.cellSize*h.ratio,s=fd/pd*o;n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,c.textures[0]),n.uniform1i(a.uField,0),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,c.textures[1]),n.uniform1i(a.uAux,1),n.activeTexture(n.TEXTURE2),n.bindTexture(n.TEXTURE_2D,S.texture),n.uniform1i(a.uAtlas,2),n.uniform2f(a.uResolution,t,r),n.uniform2f(a.uCell,s,o),n.uniform2f(a.uOffset,(t-Math.ceil(t/s)*s)/2,(r-Math.ceil(r/o)*o)/2),n.uniform2f(a.uAtlasGrid,S.grid[0],S.grid[1]),n.uniform1f(a.uCount,S.count),n.uniform1f(a.uDensity,i.density),n.uniform1f(a.uOpacity,i.glyphOpacity),n.uniform1f(a.uFlicker,m?0:i.flicker),n.uniform1f(a.uDepth,i.depthOfField),n.uniform1f(a.uGlyphTime,te),n.uniform1f(a.uSeedValue,i.variation),n.uniform1f(a.uLight,+!!i.lightMode)},me=()=>{let e=oe.current,d=h.width/h.height;de(),fe(),n.bindVertexArray(s),n.disable(n.BLEND),n.bindFramebuffer(n.FRAMEBUFFER,c.framebuffer),n.drawBuffers([n.COLOR_ATTACHMENT0,n.COLOR_ATTACHMENT1]),n.viewport(0,0,c.width,c.height),n.useProgram(r.program);let f=r.uniforms;n.uniform1f(f.uAspect,d),n.uniform1f(f.uTime,w),n.uniform1i(f.uShape,e.shape),n.uniform3fv(f.uRamp,g),n.uniform1i(f.uCount,e.colors.length),n.uniform1f(f.uScale,e.scale),n.uniform1f(f.uSoftness,e.softness),n.uniform1f(f.uFlow,e.flow),n.uniform2f(f.uSeed,e.variation*3.17,e.variation*1.91),n.uniform4fv(f.uTrail,y),n.uniform1f(f.uRadius,e.scrambleRadius),n.uniform4fv(f.uClicks,_),n.uniform1i(f.uClickEffect,e.clickEffect),n.uniform1f(f.uIntro,ie),n.uniform1f(f.uFrame,ae),n.drawArrays(n.TRIANGLES,0,3);let p=e.glow>.001;p&&(n.bindFramebuffer(n.FRAMEBUFFER,l.framebuffer),n.drawBuffers([n.COLOR_ATTACHMENT0]),n.viewport(0,0,l.width,l.height),n.useProgram(i.program),pe(i,t.width,t.height),n.uniform1f(i.uniforms.uDownscale,t.width/l.width),n.drawArrays(n.TRIANGLES,0,3),n.useProgram(a.program),n.activeTexture(n.TEXTURE0),n.uniform1i(a.uniforms.uSource,0),n.bindFramebuffer(n.FRAMEBUFFER,u.framebuffer),n.bindTexture(n.TEXTURE_2D,l.textures[0]),n.uniform2f(a.uniforms.uStep,1/l.width,0),n.drawArrays(n.TRIANGLES,0,3),n.bindFramebuffer(n.FRAMEBUFFER,l.framebuffer),n.bindTexture(n.TEXTURE_2D,u.textures[0]),n.uniform2f(a.uniforms.uStep,0,1/l.height),n.drawArrays(n.TRIANGLES,0,3)),n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,t.width,t.height),n.useProgram(o.program),pe(o,t.width,t.height);let m=o.uniforms;n.activeTexture(n.TEXTURE3),n.bindTexture(n.TEXTURE_2D,l.textures[0]),n.uniform1i(m.uHalo,3),n.uniform1f(m.uGlow,p?e.glow:0),n.uniform1f(m.uGradient,e.gradientOpacity),n.uniform1f(m.uGrain,e.grain),n.uniform1f(m.uFrame,ae),n.drawArrays(n.TRIANGLES,0,3)},he=()=>{let r=oe.current;h.width=Math.max(1,e.clientWidth),h.height=Math.max(1,e.clientHeight),h.ratio=Math.min(r.dpr||window.devicePixelRatio||1,2),t.width=Math.max(1,Math.round(h.width*h.ratio)),t.height=Math.max(1,Math.round(h.height*h.ratio)),Nd(n,c,Math.max(1,Math.round(t.width/2)),Math.max(1,Math.round(t.height/2)));let i=Math.max(1,Math.round(t.width/4)),a=Math.max(1,Math.round(t.height/4));Nd(n,l,i,a),Nd(n,u,i,a),me(),ve()},ge=e=>{for(b.forEach(t=>{t.age+=e});b.length&&b[b.length-1].age>ld;)b.pop();for(let e=0;e<sd;e++){let t=b[e];if(!t){y[e*4+2]=0;continue}let n=1-t.age/ld;y.set([t.x,t.y,n*n,0],e*4)}for(v.forEach(t=>{t.age+=e});v.length&&v[v.length-1].age>cd;)v.pop();for(let e=0;e<od;e++){let t=v[e];if(!t){_[e*4+3]=0;continue}let n=t.age/cd,r=Math.min(1,t.age/.08)*(1-n)*(1-n);_.set([t.x,t.y,t.age,r],e*4)}},_e=e=>{if(ce=0,ue||!le||document.hidden)return;let t=oe.current,n=E?Dd((e-E)/1e3,.001,.05):1/60;E=e,!m&&t.speed>0&&(w+=n*t.speed*.5,te+=n*Math.max(t.speed,.15)),ie<1&&(ie=Math.min(1,ie+n/dd)),se+=n,!m&&t.grain>0&&se>1/24&&(se=0,ae=(ae+1)%97),ge(n),me(),!m&&(t.speed>0||t.grain>0&&t.flicker>0)||ie<1||v.length>0||b.length>0?ce=requestAnimationFrame(_e):E=0};function ve(){!ce&&!ue&&le&&!document.hidden&&(ce=requestAnimationFrame(_e))}let ye=t=>{let n=e.getBoundingClientRect(),r=(t.clientX-n.left)/Math.max(1,n.width),i=1-(t.clientY-n.top)/Math.max(1,n.height),a=n.width/Math.max(1,n.height);x.inside=r>=0&&r<=1&&i>=0&&i<=1,x.x=(r-.5)*a,x.y=i-.5},be=e=>{ye(e);let t=oe.current;if(!x.inside||!t.mouseInteraction||m)return;let n=b[0],r=n?Math.hypot(x.x-n.x,x.y-n.y):1/0;if(!(r<ud)){if(n&&n.age<.1){let e=Math.min(6,Math.floor(r/(ud*2)));for(let t=1;t<=e;t++){let r=t/(e+1);b.unshift({x:n.x+(x.x-n.x)*r,y:n.y+(x.y-n.y)*r,age:0})}}b.unshift({x:x.x,y:x.y,age:0}),b.length=Math.min(b.length,sd),ve()}},xe=e=>{ye(e);let t=oe.current;x.inside&&t.clickEffect&&!m&&(v.unshift({x:x.x,y:x.y,age:0}),v.length>od&&v.pop(),ve())},Se=()=>{E=0,ve()},Ce=new ResizeObserver(he);Ce.observe(e);let D=new IntersectionObserver(e=>{le=e.some(e=>e.isIntersecting),le&&(E=0,ve())});return D.observe(e),window.addEventListener(`pointermove`,be,{passive:!0}),window.addEventListener(`pointerdown`,xe,{passive:!0}),document.addEventListener(`visibilitychange`,Se),he(),re.current=ve,()=>{ue=!0,cancelAnimationFrame(ce),re.current=null,Ce.disconnect(),D.disconnect(),window.removeEventListener(`pointermove`,be),window.removeEventListener(`pointerdown`,xe),document.removeEventListener(`visibilitychange`,Se),[c,l,u].forEach(e=>{e.textures.forEach(e=>n.deleteTexture(e)),n.deleteFramebuffer(e.framebuffer)}),S&&n.deleteTexture(S.texture),n.deleteVertexArray(s),[r,i,a,o].forEach(e=>n.deleteProgram(e.program)),n.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),(0,S.useEffect)(()=>{re.current?.()}),(0,B.jsx)(`div`,{ref:T,className:[`relative h-full w-full overflow-hidden`,ee].filter(Boolean).join(` `),style:w,...te,children:(0,B.jsx)(`canvas`,{ref:ne,className:`absolute inset-0 block h-full w-full`,"aria-hidden":`true`})})};

export const AsciiCanvas: any = Fd;
