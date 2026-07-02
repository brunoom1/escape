/**
 * @module EscapeParticles
 * @version 1.0.0
 * @description Sistema de partículas procedurais (poeira, fogo, fumaça, etc.)
 *
 * API Pública:
 * - create(config) → particle system instance
 * - instance.update(dt) → atualiza partículas
 * - instance.render(ctx) → desenha partículas no canvas
 * - instance.emit(count) → emite N partículas
 * - instance.clear() → remove todas
 *
 * Uso:
 * const dust = EscapeParticles.create({
 *   x: 0, y: 0, width: 900, height: 600,
 *   color: 'rgba(200,180,150,0.3)', count: 30,
 *   speedX: [-5, 5], speedY: [-10, -2], size: [1, 3], life: [4, 10]
 * });
 * // No game loop:
 * dust.update(dt);
 * dust.render(ctx);
 */

const EscapeParticles = (() => {
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function create(config) {
    const {
      x = 0, y = 0, width = 900, height = 600,
      color = 'rgba(255,255,255,0.3)',
      count = 20,
      speedX = [-5, 5],
      speedY = [-10, -2],
      size = [1, 3],
      life = [4, 8],
      continuous = true
    } = config || {};

    const particles = [];

    function createParticle() {
      return {
        x: rand(x, x + width),
        y: rand(y, y + height),
        vx: rand(speedX[0], speedX[1]),
        vy: rand(speedY[0], speedY[1]),
        size: rand(size[0], size[1]),
        life: rand(life[0], life[1]),
        maxLife: 0,
        alpha: 1
      };
    }

    // Initial particles
    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.maxLife = p.life;
      p.life = rand(0, p.maxLife); // stagger
      particles.push(p);
    }

    function emit(n) {
      for (let i = 0; i < n; i++) {
        const p = createParticle();
        p.maxLife = p.life;
        particles.push(p);
      }
    }

    function update(dt) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        p.alpha = Math.max(0, p.life / p.maxLife);

        if (p.life <= 0) {
          if (continuous) {
            // Respawn
            const np = createParticle();
            np.maxLife = np.life;
            particles[i] = np;
          } else {
            particles.splice(i, 1);
          }
        }
      }
    }

    function render(ctx) {
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function clear() {
      particles.length = 0;
    }

    return { update, render, emit, clear };
  }

  return { create };
})();
