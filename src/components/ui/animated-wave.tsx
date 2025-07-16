"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface AnimatedWaveProps {
  className?: string;
  speed?: number;
  amplitude?: number;
  smoothness?: number;
  wireframe?: boolean;
  waveColor?: string;
  opacity?: number;
  mouseInteraction?: boolean;
  quality?: "low" | "medium" | "high";
  fov?: number;
  waveOffsetY?: number;
  waveRotation?: number;
  cameraDistance?: number;
  autoDetectBackground?: boolean;
  backgroundColor?: string;
  ease?: number;
  mouseDistortionStrength?: number;
  mouseDistortionSmoothness?: number;
  mouseDistortionDecay?: number;
  mouseShrinkScaleStrength?: number;
  mouseShrinkScaleRadius?: number;
}

export default function AnimatedWave({
  className = "",
  speed = 0.015,
  amplitude = 30,
  smoothness = 300,
  wireframe = true,
  waveColor,
  opacity = 0.6,
  mouseInteraction = true,
  quality = "medium",
  fov = 60,
  waveOffsetY = -300,
  waveRotation = 29.8,
  cameraDistance = -1000,
  autoDetectBackground = true,
  backgroundColor,
  ease = 12,
  mouseDistortionStrength = 0.5,
  mouseDistortionSmoothness = 100,
  mouseDistortionDecay = 0.0005,
  mouseShrinkScaleStrength = 0.7,
  mouseShrinkScaleRadius = 200,
}: AnimatedWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Quality settings
    const qualitySettings = {
      low: { segments: 50, pixelRatio: 0.5 },
      medium: { segments: 100, pixelRatio: 1 },
      high: { segments: 200, pixelRatio: window.devicePixelRatio || 1 },
    };
    const settings = qualitySettings[quality];

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      fov,
      rect.width / rect.height,
      0.1,
      2000
    );
    camera.position.z = cameraDistance;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: quality !== "low",
    });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(settings.pixelRatio);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.PlaneGeometry(
      1000,
      1000,
      settings.segments,
      settings.segments
    );

    // Material
    const detectedColor = waveColor || "#fcb432";
    const material = new THREE.MeshBasicMaterial({
      color: detectedColor,
      transparent: true,
      opacity: opacity,
      wireframe: wireframe,
      side: THREE.DoubleSide,
    });

    // Mesh
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = THREE.MathUtils.degToRad(waveRotation);
    plane.position.y = waveOffsetY;
    planeRef.current = plane;
    scene.add(plane);

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseInteraction) return;

      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += speed;

      if (planeRef.current) {
        const positions = planeRef.current.geometry.attributes.position;
        const positionArray = positions.array as Float32Array;

        for (let i = 0; i < positionArray.length; i += 3) {
          const x = positionArray[i];
          const y = positionArray[i + 1];

          // Wave calculation - multiple wave layers
          const distance = Math.sqrt(x * x + y * y);
          const waveHeight =
            Math.sin(distance * 0.01 + time) * amplitude +
            Math.sin(x * 0.01 + time * 1.5) * amplitude * 0.5 +
            Math.cos(y * 0.01 + time * 0.8) * amplitude * 0.3 +
            Math.sin(x * 0.005 + y * 0.005 + time * 2) * amplitude * 0.2;

          // Mouse interaction
          if (mouseInteraction) {
            const mouseWorldX = mouseRef.current.x * 500;
            const mouseWorldY = mouseRef.current.y * 500;
            const mouseDistance = Math.sqrt(
              (x - mouseWorldX) ** 2 + (y - mouseWorldY) ** 2
            );

            if (mouseDistance < mouseShrinkScaleRadius) {
              const influence = 1 - mouseDistance / mouseShrinkScaleRadius;
              const distortion =
                Math.sin(mouseDistance * 0.05 + time * 5) *
                mouseDistortionStrength *
                influence;
              positionArray[i + 2] =
                waveHeight + distortion * mouseShrinkScaleStrength;
            } else {
              positionArray[i + 2] = waveHeight;
            }
          } else {
            positionArray[i + 2] = waveHeight;
          }
        }

        positions.needsUpdate = true;
        planeRef.current.geometry.computeVertexNormals();
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;

      const newRect = containerRef.current.getBoundingClientRect();
      cameraRef.current.aspect = newRect.width / newRect.height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newRect.width, newRect.height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (
        rendererRef.current &&
        container.contains(rendererRef.current.domElement)
      ) {
        container.removeChild(rendererRef.current.domElement);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [
    speed,
    amplitude,
    smoothness,
    wireframe,
    waveColor,
    opacity,
    mouseInteraction,
    quality,
    fov,
    waveOffsetY,
    waveRotation,
    cameraDistance,
    autoDetectBackground,
    backgroundColor,
    ease,
    mouseDistortionStrength,
    mouseDistortionSmoothness,
    mouseDistortionDecay,
    mouseShrinkScaleStrength,
    mouseShrinkScaleRadius,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        background: "transparent",
        overflow: "hidden",
      }}
    />
  );
}
