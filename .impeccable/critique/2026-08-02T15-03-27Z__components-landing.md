---
timestamp: 2026-08-02T15-03-27Z
slug: components-landing
---
# Critique: components/landing

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scrolled state changes navbar bg, but mobile toggle does not indicate loading state if auth triggers. |
| 2 | Match System / Real World | 4 | UI language is natural Indonesian ("Cara Kerja", "Tentang"). |
| 3 | User Control and Freedom | 3 | Mobile menu can be closed, but there is no exit/back link on the login routes (though page.tsx links to /login). |
| 4 | Consistency and Standards | 4 | Consistent use of colors (navy, teal, dusk-pink) and layout patterns across features and CTA. |
| 5 | Error Prevention | 4 | Landing page is static and simple, reducing input error vectors. |
| 6 | Recognition Rather Than Recall | 4 | Navigation links and CTAs are highly visible and labeled clearly. |
| 7 | Flexibility and Efficiency | n/a | Persuade mode. Accelerators are not typical for static landing pages. |
| 8 | Aesthetic and Minimalist Design | 3 | GIFs are used as hero background which can be distracting and increase cognitive load or page size. |
| 9 | Error Recovery | n/a | No forms or transactional actions on this landing page. |
| 10 | Help and Documentation | n/a | Persuade mode. No extensive help or documentation is expected on the landing page itself. |
| **Total** | | **25/28** | **Good** |

## Design Specificity Verdict

**LLM assessment**: The design successfully incorporates Relivia's brand colors (dusk, primary teal, and deep background navy) with a quiet, calm tone. However, using a full-screen gif background (`/image.gif`) in the hero section is a generic choice that might load slowly, distract from the copy, and lack layout refinement (like overlaying text directly on the gif, which is currently empty of copy since the logo is the only element).

**Deterministic scan**: No issues found by the automated detector (`detect.mjs` returned 0 findings).

## Overall Impression
The landing page has a clear, focused structure and achieves a calm mood. The primary opportunity is to improve the hero section layout by adding clear copy (headline/value prop) and reducing the reliance on a large background gif to set the entire aesthetic tone.

## What's Working
1. **Calm Atmosphere**: The dark navy, deep teal, and dusk accent color scheme perfectly fits the mental health observation context.
2. **Clear CTA**: The "Masuk dengan Google" button stands out clearly in both the navbar, hero, and CTA sections.

## Priority Issues
- **[P1] Hero Layout lacks Value Proposition Text**: The hero section only displays the logo image and a button. There is no heading text explaining what Relivia is. A first-time user sees only a logo.
  - *Why it matters*: Users might not understand what Relivia is immediately upon page load without scrolling down to the features section.
  - *Fix*: Add a clear, reassuring headline and subheadline next to or below the logo.
  - *Suggested command*: `/impeccable layout`
- **[P2] Visual Clutter / Performance of Hero GIF**: The hero section uses `/image.gif` as a full screen background.
  - *Why it matters*: Large GIFs can cause performance lag, and moving backgrounds can distract users in distress.
  - *Fix*: Replace the gif with a premium, smooth gradient background combined with static micro-animations.
  - *Suggested command*: `/impeccable optimize`

## Persona Red Flags

- **Jordan (First-Timer)**: Upon landing, Jordan sees a large logo and a Google button, but no immediate textual explanation of what the app does. They must scroll to "Fitur Utama" to understand the benefit. High bounce risk.
- **Casey (Distracted Mobile User)**: The background GIF might load slowly on a poor mobile connection, delaying page presentation. The mobile menu toggle works well but text targets are relatively small.
- **Dian (Active Treatment User)**: Needs immediate reassurance that this is a safe, non-diagnostic space. The disclaimer is only in the footer. Finding the "teman pendamping observasi" disclaimer requires scrolling all the way to the bottom.

## Minor Observations
- The footer has static links to `/privacy` and `/terms` which might not exist yet.
- The hero GIF layout has a custom bottom gradient transition that works well but has hardcoded color values.

## Questions to Consider
- What if the hero section included a 1-sentence value proposition to immediately capture Jordan's trust?
- Can we move the legal disclaimer closer to the primary call-to-action buttons to reassure users immediately?
