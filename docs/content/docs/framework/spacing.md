# Spacing

VUI provides a comprehensive set of spacing utility classes that create consistent spacing throughout your application. These utilities use predefined design tokens to ensure visual harmony and consistent layout spacing across all components and pages.

The spacing system includes utilities for margins, padding, and automatic margin alignment. All spacing values are defined as CSS custom properties and are responsive on mobile devices.

## Spacing Values

The following spacing tokens are available throughout the design system:

| Token  | Size   | Description             |
| ------ | ------ | ----------------------- |
| `0`    | `0px`  | No spacing              |
| `xxs`  | `4px`  | Extra extra small       |
| `xs`   | `8px`  | Extra small             |
| `s`    | `12px` | Small                   |
| `m`    | `18px` | Medium (default)        |
| `l`    | `24px` | Large                   |
| `xl`   | `34px` | Extra large             |
| `xxl`  | `48px` | Extra extra large       |
| `xxxl` | `64px` | Extra extra extra large |

> **Note:** On mobile devices (screens ≤ 572px), some spacing values are automatically reduced to optimize for smaller screens.

## Auto margin

Classes for automatic margin alignment.

| Class      | Description               | Property              |
| ---------- | ------------------------- | --------------------- |
| `.mx-auto` | Auto horizontal margins   | `margin-inline: auto` |
| `.my-auto` | Auto vertical margins     | `margin-block: auto`  |
| `.m-auto`  | Auto margins on all sides | `margin: auto`        |

## Margin Classes

Margin utility classes using the spacing tokens. Available sizes: `0`, `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`.

| Class Pattern | Description       | Property                             |
| ------------- | ----------------- | ------------------------------------ |
| `.mb-{size}`  | Margin bottom     | `margin-bottom: var(--space-{size})` |
| `.mr-{size}`  | Margin right      | `margin-right: var(--space-{size})`  |
| `.ml-{size}`  | Margin left       | `margin-left: var(--space-{size})`   |
| `.mt-{size}`  | Margin top        | `margin-top: var(--space-{size})`    |
| `.mx-{size}`  | Margin horizontal | `margin-inline: var(--space-{size})` |
| `.my-{size}`  | Margin vertical   | `margin-block: var(--space-{size})`  |
| `.m-{size}`   | Margin all sides  | `margin: var(--space-{size})`        |

## Padding Classes

Padding utility classes using the spacing tokens. Available sizes: `0`, `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`.

| Class Pattern | Description        | Property                              |
| ------------- | ------------------ | ------------------------------------- |
| `.pb-{size}`  | Padding bottom     | `padding-bottom: var(--space-{size})` |
| `.pr-{size}`  | Padding right      | `padding-right: var(--space-{size})`  |
| `.pl-{size}`  | Padding left       | `padding-left: var(--space-{size})`   |
| `.pt-{size}`  | Padding top        | `padding-top: var(--space-{size})`    |
| `.px-{size}`  | Padding horizontal | `padding-inline: var(--space-{size})` |
| `.py-{size}`  | Padding vertical   | `padding-block: var(--space-{size})`  |
| `.p-{size}`   | Padding all sides  | `padding: var(--space-{size})`        |
