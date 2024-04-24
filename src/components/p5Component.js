import { useEffect } from 'react';
//import p5 from 'p5';

const P5Component = () => {
    useEffect(() => {

        const p5 = require('p5');
        const Sketch = (p5) => {
            let angleOffsets = [];
            let angleVelocities = [];
            const textContent = "UI*GENERATOR";
            let colors = [];
            let noiseOffsets = [];
            let currentLetterIndex = 0;
            let rotationCompleted = 0;
            let letterSpacing; // Variable to control spacing between letters

            p5.setup = () => {
                p5.createCanvas(p5.windowWidth, 200);
                p5.textFont('Helvetica');
                p5.textAlign(p5.CENTER, p5.CENTER);
                letterSpacing = p5.width / (textContent.length * 1.3); // Update spacing when resized
                p5.textSize(p5.width / 15); // Adjust font size when window is resized

                // Initialize angles, velocities, noise offsets
                for (let i = 0; i < textContent.length; i++) {
                    angleOffsets.push(0);
                    angleVelocities.push(0.03); // Constant velocity for all to rotate 360 smoothly
                    colors.push(p5.color(0)); // Initialize with any color
                    noiseOffsets.push(p5.random(1000)); // Initialize noise offset
                }
            };

            p5.draw = () => {
                p5.clear();
                for (let i = 0; i < textContent.length; i++) {
                    const x = p5.width / 2 + (i - textContent.length / 2) * letterSpacing;
                    const y = p5.height / 2;
                    p5.push();
                    p5.translate(x, y);
                    if (i === currentLetterIndex && rotationCompleted < p5.TWO_PI) {
                        angleOffsets[i] += angleVelocities[i];
                        rotationCompleted += angleVelocities[i];
                    }
                    p5.rotate(angleOffsets[i]);
                    // Update colors using noise
                    let r = p5.noise(noiseOffsets[i]) * 255 / 5;
                    let g = p5.noise(noiseOffsets[i] + 10) * 255 / 2;
                    let b = p5.noise(noiseOffsets[i]) * 250;
                    p5.fill(r, g, b);
                    p5.text(textContent.charAt(i), 0, 0);
                    p5.pop();
                    // Increment noise offset for smooth color change
                    noiseOffsets[i] += 0.01;
                }
                // Check if the current letter has finished rotating
                if (rotationCompleted >= p5.TWO_PI) {
                    currentLetterIndex++;
                    rotationCompleted = 0; // Reset rotation progress
                    if (currentLetterIndex >= textContent.length) {
                        currentLetterIndex = 0; // Optionally stop or restart the process
                    }
                }
            };

            p5.windowResized = () => {
                p5.resizeCanvas(p5.windowWidth, 200);
                letterSpacing = p5.width / (textContent.length * 2); // Update spacing when resized
                p5.textSize(p5.width / 15); // Adjust font size when window is resized
            };
        };

        let myP5 = new p5(Sketch);

        return () => {
            myP5.remove();
        };

    }, []);

    return <div id="p5-canvas" />;;
};

export default P5Component;


