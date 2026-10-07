# VUI production-readiness audit

Audit date: 2026-10-07. Scope: every component under `src/components`, the shared code in `src/lib` and `src/internal`, global styles, every page under `docs/content/docs`, and the open GitHub issues.

Comparison baseline: the behaviour people expect from widely used design systems and primitives today. That means Radix / Reka UI, Headless UI, React Aria, MUI, Chakra, shadcn-vue, PrimeVue, Vuetify and the WAI-ARIA Authoring Practices (APG).

## How to read this

Each finding has a confidence tag.

- **[TESTED]** means I reproduced it with a throwaway Vitest run against the real source. The test file was deleted afterwards.
- **[CODE]** means the defect follows directly from reading the code. No reasonable runtime would behave differently.
- **[PLAUSIBLE]** means the code strongly suggests the issue, but it depends on a browser, device or third-party behaviour I could not run here. Check these in a real browser before fixing.

Severity uses four levels.

- **P0** breaks real apps or blocks shipping in a company setting. Examples are data loss, crashes, broken forms, and broken core features.
- **P1** is a significant accessibility failure or a clearly wrong behaviour that users will hit.
- **P2** is a missing feature or edge case that mature design systems handle.
- **P3** is polish, consistency or a typo.

---

## 1. Executive summary

VUI looks good and covers a wide surface. It is not production ready for a general company today. Three systemic problems block that, along with a set of concrete P0 bugs.

1. **Forms are unsafe.** No internal `<button>` sets `type="button"`, so most interactive components submit the enclosing `<form>`. Every `Input` and `Textarea` renders `name="id"` literally. Native attributes such as `name`, `autocomplete`, `aria-*` and `step` land on a wrapper `div` instead of the input.
2. **Accessibility is mostly missing for composite widgets.** Modal, Sheet, Dropdown, Select, ContextMenu, Menubar, Tabs, Accordion, Commands, Toast and Tooltip lack the roles, focus management and keyboard models from the APG. Radix, Headless UI and React Aria treat these as table stakes. `reka-ui` is already a transitive dependency through `vaul-vue`, so the primitives are already in `node_modules`.
3. **Global CSS leaks into the host app.** Importing the stylesheet sets `:root { font-size: 63.5% }`, strips outlines from `*`, applies a full reset, and forces `overflow-x: hidden` on `:root`. That breaks any rem-based host app. Open issue #123 asks for CSS layers, and this audit strongly supports it.

### Top P0 bugs

| # | Component | Defect | Confidence |
|---|-----------|--------|------------|
| 1 | Button, Accordion, Select, Tabs, Counter, Password, DropdownItem, Breadcrumbs, Resizable, Commands | Buttons default to `type="submit"`. Clicking the Password reveal, a Counter `+` button, an Accordion header or a Select trigger submits the parent form. | TESTED |
| 2 | Input, Textarea | `name="id"` is hard-coded on every field (`src/components/Input/Input.vue:100`, `src/components/Input/Textarea.vue:75`). | TESTED |
| 3 | Input, Textarea | `limit` desyncs the DOM. The model rejects the extra character but the field still shows it. This is the root cause of the `FIXME` at `Input.vue:8`. | TESTED |
| 4 | Table (`defineTable`) | Sorting does not re-sort rows. `sorting` is a `shallowRef` mutated by property (`src/components/Table/table.ts:91-107`). | TESTED |
| 5 | Table.Root | The `selecting` class is always applied, because a nested `computed` is never unwrapped in the template. With `pin="first"` the second column is wrongly pinned. | TESTED |
| 6 | Tabs, AccordionGroup, RadioGroup, Breadcrumbs, KbdGroup | A child with `v-if="false"` crashes the parent. The comment vnode reaches the template (`src/components/Tabs/Tabs.vue:91`) and `enforceSlotType`. | TESTED |
| 7 | Confirm | The `title` and `content` props are never rendered. They leak onto the modal `div` as HTML attributes, so the browser shows a native tooltip over the whole dialog. | TESTED |
| 8 | Checkbox | The documented `checked` prop does nothing without `v-model`. `v-model` overrides it and the icon reads only the model. | TESTED |
| 9 | Grid | `:rows="3"` produces `1fr1fr`, which is invalid CSS with one track too few (`src/components/Grid/Grid.vue:77-84`). | TESTED |
| 10 | Avatar | Numeric `radius` logic is inverted. Any radius at or below 164px renders as a pill (`src/components/Avatar/Avatar.vue:30-35`). | TESTED |
| 11 | Pagination / `paginate` | With `maxPages` of 1 or 2, Next and Last are disabled mid-list. The prev/next slot `disabled` prop is inverted. An empty dataset gives `currentPage: 0`. | TESTED |
| 12 | Slider | An unbound model renders `NaN%` and `aria-valuenow="NaN"`. Range mode with unset `start` or `end` breaks clamping. | TESTED |
| 13 | ContextMenu | A nested ContextMenu opens both menus on one right-click. Escape closes every open menu and the Modal behind it. | CODE |
| 14 | Commands | Pressing Enter with no results throws. The focused index is not reset when results shrink. Global keys fire while the palette is closed. | CODE |
| 15 | Toast | There is no `aria-live` region and no dismiss button. The docs never mention that `<Toasts />` must be mounted. | CODE |

---

## 2. Cross-cutting issues

These apply to many components. Fixing them centrally fixes dozens of individual findings.

### 2.1 Forms and native attributes (P0)

