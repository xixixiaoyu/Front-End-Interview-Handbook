# Bundler Example (Using Vite)

This example demonstrates how a modern build tool like Vite uses the `esm-bundler` build of `my-library`.

Vite (and other bundlers like Webpack or Rollup when configured correctly) will typically pick the `module` field from the library's `package.json`, which points to `dist/my-library.esm-bundler.js`.

The key difference in the `-bundler` version is that `process.env.NODE_ENV` checks are preserved, allowing the bundler to perform dead-code elimination based on the build mode (development or production).

## How to Run

1.  Navigate to this directory: `cd bundler-example`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`
4.  Build for production: `npm run build`

Observe the browser console in development vs. the production build output to see how the `advancedFeature` warning is handled.
