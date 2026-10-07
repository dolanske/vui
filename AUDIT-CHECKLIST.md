# Audit fix checklist

Source: `AUDIT.md`. Section 2.6 (i18n strings, RTL, emoji locale) is out of scope by request.

Groups are worked through in order, with a review after each one.

## Group 1 — Buttons and text inputs

- [x] Button: render `type="button"` by default on `<button>`, overridable through `type`
- [x] Button: remove `role="button"` from both `<a>` and `<button>`
- [x] Button: disabled `<a>` drops `href`, gets `aria-disabled` and `tabindex="-1"`, and blocks clicks
- [x] Button: `loading` keeps focus (no `inert`), sets `aria-busy` and `aria-disabled`, and blocks clicks
- [x] Button: render the Spinner only while loading, keeping the fade
- [x] ButtonGroup: add `role="group"`
- [x] Raw `<button>` elements get `type="button"`: Accordion header, Tab, DropdownItem, BreadcrumbItem, Resizable handles, Commands, EmojiPicker, Select trigger
- [x] Input: `inheritAttrs: false`, with `class` and `style` on the root and every other attribute and listener on the native `<input>`
- [x] Input: replace hard-coded `name="id"` with a `name` prop
- [x] Input: enforce `limit` without DOM desync (native `maxlength`, plus truncation for `number`)
- [x] Input: `limit` always means character count; stop mapping it to `max`
- [x] Input: add `step`, `size` (`s` `m` `l`) and `clearable` props
- [x] Input: link `hint` and `errors` through `aria-describedby`, and set `aria-invalid` and `aria-required`
- [x] Input: key error messages by index
- [x] Input: expose input attributes and ARIA ids to the internal replace slot, for Color and Dropzone
- [x] Textarea: same attribute, `name`, `limit`, ARIA and error-key fixes as Input
- [x] Textarea: implement `autoResize`
- [x] Password: default `autocomplete="current-password"`, overridable
- [x] Password: reveal toggle gets `aria-pressed`
- [x] Counter: always emit numbers; an empty field no longer concatenates strings
- [x] Counter: clamp to `min` and `max`, and disable buttons at the bounds
- [x] Counter: add `aria-label` to the buttons and avoid floating-point drift
- [x] File: native attributes and `@input` reach the `<input>` (covered by the Input change)
- [x] Dropzone: forward `accept`, `multiple`, `disabled`, `required` and `name` to the file input
- [x] Dropzone: reliable `dragging` state that resets on leave, drop and drag end
- [x] Dropzone: filter dropped files by `accept` and `multiple`, and emit rejected files
- [x] Dropzone: ignore drops while disabled, and reset the input so the same file can be picked again
- [x] Color: associate the outer label with the native colour input
- [x] Color: emit only complete colours (`#rgb`, `#rrggbb`, `rgb()`), keeping partial text visible while typing
- [x] `toHex`: support 3-digit hex

## Group 2 — Choice controls

- [x] Checkbox: `checked` prop works without `v-model`
- [x] Checkbox: `indeterminate` prop
- [x] Checkbox: array `v-model` with a `value` prop
- [x] Checkbox: attributes on the input, plus `name`, `required`, `hint` and `errors`
- [x] Checkbox: no `<p>` inside `<label>`
- [x] Radio and RadioGroup: provide/inject context instead of vnode flattening (fixes the `v-if` crash)
- [x] RadioGroup: shared `name`, so browser arrow-key grouping works
- [x] RadioGroup: real `disabled` through `<fieldset :disabled>`, plus a `legend` / `label` prop
- [x] Radio: emit `change`, put attributes on the input, no `<p>` in the label
- [x] Switch: `role="switch"`, `hint` through `aria-describedby`, attributes on the input, no `<p>` in the label
- [x] Select: clear button no longer nested inside the trigger button
- [x] Select: `aria-haspopup`, `aria-expanded`, `aria-describedby`, `aria-invalid` and `aria-required`
- [x] Select: reassign the model instead of mutating it with `push`
- [x] Select: no clear button when `readonly`; fix the warning text
- [x] Select: fix the `vue-select-no-results` class typo
- [x] Select: hidden input for form submission through `name`
- [x] Slider: handle an unset or `NaN` model and unset range bounds
- [x] Slider: guard `min === max`
- [x] Slider: PageUp and PageDown, `aria-valuetext` formatter, and a `change` event on commit
- [x] Slider: overlapping range handles stay grabbable
- [x] Slider: `round` respects fractional ranges
- [x] Slider: hidden input for form submission through `name`
- [x] Slider: `vertical` orientation
- [x] OTP: emit `complete`
- [x] OTP: Android / virtual keyboard input path
- [x] OTP: register and unregister items correctly, and add a `length` prop
- [x] OTP: symbol injection key, `aria-label`, and `disabled` and `invalid` states

## Group 3 — Shared library, slots and theme