- **No `type="button"` anywhere.** `Button` (`src/components/Button/Button.vue:55-92`) never sets a type. The same applies to raw `<button>` elements in Accordion, Select, Tab, DropdownItem, BreadcrumbItem, Resizable handles, Commands and EmojiPicker. MUI and Chakra default to `type="button"` for exactly this reason. **[TESTED]** A form received two submits from one Accordion click and one Button click.
- **Attributes land on the wrong element.** `Input`, `Textarea`, `Checkbox`, `Radio`, `Switch` and `Select` do not set `inheritAttrs: false`. `name`, `autocomplete`, `inputmode`, `pattern`, `step`, `maxlength`, `aria-*`, `@blur`, `@focus` and `@keydown` all go to the container `div`. **[TESTED]** `autocomplete="email"` ended up on the `div`. `Password` passes `autocomplete="off"`, which is therefore ignored. It should be `current-password` or `new-password` anyway, so password managers work.
- **No `name` or `value` form support** on Checkbox, Radio, Switch, Select, Slider or OTP. They cannot take part in native form submission or `FormData`.
- **Missing field semantics everywhere.** `hint` and `errors` are not linked through `aria-describedby`, and there is no `aria-invalid`. `required` is visual only on Select. Error lists use `:key="err"`, which collides on duplicate messages.
- **Invalid nesting.** `<p>` and `<div>` sit inside `<label>` in Checkbox, Radio and Switch. A Button sits inside a `<button>` in Select (`src/components/Select/Select.vue:185`). A `<div>` sits inside a `<button>` in the EmojiPicker tabs through Tooltip. Badge, Avatar, Tooltip and Kbd use block wrappers that are invalid inside `<p>`.

### 2.2 Overlays, focus and keyboard (P1)

- **No focus management in any overlay.** Modal, Sheet, Confirm, Dropdown, ContextMenu, Menubar and Commands neither trap focus nor return it to the trigger on close. Modal and Sheet lack `role="dialog"`, `aria-modal` and `aria-labelledby`. Confirm should use `role="alertdialog"`. Icon-only close buttons have no accessible name (`src/components/Modal/Modal.vue:122`, `Sheet.vue:123`).
- **Escape handling is fragmented.** Backdrop correctly checks `isTopLayer`. Dropdown and Commands use global `useMagicKeys`. ContextMenu (in your uncommitted change) dropped its `isTopLayer` check. Kbd and KbdGroup register global listeners. As a result:
  - Escape inside a Dropdown or ContextMenu that sits in a Modal can close both.
  - Every open Dropdown closes at once instead of only the innermost.
  - While any **Tooltip** is visible, Escape no longer closes the Modal underneath. Tooltip claims a layer (`src/components/Popout/Popout.vue:94-105`), so the Modal is no longer the top layer. **[CODE]**
- **Recommendation.** Route every dismissable layer through `layerManager` and give it one `onEscape` that only the top layer receives. Stop using `useMagicKeys` for dismissal. Better still, build Dialog, DropdownMenu, ContextMenu, Menubar, Tabs, Popover and Tooltip on Reka UI primitives, which are already installed.
- **Scroll lock is CSS only.** `html:has(.vui-backdrop) { overflow: hidden }` (`src/internal/Backdrop/backdrop.scss:24`) shifts layout when the scrollbar disappears, because there is no `scrollbar-gutter` compensation. It is also unreliable on iOS Safari. Fullscreen modals use `100vh` (`src/components/Modal/modal.scss:42`), which relates to open issue #231.
- **Child components mount before Backdrop claims its layer.** A popout that is open on mount inside a modal can claim a lower z-index than the modal itself. **[PLAUSIBLE]**

### 2.3 Slot introspection (`src/lib/slots.ts`) (P0/P1)

- **Comment vnodes are not filtered.** `v-if="false"` children crash the parent. **[TESTED]** Tabs threw "Cannot read properties of null (reading 'value')".
- **`useFlattenedSlot` walks into element children** (`src/lib/slots.ts:48`). Wrapping items in a `<div>` silently removes the wrapper and lifts the inner components out.
- **`enforceSlotType` throws a `TypeError`** inside a render effect (`src/lib/slots.ts:80-86`). It also matches on the compiler-internal `__name`, so a user's own wrapper component such as `<MyTab>` crashes the app. Design systems warn in development instead of throwing.
- **Slots are called inside `computed`, outside render.** Vue warns about this, and reactive state read inside slot content may not update.
- **AccordionGroup keys children by vnode object** (`src/components/Accordion/AccordionGroup.vue:43`). Vnodes are recreated on re-render, so accordions can remount and lose their open state.
- **Recommendation.** Replace vnode introspection with provide/inject registration, as Headless UI and Reka do. Each `Tab`, `Accordion` or `Radio` registers itself with its parent context.

### 2.4 Theme and global state (P1)

- **The theme mode is never resolved.** `theme` is the raw `useColorMode` value, which is `'auto'` in auto mode (`src/lib/theme.ts:6-16`). `Calendar` (`:dark="theme === 'dark'"`) and `Color` therefore render in light mode for system-dark users. Expose `state` or a resolved `isDark` instead. **[PLAUSIBLE]** This is the VueUse 10+ behaviour.
- **Module-level side effects.** `useColorMode` runs at import time. It writes to `localStorage`, toggles the class on `<html>`, and fights any host app that manages its own theme. `viewport.ts` also starts a `watchEffect` at import. `package.json` `sideEffects` lists `".css"`, which is a literal filename rather than a glob, so bundlers may tree-shake these modules inconsistently.
- **Breakpoints are width-based.** Tooltip is disabled under 768px (`src/components/Tooltip/Tooltip.vue:48`), and Dropdown becomes a Drawer under 572px. A narrow desktop window loses tooltips. Use `(hover: hover) and (pointer: fine)` to detect capability instead.
- **SSR.** The Toast store, `layerManager` and `viewport` are module singletons, which can leak across requests in Nuxt SSR. `Table/Cell.vue:7` uses `!window`, which throws a `ReferenceError` on the server instead of evaluating to false.

### 2.5 Global CSS leakage (P1, open issue #123)

- `src/style/core.scss:96-127` sets `:root { font-size: 63.5%; overflow-x: hidden; ... }` and `* { outline: none }`. `reset.scss` resets every element.
- Importing `@dolanske/vui/style` into an existing app changes its rem scale and typography. Company adoption needs these behind `@layer vui.reset, vui.base, vui.components`, with the root font-size made opt-in.
- Focus rings are global through `*:focus-visible { outline: var(--outline) }`. The outline colour `--color-text-lighter` should be checked against the WCAG 1.4.11 non-text contrast ratio of 3:1. There is no `forced-colors` (Windows High Contrast) support anywhere.

### 2.6 Internationalisation (P2)

User-facing strings are hard-coded in English throughout. Examples:

