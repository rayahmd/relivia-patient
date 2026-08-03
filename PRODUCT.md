# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Individuals in ongoing psychiatric or psychological treatment (with a psychiatrist or psychologist) who want to track their daily mental state between clinical sessions. Primary context: Indonesian speakers managing a diagnosed condition or active therapy relationship.

## Product Purpose

Relivia is a daily mental health observation companion. It lets users log their mood, anxiety level, sleep quality, and medication adherence in under two minutes per day. Gemini AI summarizes those logs into a neutral, clinician-ready report the user can bring to their next consultation — so they don't have to explain their week from memory.

Success means the user arrives at their clinical session with a clear, objective one-page record of how they've actually been doing.

## Positioning

The closed loop of ultra-low-friction daily logging (≤ 2 minutes) paired with an AI-generated consultation summary is Relivia's differentiating mechanism. A competitor can offer either piece — a mood tracker or an AI summarizer — but the closed loop from private daily habit to a clinician-ready handoff in one product is the claim no neighboring product can truthfully copy.

## Operating Context

- Users open the app daily, typically at the same time of day, to complete a short check-in.
- They share the AI-generated summary PDF or screen with their psychiatrist or psychologist at scheduled sessions.
- Clinicians are not active users of the platform; they are consumers of the output.
- Primary language of the product UI is Bahasa Indonesia.

## Capabilities and Constraints

- Daily check-in fields: mood, kecemasan (anxiety level), tidur (sleep), kepatuhan minum obat (medication adherence).
- AI insight and summarization powered by Google Gemini (`@google/generative-ai`).
- Backend: Supabase (auth, database, storage).
- Authentication: Google OAuth only — no email/password login. This is a deliberate product decision.
- Stack: Next.js 16, React 19, Tailwind CSS v4, TypeScript.
- Font: Plus Jakarta Sans.

## Brand Commitments

- **Name:** Relivia
- **Non-diagnostic disclaimer:** "Teman pendamping observasi, bukan pengganti tenaga profesional." This positioning is a confirmed hard legal and ethical requirement — it must appear in the product and must never be contradicted by copy, feature framing, or design.
- **Voice:** Calm, warm, and reassuring — never clinical authority. The product supports, it does not diagnose.

## Evidence on Hand

- Landing page copy and component structure in `/components/landing/`.
- Animated GIF background asset at `/public/image.gif`.
- Logo asset at `/public/logo.png`.
- Color palette derived from the hero background imagery: dark navy (`#0C1030`), teal (`#2AAFD4`), dusk-pink (`#E08DAF`), warm gold (`#F0A94E`).
- No real testimonials, clinical validations, press coverage, or benchmark data exist yet — future work must not fabricate these.

## Product Principles

1. **Minimal ask, maximal return.** Every interaction should cost the user the least possible time and cognitive load. Two minutes is a ceiling, not a floor.
2. **Companion, not authority.** The product always defers to the clinician. Copy, design, and AI output must reinforce the user's relationship with their professional, not compete with it.
3. **Privacy as trust.** Health data is intimate. Reliability, data ownership, and transparent handling are non-negotiable product attributes.
4. **Continuity of care.** The product's value compounds over time. The longer a user tracks, the more useful the summary. Design rewards consistency without punishing gaps.
5. **Clarity over cleverness.** When in doubt, be simpler. The user may be in distress; the interface must never add to their load.

## Accessibility & Inclusion

No product-specific accessibility standard has been confirmed yet. The non-diagnostic disclaimer is a baseline accessibility-of-understanding requirement: all AI output must be clearly framed as observation, not medical guidance.
