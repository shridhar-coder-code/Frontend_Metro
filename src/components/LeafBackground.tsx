import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: "leaf" | "circle" | "diamond";
  color: string;
}

export function LeafBackground({ dark = false }: { dark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const colors = dark
    ? ["rgba(34,197,94,0.25)", "rgba(74,222,128,0.2)", "rgba(134,239,172,0.15)", "rgba(22,163,74,0.2)"]
    : ["rgba(34,197,94,0.18)", "rgba(74,222,128,0.15)", "rgba(134,239,172,0.12)", "rgba(187,247,208,0.2)"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 8 + 4,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type: (["leaf", "circle", "diamond"] as const)[Math.floor(Math.random() * 3)],
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    for (let i = 0; i < 30; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      particles.current.push(p);
    }

    const drawLeaf = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.type === "leaf") {
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size, -p.size, p.size * 1.2, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.5, p.size * 0.5, -p.size * 0.3, -p.size * 0.5, 0, -p.size);
        ctx.fill();
        ctx.strokeStyle = p.color.replace(/[\d.]+\)$/, "0.6)");
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(0, p.size);
        ctx.stroke();
      } else if (p.type === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size, 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y < -20) {
          particles.current[i] = createParticle();
        }
        drawLeaf(ctx, p);
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
