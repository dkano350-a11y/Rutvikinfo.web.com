import React, { useEffect, useRef, useState } from 'react';

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform vec2 resolution;
  uniform float time;
  uniform vec2 mouse;

  // Cheaper pseudo-random hash for noise
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Cheaper 2D value noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
                   dot(hash(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
               mix(dot(hash(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
                   dot(hash(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    // Fix aspect ratio
    uv.x *= resolution.x / resolution.y;

    // Mouse interaction parallax
    vec2 m = mouse / resolution;
    uv += (m - 0.5) * 0.15;

    float t = time * 0.2;

    // Fluid movement with glass refraction feel (Stripe style)
    vec2 p = uv * 2.0 - 1.0; // center
    p.x += sin(t * 0.5 + p.y * 2.0) * 0.2;
    p.y += cos(t * 0.4 + p.x * 1.5) * 0.2;
    
    // Deeper smooth noise layers with domain warping for that liquid glass feel
    vec2 q = vec2(0.0);
    q.x = noise(p + vec2(t * 0.2, t * 0.3));
    q.y = noise(p + vec2(t * 0.4, t * 0.5));
    
    float n1 = noise(p * 1.5 + q * 1.0 + vec2(t * 0.5, t * 0.8));
    float n2 = noise(p * 2.5 + q * 2.0 + vec2(-t * 0.4, t * 0.3) + n1 * 0.8);
    float n3 = noise(p * 1.2 + vec2(n2 * 1.2, -t * 0.6));

    // Premium Peach & Light Blue mesh gradient colors
    vec3 color1 = vec3(1.0, 0.85, 0.75);  // Soft Peach
    vec3 color2 = vec3(0.75, 0.9, 1.0);   // Light Sky Blue
    vec3 color3 = vec3(1.0, 0.9, 0.85);   // Very pale peach/cream
    vec3 color4 = vec3(0.65, 0.85, 1.0);  // Vibrant Light Blue
    vec3 color5 = vec3(0.95, 0.8, 0.75);  // Deeper Peach

    // Intense Smoothstep blends for sharp glass refraction effect
    vec3 finalColor = mix(color1, color2, smoothstep(0.1, 0.9, n1));
    finalColor = mix(finalColor, color3, smoothstep(0.2, 0.9, n2));
    finalColor = mix(finalColor, color4, smoothstep(0.1, 0.8, n3));
    finalColor = mix(finalColor, color5, smoothstep(0.5, 1.0, sin(t + p.x * 2.0)));


    // Dynamic color shift based on mouse proximity to center
    float dist = distance(uv, vec2(0.5 * (resolution.x/resolution.y), 0.5) + (m - 0.5) * 0.15);
    finalColor += color2 * (1.0 - smoothstep(0.0, 1.2, dist)) * 0.2;

    // Add a vibrant luminous glass glow along the refraction ridges
    float glow = smoothstep(0.4, 0.6, n3) - smoothstep(0.6, 0.8, n3);
    finalColor += glow * vec3(0.8, 0.9, 1.0) * 0.4;
    
    // Subtle chromatic dispersion feel
    finalColor.r += smoothstep(0.4, 0.6, n1) * 0.05;
    finalColor.b += smoothstep(0.4, 0.6, n2) * 0.05;

    // Keep it vivid, no desaturation to white as we want colored background


    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function ShaderBackground({ showControls = false }: { showControls?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    // Check initial preference
    const prefs = localStorage.getItem('reduceMotion') === 'true';
    setIsPaused(prefs);
    isPausedRef.current = prefs;

    const handleToggle = () => {
      setIsPaused((prev) => {
        const next = !prev;
        localStorage.setItem('reduceMotion', String(next));
        isPausedRef.current = next;
        return next;
      });
    };

    window.addEventListener('toggle-background-animation', handleToggle);
    return () => window.removeEventListener('toggle-background-animation', handleToggle);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const vError = gl.getShaderInfoLog(vertexShader);
    if (vError) console.warn("Vertex Shader:", vError);

    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    
    const fError = gl.getShaderInfoLog(fragmentShader);
    if (fError) console.warn("Fragment Shader:", fError);

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'resolution');
    const timeLocation = gl.getUniformLocation(program, 'time');
    const mouseLocation = gl.getUniformLocation(program, 'mouse');

    let animationFrameId: number;
    let startTime = Date.now();
    let accumulatedTime = 0;
    let lastRenderTime = startTime;
    
    // Mouse tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      // Force render frame when resized in paused state
      if (isPausedRef.current) renderFrame();
    };

    window.addEventListener('resize', resize);

    const renderFrame = () => {
      const now = Date.now();
      if (!isPausedRef.current) {
        accumulatedTime += (now - lastRenderTime);
      }
      lastRenderTime = now;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, accumulatedTime / 1000);
      
      // Update mouse uniformly, inverted Y for webgl coordinate system
      gl.uniform2f(mouseLocation, mouseX, canvas.height - mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const render = () => {
      if (!isPausedRef.current) {
         renderFrame();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    // Initial setup
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[-2] w-full h-full pointer-events-none opacity-60 mix-blend-multiply"
      />
      {/* Frosted glass overlay for readability */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-white/30 backdrop-blur-[40px]" />
      
      {/* Film grain overlay */}
      <div 
        className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          backgroundRepeat: 'repeat'
        }}
      />

    </>
  );
}
