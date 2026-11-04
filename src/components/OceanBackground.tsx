import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

export function OceanBackground({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.1;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 20000);
    camera.position.set(30, 30, 100);

    // Sun position
    const sun = new THREE.Vector3();
    const phi = THREE.MathUtils.degToRad(90 - 2);
    const theta = THREE.MathUtils.degToRad(180);
    sun.setFromSphericalCoords(1, phi, theta);

    // Water
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const textureLoader = new THREE.TextureLoader();
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg', (texture: any) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
    });
    water.rotation.x = -Math.PI / 2;
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();
    scene.add(water);

    // Sky
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);
    const skyUniforms = sky.material.uniforms;
    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;
    skyUniforms['cloudCoverage'].value = 0.4;
    skyUniforms['cloudDensity'].value = 0.5;
    skyUniforms['cloudElevation'].value = 0.5;
    skyUniforms['sunPosition'].value.copy(sun);

    scene.add(water);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const clock = new THREE.Clock();
    let animId = 0;
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.01 });
    observer.observe(container);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 800;
      const t = Math.min(scrollY / maxScroll, 1);
      camera.position.y = 30 - t * 28; // 30 -> 2
      camera.position.z = 100 - t * 80; // 100 -> 20 (aproxima)
      camera.lookAt(0, -1, 0);
      dirLight.intensity = 0.8 - t * 0.7;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', resize);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (water.material.uniforms['time']) {
        water.material.uniforms['time'].value += delta;
      }
      if (sky.material.uniforms['time']) {
        sky.material.uniforms['time'].value = time;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      container.removeChild(renderer.domElement);
      renderer.dispose();
      water.geometry.dispose();
      water.material.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ zIndex: 0 }} />;
}
