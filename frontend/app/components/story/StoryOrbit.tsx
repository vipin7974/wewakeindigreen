"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type OrbitItem = {
  icon: string;

  label: string;

  color: string;

  title: string;

  body: string;

  stat: string;
};

const DATA: OrbitItem[] = [
  {
    icon: "🗻",

    label: "Plastic Crisis",

    color: "#9b7dd4",

    title: "Plastic Waste Crisis",

    body:
      "India generates over 10,376 tonnes of plastic waste every single day. Single-use plastics are damaging ecosystems, oceans, and future sustainability.",

    stat:
      "10,376 T/D Plastic Waste",
  },

  {
    icon: "💧",

    label: "Water Scarcity",

    color: "#52c5d0",

    title: "Water Scarcity",

    body:
      "700 million people could face severe water scarcity by 2030. Sustainable water management is now a global necessity.",

    stat:
      "700 Million At Risk",
  },

  {
    icon: "🌱",

    label: "Agro Waste",

    color: "#95d5b2",

    title: "Agricultural Waste",

    body:
      "Millions of tonnes of crop residue are burned yearly. BioMANS converts this waste into sustainable biodegradable material.",

    stat:
      "Agro Waste → BioMANS",
  },
];

export default function StoryOrbit() {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(
      null
    );

  const animationRef =
    useRef<number | null>(null);

  const [selected, setSelected] =
    useState<OrbitItem | null>(null);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    /* BIGGER SIZE */

    const W = 760;

    const H = 760;

    const CX = W / 2;

    const CY = H / 2;

    /* BIGGER ORBIT */

    const ORBIT_R = 260;

    const CENTER_R = 64;

    const NODE_R = 42;

    const nodes = DATA.map(
      (d, i) => ({
        ...d,

        angle:
          ((i * 120 - 90) *
            Math.PI) /
          180,

        speed: 0.0025,

        hovered: false,

        scale: 1,

        targetScale: 1,
      })
    );

    let hoveredIdx = -1;

    const nodeXY = (
      node: any
    ) => ({
      x:
        CX +
        Math.cos(node.angle) *
          ORBIT_R,

      y:
        CY +
        Math.sin(node.angle) *
          ORBIT_R,
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* OUTER RINGS */

      [320, 280, 240].forEach(
        (r, i) => {
          ctx.beginPath();

          ctx.arc(
            CX,
            CY,
            r,
            0,
            Math.PI * 2
          );

          ctx.strokeStyle = `rgba(155,125,212,${
            0.10 - i * 0.02
          })`;

          ctx.lineWidth = 1;

          ctx.setLineDash([
            8,
            12,
          ]);

          ctx.stroke();

          ctx.setLineDash([]);
        }
      );

      /* CONNECTIONS */

      nodes.forEach((n) => {
        const { x, y } =
          nodeXY(n);

        const gradient =
          ctx.createLinearGradient(
            CX,
            CY,
            x,
            y
          );

        gradient.addColorStop(
          0,
          "rgba(155,125,212,0.25)"
        );

        gradient.addColorStop(
          1,
          "rgba(155,125,212,0)"
        );

        ctx.beginPath();

        ctx.moveTo(CX, CY);

        ctx.lineTo(x, y);

        ctx.strokeStyle =
          gradient;

        ctx.lineWidth =
          n.hovered ? 2 : 1;

        ctx.stroke();
      });

      /* CENTER GLOW */

      const centerGradient =
        ctx.createRadialGradient(
          CX,
          CY,
          0,
          CX,
          CY,
          140
        );

      centerGradient.addColorStop(
        0,
        "rgba(96,64,168,0.35)"
      );

      centerGradient.addColorStop(
        1,
        "rgba(96,64,168,0)"
      );

      ctx.beginPath();

      ctx.arc(
        CX,
        CY,
        140,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        centerGradient;

      ctx.fill();

      /* CENTER ORB */

      ctx.beginPath();

      ctx.arc(
        CX,
        CY,
        CENTER_R,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        "rgba(78,47,142,0.65)";

      ctx.fill();

      ctx.strokeStyle =
        "rgba(255,255,255,0.15)";

      ctx.stroke();

      ctx.font =
        "54px serif";

      ctx.textAlign = "center";

      ctx.textBaseline =
        "middle";

      ctx.fillText(
        "🌍",
        CX,
        CY + 4
      );

      /* NODES */

      nodes.forEach((n) => {
        const { x, y } =
          nodeXY(n);

        n.scale +=
          (n.targetScale -
            n.scale) *
          0.12;

        ctx.save();

        ctx.translate(x, y);

        ctx.scale(
          n.scale,
          n.scale
        );

        const gradient =
          ctx.createRadialGradient(
            -10,
            -10,
            4,
            0,
            0,
            NODE_R
          );

        gradient.addColorStop(
          0,
          "rgba(96,64,168,0.65)"
        );

        gradient.addColorStop(
          1,
          "rgba(45,106,79,0.35)"
        );

        ctx.beginPath();

        ctx.arc(
          0,
          0,
          NODE_R,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          gradient;

        ctx.fill();

        ctx.strokeStyle =
          "rgba(255,255,255,0.16)";

        ctx.lineWidth = 1.5;

        ctx.stroke();

        ctx.font =
          "34px serif";

        ctx.textAlign = "center";

        ctx.textBaseline =
          "middle";

        ctx.fillText(
          n.icon,
          0,
          2
        );

        /* LABEL */

        ctx.font =
          "700 12px Inter";

        ctx.fillStyle =
          "rgba(255,255,255,0.68)";

        ctx.fillText(
          n.label,
          0,
          NODE_R + 24
        );

        ctx.restore();
      });
    };

    const animate = () => {
      nodes.forEach((n, i) => {
        if (hoveredIdx === i) {
          n.targetScale = 1.28;

          n.hovered = true;

          /* MOVE TO TOP */

          const target =
            -Math.PI / 2;

          let diff =
            target - n.angle;

          diff = Math.atan2(
            Math.sin(diff),
            Math.cos(diff)
          );

          n.angle +=
            diff * 0.06;
        } else {
          n.hovered = false;

          n.targetScale = 1;

          n.angle += n.speed;
        }
      });

      draw();

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animate();

    /* HIT TEST */

    const hitTest = (
      mx: number,
      my: number
    ) => {
      const rect =
        canvas.getBoundingClientRect();

      const scaleX =
        W / rect.width;

      const scaleY =
        H / rect.height;

      const cx =
        (mx - rect.left) *
        scaleX;

      const cy =
        (my - rect.top) *
        scaleY;

      for (
        let i = 0;
        i < nodes.length;
        i++
      ) {
        const { x, y } =
          nodeXY(nodes[i]);

        if (
          Math.hypot(
            cx - x,
            cy - y
          ) <
          NODE_R *
            nodes[i].scale +
            10
        ) {
          return i;
        }
      }

      return -1;
    };

    const handleMove = (
      e: MouseEvent
    ) => {
      const idx = hitTest(
        e.clientX,
        e.clientY
      );

      hoveredIdx = idx;

      canvas.style.cursor =
        idx >= 0
          ? "pointer"
          : "default";
    };

    const handleLeave = () => {
      hoveredIdx = -1;
    };

    const handleClick = (
      e: MouseEvent
    ) => {
      const idx = hitTest(
        e.clientX,
        e.clientY
      );

      if (idx >= 0) {
        setSelected(DATA[idx]);
      }
    };

    canvas.addEventListener(
      "mousemove",
      handleMove
    );

    canvas.addEventListener(
      "mouseleave",
      handleLeave
    );

    canvas.addEventListener(
      "click",
      handleClick
    );

    return () => {
      if (
        animationRef.current
      ) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      canvas.removeEventListener(
        "mousemove",
        handleMove
      );

      canvas.removeEventListener(
        "mouseleave",
        handleLeave
      );

      canvas.removeEventListener(
        "click",
        handleClick
      );
    };
  }, []);

  return (
    <div className="relative flex justify-center">
      <div
        className="
          relative
          w-[760px]
          h-[760px]
          max-w-full
        "
      >
        <canvas
          ref={canvasRef}
          width={760}
          height={760}
          className="
            w-full
            h-full
          "
        />

        {/* POPUP */}

        {selected && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              z-50
            "
          >
            <div className="story-popup-card">
              <button
                className="story-popup-close"
                onClick={() =>
                  setSelected(null)
                }
              >
                ✕
              </button>

              <div
                className="
                  story-popup-icon
                "
              >
                {selected.icon}
              </div>

              <h3
                className="
                  story-popup-title
                "
              >
                {selected.title}
              </h3>

              <p
                className="
                  story-popup-body
                "
              >
                {selected.body}
              </p>

              <div
                className="
                  story-popup-stat
                "
                style={{
                  color:
                    selected.color,
                }}
              >
                {selected.stat}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
