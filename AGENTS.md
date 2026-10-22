# Agent Guidelines & Design System

This project strictly adheres to Apple's Human Interface Guidelines (HIG) and the **apple-design** skill (`.agents/skills/apple-design/SKILL.md`).

## Core Rules for UI Development
1. Follow Apple Design Principles: **Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight**.
2. **Typography**: Always use Apple's SF Pro font hierarchy with appropriate tracking (`tracking-tight` on large headings, `tracking-normal` on body).
3. **Materials**:
   - Navigation and floating controls live in the *functional layer* with backdrop blur and subtle hairline borders (`backdrop-blur-xl bg-white/75 dark:bg-black/75 border-b border-black/[0.06] dark:border-white/[0.08]`).
   - Cards live in the *content layer* (`rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-card shadow-sm hover:shadow-md transition-all duration-200`).
4. **Color & Badges**:
   - Use Apple System Blue (`#0071e3`) for primary actions.
   - Use translucent pill badges with 10% opacity backgrounds and contrasting text.
5. **Interactive Controls**:
   - Buttons, cards, and interactive elements must provide tactile feedback (`active:scale-[0.98] transition-all duration-150`).