- Select: "Select an option", "Search...", "No results...", "n selected"
- Commands: "No results found", "All", "Other", "Move", "Select", "Close"
- Pagination and Table: "First page", "Ascending", "Sort column"
- Dropzone: "Click or drag files over here", "Drop it"
- CopyClipboard: "Copied to clipboard"
- Password: "Hide", "Reveal"
- Confirm: "Ok", "Cancel"
- EmojiPicker: emoji data hard-coded to the `en` locale

None of the components support RTL. Carousel scroll math, Slider, Resizable and placement names all assume left-to-right.

### 2.7 Helpers (`src/lib/helpers.ts`)

- `formatUnitValue` appends `px` to anything it does not recognise. `"auto"` becomes `autopx`, `"calc(...)"` becomes `calc(...)px`, `"1fr"` becomes `1frpx`, and `"-4px"` becomes `-4pxpx`. This affects Avatar, Divider, Skeleton, Sheet, Dropdown, Flex and Grid.
- `searchString(0, 'x')` returns false because `!match` treats `0` as empty.
- `toHex` rejects 3-digit and 8-digit hex. `REGEX_HEX` accepts partial values such as `#f`, which are then emitted as the model value.
- `Size` is a runtime enum but is exported as `type Size` (`src/index.ts:149`), so consumers cannot use `Size.s`. `SpaceSize` lacks `xxxs`, which `Spaces` has.

---

## 3. Component findings

Components are listed alphabetically. Each section covers bugs, accessibility, edge cases and missing features against mainstream design systems.

### Accordion / AccordionGroup
- **P0 [TESTED]** The header `<button>` has no `type`, so it submits forms.
- **P1 [TESTED]** There is no `aria-expanded`, `aria-controls` or `role="region"`. Collapsed content is only `aria-hidden` with `max-height: 0`, so links inside remain tabbable. Use `inert`.
- **P1** `open` is one-way. A parent passing `:open="true"` cannot re-open the accordion after the user closes it, because there is no `v-model:open`.
- **P2** The immediate watcher emits `close` on mount for every closed accordion (`Accordion.vue:30-41`), which is a spurious event.
- **P2** Height uses `scrollHeight` when opening but `contentRect.height` on resize, which excludes padding. Animations can jump if the inner element has padding.
- **P2** There is no `disabled` prop. AccordionGroup has no controlled value, such as `v-model` of open ids, and no "default open" option.
- **P3** The class name has a typo, `vui-accordtion-content-inner` (`Accordion.vue:93`).

### Alert
- **P1** There is no `role="alert"` or `role="status"`, so screen readers never announce dynamic alerts.
- **P2** There is no dismissible or close variant. Decorative icons are not marked `aria-hidden`.
- **P3** When both `title` and `description` are set, the default slot is silently dropped.

### AspectRatio
- **P3** It uses the `padding-bottom` hack. CSS `aspect-ratio` is baseline today. `ratio = 0` produces `Infinity%`.

### Avatar / AvatarGroup
- **P0 [TESTED]** Numeric radius is inverted, as described in the summary.
- **P1** `showFallback` never resets when `url` changes (`Avatar.vue:26`). After one failed image, later valid URLs never display.
- **P2** `fallback` text is only used after a load error. With no `url`, the icon shows instead of initials, which most design systems show. The `icon` prop is declared but never used. `alt` defaults to `"avatar"` and should be `""` for decorative avatars.
- **P2** AvatarGroup `randomized` reshuffles on every recompute with a biased sort, and causes SSR hydration mismatches. The `+N` counter has no accessible label.

### Badge / BadgeGroup
- **P3** Badge renders a `div`, which is invalid inside `<p>` or `<td>` text. Use a `span`. There is no removable or "chip" variant.

### Breadcrumbs
- **P1** It renders a bare `<ul>` with no `<nav aria-label="Breadcrumb">` and should use `<ol>`. Separators are direct children of `<ul>`, which is invalid HTML, and are not `aria-hidden`. The last item has no `aria-current="page"`.
- **P2** There is no `as` or `to` prop for `RouterLink` or `NuxtLink`. Only `href` is supported, which causes full page reloads in SPAs. This is a very common company need.
- **P3** Items are keyed by `label`, so duplicate labels produce duplicate keys.

### Button / ButtonGroup
- **P0 [TESTED]** There is no default `type="button"`.
- **P1 [TESTED]** `role="button"` is added to `<a href>`, which turns links into buttons for assistive technology. A disabled `<a>` keeps its `href` and stays navigable. It needs `aria-disabled`, `tabindex="-1"` and click prevention.
- **P1** `loading` sets `inert`, which drops focus to `<body>` when loading starts. There is no `aria-busy`.
- **P2 [TESTED]** A Spinner is rendered inside every button, even when not loading, because `!isNil(false)` is always true (`Button.vue:82`).
- **P2** There is no `as` or `to` for router links, and no `warning` or `info` variants to match Badge and Alert. ButtonGroup has no `role="group"`.

### Calendar
- **P1 [CODE]** The style expression `props.expand ?? !$slots.trigger ? ...` (`Calendar.vue:26-29`) always evaluates to inline-block unless `expand` is set, because `expand` defaults to `false`, which is not nullish. The trigger-slot logic is dead code.
- **P1 [PLAUSIBLE]** Dark mode breaks for `auto` theme users, as described in section 2.4.
- **P2 [PLAUSIBLE]** `withDefaults(defineProps<RootProps>)` makes Vue cast every omitted boolean prop of vue-datepicker to `false`, and they are spread back in. The built bundle confirms props such as `transitions` and `teleport` are boolean-cast. Any datepicker boolean that defaults to `true` is silently overridden.
- **P3** The default `formats.input` includes `HH:mm` even when the time picker is disabled.

### Card
- **P3** There is no `as` prop for `section` or `article`, and no interactive or clickable card pattern.

### Carousel
- **P1** The wheel listener always calls `preventDefault` and converts vertical scroll to horizontal (`Carousel.vue:129-138`). Page scroll is hijacked even when the carousel cannot scroll or has reached its edge.
- **P1** It is not keyboard accessible. The scroll container is not focusable, there are no previous or next controls, and there is no `aria-roledescription="carousel"`.
- **P2** The right-edge shadow reads a non-reactive `scrollWidth`. It does not update when content resizes or loads, and has no tolerance for subpixel values.
- **P2** RTL breaks drag and shadows because `scrollLeft` is negative. Drag combined with `snap` fights the scroll-snap behaviour.

