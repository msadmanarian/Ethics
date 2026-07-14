/**
 * Programmatically draws high-quality icons onto an HTML5 Canvas
 * and exports them as PNG Base64 data URLs for seamless insertion into PPTX.
 * This guarantees 100% client-side offline compatibility, zero CORS issues,
 * and high-resolution outputs (512x512 px).
 */

export function drawIconToDataUrl(
  iconType: string,
  color: string = "#FFFFFF",
  size: number = 512
): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Set line styling
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = size * 0.06;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Normalize scale to 0-100 coordinate system
  ctx.scale(size / 100, size / 100);

  switch (iconType) {
    case "solar":
      // Draw sun center
      ctx.beginPath();
      ctx.arc(50, 50, 16, 0, Math.PI * 2);
      ctx.stroke();
      // Draw solar rays
      const rays = 8;
      for (let i = 0; i < rays; i++) {
        const angle = (i * Math.PI * 2) / rays;
        const x1 = 50 + Math.cos(angle) * 23;
        const y1 = 50 + Math.sin(angle) * 23;
        const x2 = 50 + Math.cos(angle) * 31;
        const y2 = 50 + Math.sin(angle) * 31;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      // Grid pattern in the sun center
      ctx.lineWidth = size * 0.03;
      ctx.beginPath();
      ctx.moveTo(37, 50); ctx.lineTo(63, 50);
      ctx.moveTo(50, 37); ctx.lineTo(50, 63);
      ctx.stroke();
      break;

    case "bolt":
      ctx.beginPath();
      ctx.moveTo(55, 12);
      ctx.lineTo(28, 52);
      ctx.lineTo(48, 52);
      ctx.lineTo(43, 88);
      ctx.lineTo(72, 48);
      ctx.lineTo(52, 48);
      ctx.closePath();
      ctx.fill();
      break;

    case "network":
      // 3 Nodes and lines
      ctx.lineWidth = size * 0.04;
      // Lines
      ctx.beginPath();
      ctx.moveTo(50, 25); ctx.lineTo(25, 65);
      ctx.moveTo(50, 25); ctx.lineTo(75, 65);
      ctx.moveTo(25, 65); ctx.lineTo(75, 65);
      ctx.stroke();
      // Node circles
      const nodes = [[50, 25], [25, 65], [75, 65]];
      nodes.forEach(([nx, ny]) => {
        ctx.beginPath();
        ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.fill();
      });
      break;

    case "scale":
      // Pillar
      ctx.lineWidth = size * 0.05;
      ctx.beginPath();
      ctx.moveTo(50, 22); ctx.lineTo(50, 78);
      ctx.moveTo(35, 78); ctx.lineTo(65, 78);
      // Beam
      ctx.moveTo(20, 30); ctx.lineTo(80, 30);
      ctx.stroke();
      // Left pan
      ctx.lineWidth = size * 0.03;
      ctx.beginPath();
      ctx.moveTo(20, 30); ctx.lineTo(12, 55);
      ctx.moveTo(20, 30); ctx.lineTo(28, 55);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(20, 55, 8, 0, Math.PI, false);
      ctx.stroke();
      // Right pan
      ctx.beginPath();
      ctx.moveTo(80, 30); ctx.lineTo(72, 55);
      ctx.moveTo(80, 30); ctx.lineTo(88, 55);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(80, 55, 8, 0, Math.PI, false);
      ctx.stroke();
      break;

    case "users":
      // Left person
      ctx.beginPath();
      ctx.arc(32, 40, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(32, 75, 18, Math.PI, Math.PI * 2);
      ctx.fill();
      // Right person
      ctx.beginPath();
      ctx.arc(68, 40, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(68, 75, 18, Math.PI, Math.PI * 2);
      ctx.fill();
      break;

    case "building":
      // Base
      ctx.lineWidth = size * 0.05;
      ctx.beginPath();
      ctx.moveTo(15, 82); ctx.lineTo(85, 82);
      ctx.stroke();
      // Columns
      ctx.fillRect(22, 35, 8, 42);
      ctx.fillRect(38, 35, 8, 42);
      ctx.fillRect(54, 35, 8, 42);
      ctx.fillRect(70, 35, 8, 42);
      // Pediment (Triangle Roof)
      ctx.beginPath();
      ctx.moveTo(15, 35);
      ctx.lineTo(50, 15);
      ctx.lineTo(85, 35);
      ctx.closePath();
      ctx.fill();
      break;

    case "usertie":
      // Head
      ctx.beginPath();
      ctx.arc(50, 32, 14, 0, Math.PI * 2);
      ctx.fill();
      // Shoulders
      ctx.beginPath();
      ctx.arc(50, 78, 26, Math.PI, Math.PI * 2);
      ctx.fill();
      // Tie
      ctx.fillStyle = "#E8A33D"; // Accent color for tie
      ctx.beginPath();
      ctx.moveTo(46, 52);
      ctx.lineTo(54, 52);
      ctx.lineTo(56, 75);
      ctx.lineTo(50, 84);
      ctx.lineTo(44, 75);
      ctx.closePath();
      ctx.fill();
      break;

    case "gavel":
      // Handle
      ctx.lineWidth = size * 0.05;
      ctx.beginPath();
      ctx.moveTo(25, 75); ctx.lineTo(55, 45);
      ctx.stroke();
      // Head (rotated rectangle)
      ctx.save();
      ctx.translate(60, 40);
      ctx.rotate(-Math.PI / 4);
      ctx.fillRect(-12, -24, 24, 48);
      ctx.restore();
      // Base line
      ctx.beginPath();
      ctx.moveTo(45, 80); ctx.lineTo(85, 80);
      ctx.stroke();
      break;

    case "globe":
      // Outline circle
      ctx.beginPath();
      ctx.arc(50, 50, 36, 0, Math.PI * 2);
      ctx.stroke();
      // Equator & horizontal lines
      ctx.beginPath();
      ctx.moveTo(14, 50); ctx.lineTo(86, 50);
      ctx.moveTo(20, 32); ctx.lineTo(80, 32);
      ctx.moveTo(20, 68); ctx.lineTo(80, 68);
      ctx.stroke();
      // Vertical curves (longitude)
      ctx.save();
      ctx.beginPath();
      ctx.scale(0.5, 1);
      ctx.arc(100, 50, 36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(50, 14); ctx.lineTo(50, 86);
      ctx.stroke();
      break;

    case "code":
      ctx.lineWidth = size * 0.06;
      // Left bracket <
      ctx.beginPath();
      ctx.moveTo(35, 30);
      ctx.lineTo(15, 50);
      ctx.lineTo(35, 70);
      ctx.stroke();
      // Right bracket >
      ctx.beginPath();
      ctx.moveTo(65, 30);
      ctx.lineTo(85, 50);
      ctx.lineTo(65, 70);
      ctx.stroke();
      // Slash /
      ctx.beginPath();
      ctx.moveTo(56, 22);
      ctx.lineTo(44, 78);
      ctx.stroke();
      break;

    case "shield":
      ctx.beginPath();
      ctx.moveTo(50, 15);
      ctx.quadraticCurveTo(80, 15, 80, 45);
      ctx.quadraticCurveTo(80, 75, 50, 88);
      ctx.quadraticCurveTo(20, 75, 20, 45);
      ctx.quadraticCurveTo(20, 15, 50, 15);
      ctx.closePath();
      ctx.fill();
      // Inner cross for style
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = size * 0.04;
      ctx.beginPath();
      ctx.moveTo(50, 25); ctx.lineTo(50, 75);
      ctx.moveTo(32, 45); ctx.lineTo(68, 45);
      ctx.stroke();
      break;

    case "route":
      ctx.lineWidth = size * 0.04;
      // Start point
      ctx.beginPath();
      ctx.arc(22, 75, 6, 0, Math.PI * 2);
      ctx.fill();
      // S-curve path
      ctx.beginPath();
      ctx.moveTo(22, 75);
      ctx.bezierCurveTo(22, 35, 78, 65, 78, 25);
      ctx.stroke();
      // End arrow
      ctx.beginPath();
      ctx.moveTo(78, 15);
      ctx.lineTo(71, 28);
      ctx.lineTo(85, 28);
      ctx.closePath();
      ctx.fill();
      break;

    case "handshake":
      ctx.lineWidth = size * 0.05;
      // Draw simple overlapping hands / lock
      ctx.beginPath();
      ctx.arc(40, 50, 12, Math.PI * 0.5, Math.PI * 1.5, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(60, 50, 12, Math.PI * 1.5, Math.PI * 0.5, false);
      ctx.stroke();
      // Connector arm lines
      ctx.beginPath();
      ctx.moveTo(15, 42); ctx.lineTo(34, 42);
      ctx.moveTo(15, 58); ctx.lineTo(34, 58);
      ctx.moveTo(66, 42); ctx.lineTo(85, 42);
      ctx.moveTo(66, 58); ctx.lineTo(85, 58);
      ctx.stroke();
      break;

    case "weight":
      // Hanging weights base
      ctx.lineWidth = size * 0.06;
      ctx.beginPath();
      ctx.moveTo(25, 22); ctx.lineTo(75, 22);
      ctx.stroke();
      // Trap block
      ctx.beginPath();
      ctx.moveTo(30, 25);
      ctx.lineTo(70, 25);
      ctx.lineTo(62, 78);
      ctx.lineTo(38, 78);
      ctx.closePath();
      ctx.fill();
      // Ring top
      ctx.beginPath();
      ctx.arc(50, 18, 6, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case "leaf":
      ctx.beginPath();
      ctx.moveTo(20, 80);
      ctx.quadraticCurveTo(25, 40, 75, 25);
      ctx.quadraticCurveTo(65, 65, 20, 80);
      ctx.closePath();
      ctx.fill();
      // Leaf vein
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = size * 0.02;
      ctx.beginPath();
      ctx.moveTo(20, 80);
      ctx.quadraticCurveTo(40, 55, 75, 25);
      ctx.stroke();
      break;

    case "check":
      // Outer Circle
      ctx.beginPath();
      ctx.arc(50, 50, 36, 0, Math.PI * 2);
      ctx.stroke();
      // Checkmark inside
      ctx.lineWidth = size * 0.06;
      ctx.beginPath();
      ctx.moveTo(32, 50);
      ctx.lineTo(44, 62);
      ctx.lineTo(68, 38);
      ctx.stroke();
      break;

    case "exclaim":
      // Triangle
      ctx.beginPath();
      ctx.moveTo(50, 15);
      ctx.lineTo(85, 78);
      ctx.lineTo(15, 78);
      ctx.closePath();
      ctx.stroke();
      // Exclamation Mark
      ctx.lineWidth = size * 0.05;
      ctx.beginPath();
      ctx.moveTo(50, 34); ctx.lineTo(50, 58);
      ctx.stroke();
      // dot
      ctx.beginPath();
      ctx.arc(50, 68, 4, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "question":
      // Question Mark Curve
      ctx.lineWidth = size * 0.06;
      ctx.beginPath();
      ctx.arc(50, 36, 15, Math.PI, Math.PI * 1.9);
      ctx.stroke();
      ctx.beginPath();
      ctx.bezierCurveTo(65, 36, 60, 55, 50, 58);
      ctx.stroke();
      // dot
      ctx.beginPath();
      ctx.arc(50, 72, 4, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "book":
      // Open book pages
      ctx.lineWidth = size * 0.04;
      // Center binding
      ctx.beginPath();
      ctx.moveTo(50, 25); ctx.lineTo(50, 75);
      ctx.stroke();
      // Left Page
      ctx.beginPath();
      ctx.moveTo(50, 25);
      ctx.quadraticCurveTo(32, 21, 15, 28);
      ctx.lineTo(15, 72);
      ctx.quadraticCurveTo(32, 65, 50, 75);
      ctx.stroke();
      // Right Page
      ctx.beginPath();
      ctx.moveTo(50, 25);
      ctx.quadraticCurveTo(68, 21, 85, 28);
      ctx.lineTo(85, 72);
      ctx.quadraticCurveTo(68, 65, 50, 75);
      ctx.stroke();
      break;

    case "arrowRight":
      ctx.lineWidth = size * 0.06;
      // Stem
      ctx.beginPath();
      ctx.moveTo(15, 50); ctx.lineTo(80, 50);
      ctx.stroke();
      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(60, 30);
      ctx.lineTo(80, 50);
      ctx.lineTo(60, 70);
      ctx.stroke();
      break;

    default:
      // Default placeholder circle with star
      ctx.beginPath();
      ctx.arc(50, 50, 35, 0, Math.PI * 2);
      ctx.stroke();
      break;
  }

  return canvas.toDataURL("image/png");
}
