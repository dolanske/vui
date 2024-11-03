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

- [ ] Date picker
- [ ] Command dropdown
- [ ] Carousel (slider)
- [ ] CodeBlock
  - [ ] Code highlighting
  - [ ] Copy code
  - [ ] Type, padding, etc
- [ ] Input Slider
- [x] Number field (+ and -)
  - [x] This could be implemented once Input improvements are in
- [x] Input improvements
  - [x] Errors slot (border is red (maybe) and render red text before "after" slot). Prop is string[]
  - [x] Prefix / suffix slots. Allow non-editable text/slots "within" the input component. This will require some styling changes as the input element itself cant use the border anymore
- [ ] InputOTP
  - [ ] Wrapper
  - [ ] Slot

- [ ] File input
  - [ ] Dropzone
- [ ] Breadcrumbs
  - [x] Basic version
  - [ ] Depends on <Popout /> for consolidated path sections
  - [ ] Depends on <DropdownItem />
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

#### Pre-built components

- [ ] Confirm dialog
  - [ ] 4 props (title, description, onCancel, onOk)
- [ ] Input Password
  - [ ] Wrapper around input with an eye icon which changes type to text

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
  - Assign font to variable in fact

- [ ]

## Final todo

- [ ] Move style attribute assignments to scoped style element instead (flex, grid etc)
- [ ] Add generic outline
- [ ] Accessibility test
- [ ] Document how to
  - [ ] Set up fonts for the library (global and global mono)
  - [ ] Document how to set up --color-accent

- [ ] Make sure all components have their variables localized so that they can be changed on a component level
- [ ] Easily change up fonts
- [ ] Create documentation site
