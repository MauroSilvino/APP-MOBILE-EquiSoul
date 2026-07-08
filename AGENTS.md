# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# EquiSoul — Mobile App

React Native (Expo, TypeScript) app for Android and iOS. Screens are designed in Claude Design
(claude.ai/design) and synced into this repo before implementation — see `design-system/README.md`
for the full sync workflow.

## Stack
- Expo SDK 57 (managed workflow) + TypeScript
- React Navigation 7 (native-stack)
- Zustand for global state
- Design tokens driven from `design-system/tokens/*.json`, consumed via `src/theme`

## Structure
- `design-system/` — raw specs synced from Claude Design (tokens, per-screen/component references).
  Treat as source of truth for visual values; never hand-edit without checking the source design first.
- `src/theme/` — typed theme (`theme.colors`, `theme.typography`, `theme.spacing`, `theme.radius`)
  generated from `design-system/tokens/*.json`. Always style through these tokens, never hardcode
  colors/spacing/font sizes in a screen or component.
- `src/components/ui/` — shared primitives (`Text`, `Screen`, ...). New screens should compose these
  rather than using raw `react-native` `View`/`Text` for anything token-driven.
- `src/screens/` — one file per app screen, named after the Claude Design screen name.
- `src/navigation/` — `RootNavigator.tsx` + `types.ts` (React Navigation param list).
- `src/store/` — Zustand stores, one per domain (avoid a single monolithic store).

## Conventions
- When implementing a screen from a synced Claude Design spec, match spacing/colors/typography via
  `src/theme` tokens exactly — do not eyeball values.
- Every new screen must be registered in `src/navigation/types.ts` (`RootStackParamList`) and
  `src/navigation/RootNavigator.tsx`.
- Run `npx tsc --noEmit` after non-trivial changes; the project must typecheck cleanly.