### Charts / Histogram
- **P1** `role="auto"` is not a valid ARIA role (`Histogram.vue:47`). Clickable cells are not focusable and have no key handler. There is no accessible data representation.
- **P2** `Math.max(...data)` overflows the stack for very large arrays and returns `-Infinity` for empty arrays. Negative values produce negative heights. Every cell mounts its own Tooltip.

### Checkbox
- **P0 [TESTED]** The `checked` prop is broken without `v-model`.
- **P2** There is no indeterminate state. Tables and nested lists rely on it, and every major design system has it. `v-model` cannot bind an array of values.
- **P2** There is no description, error or required display.

### Color
- **P1** The outer `label` targets Input's id, but the replaced input uses Color's own id (`Color.vue:42`). The label is therefore not associated with any field.
- **P2** Partial hex values such as `#ff` are emitted to the model.

### Commands
- **P0 [CODE]** Pressing Enter with zero results calls `handleSelect(undefined)`, which throws (`Commands.vue:186-201`).
- **P0 [CODE]** `focusedIndex` resets only when search changes from empty to non-empty (`Commands.vue:155`). Typing more characters or switching groups leaves the index past the end of the list, so Enter crashes.
- **P1** `useMagicKeys` is global, as noted in the "Escape handling" bullet of section 2.2. Escape emits `close` even when the palette is closed, and fires twice together with Backdrop's handler. Single-key shortcuts trigger while the user types in the search box. Enter on a group-filter button also runs the selected command, and Enter during IME composition selects too.
- **P1** There is no ARIA combobox or listbox. The input lacks `role="combobox"`, `aria-activedescendant` and `aria-controls`. Items lack `role="option"` and `aria-selected`. The Badge inside each group button adds a nested `role="button"`.
- **P1 [CODE]** In the docs' custom `#command` slot example, the user's button calls the handler and the wrapping `<li @click>` calls it again. The handler runs twice.
- **P1** The `autofocus` attribute (`Commands.vue:243`) focuses the input on mobile even though `resetSearch` deliberately skips focusing there. This likely explains the "input gets focus for some reason" report in open issue #196.
- **P2** The palette does not close after selection. `href` uses `window.open(_blank)` without `noopener` and cannot do in-app router navigation. Hovering does not move the focused index.
- **P2** Groups are sorted differently in the list and the filter row. The `##ungrouped##` key sorts first in one and last in the other. A user group literally named "All" collides with the built-in filter.
- **P2** `document.querySelector('[data-index]')` is global and can match unrelated elements. `Object.groupBy` and `toSorted` need Safari 17.4 or newer, with no polyfill.

### ContextMenu
These cover your nested-menu question.
- **P0 [CODE] Nested ContextMenu.** The inner container's `contextmenu` listener does not stop propagation (`ContextMenu.vue:13-25`). The event bubbles to the outer container, which also opens its menu. The window listener does not close the outer menu, because the target is inside it. Result: two menus stacked on top of each other. Fix it with `event.stopPropagation()` or a shared "one open context menu" registry.
- **P1** A ContextMenu inside another menu's `#menu` slot is teleported to `<body>`. Right-clicking there fires the outer menu's window listener and click-outside, so the outer menu closes under the user.
- **P1 [CODE]** Escape closes every ContextMenu instance and is not layer-aware. Your uncommitted change removed the `isTopLayer` guard. Inside a Modal, Escape closes both the menu and the Modal.
- **P1** There is no `role="menu"`, no arrow-key navigation and no focus move into the menu. Shift+F10 and the Menu key fire `contextmenu` with `clientX/Y = 0`, so the menu opens at the container's top-left corner. iOS Safari never fires `contextmenu`, so there is no long-press fallback.
- **P2** The anchor uses `client` coordinates minus the container rect. Inside a scrolled container, the absolute anchor is offset by `scrollTop` and `scrollLeft`. The 16px offset places the menu below the cursor, while native menus open at the cursor.
- **P2** There is no `disabled` prop to keep the native menu. Items do not auto-close the menu. The comment `// Close when user` at `ContextMenu.vue:34` is unfinished.
- Note: jsdom cannot open even a single ContextMenu, so the nested case is reported from reading the code. Please confirm it in a browser.

### CopyClipboard
- **P1** `span role="button"` has no `tabindex` and no key handler, so keyboard users cannot activate it. Wrapping a Button inside it nests interactive roles. "Copied" is not announced through `aria-live`.
- **P2** There is no legacy fallback when `isSupported` is false, for example on plain HTTP. VueUse supports `legacy: true`. Copy errors are not handled. The component has two root nodes, so a `class` attribute triggers an attribute fall-through warning.

### Divider
- **P3** A vertical divider requires `height` and cannot stretch to its parent. It has no `aria-orientation`.

### Drawer
- **P1 [CODE]** `close` is emitted twice per dismissal, once from `@close` and once from `@update:open` (`Drawer.vue:228-229`).
- **P1** `title` is optional, so drawers can have no accessible name. Dropdown's mobile Drawer passes no title, which causes Reka "missing DialogTitle" warnings. `DrawerTitle :name` is not a real prop.
- **P2** The overlay does not receive the layer z-index. A Drawer opened above a Modal leaves the Modal undimmed. There is no `v-model:open`.
- **P2** The drawer is not anchored above the mobile keyboard, which is open issue #196. There is no `env(safe-area-inset-bottom)`, which is open issue #229.

### Dropdown / DropdownItem / DropdownTitle
- **P0 [CODE]** DropdownItem has no `type="button"`, so menus inside forms submit them.
- **P1** There is no `role="menu"` or `menuitem`, no arrow, Home, End or typeahead navigation, and no `aria-controls`. The trigger wrapper is a `span role="button"` around the user's real button, which nests interactive roles. `name="Dropdown menu"` is not a valid attribute on a span.
- **P1 [CODE]** `onPopoutFocusout` closes the menu and then focuses the trigger (`Dropdown.vue:99-114`). Clicking into another input on the page closes the dropdown and immediately steals focus back from that input. Select inherits this through `@close`.
- **P1** Escape uses global `useMagicKeys`. All open dropdowns close at once, and the Modal underneath closes too. Focus is not returned to the trigger on Escape.
- **P2** Nested menus built with PopoutHover, as the docs recommend: tabbing or clicking into the teleported submenu fires the outer menu's `focusout`, so the whole menu closes. There is no first-class submenu, checkbox item, radio item or separator.
- **P2** Items cannot opt out of auto-close. Auto-focus on open only finds `button` and `input` elements, not links. DropdownItem has no `href` or `as` support. The component has two root nodes.

