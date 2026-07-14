export interface Speaker {
  name: string;
  role: string;
  responsibility: string;
  timeAlloc: string;
}

export interface SlideData {
  id: number;
  kicker: string;
  title: string;
  subtitle?: string;
  speaker: string;
  speakerNum: number;
  notes: string;
  theme: 'dark' | 'light';
  backgroundColor?: string;
}

export const SPEAKERS: Record<number, Speaker> = {
  1: {
    name: "Member 1",
    role: "Intro & Case Setup",
    responsibility: "Introduce the case study (MedTech Solutions infant respirator), define the moral dilemma, and outline professional codes.",
    timeAlloc: "2.5 mins"
  },
  2: {
    name: "Member 2",
    role: "Moral Clarity & Facts",
    responsibility: "Identify the core ethical issue, analyze facts, examine stakeholders, and outline the human impact (Therac-25 parallel).",
    timeAlloc: "2.5 mins"
  },
  3: {
    name: "Member 3",
    role: "Options & Code Evaluation",
    responsibility: "Explore the decision space, apply NSPE/IEEE/ACM codes, and run an ETHICS PLUS/Line Drawing analysis.",
    timeAlloc: "2.5 mins"
  },
  4: {
    name: "Member 4",
    role: "Decision & Justification",
    responsibility: "Justify the recommended course of action (Option 3 with escalation), reflect on code limits, and present key takeaways.",
    timeAlloc: "2.5 mins"
  }
};

