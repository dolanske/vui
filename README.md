# VUI

1. `npm i @dolanske/vui`
2. In your main app entry,`import "@dolanske/vui/style` to import the global CSS
3. Build your thing bro

---

## 1.0 Checklist

- [x] Move style attribute assignments to scoped style element instead (flex, grid etc)
  - [x] >>test<<
  - [x] Button
  - [x] Divider
  - [x] Drawer
  - [x] Dropdown
  - [x] Textarea
  - [x] Progress
  - [x] Sheet
  - [x] Skeleton
  - [x] Spinner
- [ ] Normalize all props that expect pixels/size to expect number + string
- [ ] Make sure all components have their variables localized so that they can be changed on a component level (ugh what a bother)
- [ ] Make one more test if inline styles vs CSS variables are better
- [ ] Real life test
  - [ ] Might be useful to build this in the hivecom project
  - [ ] Build an example page with 100% of the components
  - [ ] Run accessibility tools on it
  - [ ] Run color contrast test
  - [ ] Make sure it works on mobile down to 340px
    - [ ] Components
    - [ ] Scale down Typography
---

### Post 1.0 components

- [x] Add Accordion style "card" to match styling of card (hoverable header + border under header with border around the whole thing)
- [ ] Carousel (slider)
- [x] InputOTP
  - [x] Wrapper
  - [x] Slot
  - [x] Fix not working with components inbetween??
  - [x] Paste
- [ ] CodeBlock
  - [ ] Code highlighting
  - [ ] Copy code
  - [ ] Type, padding, etc
- [ ] Command dropdown

- [ ] Documentation
  - [ ] Design my own documentation site (GENERIC?!)
  - [ ] Pages
    - [ ] CSS variable setup, accent, fonts
    - [ ] CSS helpers
    - [ ] Components
    - [ ] Typography page