### EmojiPicker
- **P1** The search `<label for="emoji-search">` points at an input that only has `name`, not `id`, so the label is not associated (`EmojiPicker.vue:260-261`). The placeholder has a typo, "Seach".
- **P1** Data is fetched from a CDN at runtime with no error or loading state (`EmojiPicker.vue:55-97`). It fails under strict CSP, offline, or with privacy-related blocking, and the picker silently stays empty. The `en` locale is hard-coded.
- **P2** About 1,800 buttons render without virtualization or grid keyboard navigation. Buttons have no `type` and no `aria-label`. There is no skin-tone support. Empty search results show headers over empty grids. Escape in search also bubbles up and closes the parent Dropdown or Modal. An empty `recent` array still shows the "Frequently Used" header. The component steals focus on mount.
- Open issue #225, EmojiPicker v2, should absorb these fixes.

### Flex / Grid
- **P0 [TESTED]** Grid numeric `rows` is broken, as described in the summary.
- **P1** Grid `xBetween` sets `justify-items: space-between`, which is invalid, so the prop does nothing (`Grid.vue:109-110`).
- **P3** There is no `as` or tag prop to render `ul`, `nav` or `section`. The gap scale omits `xxxs`.

### Indicator
- **P2** Status is conveyed by colour only, with no screen-reader text. The default class is `position-undefined`.

### Input / Password / Textarea / Counter / File / Dropzone
- **P0 [TESTED]** `name="id"` is hard-coded, and attributes fall through to the wrapper.
- **P0 [TESTED]** `limit` desyncs the DOM. Use native `maxlength` instead. `max` is wrongly set to `limit` on text inputs and on the textarea.
- **P1** On `type="number"`, `limit` acts as a maximum value but is displayed as "42/100". `focus` re-focuses every time it becomes true, not only on mount as documented.
- **P1 [CODE]** Counter buttons ignore `min` and `max`. Clearing the field and pressing `+` concatenates strings, so `''` becomes `"1"` and then `"11"`. The buttons have no `aria-label` and submit forms. Floating-point steps accumulate rounding errors.
- **P1** Password `autocomplete="off"` is wrong and lands on the wrapper anyway. The reveal toggle has no `aria-pressed`.
- **P1 [CODE]** Dropzone ignores `accept`, `multiple`, `disabled` and `required`, because the replaced `<input type="file">` never receives them. `dragging` only resets on `mouseleave`, so "Drop it" sticks after a drop. Dropped files bypass `accept`. Selecting the same file twice does not re-emit.
- **P2** Textarea declares `autoResize` but never implements it. It has no `start` or `end` slots, which the docs list. There is no clearable input, no `step`, and no `size` prop on Input.

### Kbd / KbdGroup
- **P1** Kbd registers a new nested `whenever` every time `keys` changes (`Kbd.vue:32-36`). Old shortcuts keep firing. Triggers fire while the user types in text fields.
- **P2** `highlight` checks `current.has('ctrl')`, but VueUse stores `control`, so "Ctrl+A" never highlights. **[PLAUSIBLE]**
- **P2** KbdGroup computes its combo once at setup, so it is not reactive. It renders no wrapper, so the docs' claim that it visually distinguishes keys is false. There is no Mac formatting such as ⌘ or ⌥.

### Marquee
- **P1** There is no pause on hover or focus, which WCAG 2.2.2 "Pause, Stop, Hide" requires. Links in the `aria-hidden` duplicate copy are still tabbable and should be `inert`.
- **P3** Content narrower than the container leaves a visible gap.

### Menubar / MenuItem
- **P1** The trigger is a clickable `div`. There is no `role="menubar"` or `menuitem` and no arrow-key navigation between menus. Escape does not close menus. Items do not close the menu after a click.
- **P2** Using MenuItem outside Menubar crashes with an unhelpful error from `inject(...)!`. Registered indices never decrement.

### Modal / Confirm
- **P0 [TESTED]** Confirm's `title` and `content` are not rendered and leak as HTML attributes.
- **P1** It lacks dialog semantics and focus management, as described in section 2.2. The close button has no name.
- **P1** Confirm emits `close` but not `cancel` when dismissed with Escape or a backdrop click.
- **P2** There is no `v-model:open`. The backdrop does not animate. Fullscreen mode uses `100vh`, which is open issue #231.

### OTP / OTPItem
- **P1 [CODE]** The `complete` event is declared and documented but never emitted.
- **P1 [PLAUSIBLE]** On Android with Gboard, `keydown.key` is usually `"Unidentified"`, and the input handler skips `insertText`. Typing on Android likely does nothing. Please test on a device.
- **P2** `maxLen` grows on every OTPItem setup and never shrinks (`OTP.vue:49`). Remounting items, for example with `v-if` or HMR, allows extra characters. There is no `length` prop. The string-keyed `provide('otp-context')` can collide. The input has no `aria-label`, and there are no disabled or error states.

### Overflow
- **P2** Shadows do not update when content resizes, only on scroll. The scroll container is not focusable, which fails the axe rule `scrollable-region-focusable`.

### Pagination / `paginate`
- **P0 [TESTED]** The `maxPages` edge cases, the inverted slot prop and the empty-dataset case are described in the summary. "First page" is disabled whenever `currentPage === startPage`, but `startPage` is the first *visible* page, not page 1.
- **P1** It has no `<nav aria-label>` or `aria-current="page"`. Icon buttons have no accessible names, because the tooltips are hover-only.
- **P1 [CODE]** The `variant` prop is declared and documented but unused (`Pagination.vue:73` hard-codes `gray`).
- **P2** There is no ellipsis or boundary pages, as in "1 … 4 5 6 … 20".

