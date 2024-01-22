import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";

import { Counter } from ".";

describe("Componente Counter", function () {
  it("debería representarse correctamente en el inicio", async () => {
      const { screen, render } = await createDOM();
      
      await render(<Counter />);
      
      const countElement = screen.querySelector(".count");
      
      expect(countElement?.textContent).toBe("0");
  });
  it("debería incrementarse de 0 a 1 el valor del contador al hacer UN click", async () => {
    // obtenemos el método `userEvent` junto con 
    // `screen` y `render`
    const { screen, render, userEvent } = await createDOM();

    await render(<Counter />);
    
    const countElement = screen.querySelector(".count");

    expect(countElement?.textContent).toBe("0");

    // Pasamos un selector que coincida con el botón 
    // de incremento como primer parámetro y el nombre 
    // del evento que queremos desencadenar ("click")
    // como segundo parámetro
    await userEvent("button.increment", "click");

    // Aseguramos que el contador mostrado se haya 
    // incrementado de 0 a 1 después de la
    // interacción realizada con el `userEvent`
    expect(countElement?.textContent).toBe("1");
  });
});