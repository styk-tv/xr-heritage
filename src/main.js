import ForceGraph3D from '3d-force-graph';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';

// Add graph container to the body
document.body.style.margin = '0';
const graphDiv = document.createElement('div');
graphDiv.id = '3d-graph';
document.body.appendChild(graphDiv);

// Define a constant for link particle speed
const LINK_PARTICLE_SPEED = 0.005; // Pre-calculated value for all links

// Fetch JSON manually to validate its content before passing to ForceGraph3D
fetch('/poseidon_onto.json') // Updated fetch path to use root-level URL
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(text => {
    try {
      const data = JSON.parse(text);
      console.log('JSON data loaded successfully:', data);

      // Create the ForceGraph3D instance after JSON is successfully fetched
      const Graph = ForceGraph3D()(document.getElementById('3d-graph'))
        .graphData(data) // Use the data loaded from fetch
        .nodeAutoColorBy('group')
        .nodeThreeObject(node => {
          const sprite = new SpriteText(node.id);
          sprite.material.depthWrite = false; // make sprite background transparent
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        })
        .linkThreeObjectExtend(true)
        .linkThreeObject(link => {
          // Extend link with text sprite using the 'name' field from the link
          const sprite = new SpriteText(link.name);
          sprite.color = 'lightgrey';
          sprite.textHeight = 1.5;
          return sprite;
        })
        .linkPositionUpdate((sprite, { start, end }) => {
          const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 2 // Calculate middle point
          })));

          // Position sprite
          Object.assign(sprite.position, middlePos);
        })
        .linkDirectionalParticles(1)
        .linkDirectionalParticleSpeed(() => LINK_PARTICLE_SPEED);

      // Spread nodes a little wider
      Graph.d3Force('charge').strength(-120);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });

// Catch and log any promise errors
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
});
