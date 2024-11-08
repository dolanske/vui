# VUI

Opinionated vue UI library for building personal applications. Completely from scratch (besides some libraries later on ig xd).

## Bugs

- [x] Before confirm dialog, remove header-end from modal and make close button absolute to pright, completely not-use header-end for modal

#### Components

- [ ] Input Slider
  - [ ] Just style normal input slider
- [ ] Breadcrumbs
  - [x] Basic version
  - [ ] Depends on <Popout /> for consolidated path sections
  - [ ] Depends on <DropdownItem />
- [x] File input
  - [x] Style normal input
  - [x] Dropzone (its own component)
- [x] Confirm dialog
  - [x] 4 props (title, description, onCancel, onOk)
  - [x] description is a slot
- [x] Date picker
- [x] Input Password
  - [x] Wrapper around input with an eye icon which changes type to text
- [x] Number field (+ and -)
  - [x] This could be implemented once Input improvements are in
- [x] Input improvements
  - [x] Errors slot (border is red (maybe) and render red text before "after" slot). Prop is string[]
  - [x] Prefix / suffix slots. Allow non-editable text/slots "within" the input component. This will require some styling changes as the input element itself cant use the border anymore
- [x] Progress Bar
- [x] Skeleton
- [x] Button
  - [x] Add `accent` button variant
- [x] ButtonGroup
  - [x] Merges buttons together vertically or horizontally (merged border radius etc)
- [x] Toast
- [x] Grid
- [x] Flex
- [x] Input
- [x] Switch (like iOS)
- [x] Radio button group
- [x] Tabs
  - [x] Filled
- [x] Card
- [x] Textarea
  - [x] Autoexpand
- [x] Modal
- [x] Checkbox
- [x] Select
  - [x] Depends on <Dropdown />
  - [x] Single select
  - [x] Multiselect
  - [x] With search
  - [x] Clearing
- [x] Accordion
- [x] Alert
- [x] Divider
- [x] Badge
- [x] Avatar
- [x] Content - It's a class called `.article` (can also use the <article /> HTML element)
- [x] Copy clipboard button
  - [x] Renderless component consuming button props + copy prop
  - [x] Copied text ()
- [x] Kbd
  - [x] Option to highlight if key is pressed
- [x] Sheet
  - [x] Size
  - [x] Location
- [x] Tooltip
  - [x] Custom placement
  - [x] Show up delay
- [x] Dropdown
  - [x] Dropdown itme
  - [x] Dropdown title
- [x] Table
  - [x] Header & sorting
  - [X] Pagination
  - [x] Row select
  - [x] Reactive options (ability to alter functionality without having to re-render whole table)
  - [x] Interactivity
- [x] Drawer
- [x] Pagination
- [x] Popout (https://floating-ui.com/)
  - [x] Anchoring to a Component or element

## 1.0 Checklist
- [ ] Figure out how to set up any font
  - Assign font to variable in fact
- [ ] Add condensed typescale (reduce space between elements)
- [ ] Tweak all colors
- [ ] Tweak all spacing
- [ ] Move style attribute assignments to scoped style element instead (flex, grid etc)
- [ ] Add generic outline
- [ ] Accessibility test
- [ ] Document how to
  - [ ] Set up fonts for the library (global and global mono)
  - [ ] Document how to set up --color-accent
- [ ] If something interactive is disabled, add disabled cursor
- [ ] Make sure all components have their variables localized so that they can be changed on a component level
- [ ] Easily change up fonts
- [ ] Create documentation site

---

### Post 1.0 components

- [ ] Carousel (slider)
- [ ] InputOTP
  - [ ] Wrapper
  - [ ] Slot
- [ ] CodeBlock
  - [ ] Code highlighting
  - [ ] Copy code
  - [ ] Type, padding, etc
- [ ] Command dropdown
