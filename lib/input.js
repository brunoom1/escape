/**
 * @module EscapeInput
 * @version 1.0.0
 * @description Hit detection, mouse tracking e hover state para objetos no Canvas.
 *
 * API Pública:
 * - create(canvas, logicalWidth, logicalHeight) → input instance
 * - instance.onClick(callback) → registra handler de click (recebe x, y lógicos)
 * - instance.onHover(callback) → registra handler de hover (recebe x, y lógicos)
 * - instance.hitTest(x, y, objects) → retorna objeto sob o ponto ou null
 * - instance.getMousePos() → { x, y } posição atual do mouse (lógica)
 * - instance.destroy() → remove event listeners
 *
 * Uso:
 * const input = EscapeInput.create(canvas, 900, 600);
 * input.onClick((x, y) => { const obj = input.hitTest(x, y, objetos); });
 */

const EscapeInput = (() => {
  function create(canvas, logicalWidth, logicalHeight) {
    let mouseX = -1;
    let mouseY = -1;
    const clickHandlers = [];
    const hoverHandlers = [];

    function toLogical(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = logicalWidth / rect.width;
      const scaleY = logicalHeight / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }

    function handleClick(e) {
      const pos = toLogical(e);
      for (const cb of clickHandlers) {
        cb(pos.x, pos.y, e);
      }
    }

    function handleMouseMove(e) {
      const pos = toLogical(e);
      mouseX = pos.x;
      mouseY = pos.y;
      for (const cb of hoverHandlers) {
        cb(pos.x, pos.y, e);
      }
    }

    function handleMouseLeave() {
      mouseX = -1;
      mouseY = -1;
    }

    function hitTest(x, y, objects) {
      if (!objects || !objects.length) return null;
      for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        if (x >= obj.x && x <= obj.x + obj.w && y >= obj.y && y <= obj.y + obj.h) {
          return obj;
        }
      }
      return null;
    }

    function getHoveredObject(objects) {
      if (mouseX < 0 || mouseY < 0) return null;
      return hitTest(mouseX, mouseY, objects);
    }

    function onClick(callback) {
      if (typeof callback === 'function') clickHandlers.push(callback);
    }

    function onHover(callback) {
      if (typeof callback === 'function') hoverHandlers.push(callback);
    }

    function getMousePos() {
      return { x: mouseX, y: mouseY };
    }

    function destroy() {
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    }

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return { onClick, onHover, hitTest, getHoveredObject, getMousePos, destroy };
  }

  return { create };
})();
