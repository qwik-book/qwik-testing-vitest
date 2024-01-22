// 1
import { createDOM } from '@builder.io/qwik/testing';
import { expect, describe, it } from 'vitest';
// 2
import { Hello } from '.';

// 3
describe("Componente Hello", function () {
// 4
    it("Debe de obtener el texto dentro del `div` y comprobar que sea cierto", async () => {
        // 5
        const { screen, render } = await createDOM();
        // 6
        await render(<Hello />);
        // 7
        const principalDiv = screen.querySelector("div");
        // 8
        expect(principalDiv?.textContent).toBe("Hello World with Qwik!");
        // 9
        expect(principalDiv?.textContent).toContain("Hello");
        expect(principalDiv?.textContent).toContain("Qwik");
        expect(principalDiv?.textContent).toContain("!");
        expect(principalDiv?.textContent).toContain("Hello World w");
    });

});