- [x] Replace `useFlattenedSlot` and `enforceSlotType` with provide/inject registration in Tabs, AccordionGroup, Breadcrumbs and KbdGroup
- [x] Filter comment vnodes from any remaining slot helpers, and warn in development instead of throwing
- [x] AccordionGroup: stable keys, controlled open value and default-open support
- [x] Theme: expose the resolved mode (`isDark`), and use it in Calendar and Color
- [x] Theme: make `useColorMode` initialisation lazy instead of running at import
- [x] Viewport: lazy initialisation
- [x] Use capability media queries (`hover` and `pointer`) instead of width for Tooltip and the Dropdown-to-Drawer switch
- [x] SSR: guard `window` access properly (Table Cell, Tabs) and document the singletons (documentation itself is part of group 9)
- [x] `formatUnitValue`: pass through keywords, `calc()` and other functions, `fr`, and negative values
- [x] `searchString`: accept `0`
- [x] Export `Size` as a value, and add `xxxs` to `SpaceSize`
- [x] `package.json` `sideEffects`: correct globs, including theme and viewport modules

## Group 4 — Overlay foundation

- [x] Layer manager: a single layer-aware Escape stack that only the top layer receives
- [x] Focus trap and focus restore utility
- [x] Backdrop: claim the layer before children mount
- [x] Scroll lock with scrollbar-gutter compensation and iOS support
- [x] Modal: `role="dialog"`, `aria-modal` and `aria-labelledby`, focus trap and restore, close-button label
- [x] Modal: `v-model:open`, backdrop fade, `dvh` for fullscreen (issue #231)
- [x] Sheet: same dialog semantics as Modal, and `size` applied to top and bottom positions
- [x] Confirm: render `title` and `content`, stop leaking props as attributes, `role="alertdialog"`, emit `cancel` on dismiss
- [x] Drawer: emit `close` once, require or default an accessible title, remove the fake `name` prop
- [x] Drawer: overlay receives the layer z-index, `v-model:open`, keyboard and safe-area anchoring (issues #196, #229)

## Group 5 — Floating components

- [x] Popout: reactive `placement` and `offset`, `matchWidth` option, optional arrow, clear timers on unmount
- [x] PopoutHover: focus moving inside the popout keeps it open, Escape dismisses it, ARIA on the focusable child, no forced `tabindex` override
- [x] Tooltip: opens on keyboard focus, Escape dismisses, `role="tooltip"`, `aria-describedby` on the real trigger, no layer claim that blocks Modal Escape
- [x] Dropdown: `role="menu"` and `menuitem`, arrow, Home, End and typeahead navigation, `aria-controls`
- [x] Dropdown: no nested `role="button"` wrapper, no invalid `name` attribute
- [x] Dropdown: no focus stealing on outside click, focus returns to the trigger on Escape, layer-aware Escape
- [x] Dropdown: submenu support that survives focus moving into the submenu
- [x] DropdownItem: opt out of auto-close, `href` / `as` support, focus links on open
- [x] Dropdown: single root (attribute fall-through)
- [x] ContextMenu: nested menus open only the innermost, right-clicking inside a menu does not close its parent
- [x] ContextMenu: layer-aware Escape, `role="menu"`, keyboard navigation, focus moves into the menu
- [x] ContextMenu: keyboard opening (Shift+F10, Menu key) anchors to the target, long-press fallback for touch
- [x] ContextMenu: correct position inside scrolled containers, open at the cursor, `disabled` prop, finish the unfinished comment
- [x] Menubar: `role="menubar"`, arrow keys between menus, Escape closes, items close the menu, helpful error outside Menubar
- [x] Select: listbox semantics, keyboard navigation and typeahead, menu width matches the trigger, search cleared on close
- [x] Select: disabled options, option groups, option slot
- [x] CopyClipboard: keyboard accessible trigger without nested roles, `aria-live` announcement, legacy fallback, error handling, single root
- [x] Commands: no crash on Enter with no results, clamp the focused index when results change
- [x] Commands: keys handled only while open, no shortcuts while typing, no double Escape, no Enter on group buttons or during IME composition
- [x] Commands: combobox and listbox ARIA, no nested `role="button"` on group badges
- [x] Commands: remove `autofocus` on mobile (issue #196), close after selection, `noopener` and router navigation, hover moves focus
- [x] Commands: consistent group order, no collision with a group named "All", scoped `data-index` lookup, `Object.groupBy` fallback

## Group 6 — Data and navigation

- [x] Table: sorting reactivity, stable comparator (0 on equal, locale-aware, nulls last)
- [x] Table: `selecting` class unwrapped
- [x] Table: `isSelectedAll` false for empty data, partial pagination options merge with defaults
- [x] Table: clamp `setPage` and the current page when data shrinks
- [x] Table: search ignores nested objects
- [x] Table: per-table injection keys so two tables in one component stay separate, helpful error when `defineTable` is missing
- [x] Table: select-all respects the search filter, prune stale selections, indeterminate select-all
- [x] Table: `aria-sort`, labels and `aria-checked` on sort and select buttons, Cell re-measures on resize
- [x] `paginate`: bounds against 1 and `totalPages`, empty dataset safe
- [x] Pagination: fix inverted slot `disabled`, use the `variant` prop, `<nav>` with `aria-current` and button labels, ellipsis with boundary pages
- [x] Tabs: `aria-selected` (done in group 3), roving `tabindex`, arrow, Home and End keys, `aria-controls` with a TabPanel component
- [x] Tabs: disabled tabs are not selectable, underline works for falsy values, remove the meaningless `name` (done in group 3)
- [x] Accordion: `aria-expanded`, `aria-controls`, `role="region"`, `inert` when collapsed
- [x] Accordion: `v-model:open`, no spurious `close` on mount, consistent height measurement, `disabled` prop, class typo
- [x] Breadcrumbs: `<nav aria-label>` with `<ol>`, separators inside items and `aria-hidden`, `aria-current="page"` on the last item, stable keys (done in group 3)
- [x] Router links: `to` / `as` support on Button, BreadcrumbItem and DropdownItem
- [x] Carousel: wheel only hijacks when it can scroll, focusable region with previous and next controls, `aria-roledescription`
- [x] Carousel: reactive edge shadows with subpixel tolerance, drag works with `snap`
- [x] Overflow: shadows update on content resize, focusable scroll region

## Group 7 — Display and remaining components

- [x] Alert: `role="status"` or `role="alert"`, dismissible option, `aria-hidden` icons, title, description and slot all render
- [x] AspectRatio: CSS `aspect-ratio`, guard `ratio = 0`
- [x] Avatar: numeric radius, reset the fallback on `url` change, initials when no `url`, remove the unused `icon` prop, empty `alt` default
- [x] AvatarGroup: stable randomisation without SSR mismatch, accessible `+N` label
- [x] Badge: `span` root, removable variant
- [x] Button: `warning` and `info` variants
- [x] Card: `as` prop
- [x] Divider: vertical stretches to the parent when no height is given, `aria-orientation`
- [x] Flex and Grid: Grid numeric `rows`, Grid `xBetween`, `as` prop, `xxxs` gap
- [x] Indicator: screen-reader label, no `position-undefined` class
- [x] Histogram: valid roles, focusable clickable cells, accessible summary, safe max for large or empty data, negative values
- [x] Progress: `role="progressbar"` with values, `indeterminate` mode, single fake loop that stops on unmount
- [x] Skeleton: circle with only `height`, `aria-hidden`, reduced motion
- [x] Spinner: `role="status"` and label, remove the literal `size` class
- [x] Marquee: `pauseOnHover` (default `true`, can be disabled), pause on focus, duplicate copy is `inert`, no gap with narrow content
- [x] Kbd: no listener leaks, no triggers while typing, `Ctrl` highlight works, Mac key formatting
- [x] KbdGroup: reactive combo, renders a wrapper (done in group 3)
- [x] Toast: `aria-live` region, close button, pause on hover, variants, `updateToast`, max stack, action auto-dismiss, clear timers, custom body inside `<li>`
- [x] Calendar: fix the `expand` and trigger style expression, preserve vue-datepicker boolean defaults, time format follows the time picker
- [x] Sidebar: keyboard and touch path for `appear`, Escape and focus for floating mode, `aria-label`, toggle click race, listener only when needed, NaN width guard, `dvh`
- [x] Resizable: separator ARIA, pointer events with touch support, per-panel min and max, `v-model` sizes, iframe-safe dragging, cleanup on unmount
- [x] ResizableView: depth-4 split no longer crashes, emits instead of silently mutating, robust drop-zone counter, keyboard alternative
- [x] EmojiPicker: label association, placeholder typo, loading and error states, virtualised or lazy rendering, keyboard grid, button labels, Escape does not bubble, empty-search message, empty `recent` hides the header, no focus stealing

## Group 8 — Global CSS and platform

- [x] Wrap styles in `@layer` (issue #123)
- [x] Root font-size, `overflow-x` and reset become opt-in (root font-size and `overflow-x` via the `vui-root` class; the reset stays global because components rely on it, but now sits in the lowest layer so host styles always win)
- [x] Focus outline meets the 3:1 contrast ratio
- [x] `forced-colors` support
- [x] `env(safe-area-inset-*)` for Toasts, Drawer, Sheet, fullscreen Modal and Popout padding (issue #229)
- [x] Replace remaining `100vh` with `dvh`

## Group 9 — Documentation

- [x] Fix every docs finding in `AUDIT.md` section 4
- [x] Document every API change from groups 1–8
- [x] Add pages for Confirm, ResizableView, theme and `setColorTheme`
- [x] Soften the "accessible" and "tree-shaking" claims until they are true

## Group 10 — Tests

- [x] Regression tests for every P0 in `AUDIT.md` section 1
- [x] Tests for the new behaviour in groups 1–8

## Group 11 - Feedback fixes

- Calendar library styles are not overriden by the vui layer. No styling is applied to the calendar right now. Fix it
- Emoji list looks weird
- Select X button is too far from the v caret