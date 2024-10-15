const solarSystem = document.getElementById('solar-system');
const orbits = document.querySelectorAll('.orbit');
const planets = document.querySelectorAll('.planet');

// Relative rotation speeds of the planets (faster planets have higher values)
const rotationSpeeds = {
    mercury: 4.74, // fastest
    venus: 3.50,
    earth: 2.98,
    mars: 2.41,
    jupiter: 1.31,
    saturn: 1.97,
    uranus: 0.68,
    neptune: 0.54 // slowest
};

function animateOrbits() {
    orbits.forEach((orbit) => {
        const planetClass = orbit.querySelector('.planet').classList[1];
        const rotationSpeed = rotationSpeeds[planetClass];
        let angle = 0;

        function rotate() {
            angle += rotationSpeed * 0.11; // Adjust speed factor for smoother animation
            orbit.style.transform = `rotate(${angle}deg)`;
            requestAnimationFrame(rotate);
        }

        rotate();
    });
}

function rotatePlanets() {
    planets.forEach((planet) => {
        let spinAngle = 0;
        
        function spin() {
            spinAngle += 0.11; // Adjust speed factor for smoother animation
            planet.style.transform = `rotate(${spinAngle}deg)`;
            requestAnimationFrame(spin);
        }

        spin();
    });
}

function animateMoons() {
    const moonOrbits = document.querySelectorAll('.moon-orbit');
    moonOrbits.forEach((moonOrbit) => {
        let angle = 0;
        function rotateMoon() {
            angle += 0.5; // Adjust speed factor for smoother animation
            moonOrbit.style.transform = `rotate(${angle}deg)`;
            requestAnimationFrame(rotateMoon);
        }
        rotateMoon();
    });
}

animateOrbits();
rotatePlanets();
animateMoons();

let zoomLevel = 1;
let rotateX = 0;
let rotateY = 0;
let startX = 0;
let startY = 0;
let isDragging = false;

document.addEventListener('wheel', (event) => {
    zoomLevel += event.deltaY * -0.01;
    zoomLevel = Math.min(Math.max(0.5, zoomLevel), 2);
    updateTransform();
});

document.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    event.preventDefault(); // Prevent text selection or other default behaviors
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        rotateY += deltaX * 0.11; // Adjust sensitivity as needed
        rotateX -= deltaY * 0.11; // Adjust sensitivity as needed
        startX = event.clientX;
        startY = event.clientY;
        updateTransform();
    }
});

function updateTransform() {
    solarSystem.style.transform = `scale(${zoomLevel}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    solarSystem.style.transformOrigin = 'center center';
}
