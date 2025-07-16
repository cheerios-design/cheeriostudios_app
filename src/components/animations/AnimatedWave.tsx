"use client";

import { useEffect, useRef } from "react";

export default function AnimatedWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Wave configuration
    const config = {
      waveSpeed: 0.02,
      wavePeriod: 0.005,
      waveAmplitude: 20,
      waveFrequency: 0.005,
      lineSpacing: 120,
      lineColor: "rgba(252, 180, 52, 0.15)",
      gradientColors: ["rgba(252, 180, 52, 0.05)", "rgba(252, 180, 52, 0.02)"],
      mouseRadius: 150,
      mouseStrength: 0.3,
      autoWaveSpeed: 0.005,
      autoWaveAmplitude: 12,
    };

    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Create grid points
    const createGrid = () => {
      const points: { x: number; y: number }[][] = [];
      const cols = Math.ceil(canvas.width / config.lineSpacing) + 2;
      const rows = Math.ceil(canvas.height / config.lineSpacing) + 2;

      for (let i = 0; i < rows; i++) {
        points[i] = [];
        for (let j = 0; j < cols; j++) {
          points[i][j] = {
            x: j * config.lineSpacing,
            y: i * config.lineSpacing,
          };
        }
      }
      return { points, cols, rows };
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, config.gradientColors[0]);
      gradient.addColorStop(1, config.gradientColors[1]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Get grid
      const { points, cols, rows } = createGrid();

      // Draw horizontal lines
      ctx.strokeStyle = config.lineColor;
      ctx.lineWidth = 5;

      for (let i = 0; i < rows; i++) {
        ctx.beginPath();
        for (let j = 0; j < cols; j++) {
          const point = points[i][j];

          // Calculate multiple wave layers for more dynamic movement
          // Horizontal wave - moves left to right
          const waveX1 =
            Math.sin(j * config.wavePeriod + time * config.waveSpeed) *
            config.waveAmplitude;
          // Vertical ripple effect
          const waveY1 =
            Math.sin(i * config.wavePeriod + time * config.waveSpeed * 0.8) *
            (config.waveAmplitude * 0.7);

          // Calculate mouse influence
          const dx = point.x - mouseX;
          const dy = point.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - distance / config.mouseRadius);

          const offsetX = dx * influence * config.mouseStrength;
          const offsetY = dy * influence * config.mouseStrength;

          // Apply all distortions (wave layers + mouse)
          const x = point.x + waveX1 + offsetX;
          const y = point.y + waveY1 + offsetY;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let j = 0; j < cols; j++) {
        ctx.beginPath();
        for (let i = 0; i < rows; i++) {
          const point = points[i][j];

          // Calculate multiple wave layers for vertical lines
          // Vertical wave - moves up and down
          const waveY1 =
            Math.sin(i * config.wavePeriod + time * config.waveSpeed * 0.9) *
            config.waveAmplitude;
          // Horizontal ripple effect
          const waveX1 =
            Math.sin(j * config.wavePeriod + time * config.waveSpeed * 1.1) *
            (config.waveAmplitude * 0.6);

          // Add secondary wave with perpendicular movement
          // Cross-diagonal wave
          const waveY2 =
            Math.cos(
              (i + j) * config.waveFrequency + time * config.autoWaveSpeed * 1.8
            ) * config.autoWaveAmplitude;
          // Inverse diagonal wave
          const waveX2 =
            Math.sin(
              (j - i) * config.waveFrequency + time * config.autoWaveSpeed * 1.3
            ) * config.autoWaveAmplitude;

          // Calculate mouse influence
          const dx = point.x - mouseX;
          const dy = point.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - distance / config.mouseRadius);

          const offsetX = dx * influence * config.mouseStrength;
          const offsetY = dy * influence * config.mouseStrength;

          // Apply all distortions (wave layers + mouse)
          const x = point.x + waveX1 + waveX2 + offsetX;
          const y = point.y + waveY1 + waveY2 + offsetY;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Update time for continuous animation
      time += 1;

      // Continue animation
      requestAnimationFrame(animate);
    };

    // Start animation
    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: "transparent",
        opacity: 0.6,
      }}
    />
  );
}
