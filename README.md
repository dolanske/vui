# VUI

Opinionated vue UI library for building personal applications. Completely from scratch (besides some libraries later on ig xd).

## Bugs

- [ ] Tweak sizing spaces
  - xs: 4px
  - s: 8px
  - m: 16
  - l: 24
  - xl: 40

## TODO

#### Components

- [ ] Button
  - [ ] Add `accent` button variant
- [ ] ButtonGroup
  - [ ] Merges buttons together vertically or horizontally (merged border radius etc)
- [x] Checkbox
- [x] Toast
- [x] Grid
- [x] Flex
- [x] Input
- [x] Switch (like iOS)
- [x] Radio button group
- [x] Tabs
- [x] Card
- [x] Textarea
- [x] Modal
- [ ] Select
  - [ ] Depends on <Dropdown />
  - [ ] Single select
  - [ ] Multiselect
- [x] Accordion
- [ ] InputOTP
  - [ ] Wrapper
  - [ ] Slot
- [x] Alert
- [x] Divider
- [x] Badge
- [ ] Breadcrumbs
  - [x] Basic version
  - [ ] Depends on <Popout /> for consolidated path sections
  - [ ] Depends on <DropdownItem />
- [x] Avatar
- [ ] Skeleton
- [x] Content - It's a class called `.article` (can also use the <article /> HTML element)
- [ ] File input
  - [ ] Dropzone
- [ ] Scrollable
  - [ ] Set max width or height (or size of the parent)
  - [ ] Should work within card
- [ ] Kbd
  - [ ] Option to highlight if key is pressed
- [x] Sheet
  - [x] Size
  - [x] Location
- [x] Tooltip
  - [x] Custom placement
  - [x] Show up delay
- [x] Dropdown
  - [x] Dropdown itme
  - [x] Dropdown title

- [x] Popout (https://floating-ui.com/)
  - [x] Anchoring to a Component or element

- [ ] Confirm dialog
  - [ ] 4 props (title, description, onCancel, onOk)

#### Internal

- [x] Backdrop (darkens bg and goes over all content, on click event)
- [ ] Tweak all colors

#### Non-components

- [x] Typography (https://ui.shadcn.com/docs/components/typography#list)
  - [x] Headings h1, h2, h3, h4, h5, h6
  - [x] Text, links, u, i, b, s
  - [x] Blockquote
  - [x] Lists (ordered, unordered, sublists)
  - [x] Table

- [ ] Figure out how to set up any font

## Final todo

- [ ] Make sure all components have their variables localized so that they can be changed on a component level
- [ ] Easily change up fonts
- [ ] Create documentation site