### Popout / PopoutHover
- **P1 [CODE]** `placement` and `offset` are passed once to `useFloating` (`Popout.vue:68-78`), so changing them later has no effect. There is no `size` middleware, so Select's menu does not match the trigger width. There is no arrow support.
- **P1** PopoutHover sets `@focusout="setVisibility(false)"` on the popout (`PopoutHover.vue:89`). Tabbing between two links inside the hover card closes it. Escape cannot dismiss it, which WCAG 1.4.13 requires. `aria-haspopup` sits on the wrapper span instead of the focusable child.
- **P2** PopoutHover forces `tabindex="0"` onto the user's first child (`PopoutHover.vue:53-61`). That overrides an explicit `tabindex="-1"` and is not re-applied when the slot changes. Enter and leave timers are not cleared on unmount.

### Progress
- **P1** There is no `role="progressbar"` and no `aria-valuenow` or `aria-valuemin` / `aria-valuemax`. The docs claim an indeterminate state, but it does not exist.
- **P2** The `fake` loop starts twice if `fake` toggles quickly, from both `whenever` and `onMounted`. It keeps running after unmount.

### Radio / RadioGroup
- **P1** Radios have no `name`, so the browser does not group them. Arrow keys do not move between options, and Tab stops on every radio instead of once per group.
- **P1 [CODE]** RadioGroup `disabled` only adds a class (`RadioGroup.vue:32`). The inputs stay enabled. `<fieldset :disabled>` would fix this natively. The fieldset has no `legend` and no `label` prop.
- **P3** Keying by `value` breaks for object values.

### Resizable / ResizableView
- **P1** Handles are bare `<button>` elements with no `role="separator"`, `aria-valuenow`, `aria-orientation` or label. They respond to mouse only, so touch devices cannot resize.
- **P2** Per-panel min and max are not supported; this is still a TODO in the code. There are no `v-model` sizes. Only the dragged panel gets `pointer-events: none`, so an iframe in the neighbouring panel swallows drag events. Window listeners leak if the component unmounts mid-drag.
- **P1 [CODE]** In ResizableView, a top or bottom split of a panel at depth 3 wraps it into a depth-4 group (`ResizableView.vue:242-289`). The template only renders three levels, so `ViewPanel` receives an array as `panel` and crashes.
- **P2** ResizableView mutates the parent's model arrays in place and adds `id` fields to user data without emitting `update:modelValue`. The content drop-zone counter drifts with arbitrary slot content, which can leave the overlay stuck. It has no keyboard alternative to drag and drop. **[PLAUSIBLE]**
- **P3** ResizableView has no documentation page.

### Select
- **P0 [CODE]** The trigger `<button>` has no `type`, so it submits forms. A Button is nested inside a `<button>` for the clear control.
- **P1** It lacks listbox semantics, keyboard navigation and typeahead. There is no `aria-describedby`, `aria-invalid` or `aria-required`.
- **P1 [CODE]** The model is mutated with `selected.value.push(option)` (`Select.vue:104`). The parent's array changes in place without an update event, so shallow watchers miss it. Readonly or store-backed arrays break.
- **P1 [CODE]** The clear button still shows in `readonly` mode, despite the warning saying it will not. The warning text also mentions `required` instead of `readonly`.
- **P2** The model is always `SelectOption[]`, even in single mode. Every major design system uses a scalar value for single and an array for multiple. Object values collide in keys (`:key="option.value"`) and compare by reference.
- **P2** There are no disabled options, groups, option slot, async loading or creatable options. Search is not cleared on close. Selection is shown by class only.
- **P3** The class name has a typo, `vue-select-no-results`.

### Sheet
- **P1** It lacks dialog semantics, as for Modal.
- **P2** `size` is ignored for top and bottom positions, although the docs say it sets the height.

### Sidebar
- **P1** `appear` is mouse-only. There is no keyboard or touch path. The floating sidebar has no Escape or focus handling. The `aside` has no `aria-label`.
- **P2 [PLAUSIBLE]** With `float`, clicking an external toggle button while the sidebar is open runs click-outside first, closing it, and then the toggle reopens it.
- **P2** `useMouseInElement` keeps a global mousemove listener for every sidebar even without `appear`. `parseFloat(offset)` yields `NaN` widths when the CSS variable is missing. Height uses `100vh`.

### Skeleton
- **P1 [CODE]** A `circle` with only `height` set renders `100%` × `100%`, because `width` defaults to `'100%'` and is always truthy (`Skeleton.vue:31-32`).
- **P2** There is no `aria-hidden` or `aria-busy` guidance. Confirm that the pulse animation respects reduced motion.

### Slider
- **P0 [TESTED]** An uninitialised model produces `NaN`.
- **P2** When both range handles sit at the maximum, the start handle is covered and cannot be grabbed. There is no PageUp or PageDown, no `aria-valuetext`, no vertical orientation and no RTL. `min === max` divides by zero.
- **P2** `round = true` with a fractional range, such as 0 to 1, collapses to 0 and 1. There is no `change` event on commit and no hidden input for forms.

### Spinner
- **P1** It has no `role="status"` or accessible "Loading" label.
- **P3** `:class="{ size }"` adds a literal class named `size`.

### Switch
- **P1** It uses `type="checkbox"` without `role="switch"`, so screen readers announce a checkbox. `hint` is not linked through `aria-describedby`.

### Table
- **P0 [TESTED]** Sorting is broken.
- **P0 [TESTED]** The `selecting` class is always applied.
- **P1 [TESTED]** `isSelectedAll` is true for an empty dataset. Partial pagination options replace the defaults wholesale. `{ pagination: { enabled: true } }` leaves `perPage` undefined, so it falls back to 15, while the docs say 10.
- **P1** `setPage` lets you jump to any page past the end. The current page is not clamped when search shrinks the data, which leaves an empty page.
- **P1** The sort comparator never returns 0 and is not locale-aware. Nulls, mixed types and strings sort inconsistently. Search stringifies nested objects to `[object Object]`.
- **P1** Two `defineTable` calls in one component share one `provide`, so the second table controls selection for both. `Table.Root` used without `defineTable` crashes on an `inject` that has no default.
- **P2** "Select all" ignores the search filter. Stale selections remain when rows disappear. There is no indeterminate state for partial selection.
- **P2** Headers have no `aria-sort`. Sort and select buttons have no labels or `aria-checked`. `Cell` measures its context width once and never on resize.

