import { createDOM } from "@builder.io/qwik/testing";
// 0.- Obtenemos "vi" para hacer el mockeo del valor del contador
import { beforeAll, describe, expect, it, vi } from "vitest";
import { CounterWithHook } from ".";

// 1.- Añadimos bloque beforeAll
beforeAll(() => {
  // 2.- Simulamos useStore para que comience con el contador en 1 en lugar de 0
  // Aqí implementamos el mock del valor del useStore para empezar en 1
  vi.mock("@builder.io/qwik", async () => {
    const qwik = await vi.importActual<typeof import("@builder.io/qwik")>(
    "@builder.io/qwik"
    );
    return {
        ...qwik, // 3.- devolvemos la mayor parte del módulo sin cambios
        // 4.- utilizamos bind para establecer el estado inicial de useStore
        useStore: qwik.useStore.bind("initialState", { count: 1 }),
    };
  });
});

// 5.- Añadimos el bloque de las pruebas sabiendo que 
// el contador se inicia en 1. Esto sería como lo anterior, 
// pero empezando desde 1
describe("Componente Counter - Usando mocks", function() {
    it("debería incrementarse al hacer click partiendo con valor inicial a 1", async () => {
      // 6.- obtenemos el método `userEvent` junto con `screen` y `render`
      const { screen, render, userEvent } = await createDOM();
  
      // 7.- representamos el componente
      await render(<CounterWithHook />);
  
      // 8. - obtenemos el div que muestra el contador de nuestro contenedor
      const countElement = screen.querySelector(".count");
  
      // 9.- aseguramos que el contador mostrado sea "1", el valor predeterminado establecido por nuestra simulación
      expect(countElement?.textContent).toBe("1");
  
      // 10.- pasamos un selector que coincide con el botón de incremento como primer parámetro 
      // y el nombre del evento que queremos desencadenar ("click") como segundo parámetro
      await userEvent("button.increment", "click");
  
      // 11.- aseguramos que el contador mostrado se haya incrementado de 1 a 2
      expect(countElement?.textContent).toBe("2");
    });
});