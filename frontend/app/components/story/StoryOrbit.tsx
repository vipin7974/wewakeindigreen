"use client";

/**
 * STORY ORBIT
 * --------------------------------------------------------------
 * Desktop  → animated canvas with orbiting nodes (hover/click).
 * Mobile   → stacked card list (touch-friendly, no canvas math).
 *
 * Both render in the same component and the visibility is
 * controlled with CSS (`@media (max-width: 768px)`) — this lets
 * the component stay server-render-safe (no `window` checks).
 *
 * Orbit data is driven by Sanity (`story.orbitItems`).
 */

import { useEffect, useRef, useState } from "react";

export type OrbitItem = {
  icon?: string;
  label?: string;
  color?: string;
  title?: string;
  body?: string;
  stat?: string;
};

type Props = { items: OrbitItem[] };

export default function StoryOrbit({ items }: Props) {
  // Canvas + animation refs (kept across renders).
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Which item the user clicked → popup state.
  const [selected, setSelected] = useState<OrbitItem | null>(null);

  useEffect(() => {
    // Guard: no data → don't run the canvas loop.
    if (!items || items.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas drawing constants — internal coordinate space.
    const W = 760;
    const H = 760;
    const CX = W / 2;
    const CY = H / 2;
    const ORBIT_R = 260;
    const CENTER_R = 64;
    const NODE_R = 42;

    // Distribute nodes evenly around the orbit.
    const count = items.length;
    const nodes = items.map((d, i) => ({
      ...d,
      angle: ((i * (360 / count) - 90) * Math.PI) / 180,
      speed: 0.0025,
      hovered: false,
      scale: 1,
      targetScale: 1,
    }));

    let hoveredIdx = -1;

    const nodeXY = (node: any) => ({
      x: CX + Math.cos(node.angle) * ORBIT_R,
      y: CY + Math.sin(node.angle) * ORBIT_R,
    });

    // Main draw routine — clears + redraws on each frame.
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // OUTER decorative rings.
      [320, 280, 240].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(CX, CY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(155,125,212,${0.1 - i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 12]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Lines from center to each node.
      nodes.forEach((n) => {
        const { x, y } = nodeXY(n);
        const gradient = ctx.createLinearGradient(CX, CY, x, y);
        gradient.addColorStop(0, "rgba(155,125,212,0.25)");
        gradient.addColorStop(1, "rgba(155,125,212,0)");
        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = n.hovered ? 2 : 1;
        ctx.stroke();
      });

      // CENTER glow + orb.
      const centerGradient = ctx.createRadialGradient(CX, CY, 0, CX, CY, 140);
      centerGradient.addColorStop(0, "rgba(96,64,168,0.35)");
      centerGradient.addColorStop(1, "rgba(96,64,168,0)");
      ctx.beginPath();
      ctx.arc(CX, CY, 140, 0, Math.PI * 2);
      ctx.fillStyle = centerGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(CX, CY, CENTER_R, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(78,47,142,0.65)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.stroke();

      ctx.font = "54px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🌍", CX, CY + 4);

      // NODES.
      nodes.forEach((n) => {
        const { x, y } = nodeXY(n);
        n.scale += (n.targetScale - n.scale) * 0.12;

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(n.scale, n.scale);

        const gradient = ctx.createRadialGradient(-10, -10, 4, 0, 0, NODE_R);
        gradient.addColorStop(0, "rgba(96,64,168,0.65)");
        gradient.addColorStop(1, "rgba(45,106,79,0.35)");

        ctx.beginPath();
        ctx.arc(0, 0, NODE_R, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.16)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = "34px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.icon ?? "", 0, 2);

        ctx.font = "700 12px Inter";
        ctx.fillStyle = "rgba(255,255,255,0.68)";
        ctx.fillText(n.label ?? "", 0, NODE_R + 24);

        ctx.restore();
      });
    };

    // Animation loop.
    const animate = () => {
      nodes.forEach((n, i) => {
        if (hoveredIdx === i) {
          n.targetScale = 1.28;
          n.hovered = true;
          const target = -Math.PI / 2;
          let diff = target - n.angle;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          n.angle += diff * 0.06;
        } else {
          n.hovered = false;
          n.targetScale = 1;
          n.angle += n.speed;
        }
      });
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Hit-test in canvas coords.
    const hitTest = (mx: number, my: number) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      const cx = (mx - rect.left) * scaleX;
      const cy = (my - rect.top) * scaleY;
      for (let i = 0; i < nodes.length; i++) {
        const { x, y } = nodeXY(nodes[i]);
        if (Math.hypot(cx - x, cy - y) < NODE_R * nodes[i].scale + 10) {
          return i;
        }
      }
      return -1;
    };

    const handleMove = (e: MouseEvent) => {
      const idx = hitTest(e.clientX, e.clientY);
      hoveredIdx = idx;
      canvas.style.cursor = idx >= 0 ? "pointer" : "default";
    };

    const handleLeave = () => {
      hoveredIdx = -1;
    };

    const handleClick = (e: MouseEvent) => {
      const idx = hitTest(e.clientX, e.clientY);
      if (idx >= 0) setSelected(items[idx]);
    };

    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return;
      const idx = hitTest(t.clientX, t.clientY);
      if (idx >= 0) setSelected(items[idx]);
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleTouch, { passive: true });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleTouch);
    };
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="relative flex justify-center w-full">
      {/*
       * DESKTOP — canvas orbit.
       * Hidden on phones via CSS (.story-orbit-canvas-wrap).
       */}
      <div className="story-orbit-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={760}
          height={760}
          className="story-orbit-canvas"
        />

        {/* POPUP — only shown when canvas is clicked. */}
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center z-50 px-4">
            <div className="story-popup-card">
              <button
                type="button"
                className="story-popup-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="story-popup-icon">{selected.icon}</div>
              <h3 className="story-popup-title">{selected.title}</h3>
              <p className="story-popup-body">{selected.body}</p>
              <div
                className="story-popup-stat"
                style={{ color: selected.color }}
              >
                {selected.stat}
              </div>
            </div>
          </div>
        )}
      </div>

      {/*
       * MOBILE — stacked card list.
       * Visible only on phones via CSS (.story-orbit-mobile).
       * Each card shows the same content with no canvas math.
       */}
      <ul className="story-orbit-mobile">
        {items.map((item, i) => (
          <li
            key={`orbit-m-${i}`}
            className="story-orbit-mobile-card"
            style={{
              // Use the editor's accent colour for the left bar.
              ["--accent" as any]: item.color || "#9b7dd4",
            }}
          >
            <div className="story-orbit-mobile-icon">{item.icon}</div>
            <div className="story-orbit-mobile-text">
              <div className="story-orbit-mobile-label">{item.label}</div>
              <h3 className="story-orbit-mobile-title">{item.title}</h3>
              <p className="story-orbit-mobile-body">{item.body}</p>
              <div
                className="story-orbit-mobile-stat"
                style={{ color: item.color }}
              >
                {item.stat}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
