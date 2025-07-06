# Layout Classes

This page documents the CSS utility classes available for controlling layout in VUI. These classes provide responsive containers, width and height utilities, display properties, and flexbox controls to help you build layouts quickly and consistently.

### Container

| Class             | Description                                                                                                 | Max Width              | Value    |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------- | -------- |
| `.container`      | Default container with auto margins and padding. This class is required to make other container sizes work. | `var(--container-l)`   | `1200px` |
| `.container-xs`   | Extra small container                                                                                       | `var(--container-xs)`  | `480px`  |
| `.container-s`    | Small container                                                                                             | `var(--container-s)`   | `640px`  |
| `.container-m`    | Medium container                                                                                            | `var(--container-m)`   | `768px`  |
| `.container-l`    | Large container                                                                                             | `var(--container-l)`   | `1200px` |
| `.container-xl`   | Extra large container                                                                                       | `var(--container-xl)`  | `1400px` |
| `.container-xxl`  | Extra extra large container                                                                                 | `var(--container-xxl)` | `1600px` |
| `.container-full` | Full width container                                                                                        | -                      | `100%`   |

## Width

Width utility classes control element width using percentage values. These classes are generated in increments of 5% from 10% to 100%, plus some additional utility classes.

**Pattern:** `.w-{percentage}` where percentage ranges from 10 to 100 in increments of 5.

**Examples:**

- `.w-25` - Sets width to 25%
- `.w-100` or `.w-full` - Sets width to 100% (full width)
- `.w-auto` - Sets width to auto

**Available classes:** `.w-10`, `.w-15`, `.w-20`, `.w-25`, `.w-30`, `.w-35`, `.w-40`, `.w-45`, `.w-50`, `.w-55`, `.w-60`, `.w-65`, `.w-70`, `.w-75`, `.w-80`, `.w-85`, `.w-90`, `.w-95`, `.w-100`, `.w-full`, `.w-auto`

## Height

Height utility classes control element height using percentage values. These classes follow the same pattern as width classes, generated in increments of 5% from 10% to 100%.

**Pattern:** `.h-{percentage}` where percentage ranges from 10 to 100 in increments of 5.

**Examples:**

- `.h-25` - Sets height to 25%
- `.h-100` - Sets height to 100% (full height)

**Available classes:** `.h-10`, `.h-15`, `.h-20`, `.h-25`, `.h-30`, `.h-35`, `.h-40`, `.h-45`, `.h-50`, `.h-55`, `.h-60`, `.h-65`, `.h-70`, `.h-75`, `.h-80`, `.h-85`, `.h-90`, `.h-95`, `.h-100`

## Display

Classes for controlling the display property of elements.

| Class           | Description          | Display Value  |
| --------------- | -------------------- | -------------- |
| `.block`        | Block display        | `block`        |
| `.inline-block` | Inline block display | `inline-block` |
| `.inline`       | Inline display       | `inline`       |
| `.contents`     | Contents display     | `contents`     |

## Flex

Classes for flexbox layout control. The intended use of this class is to stretch an element inside a flexbox to fill the available space.

| Class     | Description          | Property  |
| --------- | -------------------- | --------- |
| `.flex-1` | Flex grow and shrink | `flex: 1` |