### Tabs / Tab
- **P0 [TESTED]** A `v-if` child crashes the component.
- **P1** There is no `aria-selected`, no roving `tabindex`, no arrow, Home or End keys, and no `aria-controls` or tab panel component. Tab has no `type`.
- **P1 [CODE]** A disabled Tab only gets a class. It stays clickable and becomes active.
- **P2** The underline is hidden when the active value is falsy, such as `''` or `0`. `:name` on a button is meaningless.

### Toast / Toasts
- **P1** There is no `aria-live="polite"` or `role="status"` region, so toasts are invisible to screen readers. There is no close button, even for `persist: true`. There is no pause-on-hover, which WCAG 2.2.1 "Timing Adjustable" requires.
- **P2** There are no variants such as success, error or warning, no `updateToast`, no promise toast and no maximum stack size. The action does not auto-dismiss its toast. A custom `body` must render an `<li>` to be valid inside the list, which is undocumented. `removeToast` does not clear the pending timer.

### Tooltip
- **P1** It opens on mouse only. Keyboard users never see tooltips, which fails WCAG 1.4.13 and 2.1.1. There is no Escape to dismiss. There is no `role="tooltip"`. `aria-describedby` sits on a `display: contents` wrapper, not the focusable trigger, and points to an element that only exists while visible.
- **P1** A visible tooltip blocks Escape for the Modal underneath, as described in section 2.2.
- **P2** Tooltips are disabled under 768px width instead of by pointer capability.

---

## 4. Documentation issues

Paths are relative to `docs/content/docs/`.

### Wrong or misleading API documentation
- **toast.md** never says `<Toasts />` must be mounted, so toasts never appear. The `Toasts` `placement` prop is undocumented. The custom-body example uses `h` without importing it. "Persist until manually dismissed" has no dismiss UI to back it.
- **confirm**, **ResizableView**, **theme** and **setColorTheme** are exported but have no documentation page.
- **checkbox.md** documents `checked` for "controlled usage", but it is broken. The example combines `v-model` with `checked`. The custom icons are swapped: `icon-on` shows "toggle left" and `icon-off` shows "toggle right fill".
- **tabs.md** documents a `label` prop on Tab that does not exist, so tabs render the raw value. Line 3 is cut off mid-word: "It supports two styl". `transitionName` is undocumented. The class `mt-md` does not exist.
- **dropdown.md** examples use `#icon-end`, but the real slot is `iconEnd`, and those examples render nothing. The DropdownItem slot table omits `icon` and `iconEnd`. The exposed `open`, `close`, `toggle` and `isOpen` are undocumented. The token default is 128px, but the prop default is 156. Typos: "Plese", "dropdopwn". `isOpen` is a boolean in the slot, not a `Ref`.
- **emoji-picker.md** does not document the required `recent` prop or `recentLabel`. The dropdown example uses a nonexistent `#content` slot and places the trigger in the default slot. Its `sourcePath` points to `EmojiPicker/EmojiPickerDropdown.vue`, which does not exist.
- **drawer.md** uses `v-model:open`, but Drawer only emits `close`. The parent stays `true` after a swipe-close. It says the drawer "slides in from the side" when it is a bottom drawer. It says `vaul-drawer-wrapper` is required, but the code only needs it for `shouldScaleBackground`. The class `p-md` does not exist.
- **calendar.md** lists defaults `autoPosition`, `format` and `monthNameFormat` that the code does not set. The code sets `formats: { input, month }`. Typo: "Vuil". `Flex` is imported but unused.
- **card.md** omits `centered`, `borderStyle` and `inline` from the props table, although the examples use them. The `headerAlign` default says `baseline` in the table and `center` in the tokens.
- **carousel.md** omits `disableDrag`. It does not warn that vertical wheel scrolling is hijacked.
- **commands.md** gives the placeholder default as `'Write a command..'`, but the code says `'Type a command..'`. Features claims search covers "group or href"; it covers title, description and keywords. Shortcuts are described as active "while open" in one place and "while mounted" in another. The custom slot example double-fires handlers, as noted in section 3. `Switch` is used without an import, and `isCompact` is never passed.
- **otp.md** documents a `complete` event that is never emitted.
- **radio.md** documents a `change` event that Radio never emits. RadioGroup `disabled` is documented as disabling all radios, which it does not.
- **pagination.md** documents `variant`, which is unused. The `start` and `end` slots and the prev/next slot props are undocumented, and the slot `disabled` is inverted. The custom example uses `items.slice(startIndex, endIndex)`, but `endIndex` is inclusive, so the last item of every page is dropped. `paginate` is called a "composable" but is a pure function.
- **table.md** says sorting works, but it is broken. The main example renders `<Table.SelectRow>` twice, adding an extra column. `deselectAllArows` is a typo for `deselectAllRows`. The options default `perPage: 10` only applies if you pass no pagination object.
- **textarea.md** documents `autoResize`, which is not implemented, and `start` / `end` slots, which do not exist. Typo: "row cou". `hint` is described as "below", but it renders above the field.
- **input.md** says `hint` is "displayed below the input", but it renders between the label and the input. `focus` is described as "when mounted", but it fires every time it becomes true. `limit` behaviour on number inputs is undocumented.
- **sheet.md** says `size` sets the height for top and bottom positions, which it does not. `canDismiss` and `hideCloseButton` are missing.
- **sidebar.md** swaps the descriptions of `appear` and `float`. `appearDelay` is missing. `SidebarExpose` claims `Ref`s and a `width` field; the values are plain, `width` does not exist, and `noAutoTransform` is typed `Ref<number>`. The first example uses `<script>` without `setup`, so it does not run. `Avatar` is not imported. Typo: `x-centerd`. The example token `--vui-sidebar-width-full` differs from the documented `--vui-sidebar-width`.
- **modal.md** lists `xs` and `xl` sizes, which do not exist. `vuiBreakpoints` should be `breakpoints`. There is a `<Flex>` / `</flex>` closing-tag mismatch.
- **progress.md** claims indeterminate support. The button labelled "Add 16%" adds 25. A stray "``" follows `</Flex>`. The token colour default differs from the prop default.
- **popout.md** binds `anchorRef` to nothing, so the example has no anchor. The `el` and `layerIndex` exposes are undocumented.
- **slider.md** omits the `disabled` and `label` props.
- **color.md** says Color "inherits slots and events" from Input, but the input is replaced and outer label association breaks.
- **dropzone.md** says it accepts Input props like `accept` and `multiple`, which are ignored.
- **file.md** uses `v-model="files"`, but File has no model; use the `files` event.
- **charts.md** says `gap` accepts a number, but the type is `Spaces` only.
- **divider.md** says `height` defaults to `100%`, but the types require it when `vertical` is set.
- **button.md** says `loading` "disables the button", but it sets `inert`, which is different for focus. The token padding default `var(--space-xs)` differs from the code's `10px`.
- **badge.md** gives the height token default as 24px; the code uses 26px.
- **avatar.md** gives the radius token default as 100%; the code uses pill. The unused `icon` prop is not mentioned.
- **kbd.md** example uses `ref` without importing it. It claims KbdGroup visually groups keys, but it renders no wrapper.
- **breadcrumbs.md** omits the `separator` slot and the click-handler button mode. The custom content example does not import `Flex` or the icons.
- **accordion.md** omits the `header` slot. `Ref<boolean` is missing a `>`. "whether the boolean is open" should say the accordion. "vu3" should be "Vue 3".
- **tooltip.md** uses `enter-delay="500"`, which passes a string, instead of `:enter-delay="500"`. The placement description says "dropdown". The icon example is not keyboard reachable.

