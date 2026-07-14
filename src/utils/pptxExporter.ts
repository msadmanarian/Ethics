import pptxgen from "pptxgenjs";
import { drawIconToDataUrl } from "./canvasIconDrawer";

// ---------- Palette Constants (Hex without # as per pptxgenjs rule) ----------
const NAVY = "1E293B";       // Slate Blue/Navy
const NAVY_DARK = "0F172A";  // Dark Slate
const GREEN = "10B981";      // Emerald/Clinical Safety
const GREEN_DARK = "065F46"; // Dark Emerald
const AMBER = "F59E0B";      // Warning Amber
const RISK = "EF4444";       // Crimson Risk
const WHITE = "FFFFFF";
const TINT_NAVY = "F1F5F9";   // Soft gray-blue
const TINT_GREEN = "ECFDF5";  // Soft emerald tint
const TINT_AMBER = "FEF3C7";  // Soft amber tint
const TINT_RISK = "FEF2F2";   // Soft red tint
const TEXT_DARK = "0F172A";
const TEXT_GRAY = "475569";
const TEXT_MUTED = "94A3B8";

const FONT_HEAD = "Georgia";
const FONT_BODY = "Arial";

const PW = 13.33;
const PH = 7.5;

// Adds a clean footer to standard content slides
function addFooter(slide: pptxgen.Slide, num: number, label: string) {
  slide.addText(label, {
    x: 0.6,
    y: PH - 0.45,
    w: 8.0,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 10,
    color: TEXT_MUTED,
    align: "left",
  });
  slide.addText(`Slide ${num} of 12`, {
    x: PW - 2.0,
    y: PH - 0.45,
    w: 1.4,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 10,
    color: TEXT_MUTED,
    align: "right",
  });
}

// Draws a circle background shape with a nested programmatic canvas-drawn icon inside it
function addIconCircle(
  slide: pptxgen.Slide,
  x: number,
  y: number,
  d: number,
  bgHex: string,
  iconName: string,
  iconColorHex: string = "FFFFFF",
  scale: number = 0.52
) {
  // Add background circle shape
  slide.addShape("ellipse", {
    x,
    y,
    w: d,
    h: d,
    fill: { color: bgHex },
    line: { type: "none" },
  });

  // Render high-res custom icon PNG in base64
  const base64Data = drawIconToDataUrl(iconName, `#${iconColorHex}`, 512);

  const s = d * scale;
  const off = (d - s) / 2;

  // Add the base64 image over the circle
  slide.addImage({
    data: base64Data,
    x: x + off,
    y: y + off,
    w: s,
    h: s,
  });
}

// Helper to draw a rounded pill button/badge
function addPill(
  slide: pptxgen.Slide,
  x: number,
  y: number,
  w: number,
  h: number,
  text: string,
  bgHex: string,
  colorHex: string
) {
  slide.addShape("roundRect", {
    x,
    y,
    w,
    h,
    rectRadius: 0.5, // fully rounded pill
    fill: { color: bgHex },
    line: { type: "none" },
  });
  slide.addText(text, {
    x,
    y,
    w,
    h,
    align: "center",
    valign: "middle",
    fontFace: FONT_BODY,
    fontSize: 10,
    bold: true,
    color: colorHex,
  });
}

// Helper to add standard slide titles & kickers
function addSlideTitle(
  slide: pptxgen.Slide,
  kicker: string,
  title: string,
  opts: { color?: string; kickerColor?: string } = {}
) {
  const color = opts.color || TEXT_DARK;
  const kickerColor = opts.kickerColor || GREEN_DARK;

  if (kicker) {
    slide.addText(kicker.toUpperCase(), {
      x: 0.6,
      y: 0.4,
      w: 10.0,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 10,
      bold: true,
      color: kickerColor,
      charSpacing: 2,
    });
  }

  slide.addText(title, {
    x: 0.6,
    y: kicker ? 0.7 : 0.5,
    w: 11.8,
    h: 0.75,
    fontFace: FONT_HEAD,
    fontSize: 26,
    bold: true,
    color: color,
  });
}

