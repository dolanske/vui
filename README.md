# VUI

1. `npm i @dolanske/vui`
2. In your main app entry, `import "@dolanske/vui/style"` to import the global CSS
3. Override default style [tokens](https://dolanske.github.io/vui/docs/tokens) to fit your style
4. Build your thing bro

## Documentation

[Visit the docs here](https://dolanske.github.io/vui/)

## Contributing

This repository is split into two packages: the library itself in `src/` and the documentation in `docs/`. The docs are built with [VitePress](https://vitepress.dev/) and are hosted on GitHub Pages.

### Setup

```sh
# Install library dependencies
npm install

# Install docs dependencies
cd docs && npm install && cd ..
```

### Development

To run the VUI playground locally, run:

```sh
npm run dev
```

To run the docs dev server, run:

```sh
npm run docs
```

> The docs dev server resolves `@dolanske/vui` directly from `src/`, so changes to components and styles hot-reload instantly without rebuilding the library first.
