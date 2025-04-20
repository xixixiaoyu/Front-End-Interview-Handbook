// bundler-example/main.js

// Import from the parent library.
// Vite (or other bundlers) will resolve this based on the 'module' field
// in 'build-formats-demo/package.json', which points to the esm-bundler build.
import { greet, advancedFeature } from 'build-formats-demo'

console.log('--- Bundler (Vite) Example ---')

// Use the imported functions
const message = greet('Vite User')

const p = document.createElement('p')
p.textContent = `Message from library: ${message}`
document.body.appendChild(p)

// Call the advanced feature
// In development mode (npm run dev), the warning from the library should appear.
// In production mode (after npm run build), the warning should be removed by Vite's dead-code elimination.
advancedFeature()

console.log('--- End Bundler Example ---')