export async function generateEngineeringEthicsPptx(): Promise<void> {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // Set Widescreen 16:9 canvas (13.33" x 7.5")

  // =========================================================
  // SLIDE 1 — TITLE SLIDE (Dark Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: NAVY_DARK };

    // Decorative circles
    s.addShape("ellipse", {
      x: 10.5,
      y: -1.5,
      w: 4.5,
      h: 4.5,
      fill: { color: NAVY },
      line: { type: "none" },
    });
    s.addShape("ellipse", {
      x: 11.5,
      y: -0.5,
      w: 2.5,
      h: 2.5,
      fill: { color: GREEN_DARK },
      line: { type: "none" },
    });

    s.addText("CLINICAL MEDICAL ETHICS  ·  CASE STUDY STUDY", {
      x: 0.9,
      y: 1.2,
      w: 9.0,
      h: 0.4,
      fontFace: FONT_BODY,
      fontSize: 12,
      bold: true,
      color: AMBER,
      charSpacing: 2,
    });

    s.addText("Engineering Ethics:\nThe Pressure to Release", {
      x: 0.9,
      y: 1.7,
      w: 10.6,
      h: 1.6,
      fontFace: FONT_HEAD,
      fontSize: 38,
      bold: true,
      color: WHITE,
      lineSpacing: 44,
    });

    s.addText("Navigating Safety-Critical Software Decisions Under Corporate Pressures", {
      x: 0.9,
      y: 3.4,
      w: 10.6,
      h: 0.6,
      fontFace: FONT_HEAD,
      fontSize: 20,
      italic: true,
      color: "CBD5E1",
    });

    s.addText(
      "A structured application of the Ethical Decision-Making Cycle to an infant respirator oxygen alarm threshold software defect.",
      {
        x: 0.9,
        y: 4.1,
        w: 8.6,
        h: 0.8,
        fontFace: FONT_BODY,
        fontSize: 13,
        color: "94A3B8",
        lineSpacing: 18,
      }
    );

    // Icon line-up
    const introIcons = [
      { id: "shield", label: "Patient Safety" },
      { id: "code", label: "Software Ethics" },
      { id: "scale", label: "Ethical Analysis" },
    ];
    let ix = 0.9;
    introIcons.forEach((ico) => {
      addIconCircle(s, ix, 5.0, 0.6, GREEN, ico.id, "FFFFFF", 0.52);
      s.addText(ico.label, {
        x: ix - 0.3,
        y: 5.7,
        w: 1.2,
        h: 0.5,
        align: "center",
        fontFace: FONT_BODY,
        fontSize: 10,
        color: "CBD5E1",
      });
      ix += 1.5;
    });

    // Applied Professional Code Pills
    s.addText("Applied Codes of Ethics", {
      x: 9.1,
      y: 6.0,
      w: 3.6,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 10,
      color: "94A3B8",
    });
    ["NSPE", "IEEE", "ACM"].forEach((code, i) => {
      addPill(s, 9.1 + i * 1.0, 6.35, 0.9, 0.38, code, "1E293B", AMBER);
    });

    s.addNotes(
      "Good morning/afternoon everyone. Today our group will be presenting a case study on engineering ethics titled 'The Pressure to Release.' This case demonstrates how professional codes of ethics guide engineers in resolving moral dilemmas."
    );
  }

  // =========================================================
  // SLIDE 2 — INTRO TO CODES (Light Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addSlideTitle(s, "Professional Foundations", "Introduction to Professional Codes");

    s.addText("The Eight Essential Roles of Engineering Codes of Ethics:", {
      x: 0.6,
      y: 1.4,
      w: 11.0,
      h: 0.4,
      fontFace: FONT_HEAD,
      fontSize: 16,
      bold: true,
      color: NAVY,
    });

    const roles = [
      { num: "1", title: "Serve the Public", desc: "Guide engineers to prioritize human safety above profit margins." },
      { num: "2", title: "Provide Guidance", desc: "Outline standard behavior patterns for complex dilemmas." },
      { num: "3", title: "Offer Inspiration", desc: "Encourage commitment to professional excellence and service." },
      { num: "4", title: "Establish Standards", desc: "Define uniform yardsticks for quality, safety, and ethics." },
      { num: "5", title: "Support Professionals", desc: "Back up engineers resisting unsafe business releases." },
      { num: "6", title: "Contribute to Education", desc: "Form foundational training elements in professional schools." },
      { num: "7", title: "Deter Wrongdoing", desc: "Disincentivize shortcuts by threatening professional standing." },
      { num: "8", title: "Strengthen Image", desc: "Maintain overall public trust in engineering competencies." }
    ];

    const cardW = 2.8;
    const cardH = 2.0;
    const startX = 0.6;
    const startY = 2.0;
    const gapX = 0.25;
    const gapY = 0.25;

    roles.forEach((r, idx) => {
      const row = Math.floor(idx / 4);
      const col = idx % 4;
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);

      // Card Background
      s.addShape("roundRect", {
        x,
        y,
        w: cardW,
        h: cardH,
        rectRadius: 0.1,
        fill: { color: "F8FAFC" },
        line: { color: "E2E8F0", width: 1 },
      });

      // Number Circle
      s.addShape("ellipse", {
        x: x + 0.2,
        y: y + 0.2,
        w: 0.4,
        h: 0.4,
        fill: { color: NAVY },
        line: { type: "none" },
      });
      s.addText(r.num, {
        x: x + 0.2,
        y: y + 0.2,
        w: 0.4,
        h: 0.4,
        align: "center",
        valign: "middle",
        fontFace: FONT_BODY,
        fontSize: 10,
        bold: true,
        color: WHITE,
      });

      // Title
      s.addText(r.title, {
        x: x + 0.7,
        y: y + 0.2,
        w: cardW - 0.9,
        h: 0.4,
        valign: "middle",
        fontFace: FONT_HEAD,
        fontSize: 12,
        bold: true,
        color: TEXT_DARK,
      });

      // Description
      s.addText(r.desc, {
        x: x + 0.2,
        y: y + 0.7,
        w: cardW - 0.4,
        h: cardH - 0.9,
        fontFace: FONT_BODY,
        fontSize: 10,
        color: TEXT_GRAY,
        lineSpacing: 13,
      });
    });

    addFooter(s, 2, "Speaker 1 · Introduction to Professional Codes");
    s.addNotes(
      "Professional codes of ethics serve as the foundation for engineering practice. They state the moral responsibilities of engineers and serve eight essential roles: serving the public, providing guidance, offering inspiration, establishing standards, supporting professionals, contributing to education, deterring wrongdoing, and strengthening the profession's image. We'll be referencing codes from NSPE, IEEE, and ACM."
    );
  }

  // =========================================================
  // SLIDE 3 — THE SCENE (Light Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addSlideTitle(s, "The Situation", "The Case Study: Setting the Scene");

    // Left Column: The Dilemma Summary
    s.addShape("roundRect", {
      x: 0.6,
      y: 1.6,
      w: 6.0,
      h: 4.8,
      rectRadius: 0.1,
      fill: { color: TINT_NAVY },
      line: { type: "none" },
    });

    addIconCircle(s, 0.9, 1.9, 0.7, NAVY, "usertie", "FFFFFF", 0.5);

    s.addText("Role: Senior Software Engineer", {
      x: 1.75,
      y: 1.9,
      w: 4.5,
      h: 0.35,
      fontFace: FONT_HEAD,
      fontSize: 15,
      bold: true,
      color: NAVY,
    });
    s.addText("MedTech Solutions, Clinical ICU Products", {
      x: 1.75,
      y: 2.25,
      w: 4.5,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 11,
      color: TEXT_GRAY,
    });

    s.addText(
      "Product: Infant Respirator System\n" +
      "Critical defect discovered in oxygen alarm threshold software: under rare clinical circumstances (0.1%), the alarm fails to sound if patient oxygen drops to fatal limits.\n\n" +
      "Corporate Context:\n" +
      "· MedTech Solutions faces severe financial distress.\n" +
      "· CEO has promised investors immediate release by next quarter.\n" +
      "· Project Manager is pressuring you to approve the release as-is, claiming clinical staff monitor infants manually anyway.",
      {
        x: 0.9,
        y: 2.8,
        w: 5.4,
        h: 3.3,
        fontFace: FONT_BODY,
        fontSize: 12.5,
        color: TEXT_DARK,
        lineSpacing: 18,
      }
    );

    // Right Column: Flow mapping
    s.addText("CLINICAL PROCESS VULNERABILITY", {
      x: 7.2,
      y: 1.6,
      w: 5.5,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 10,
      bold: true,
      color: RISK,
      charSpacing: 1.5,
    });

    const steps = [
      { icon: "bolt", title: "Oxygen Sensor Ingress", body: "Physical monitoring registers critical hypoxic drop in neonate." },
      { icon: "code", title: "Algorithm Calculation Bug", body: "Threshold is bypassed due to unhandled race condition.", color: AMBER },
      { icon: "exclaim", title: "No Alarm Triggered", body: "Device remains silent, leaving clinical ICU staff unaware.", color: RISK }
    ];

    let sy = 2.0;
    steps.forEach((step, idx) => {
      addIconCircle(s, 7.2, sy, 0.8, step.color || NAVY, step.icon, "FFFFFF", 0.52);

      s.addText(step.title, {
        x: 8.2,
        y: sy,
        w: 4.5,
        h: 0.3,
        fontFace: FONT_HEAD,
        fontSize: 13,
        bold: true,
        color: TEXT_DARK,
      });

      s.addText(step.body, {
        x: 8.2,
        y: sy + 0.3,
        w: 4.5,
        h: 0.5,
        fontFace: FONT_BODY,
        fontSize: 11,
        color: TEXT_GRAY,
        valign: "top",
      });

      if (idx < steps.length - 1) {
        // arrow
        const base64Arrow = drawIconToDataUrl("arrowRight", `#${TEXT_MUTED}`, 256);
        s.addImage({
          data: base64Arrow,
          x: 7.45,
          y: sy + 0.9,
          w: 0.3,
          h: 0.3,
          rotate: 90
        });
      }

      sy += 1.45;
    });

    addFooter(s, 3, "Speaker 1 · The Case Study: Setting the Scene");
    s.addNotes(
      "Let me introduce our case. You are a senior software engineer at MedTech Solutions. Your company has developed critical software for an infant respirator used in neonatal ICUs. During final testing, you discover a bug in the oxygen alarm threshold algorithm. Under rare conditions, the alarm may not trigger when oxygen drops to dangerous levels. The company is facing bankruptcy. The CEO has promised investors a release by next quarter. The project manager is pressuring you to approve the release, arguing the bug only affects 0.1% of scenarios and that hospital staff monitor patients anyway. This creates a true ethical dilemma: Should you approve release and protect jobs, or delay release and protect patient safety?"
    );
  }

  // =========================================================
  // SLIDE 4 — STEP 1: MORAL CLARITY (Light Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addSlideTitle(s, "Phase 1 · Identifying the Core Issue", "Step 1: Moral Clarity");

    s.addText("Defining the Core Question & Overlapping Values:", {
      x: 0.6,
      y: 1.4,
      w: 6.0,
      h: 0.4,
      fontFace: FONT_HEAD,
      fontSize: 15,
      bold: true,
      color: NAVY,
    });

    s.addText(
      "At first glance, it appears to be a simple clash of business survival vs. absolute quality. However, ethical decision-making requires deeper framing.\n\n" +
      "The Central Question:\n" +
      "Does our professional standard permit any software risk whatsoever when human lives depend on device integrity? Is a 99.9% success rate acceptable in safety-critical medical equipment?\n\n" +
      "Conflicting Values:\n" +
      "· Financial Responsibility: Satisfying investors, saving the company from complete closure, and preserving local jobs.\n" +
      "· Fiduciary Factual Care: The uncompromising duty to protect patients who rely on the respirator's physical fail-safes.",
      {
        x: 0.6,
        y: 1.9,
        w: 6.0,
        h: 4.5,
        fontFace: FONT_BODY,
        fontSize: 12.5,
        color: TEXT_DARK,
        lineSpacing: 20,
      }
    );

    // Right Side: Focus Visual
    s.addShape("roundRect", {
      x: 7.2,
      y: 1.6,
      w: 5.5,
      h: 4.8,
      rectRadius: 0.12,
      fill: { color: TINT_RISK },
      line: { type: "none" },
    });

    addIconCircle(s, 9.55, 2.0, 1.1, RISK, "exclaim", "FFFFFF", 0.55);

    s.addText("The Fiduciary Asymmetry", {
      x: 7.5,
      y: 3.3,
      w: 4.9,
      h: 0.4,
      align: "center",
      fontFace: FONT_HEAD,
      fontSize: 16,
      bold: true,
      color: "7F1D1D",
    });

    s.addText(
      "Vulnerable infant patients cannot evaluate or choose their medical equipment. They trust their lives entirely to the competence of the engineers they will never meet. Under professional guidelines, this creates an absolute, non-negotiable duty of safety care.",
      {
        x: 7.5,
        y: 3.8,
        w: 4.9,
        h: 2.2,
        align: "center",
        fontFace: FONT_BODY,
        fontSize: 12,
        color: "7F1D1D",
        lineSpacing: 18,
      }
    );

    addFooter(s, 4, "Speaker 2 · Step 1: Moral Clarity");
    s.addNotes(
      "Step one in ethical decision-making is moral clarity. We need to ask: What is the core issue? The core question is whether the software will meet new safety standards. There's a reason new standards exist - experience shows new failure modes emerge over time. According to the NSPE Code, engineers must 'hold paramount the safety, health, and welfare of the public.' This means the engineer's obligation is clear - but the pressure from the company complicates matters."
    );
  }

  // =========================================================
  // SLIDE 5 — STEP 2: KNOW THE FACTS (Light Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addSlideTitle(s, "Phase 2 · Fact-Finding", "Step 2: Know the Facts");

    // Grid of facts
    const facts = [
      {
        title: "Technical Facts",
        icon: "code",
        color: NAVY,
        body: "· Hypoxic conditions occur randomly.\n· 0.1% defect rate implies real infant harm in a busy clinical ICU.\n· The defect is fully documented."
      },
      {
        title: "Business Facts",
        icon: "building",
        color: AMBER,
        body: "· Company faces near bankruptcy.\n· Fix costs $2M and adds a 6-month delay.\n· CEO promises release next quarter."
      },
      {
        title: "Stakeholder Matrix",
        icon: "users",
        color: GREEN_DARK,
        body: "· Neonates: Ultimate vulnerable group.\n· Parents & Staff: Unwitting trusting parties.\n· Engineer: Faces layoff or loss of licensure."
      }
    ];

    const cardW = 3.8;
    const cardH = 4.7;
    const startX = 0.6;
    const gap = 0.35;

    facts.forEach((f, idx) => {
      const x = startX + idx * (cardW + gap);
      s.addShape("roundRect", {
        x,
        y: 1.6,
        w: cardW,
        h: cardH,
        rectRadius: 0.1,
        fill: { color: "F8FAFC" },
        line: { color: "E2E8F0", width: 1 },
      });

      addIconCircle(s, x + 0.3, 1.9, 0.75, f.color, f.icon, "FFFFFF", 0.55);

      s.addText(f.title, {
        x: x + 1.2,
        y: 1.9,
        w: cardW - 1.4,
        h: 0.75,
        valign: "middle",
        fontFace: FONT_HEAD,
        fontSize: 16,
        bold: true,
        color: TEXT_DARK,
      });

      s.addText(f.body, {
        x: x + 0.3,
        y: 2.9,
        w: cardW - 0.6,
        h: cardH - 1.5,
        fontFace: FONT_BODY,
        fontSize: 11.5,
        color: TEXT_GRAY,
        lineSpacing: 18,
      });
    });

    addFooter(s, 5, "Speaker 2 · Step 2: Know the Facts");
    s.addNotes(
      "Step two is knowing the facts. Technically, this is critical software affecting patient health and safety. The bug is documented. New standards exist because past experience revealed new failure modes. Business facts include the $2M cost to fix, 6-month delay, and the company's financial trouble. Now let's look at stakeholders. Premature infants - our most vulnerable stakeholders - cannot advocate for themselves. Parents trust hospitals to keep their babies safe. Hospital staff could be blamed for equipment failure. The engineer faces potential job loss. The company could go bankrupt. And competitors might gain advantage from any delay."
    );
  }

  // =========================================================
  // SLIDE 6 — SAFETY ETHOS / THERAC-25 (Light Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addSlideTitle(s, "Phase 2 · Why Safety Engineering Matters", "Human Impact: Why This Matters");

    // Left card: The Engineering Ethos
    s.addShape("roundRect", {
      x: 0.6,
      y: 1.6,
      w: 5.8,
      h: 4.8,
      rectRadius: 0.12,
      fill: { color: TINT_NAVY },
      line: { type: "none" },
    });

    addIconCircle(s, 0.95, 1.9, 0.8, NAVY, "gavel", "FFFFFF", 0.5);

    s.addText("The Safety Ethos", {
      x: 1.9,
      y: 1.9,
      w: 4.2,
      h: 0.8,
      valign: "middle",
      fontFace: FONT_HEAD,
      fontSize: 18,
      bold: true,
      color: NAVY,
    });

    s.addText(
      "1. Fiduciary Care: Engineers hold specialised knowledge that consumers cannot evaluate on their own.\n" +
      "2. Public Trust: Society permits professional self-regulation only in exchange for public protection.\n" +
      "3. Accountability: Intentions do not erase physics. Software errors generate real bodily harm.",
      {
        x: 0.95,
        y: 2.9,
        w: 5.1,
        h: 3.2,
        fontFace: FONT_BODY,
        fontSize: 12.5,
        color: TEXT_DARK,
        lineSpacing: 20,
      }
    );

    // Right card: Therac-25 historical case
    s.addShape("roundRect", {
      x: 6.9,
      y: 1.6,
      w: 5.8,
      h: 4.8,
      rectRadius: 0.12,
      fill: { color: TINT_RISK },
      line: { type: "none" },
    });

    addIconCircle(s, 7.25, 1.9, 0.8, RISK, "exclaim", "FFFFFF", 0.5);

    s.addText("Therac-25 Historical Parallel", {
      x: 8.2,
      y: 1.9,
      w: 4.2,
      h: 0.8,
      valign: "middle",
      fontFace: FONT_HEAD,
      fontSize: 18,
      bold: true,
      color: "7F1D1D",
    });

    s.addText(
      "In the 1980s, the Therac-25 radiation therapy device delivered massive overdoses due to a software race-condition bug. The manufacturer repeatedly dismissed hospital complaints, claiming software failure was impossible.\n\n" +
      "The lesson: The assumption 'it can never happen' is fatal in safety-critical software. Rigorous physical verification is mandatory.",
      {
        x: 7.25,
        y: 2.9,
        w: 5.1,
        h: 3.2,
        fontFace: FONT_BODY,
        fontSize: 12.5,
        color: TEXT_DARK,
        lineSpacing: 18,
      }
    );

    addFooter(s, 6, "Speaker 2 · Human Impact: Why This Matters");
    s.addNotes(
      "Why does this matter? The engineering ethos reminds us that 'With Great Power Comes Great Responsibility.' The users here are vulnerable infants. Hospital staff rely on this technology. The engineer has specialized knowledge the public lacks. Professional codes exist precisely for situations like this. There's a historical parallel: The Therac-25. A linear electron accelerator with a software error resulted in patients receiving overdoses, causing painful aftereffects and deaths. The manufacturer insisted the system couldn't malfunction. It was the hospital physicist's painstaking effort that finally traced the problem to a software error. The lesson is that the most dangerous assumption is 'it could never happen.'"
    );
  }

  // =========================================================
  // SLIDE 7 — CONSIDER ALL OPTIONS (Light Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addSlideTitle(s, "Phase 3 · Decision Space", "Step 3: Consider All Options");

    const options = [
      { num: "Opt 1", badge: "Unethical", bg: TINT_RISK, pbg: RISK, title: "Release As-Is", desc: "Deploy the software with the known alarm bug immediately to protect investor schedules. Puts infant patients at severe physical risk.", labelColor: "7F1D1D" },
      { num: "Opt 2", badge: "Costly Safety", bg: TINT_NAVY, pbg: NAVY, title: "Delay & Complete Fix", desc: "Refuse sign-off until a 6-month complete redesign is completed. Guarantees safety but threatens company solvency.", labelColor: TEXT_DARK },
      { num: "Opt 3", badge: "Moral Imagination", bg: TINT_GREEN, pbg: GREEN_DARK, title: "Mitigate & Fast-Track", desc: "Implement temporary training/warning overlays for clinical hospital staff while fast-tracking code fix in 4 weeks.", labelColor: "064E3B" },
      { num: "Opt 4", badge: "Escalation", bg: TINT_AMBER, pbg: AMBER, title: "Whistleblowing", desc: "Escalate the software safety concern to national medical regulators if internal company executives attempt to force release.", labelColor: "78350F" }
    ];

    const cardW = 2.8;
    const cardH = 4.6;
    const startX = 0.6;
    const gap = 0.25;

    options.forEach((o, idx) => {
      const x = startX + idx * (cardW + gap);

      s.addShape("roundRect", {
        x,
        y: 1.6,
        w: cardW,
        h: cardH,
        rectRadius: 0.1,
        fill: { color: o.bg },
        line: { type: "none" },
      });

      addPill(s, x + 0.2, 1.85, 1.4, 0.35, o.badge, WHITE, o.pbg);

      s.addText(o.num, {
        x: x + 0.2,
        y: 2.35,
        w: cardW - 0.4,
        h: 0.3,
        fontFace: FONT_BODY,
        fontSize: 11,
        bold: true,
        color: o.pbg,
      });

      s.addText(o.title, {
        x: x + 0.2,
        y: 2.7,
        w: cardW - 0.4,
        h: 0.65,
        fontFace: FONT_HEAD,
        fontSize: 14,
        bold: true,
        color: TEXT_DARK,
      });

      s.addText(o.desc, {
        x: x + 0.2,
        y: 3.45,
        w: cardW - 0.4,
        h: 2.0,
        fontFace: FONT_BODY,
        fontSize: 11,
        color: TEXT_GRAY,
        lineSpacing: 15,
      });
    });

    addFooter(s, 7, "Speaker 3 · Step 3: Consider All Options");
    s.addNotes(
      "Step three is considering options. We have four main alternatives. Option one: Release as-is. This could save the company and protect jobs, but violates professional codes and puts infants at risk. Option two: Delay and fix fully. This ensures patient safety and follows codes, but may bankrupt the company. Option three: A creative middle solution. Implement a temporary mitigation while fast-tracking a full fix. Option four: Whistleblowing - escalate to regulatory agencies. Note that options one and two represent false dichotomies. Ethics, like engineering design, requires creativity in finding solutions that integrate competing values."
    );
  }

  // =========================================================
  // SLIDE 8 — EVALUATE USING CODES (Light Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addSlideTitle(s, "Phase 4 · Ethical Evaluation", "Step 4: Evaluate Using Codes");

    const codes = [
      {
        org: "NSPE Code of Ethics",
        rule: "Rule I.1",
        quote: "Engineers shall hold paramount the safety, health, and welfare of the public in the performance of their professional duties.",
        concl: "Recommending Option 1 directly violates this rule. If judgment is overruled under dangerous conditions, they must notify authority."
      },
      {
        org: "IEEE Code of Ethics",
        rule: "Section 1.1",
        quote: "To accept responsibility in making engineering decisions consistent with the safety, health, and welfare of the public, and to disclose promptly factors that might endanger the public.",
        concl: "Disclosing the alarm algorithm's failure calculation limits is a mandatory IEEE requirement."
      },
      {
        org: "ACM Software Code",
        rule: "Section 1.2 / 3.01",
        quote: "Approve software only if they have a well-founded belief that it is safe, meets specifications, and does not diminish quality of life.",
        concl: "Signing off on known bugs that can disable active monitoring alarms violates core software licensure values."
      }
    ];

    const cardW = 3.8;
    const cardH = 4.8;
    const startX = 0.6;
    const gap = 0.35;

    codes.forEach((c, idx) => {
      const x = startX + idx * (cardW + gap);

      s.addShape("roundRect", {
        x,
        y: 1.6,
        w: cardW,
        h: cardH,
        rectRadius: 0.1,
        fill: { color: "F8FAFC" },
        line: { color: "E2E8F0", width: 1 },
      });

      s.addText(c.org, {
        x: x + 0.3,
        y: 1.85,
        w: cardW - 0.6,
        h: 0.35,
        fontFace: FONT_HEAD,
        fontSize: 14,
        bold: true,
        color: NAVY,
      });

      addPill(s, x + 0.3, 2.25, 1.2, 0.3, c.rule, TINT_NAVY, TEXT_DARK);

      // Quote Block
      s.addShape("roundRect", {
        x: x + 0.3,
        y: 2.7,
        w: cardW - 0.6,
        h: 1.6,
        rectRadius: 0.08,
        fill: { color: TINT_NAVY },
        line: { type: "none" },
      });

      s.addText(`"${c.quote}"`, {
        x: x + 0.45,
        y: 2.75,
        w: cardW - 0.9,
        h: 1.5,
        valign: "middle",
        fontFace: FONT_HEAD,
        fontSize: 10.5,
        italic: true,
        color: TEXT_DARK,
        lineSpacing: 14,
      });

      // Conclusion text
      s.addText(c.concl, {
        x: x + 0.3,
        y: 4.45,
        w: cardW - 0.6,
        h: 1.8,
        fontFace: FONT_BODY,
        fontSize: 10.5,
        color: TEXT_GRAY,
        lineSpacing: 13,
      });
    });

    addFooter(s, 8, "Speaker 3 · Step 4: Evaluate Using Codes");
    s.addNotes(
      "Step four is evaluating these options using professional codes. The NSPE Code states: 'If engineers' judgment is overruled under circumstances that endanger life or property, they shall notify their employer or client and such other authority as may be appropriate.' The IEEE Code requires engineers to 'accept responsibility in making engineering decisions consistent with the safety, health, and welfare of the public, and to disclose promptly factors that might endanger the public or the environment.' The ACM/Software Engineering Code states to 'approve software only if they have a well-founded belief that it is safe, meets specifications, passes appropriate tests, and does not diminish quality of life, diminish privacy, or harm the environment.' All codes prioritize public safety over economic considerations."
    );
  }

  // =========================================================
  // SLIDE 9 — ETHICS PLUS MODEL (Light Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addSlideTitle(s, "Phase 4 · Structured Models", "Using the ETHICS PLUS Model");

    // Left Column: PLUS Standards
    s.addShape("roundRect", {
      x: 0.6,
      y: 1.6,
      w: 6.0,
      h: 4.8,
      rectRadius: 0.1,
      fill: { color: TINT_GREEN },
      line: { type: "none" },
    });

    s.addText("THE PLUS CRITERIA EVALUATION", {
      x: 0.9,
      y: 1.8,
      w: 5.4,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 10,
      bold: true,
      color: GREEN_DARK,
      charSpacing: 1.5,
    });

    const plusItems = [
      { letter: "P", name: "Professional Codes", desc: "Prioritizes public safety over corporate timelines." },
      { letter: "L", name: "Legal Requirements", desc: "Product liability law establishes severe penalties for known defects." },
      { letter: "U", name: "Uncompromising Self Values", desc: "Would you authorize this device for your own child?" },
      { letter: "S", name: "Sunshine Test", desc: "Could you defend an active bug release in public media?" }
    ];

    let py = 2.2;
    plusItems.forEach((item) => {
      // Circle Letter
      s.addShape("ellipse", {
        x: 0.9,
        y: py,
        w: 0.45,
        h: 0.45,
        fill: { color: GREEN_DARK },
        line: { type: "none" },
      });
      s.addText(item.letter, {
        x: 0.9,
        y: py,
        w: 0.45,
        h: 0.45,
        align: "center",
        valign: "middle",
        fontFace: FONT_BODY,
        fontSize: 11,
        bold: true,
        color: WHITE,
      });

      s.addText(item.name, {
        x: 1.5,
        y: py,
        w: 4.8,
        h: 0.25,
        fontFace: FONT_HEAD,
        fontSize: 12,
        bold: true,
        color: TEXT_DARK,
      });

      s.addText(item.desc, {
        x: 1.5,
        y: py + 0.25,
        w: 4.8,
        h: 0.4,
        fontFace: FONT_BODY,
        fontSize: 10,
        color: TEXT_GRAY,
      });

      py += 0.75;
    });

    // Right Column: Line Drawing Scenario
    s.addText("LINE DRAWING METHOD", {
      x: 7.2,
      y: 1.6,
      w: 5.5,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 10,
      bold: true,
      color: NAVY,
      charSpacing: 1.5,
    });

    s.addText("Plotting our dilemma between Paradigms:", {
      x: 7.2,
      y: 1.9,
      w: 5.5,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 11.5,
      color: TEXT_GRAY,
    });

    const lines = [
      { label: "Neonate Safety Risk", left: "Hypoxic death (0%)", right: "Safe Alarm (100%)", val: 0.95 },
      { label: "Ethics Code Compliance", left: "Completely ignored", right: "Perfectly followed", val: 0.90 },
      { label: "Business Scheduling Cost", left: "Bankrupt delay", right: "Economic release", val: 0.35 }
    ];

    let ly = 2.4;
    lines.forEach((l) => {
      s.addText(l.label, {
        x: 7.2,
        y: ly,
        w: 5.5,
        h: 0.25,
        fontFace: FONT_HEAD,
        fontSize: 12,
        bold: true,
        color: TEXT_DARK,
      });

      // Track
      s.addShape("roundRect", {
        x: 7.2,
        y: ly + 0.3,
        w: 5.5,
        h: 0.12,
        rectRadius: 0.5,
        fill: { color: "E2E8F0" },
        line: { type: "none" },
      });

      // Pointer
      const px = 7.2 + l.val * 5.5 - 0.15;
      s.addShape("ellipse", {
        x: px,
        y: ly + 0.21,
        w: 0.3,
        h: 0.3,
        fill: { color: NAVY },
        line: { color: WHITE, width: 2 },
      });

      s.addText(l.left, {
        x: 7.2,
        y: ly + 0.45,
        w: 2.5,
        h: 0.25,
        fontFace: FONT_BODY,
        fontSize: 9,
        color: RISK,
      });
      s.addText(l.right, {
        x: 10.2,
        y: ly + 0.45,
        w: 2.5,
        h: 0.25,
        align: "right",
        fontFace: FONT_BODY,
        fontSize: 9,
        color: GREEN_DARK,
      });

      ly += 0.95;
    });

    s.addText("Evaluation: Plotting proves releasing a bugged oxygen alarm sits too close to the completely unethical paradigm, removing Option 1 entirely.", {
      x: 7.2,
      y: 5.4,
      w: 5.5,
      h: 0.9,
      fontFace: FONT_BODY,
      fontSize: 11,
      italic: true,
      color: TEXT_GRAY,
      lineSpacing: 15,
    });

    addFooter(s, 9, "Speaker 3 · Using the ETHICS PLUS Model");
    s.addNotes(
      "The ETHICS PLUS model provides a structured framework. The ETHICS process: Establish facts, Take stock of stakeholders, Have objective assessment, Identify viable alternatives, Compare and evaluate consequences, Select appropriate action. The PLUS standards: Professional codes (which require public safety), Legal requirements (product liability laws), Uncompromising self values (would you use this on your child?), and the Sunshine test (could you defend this publicly without shame). When we apply this model, Option 1 clearly fails the PLUS test."
    );
  }

  // =========================================================
  // SLIDE 10 — STEP 5: THE DECISION (Light Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addSlideTitle(s, "Phase 5 · Reasonable Choice", "Step 5: Making the Decision");

    // Recommended card
    s.addShape("roundRect", {
      x: 0.6,
      y: 1.6,
      w: 12.1,
      h: 1.8,
      rectRadius: 0.12,
      fill: { color: TINT_GREEN },
      line: { type: "none" },
    });

    addIconCircle(s, 0.95, 1.85, 0.8, GREEN, "check", "FFFFFF", 0.55);

    addPill(s, 2.0, 1.8, 1.4, 0.35, "RECOMMENDED", GREEN, WHITE);

    s.addText("Option 3 — Creative Middle Solution with Escalation Path", {
      x: 2.0,
      y: 2.2,
      w: 10.0,
      h: 0.35,
      fontFace: FONT_HEAD,
      fontSize: 16,
      bold: true,
      color: GREEN_DARK,
    });

    s.addText(
      "Document calculations, refuse signing off on safety defects, and implement immediate hospital warning alerts. Fast-track code redesign inside 4 weeks to balance timelines while eliminating active infant risk.",
      {
        x: 2.0,
        y: 2.6,
        w: 10.2,
        h: 0.6,
        fontFace: FONT_BODY,
        fontSize: 11.5,
        color: "064E3B",
        lineSpacing: 15,
      }
    );

    // Timeline blocks
    const timeline = [
      { num: "1", title: "Document Paper Trail", desc: "Write out threshold math defects in detailed engineering journals." },
      { num: "2", title: "Refuse Launch", desc: "Formally deny the unconditional product deployment sign-off request." },
      { num: "3", title: "Propose Mitigation", desc: "Present immediate hospitals alarm alert sheets and rapid fix timeline." },
      { num: "4", title: "Escalate / Disclose", desc: "Go to executive boards, or whistleblow to medical agencies if ignored." }
    ];

    const cardW = 2.8;
    const cardH = 2.5;
    const startX = 0.6;
    const gap = 0.3;

    timeline.forEach((t, idx) => {
      const x = startX + idx * (cardW + gap);

      s.addShape("roundRect", {
        x,
        y: 3.7,
        w: cardW,
        h: cardH,
        rectRadius: 0.1,
        fill: { color: "F8FAFC" },
        line: { color: "E2E8F0", width: 1 },
      });

      // number
      s.addShape("ellipse", {
        x: x + 0.2,
        y: 3.9,
        w: 0.45,
        h: 0.45,
        fill: { color: NAVY },
        line: { type: "none" },
      });
      s.addText(t.num, {
        x: x + 0.2,
        y: 3.9,
        w: 0.45,
        h: 0.45,
        align: "center",
        valign: "middle",
        fontFace: FONT_BODY,
        fontSize: 10,
        bold: true,
        color: WHITE,
      });

      s.addText(t.title, {
        x: x + 0.85,
        y: 3.9,
        w: cardW - 1.05,
        h: 0.45,
        valign: "middle",
        fontFace: FONT_HEAD,
        fontSize: 12,
        bold: true,
        color: TEXT_DARK,
      });

      s.addText(t.desc, {
        x: x + 0.2,
        y: 4.5,
        w: cardW - 0.4,
        h: 1.5,
        fontFace: FONT_BODY,
        fontSize: 10.5,
        color: TEXT_GRAY,
        lineSpacing: 15,
      });
    });

    addFooter(s, 10, "Speaker 4 · Step 5: Making the Decision");
    s.addNotes(
      "Our recommended course is Option 3 with an escalation path. The engineer should: First, document everything - create a paper trail. Second, refuse to approve release until safety is demonstrably assured. Third, propose a specific mitigation plan including temporary monitoring protocol, hospital staff training, and a commitment to a fast-tracked fix. Fourth, escalate within the company if the project manager refuses to act. Finally, notify the appropriate regulatory agency if the company still refuses. This decision is justified because it protects public safety, follows professional codes, shows moral creativity, maintains integrity, and demonstrates responsible engineering practice."
    );
  }

  // =========================================================
  // SLIDE 11 — LIMITATIONS & REFLECTION (Light Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addSlideTitle(s, "Ethical Reflections", "Limitations of Codes & Final Reflection");

    // Left card: Limitations of Codes
    s.addShape("roundRect", {
      x: 0.6,
      y: 1.6,
      w: 5.8,
      h: 4.8,
      rectRadius: 0.12,
      fill: { color: TINT_NAVY },
      line: { type: "none" },
    });

    addIconCircle(s, 0.95, 1.9, 0.8, NAVY, "scale", "FFFFFF", 0.5);

    s.addText("Limitations of Codes", {
      x: 1.9,
      y: 1.9,
      w: 4.2,
      h: 0.8,
      valign: "middle",
      fontFace: FONT_HEAD,
      fontSize: 18,
      bold: true,
      color: NAVY,
    });

    s.addText(
      "· Codes cannot replace individual moral responsibility.\n" +
      "· Most entries are restricted to general wording.\n" +
      "· Different code elements may conflict (loyalty to employer vs. duty to the public).\n" +
      "· Codes are support systems: they back up the engineer resisting dangerous releases, but the individual must take action.",
      {
        x: 0.95,
        y: 2.9,
        w: 5.1,
        h: 3.2,
        fontFace: FONT_BODY,
        fontSize: 12.5,
        color: TEXT_DARK,
        lineSpacing: 20,
      }
    );

    // Right card: Final Reflection
    s.addShape("roundRect", {
      x: 6.9,
      y: 1.6,
      w: 5.8,
      h: 4.8,
      rectRadius: 0.12,
      fill: { color: TINT_AMBER },
      line: { type: "none" },
    });

    addIconCircle(s, 7.25, 1.9, 0.8, AMBER, "handshake", "FFFFFF", 0.5);

    s.addText("Individual Moral Action", {
      x: 8.2,
      y: 1.9,
      w: 4.2,
      h: 0.8,
      valign: "middle",
      fontFace: FONT_HEAD,
      fontSize: 18,
      bold: true,
      color: "78350F",
    });

    s.addText(
      "Good intentions do not erase physical harm. The pedestrian is just as dead if the driver didn't intend to strike them. In engineering, we are judged by outcomes.\n\n" +
      "As professional practitioners, we hold the ultimate responsibility. The codes protect us, but our integrity directs us.",
      {
        x: 7.25,
        y: 2.9,
        w: 5.1,
        h: 3.2,
        fontFace: FONT_BODY,
        fontSize: 13,
        color: "78350F",
        lineSpacing: 18,
      }
    );

    addFooter(s, 11, "Speaker 4 · Limitations of Codes & Final Reflection");
    s.addNotes(
      "However, we must acknowledge the limitations of codes. They are no substitute for individual responsibility. Most codes are restricted to general wording. Different entries in codes may conflict. Codes can be flawed by omission and commission. But codes do provide group backing for ethical stands, legal support when criticized, educational frameworks, and protection for responsible professionals. The best way to increase trust in the profession is by encouraging engineers to speak freely and responsibly about public safety and well-being. Remember: The pedestrian is just as dead if the driver didn't intend to kill them. Good intentions don't matter if harm occurs. Ethical engineering requires action."
    );
  }

  // =========================================================
  // SLIDE 12 — CONCLUSION & Q&A (Dark Theme)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: NAVY_DARK };

    // Decorative circle
    s.addShape("ellipse", {
      x: -1.2,
      y: 4.5,
      w: 4.2,
      h: 4.2,
      fill: { color: NAVY },
      line: { type: "none" },
    });

    s.addText("KEY TAKEAWAYS", {
      x: 0.9,
      y: 0.8,
      w: 5.0,
      h: 0.35,
      fontFace: FONT_BODY,
      fontSize: 12,
      bold: true,
      color: AMBER,
      charSpacing: 2,
    });

    const takeaways = [
      "Public Safety is Paramount: Financial timelines never override active clinical life-support risks.",
      "Professional Codes Back You Up: Cite NSPE/IEEE guidelines to create a protected safety path.",
      "Conscience is Indivisible: Good intentions cannot shield you from negligence under liability law.",
      "Moral Imagination Matters: Seek creative middle solutions that integrate conflicting duties."
    ];

    let ty = 1.35;
    takeaways.forEach((t) => {
      s.addShape("ellipse", {
        x: 0.95,
        y: ty + 0.1,
        w: 0.09,
        h: 0.09,
        fill: { color: AMBER },
        line: { type: "none" },
      });
      s.addText(t, {
        x: 1.2,
        y: ty,
        w: 5.8,
        h: 0.6,
        fontFace: FONT_BODY,
        fontSize: 12.5,
        color: "E2E8F0",
        lineSpacing: 15,
      });
      ty += 0.8;
    });

    addIconCircle(s, 1.1, 4.8, 0.65, GREEN, "check", "FFFFFF", 0.55);
    s.addText("Engineered for total compliance with clinical safety codes.", {
      x: 1.9,
      y: 4.82,
      w: 4.8,
      h: 0.6,
      fontFace: FONT_BODY,
      fontSize: 11,
      italic: true,
      color: "94A3B8",
      valign: "middle",
    });

    // Divider line
    s.addShape("line", {
      x: 7.4,
      y: 0.9,
      w: 0,
      h: 5.7,
      line: { color: "334155", width: 1.5 },
    });

    addIconCircle(s, 9.6, 1.5, 1.3, AMBER, "question", "FFFFFF", 0.5);

    s.addText("Questions & Discussion", {
      x: 7.9,
      y: 3.0,
      w: 4.6,
      h: 0.7,
      align: "center",
      fontFace: FONT_HEAD,
      fontSize: 28,
      bold: true,
      color: WHITE,
    });

    s.addText("Thank you for your time and clinical safety focus.", {
      x: 7.9,
      y: 3.75,
      w: 4.6,
      h: 0.45,
      align: "center",
      fontFace: FONT_BODY,
      fontSize: 13,
      italic: true,
      color: "94A3B8",
    });

    ["NSPE", "IEEE", "ACM"].forEach((code, i) => {
      addPill(s, 8.5 + i * 1.1, 4.6, 1.0, 0.4, code, "1E293B", AMBER);
    });

    addFooter(s, 12, "Clinical Medical Ethics Case Study");
    s.addNotes("To conclude: Public safety is paramount - all codes agree. Codes provide support - engineers can cite them when pressured. Individual responsibility cannot be delegated. Moral creativity matters - there are often more than two options. And professional integrity is your most valuable asset. As the lecture taught us: 'The engineer's social responsibility embraces obligation to safety and health.' The engineer who faced this dilemma would not be remembered for saving the company. They would be remembered for the infants they failed to protect. Thank you for your attention. We're happy to answer any questions.");
  }

  // Trigger browser download of generated presentation
  await pres.writeFile({ fileName: "Engineering_Ethics_Neonatal_Respirator.pptx" });
}
