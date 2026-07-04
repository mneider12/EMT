# NREMT Scenario Trainer

An EMT (Emergency Medical Technician) Response Training Simulator built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
First, install all project dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
To run the application in development mode with Hot Module Replacement (HMR), run:

```bash
npm run dev
```
This will start the Vite development server. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`). Any changes you make to the source code will automatically reflect in the browser.

### Production Mode
To build the application for production, run:

```bash
npm run build
```
This command compiles the TypeScript code and bundles the React application into the `dist/` directory. The resulting files are heavily optimized and ready to be deployed to any static web host.

To test the production build locally before deploying, you can use the Vite preview command:

```bash
npm run preview
```
This will start a local web server that serves the compiled, optimized files directly from the `dist/` folder, allowing you to verify exactly what users will see in production.

## Linting
To run ESLint and check for code quality or styling issues across the project:
```bash
npm run lint
```
