'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FogVolumeInteractive() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 4)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    ref.current!.appendChild(renderer.domElement)

    // uniforms with pointer and strength
    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.0, 0.0) },
      uStrength: { value: 0.0 },
      uAspect: { value: window.innerWidth / window.innerHeight }
    }

    const geometry = new THREE.BoxGeometry(20, 20, 20)
    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      uniforms,
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPos;
        uniform float uTime;
        uniform vec2  uPointer;
        uniform float uStrength;
        uniform float uAspect;

        float hash(vec3 p){
          return fract(sin(dot(p, vec3(7,157,113)))*43758.5453);
        }
        float noise(vec3 p){
          vec3 i=floor(p); vec3 f=fract(p);
          f=f*f*(3.0-2.0*f);
          return mix(mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),f.x),
                         mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                     mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
                         mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),
                     f.z);
        }

        void main(){
          // Normalized XY of current fragment inside the cube
          vec2 uv = vPos.xy / 10.0;     // scale to [-1,1] roughly
          uv.x *= uAspect;

          // Distance from pointer (in same normalized space)
          float dist = distance(uv, uPointer);

          // interactive swirl offset
          float offset = uStrength * exp(-dist*5.0) * sin(uTime*1.5);

          // Move sample position based on pointer influence
          vec3 samplePos = vPos*0.3 + vec3(uTime*0.05 + offset);

          float n = noise(samplePos);
          float density = smoothstep(0.4, 0.6, n);

          gl_FragColor = vec4(vec3(1.0), density*0.45);
        }
      `
    })

    const fogBox = new THREE.Mesh(geometry, material)
    scene.add(fogBox)

    // clock
    const clock = new THREE.Clock()

    // mouse/touch handlers
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
      const y = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY
      // convert to [-1,1] coords, match shader uv scaling
      uniforms.uPointer.value.x = (x / window.innerWidth) * 2.0 - 1.0
      uniforms.uPointer.value.y = -((y / window.innerHeight) * 2.0 - 1.0)
      uniforms.uStrength.value = 0.6 // activate distortion
    }

    const onLeave = () => { uniforms.uStrength.value = 0.0 }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    function animate() {
      requestAnimationFrame(animate)
      uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.uAspect.value = window.innerWidth / window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
      containerCleanup()
    }

    function containerCleanup() {
      ref.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={ref} className="w-full h-[400px] absolute -bottom-20 opacity-70" />
}
