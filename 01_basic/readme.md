# Three.js with Vite: 3D Cube
A simple Three.js project using Vite to create a 3D scene with a red cube, interactive camera controls, and smooth animations.
Three.js Basic Scene with OrbitControls
This project demonstrates a basic Three.js setup, including a 3D scene, a red cube, a perspective camera, and interactive camera controls using OrbitControls. It also includes a continuous rendering loop for smooth animations.

## Features
- **3D Scene**: A red cube in a Three.js scene.
- **Interactive Camera**: Use `OrbitControls` to rotate, zoom, and pan.
- **Auto-Rotation**: The camera automatically rotates around the scene.
- **Smooth Rendering**: A continuous loop ensures smooth animations.

## Prerequisites
- [Node.js](https://nodejs.org/en/download/) installed.


## Installation
1. Clone or download this repository.
2. Navigate to the project folder in your terminal.
3. Install dependencies:

   ```bash
   npm install
## Running the project
To start the development server, run the following command:

``` bash
npm run dev
```
This will start the server and open your default browser to your localhost. The site will reload automatically as you make changes to your code.

## Code Overview
### 1. Scene Setup
- A THREE.Scene is created to hold all 3D objects.

- A red cube is added to the scene using THREE.BoxGeometry and THREE.MeshBasicMaterial.

### 2. Camera Setup
- A THREE.PerspectiveCamera is initialized with:

- Field of View (FOV): 45

- Aspect Ratio: window.innerWidth / window.innerHeight

- Near and Far Clipping Planes: 0.1 and 200

- The camera is positioned at z = 5 to view the cube.

### 3. Renderer Setup
- A THREE.WebGLRenderer is linked to a `<canvas>` element in the HTML.
- The renderer size is set to match the window dimensions.

### 4. OrbitControls
- OrbitControls is used to enable interactive camera movement.

- Features:

  - Damping: Smoothens camera movements.

  - Auto-Rotation: Automatically rotates the camera around the scene.

### 5. Rendering Loop
- A continuous rendering loop is implemented using requestAnimationFrame.

- The loop updates the controls and re-renders the scene in each frame.

- HTML and CSS
The `<canvas>` element is used as the rendering target for Three.js.

- Basic CSS ensures the canvas fills the entire window without scrollbars.

```bash
    <canvas class="threejs"></canvas>
```

```bash 
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
    }

```


## Dependencies
- Three.js: A JavaScript 3D library.

- OrbitControls: A Three.js addon for interactive camera controls.


## License
This project is open-source and available under the MIT License.