export const SLIDES: SlideData[] = [
  {
    id: 1,
    kicker: "Engineering Ethics · MedTech Case Study",
    title: "Engineering Ethics: The Pressure to Release",
    subtitle: "Navigating Safety-Critical Software Decisions Under Corporate Pressures",
    speaker: "All Members",
    speakerNum: 1,
    theme: "dark",
    notes: "Good morning/afternoon everyone. Today our group will be presenting a case study on engineering ethics titled 'The Pressure to Release.' This case demonstrates how professional codes of ethics guide engineers in resolving moral dilemmas."
  },
  {
    id: 2,
    kicker: "Professional Foundations",
    title: "Introduction to Professional Codes",
    subtitle: "The Eight Essential Roles of Engineering Codes of Ethics",
    speaker: "Member 1",
    speakerNum: 1,
    theme: "light",
    notes: "Professional codes of ethics serve as the foundation for engineering practice. They state the moral responsibilities of engineers and serve eight essential roles: serving the public, providing guidance, offering inspiration, establishing standards, supporting professionals, contributing to education, deterring wrongdoing, and strengthening the profession's image. We'll be referencing codes from NSPE, IEEE, ACM, and IEB."
  },
  {
    id: 3,
    kicker: "The Situation",
    title: "The Case Study: Setting the Scene",
    subtitle: "Infant Respirator Software for Neonatal Intensive Care Units (NICUs)",
    speaker: "Member 1",
    speakerNum: 1,
    theme: "light",
    notes: "Let me introduce our case. You are a senior software engineer at MedTech Solutions. Your company has developed critical software for an infant respirator used in neonatal ICUs. During final testing, you discover a bug in the oxygen alarm threshold algorithm. Under rare conditions, the alarm may not trigger when oxygen drops to dangerous levels. The company is facing bankruptcy. The CEO has promised investors a release by next quarter. The project manager is pressuring you to approve the release, arguing the bug only affects 0.1% of scenarios and that hospital staff monitor patients anyway. This creates a true ethical dilemma: Should you approve release and protect jobs, or delay release and protect patient safety?"
  },
  {
    id: 4,
    kicker: "Phase 1 · Identifying the Core Issue",
    title: "Step 1: Moral Clarity",
    subtitle: "Framing the Central Ethical Question and Conflicting Moral Values",
    speaker: "Member 2",
    speakerNum: 2,
    theme: "light",
    notes: "Step one in ethical decision-making is moral clarity. We need to ask: What is the core issue? The core question is whether the software will meet new safety standards. There's a reason new standards exist - experience shows new failure modes emerge over time. According to the NSPE Code, engineers must 'hold paramount the safety, health, and welfare of the public.' This means the engineer's obligation is clear - but the pressure from the company complicates matters."
  },
  {
    id: 5,
    kicker: "Phase 2 · Fact-Finding",
    title: "Step 2: Know the Facts",
    subtitle: "Analyzing Stakeholder Interests and Technical Realities",
    speaker: "Member 2",
    speakerNum: 2,
    theme: "light",
    notes: "Step two is knowing the facts. Technically, this is critical software affecting patient health and safety. The bug is documented. New standards exist because past experience revealed new failure modes. Business facts include the $2M cost to fix, 6-month delay, and the company's financial trouble. Now let's look at stakeholders. Premature infants - our most vulnerable stakeholders - cannot advocate for themselves. Parents trust hospitals to keep their babies safe. Hospital staff could be blamed for equipment failure. The engineer faces potential job loss. The company could go bankrupt. And competitors might gain advantage from any delay."
  },
  {
    id: 6,
    kicker: "Phase 2 · Why Safety Engineering Matters",
    title: "Human Impact: Why This Matters",
    subtitle: "The Engineering Ethos and Historical Lessons from Therac-25",
    speaker: "Member 2",
    speakerNum: 2,
    theme: "light",
    notes: "Why does this matter? The engineering ethos reminds us that 'With Great Power Comes Great Responsibility.' The users here are vulnerable infants. Hospital staff rely on this technology. The engineer has specialized knowledge the public lacks. Professional codes exist precisely for situations like this. There's a historical parallel: The Therac-25. A linear electron accelerator with a software error resulted in patients receiving overdoses, causing painful aftereffects and deaths. The manufacturer insisted the system couldn't malfunction. It was the hospital physicist's painstaking effort that finally traced the problem to a software error. The lesson is that the most dangerous assumption is 'it could never happen.'"
  },
  {
    id: 7,
    kicker: "Phase 3 · Decision Space",
    title: "Step 3: Consider All Options",
    subtitle: "Exploring Extreme Alternatives and Creative Middle Solutions",
    speaker: "Member 3",
    speakerNum: 3,
    theme: "light",
    notes: "Step three is considering options. We have four main alternatives. Option one: Release as-is. This could save the company and protect jobs, but violates professional codes and puts infants at risk. Option two: Delay and fix fully. This ensures patient safety and follows codes, but may bankrupt the company. Option three: A creative middle solution. Implement a temporary mitigation while fast-tracking a full fix. Option four: Whistleblowing - escalate to regulatory agencies. Note that options one and two represent false dichotomies. Ethics, like engineering design, requires creativity in finding solutions that integrate competing values."
  },
  {
    id: 8,
    kicker: "Phase 4 · Ethical Evaluation",
    title: "Step 4: Evaluate Using Codes",
    subtitle: "Applying NSPE, IEEE, and Software Engineering Codes of Ethics",
    speaker: "Member 3",
    speakerNum: 3,
    theme: "light",
    notes: "Step four is evaluating these options using professional codes. The NSPE Code states: 'If engineers' judgment is overruled under circumstances that endanger life or property, they shall notify their employer or client and such other authority as may be appropriate.' The IEEE Code requires engineers to 'accept responsibility in making engineering decisions consistent with the safety, health, and welfare of the public, and to disclose promptly factors that might endanger the public or the environment.' The ACM/Software Engineering Code states to 'approve software only if they have a well-founded belief that it is safe, meets specifications, passes appropriate tests, and does not diminish quality of life, diminish privacy, or harm the environment.' All codes prioritize public safety over economic considerations."
  },
  {
    id: 9,
    kicker: "Phase 4 · Structured Models",
    title: "Using the ETHICS PLUS Model",
    subtitle: "Line Drawing and PLUS Standards Evaluation",
    speaker: "Member 3",
    speakerNum: 3,
    theme: "light",
    notes: "The ETHICS PLUS model provides a structured framework. The ETHICS process: Establish facts, Take stock of stakeholders, Have objective assessment, Identify viable alternatives, Compare and evaluate consequences, Select appropriate action. The PLUS standards: Professional codes (which require public safety), Legal requirements (product liability laws), Uncompromising self values (would you use this on your child?), and the Sunshine test (could you defend this publicly without shame). When we apply this model, Option 1 clearly fails the PLUS test."
  },
  {
    id: 10,
    kicker: "Phase 5 · Reasonable Choice",
    title: "Step 5: Making the Decision",
    subtitle: "Recommended Course of Action: Option 3 with Escalation Path",
    speaker: "Member 4",
    speakerNum: 4,
    theme: "light",
    notes: "Step five is making a reasonable decision. Our recommended course is Option 3 with an escalation path. The engineer should: First, document everything - create a paper trail. Second, refuse to approve release until safety is demonstrably assured. Third, propose a specific mitigation plan including temporary monitoring protocol, hospital staff training, and a commitment to a fast-tracked fix. Fourth, escalate within the company if the project manager refuses to act. Finally, notify the appropriate regulatory agency if the company still refuses. This decision is justified because it protects public safety, follows professional codes, shows moral creativity, maintains integrity, and demonstrates responsible engineering practice."
  },
  {
    id: 11,
    kicker: "Ethical Reflections",
    title: "Limitations of Codes & Final Reflection",
    subtitle: "Codes as Support Systems vs Individual Moral Responsibility",
    speaker: "Member 4",
    speakerNum: 4,
    theme: "light",
    notes: "However, we must acknowledge the limitations of codes. They are no substitute for individual responsibility. Most codes are restricted to general wording. Different entries in codes may conflict. Codes can be flawed by omission and commission. But codes do provide group backing for ethical stands, legal support when criticized, educational frameworks, and protection for responsible professionals. The best way to increase trust in the profession is by encouraging engineers to speak freely and responsibly about public safety and well-being. Remember: The pedestrian is just as dead if the driver didn't intend to kill them. Good intentions don't matter if harm occurs. Ethical engineering requires action."
  },
  {
    id: 12,
    kicker: "Presentation Wrap-Up",
    title: "Conclusion & Key Takeaways",
    subtitle: "Summary, Questions & Discussion",
    speaker: "All Members",
    speakerNum: 4,
    theme: "dark",
    notes: "To conclude: Public safety is paramount - all codes agree. Codes provide support - engineers can cite them when pressured. Individual responsibility cannot be delegated. Moral creativity matters - there are often more than two options. And professional integrity is your most valuable asset. As the lecture taught us: 'The engineer's social responsibility embraces obligation to safety and health.' The engineer who faced this dilemma would not be remembered for saving the company. They would be remembered for the infants they failed to protect. Thank you for your attention. We're happy to answer any questions."
  }
];
