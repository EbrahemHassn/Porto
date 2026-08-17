// Three.js Interactive Particle Background
class HeroScene {
  constructor() {
    this.canvas = document.getElementById("three-canvas");
    if (!this.canvas) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });

    this.particles = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;

    this.init();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Responsive particle count
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 400 : 1200;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorAccent = new THREE.Color(0x00e5ff); // Accent Teal
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      const mixedColor = Math.random() > 0.5 ? colorAccent : colorWhite;
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.02 : 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    this.camera.position.z = 3;

    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("resize", () => this.onWindowResize());

    this.animate();
  }

  onMouseMove(e) {
    this.mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    this.mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.targetX += (this.mouseX - this.targetX) * 0.05;
    this.targetY += (this.mouseY - this.targetY) * 0.05;

    if (this.particles) {
      this.particles.rotation.y += 0.001;
      this.particles.rotation.x += 0.0005;

      this.particles.rotation.y +=
        (this.targetX - this.particles.rotation.y) * 0.05;
      this.particles.rotation.x +=
        (-this.targetY - this.particles.rotation.x) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
