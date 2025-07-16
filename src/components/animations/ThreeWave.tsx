"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
 * ThreeWave Component - 3D Animated Wave Background
 * ================================================
 *
 * Quick Modification Guide:
 * ------------------------
 *
 * 🌊 Wave Speed: Change `speed` prop (0.01 = slow, 0.03 = fast)
 * 📏 Wave Height: Change `amplitude` prop (10 = subtle, 50 = dramatic)
 * 🎨 Wave Color: Change `waveColor` prop (hex color like "#ff0000")
 * 👻 Transparency: Change `opacity` prop (0.1 = very faint, 0.8 = bold)
 * 🖱️ Mouse Effects: Set `mouseInteraction` to false to disable
 * 📐 Wave Angle: Change `waveRotation` prop (0 = flat, 45 = tilted)
 * 📹 Camera Distance: Change `cameraDistance` prop (-200 = close, -800 = far)
 * ⚡ Performance: Change `quality` prop ("low" | "medium" | "high")
 *
 * Advanced Wave Patterns:
 * ----------------------
 * Look for the "WAVE CALCULATION" section in the animation loop below.
 * Each layer creates different wave motion:
 * - radialWave: Ripples expanding from center
 * - horizontalWave: Side-to-side motion
 * - verticalWave: Up-down motion
 * - diagonalWave: Crosshatch interference pattern
 *
 * Modify the numbers like 0.01, 1.5, 0.8, 2 to change wave frequencies.
 * Modify the multipliers like 0.5, 0.3, 0.2 to change layer intensities.
 */

