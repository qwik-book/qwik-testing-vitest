import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";

import { CounterWithHook } from ".";

describe("Componente Counter - Hook", function () {
  it("debería representarse correctamente en el inicio", async () => {
      const { screen, render } = await createDOM();
      
      await render(<CounterWithHook />);
      
      const countElement = screen.querySelector(".count");
      
      expect(countElement?.textContent).toBe("0");
  });
  it("Incrementa a 2 con dos clicks y pasa a 0 con Reset", async () => {
    // obtenemos el método `userEvent` junto con `screen` y `render`
    const { screen, render, userEvent } = await createDOM();

    await render(<CounterWithHook />);

    const countElement = screen.querySelector(".count");

    expect(countElement?.textContent).toBe("0");
    
    await userEvent("button.increment", "click");
    await userEvent("button.increment", "click");
    // x 2 click en increment
    expect(countElement?.textContent).toBe("2");

    // Reset
    await userEvent("button.reset", "click");

    expect(countElement?.textContent).toBe("0");
});
});