### Typos and copy-paste errors
- "Plese" appears in context-menu.md, dropdown.md, popout.md and tooltip.md.
- password.md line 37 reads "The Color component inherits…", copied from color.md.
- marquee.md says `prefer-reduced-motion`; the media feature is `prefers-reduced-motion`.
- installation.md says "stylsheet".
- alert.md uses `<Button variant="warning" size="sm">`. Neither the variant nor the size exists; use `size="s"`.
- button-group.md puts `:gap="2"` on a Button instead of the ButtonGroup. It uses a nonexistent `active` prop. `IconTextBBold` duplicates `IconTextBold`.
- toast.md and tabs.md use classes `flex gap-md` and `mt-md`, which are not VUI utilities.
- accordion-group.md shows the default `false` without code formatting. copy-clipboard.md mixes `##` and `###` heading levels.
- Many examples use `<Icon name="ph:…">` and `Icon*` components without saying they come from Nuxt Icon or `@iconify-prerendered/vue-ph` and are not VUI exports.

### Claims to soften until fixed
- installation.md calls VUI "accessible". Most composite widgets are not yet, as shown in section 3.
- installation.md says "supports treeshaking". The bundle is one file with import-time side effects (theme and viewport) and a global CSS import, so this claim is only partly true.

---

## 5. Cross-check with open GitHub issues

There are six open issues, fetched on 2026-10-07.

| Issue | Status vs this audit |
|-------|----------------------|
| #231 Modal UI anchored and resized on `dvh` | **Confirmed and extended.** `modal.scss:42` and `sidebar.scss:5` still use `100vh`. Backdrop relies on `height: 100%`. The scroll lock is CSS-only, as noted in section 2.2. |
| #229 `env-safe-area` for floating UI | **Confirmed.** There are no `safe-area-inset` usages anywhere in `src`. It affects Toasts, Drawer, Sheet, the fullscreen Modal, and Popout `shift({ padding: 8 })`. |
| #227 `VuiThemeSample` component | Not a defect. It would pair well with fixing the resolved-theme API in section 2.4. |
| #225 EmojiPicker v2 | **Related.** Fold in the EmojiPicker findings: label association, CDN error state, virtualization, keyboard grid, Escape bubbling and i18n. |
| #196 Drawer not anchored above the mobile keyboard | **Root cause found for half of it.** The report says the Commands input "gets focus for some reason". `Commands.vue:243` has a hard-coded `autofocus` attribute that bypasses the `viewport.s` guard in `resetSearch`. The keyboard-anchoring half is still open. |
| #123 Use CSS layers | **Strongly supported.** Global root font-size, the `*` outline reset and the full reset leak into host apps, as described in section 2.5. |

None of the P0 bugs in section 1 are tracked in the issue list today.

---

## 6. Suggested fix order

1. **Low-effort P0 fixes**, each one to five lines:
   - Default `type="button"` in Button and all raw buttons.
   - Change `name="id"` to an optional `name` prop.
   - Add `inheritAttrs: false` and bind `$attrs` onto the native control.
   - Use `maxlength` for `limit`.
   - Use `ref` and reassignment for Table sorting.
   - Unwrap `selecting.enabled`.
   - Fix Grid rows, Avatar radius and the Pagination bounds against 1 and `totalPages`.
   - Fix the Checkbox `checked` prop.
   - Render Confirm's `title` and `content`.
   - Handle a NaN model in Slider.
   - Guard against empty results in Commands and clamp `focusedIndex`.
   - Stop `contextmenu` propagation.
   - Emit OTP `complete`.
2. **Slot registration.** Replace `useFlattenedSlot` and `enforceSlotType` with provide/inject registration in Tabs, AccordionGroup, RadioGroup, Breadcrumbs and KbdGroup. This removes the crash class and the wrapper-flattening bugs.
3. **One overlay foundation.** Build a layer-aware Escape, focus trap and restore, and dialog roles. The fastest route is to build Modal, Sheet, Dropdown, ContextMenu, Menubar, Popover, Tooltip, Select and Tabs on Reka UI primitives, which are already a transitive dependency.
4. **CSS layers and opt-in globals**, from issue #123. Add `safe-area` and `dvh`, from issues #229 and #231.
5. **Feature gaps:**
   - Checkbox indeterminate state
   - Toast variants with a live region
   - Scalar `v-model` for single Select
   - Router-link support in Button, Breadcrumb and DropdownItem
   - `v-model:open` on Modal, Sheet, Drawer and Accordion
   - Pagination ellipsis
   - i18n strings through props or a provide-based locale
6. **Tests.** Only Switch and AccordionGroup have tests today. Each P0 in section 1 is a ready-made regression test.