interface ThreeWaveProps {
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

export default function ThreeWave({
  className = "",
  speed = 0.002, // Wave animation speed (higher = faster waves)
  amplitude = 50, // Wave height intensity (higher = taller waves)
  smoothness = 300, // Not used in current implementation
  wireframe = true, // Show as wireframe grid or solid surface
  waveColor, // Wave color (defaults to brand gold #fcb432)
  opacity = 0.05, // Wave transparency (0 = invisible, 1 = opaque)
  mouseInteraction = true, // Enable mouse cursor interaction effects
  quality = "medium", // Rendering quality: "low" | "medium" | "high"
  fov = 25, // Camera field of view (wider = more perspective)
  waveOffsetY = -300, // Vertical position of wave plane
  waveRotation = 29.8, // Tilt angle of wave plane (degrees)
  cameraDistance = -700, // How far back the camera sits (negative = further)
  autoDetectBackground = true, // Auto-detect background color (not implemented)
  backgroundColor, // Background color override
  ease = 12, // Easing factor (not used in current implementation)
  mouseDistortionStrength = 100, // How strong mouse effects are (increased for testing)
  mouseDistortionSmoothness = 100, // Smoothness of mouse distortion
  mouseDistortionDecay = 0.1, // How fast mouse effects fade
  mouseShrinkScaleStrength = 0.8, // Scale factor for mouse distortion
  mouseShrinkScaleRadius = 500, // Radius of mouse interaction area (increased for testing)
}: ThreeWaveProps) {
  console.log("ThreeWave: Component rendered with props:", {
    waveColor,
    opacity,
    wireframe,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      console.log("ThreeWave: Container ref not available");
      return;
    }

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    console.log("ThreeWave: Initializing with rect:", rect);

    // Check if the container has dimensions
    if (rect.width === 0 || rect.height === 0) {
      console.warn("ThreeWave: Container has no dimensions, retrying...");
      setTimeout(() => {
        const newRect = container.getBoundingClientRect();
        if (newRect.width > 0 && newRect.height > 0) {
          console.log(
            "ThreeWave: Container now has dimensions, reinitializing"
          );
          // Trigger re-render by updating a state or calling the effect again
        }
      }, 100);
      return;
    }

    // Quality settings - affects performance vs visual quality
    const qualitySettings = {
      low: { segments: 50, pixelRatio: 0.5 }, // 2,500 vertices, half resolution
      medium: { segments: 100, pixelRatio: 1 }, // 10,000 vertices, normal resolution
      high: { segments: 200, pixelRatio: window.devicePixelRatio || 1 }, // 40,000 vertices, high-DPI
    };
    const settings = qualitySettings[quality];
    console.log("ThreeWave: Using quality settings:", settings);

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      console.log("ThreeWave: Scene created");

      // Camera setup - controls viewing perspective
      const camera = new THREE.PerspectiveCamera(
        fov, // Field of view (60° = natural perspective)
        rect.width / rect.height, // Aspect ratio (automatically calculated)
        0.1, // Near clipping plane
        2000 // Far clipping plane
      );
      camera.position.z = cameraDistance; // Move camera back/forward (negative = back)
      camera.position.y = 0; // Camera height (0 = center)
      camera.lookAt(0, 0, 0); // Point camera at origin
      cameraRef.current = camera;
      console.log("ThreeWave: Camera created at position:", camera.position);

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
      console.log("ThreeWave: Renderer created and added to DOM");

      // Geometry - creates the wave surface mesh
      const geometry = new THREE.PlaneGeometry(
        1000, // Width of wave plane
        1000, // Height of wave plane
        settings.segments, // Number of width divisions (more = smoother waves)
        settings.segments // Number of height divisions (more = smoother waves)
      );

      // Material - defines wave appearance
      const detectedColor = waveColor || "#fcb432"; // Use brand gold if no color specified
      const material = new THREE.MeshBasicMaterial({
        color: detectedColor, // Wave color
        transparent: true, // Enable transparency
        opacity: opacity, // How see-through the wave is (0.3 = subtle)
        wireframe: wireframe, // Show as grid lines vs solid surface
        side: THREE.DoubleSide, // Render both front and back faces
      });
      console.log(
        "ThreeWave: Geometry and material created with color:",
        detectedColor
      );

      // Mesh - combines geometry and material into renderable object
      const plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = THREE.MathUtils.degToRad(waveRotation); // Tilt the wave plane
      plane.position.y = waveOffsetY; // Move wave up/down (-300 = below center)
      plane.position.z = 0; // Keep wave at origin depth
      planeRef.current = plane;
      scene.add(plane); // Add wave to the 3D scene
      console.log("ThreeWave: Plane mesh created and added to scene");

      // Mouse tracking - captures cursor position for interaction
      const handleMouseMove = (event: MouseEvent) => {
        if (!mouseInteraction) return;

        const rect = container.getBoundingClientRect();
        // Convert screen coordinates to normalized device coordinates (-1 to 1)
        const newMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const newMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        mouseRef.current.x = newMouseX;
        mouseRef.current.y = newMouseY;

        // Debug: Log mouse position occasionally
        if (Math.random() < 0.01) {
          // Only log 1% of the time to avoid spam
          console.log("Mouse position:", {
            screen: { x: event.clientX, y: event.clientY },
            normalized: { x: newMouseX, y: newMouseY },
            world: { x: newMouseX * 100, y: newMouseY * 100 },
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      // Also add mouse enter/leave events to debug
      container.addEventListener("mouseenter", () => {
        console.log("Mouse entered ThreeWave container");
      });
      container.addEventListener("mouseleave", () => {
        console.log("Mouse left ThreeWave container");
      });

      // Animation loop - this runs 60 times per second to create wave motion
      let time = 0;
      const animate = () => {
        time += speed; // Increment time for wave progression

        if (planeRef.current) {
          // Get access to the vertex positions of the wave mesh
          const positions = planeRef.current.geometry.attributes.position;
          const positionArray = positions.array as Float32Array;

          // Loop through every vertex (every 3 values = x, y, z coordinate)
          for (let i = 0; i < positionArray.length; i += 3) {
            const x = positionArray[i]; // Current vertex X position
            const y = positionArray[i + 1]; // Current vertex Y position

            // === WAVE CALCULATION - Multiple overlapping wave patterns ===
            const distance = Math.sqrt(x * x + y * y); // Distance from center

            // Layer 1: Radial wave expanding from center
            const radialWave = Math.sin(distance * 0.01 + time) * amplitude;

            // Layer 2: Horizontal wave moving left-right
            const horizontalWave =
              Math.sin(x * 0.01 + time * 1.5) * amplitude * 0.8;

            // Layer 3: Vertical wave moving up-down
            const verticalWave =
              Math.cos(y * 0.01 + time * 0.8) * amplitude * 0.6;

            // Layer 4: Diagonal interference pattern
            const diagonalWave =
              Math.sin(x * 0.005 + y * 0.005 + time * 2) * amplitude * 0.4;

            // Combine all wave layers for final height
            const waveHeight =
              radialWave + horizontalWave + verticalWave + diagonalWave;

            // === MOUSE INTERACTION - Distort waves around cursor ===
            if (mouseInteraction) {
              // Convert mouse coordinates to world space
              const mouseWorldX = mouseRef.current.x * 100;
              const mouseWorldY = mouseRef.current.y * 100;

              // Calculate distance from vertex to mouse cursor
              const mouseDistance = Math.sqrt(
                (x - mouseWorldX) ** 2 + (y - mouseWorldY) ** 2
              );

              // Apply distortion if vertex is within interaction radius
              if (mouseDistance < mouseShrinkScaleRadius) {
                const influence = 1 - mouseDistance / mouseShrinkScaleRadius; // Fade effect
                const distortion =
                  Math.sin(mouseDistance * 0.05 + time * 5) *
                  mouseDistortionStrength *
                  influence;
                // Set final Z position with wave + mouse distortion
                positionArray[i + 2] =
                  waveHeight + distortion * mouseShrinkScaleStrength;

                // Debug: Log when we're applying mouse distortion (very rarely)
                if (Math.random() < 0.0001) {
                  console.log("Mouse distortion applied:", {
                    mouseWorldX,
                    mouseWorldY,
                    mouseDistance,
                    influence,
                    distortion,
                  });
                }
              } else {
                // Set final Z position with just wave motion
                positionArray[i + 2] = waveHeight;
              }
            } else {
              // Set final Z position with just wave motion (no mouse interaction)
              positionArray[i + 2] = waveHeight;
            }
          }

          // Tell Three.js that vertex positions have changed
          positions.needsUpdate = true;
          // Recalculate surface normals for proper lighting
          planeRef.current.geometry.computeVertexNormals();
        }

        // Render the scene to the screen
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }

        // Schedule next frame (creates 60fps animation loop)
        animationIdRef.current = requestAnimationFrame(animate);
      };

      // Start animation
      animate();
      console.log("ThreeWave: Animation started successfully");

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
        container.removeEventListener("mouseenter", () => {});
        container.removeEventListener("mouseleave", () => {});
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
    } catch (error) {
      console.error("ThreeWave WebGL Error:", error);
      console.error("ThreeWave: Full error details:", {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        name: error instanceof Error ? error.name : "Unknown",
      });
      // Fallback - hide the component if WebGL fails
      if (containerRef.current) {
        containerRef.current.style.display = "none";
        console.log("ThreeWave: Component hidden due to WebGL error");
      }
    }
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
        zIndex: 1,
        pointerEvents: "auto", // Enable mouse events for interaction
      }}
    />
  );
}
