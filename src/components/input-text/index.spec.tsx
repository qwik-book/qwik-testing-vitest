import { createDOM } from "@builder.io/qwik/testing"; 
import { describe, expect, it } from "vitest";
import { InputText } from ".";

describe("Componente Counter", function () {
  it("Inicia, coge los primeros datos y se realizan varias entradas de datos", async () => {
      const { screen, render, userEvent } = await createDOM();

      await render(<InputText />);

      // obtén el div que muestra el contador de nuestro contenedor
      const inputElement = screen.querySelector("input");

      // asegura que el contador mostrado sea "BuilderIO"
      // , que es el valor predeterminado
      expect(inputElement?.tagName.toLowerCase()).toBe("input");
      expect(inputElement?.textContent).toEqual("");

      expect(screen.querySelector('.current-user')?.textContent).toBe(`BuilderIO`);


      // Trabajamos con el cambio de entrada
      await userEvent(inputElement, 'input', { target: { value: "1" } });
      expect(screen.querySelector('.current-user')?.textContent).toBe(`1`);

      // Segundo cambio
      await userEvent(inputElement, 'input', { target: { value: "Anartz" } });
      expect(screen.querySelector('.current-user')?.textContent).toBe(`Anartz`);

      // Son pruebas que dicen de ser diferente a "Anartz"
      expect(screen.querySelector('.current-user')?.textContent).not.toBe(`1`);
      expect(screen.querySelector('.current-user')?.textContent).not.toBe(`BuilderIO`);
  });

});