import { createDOM } from '@builder.io/qwik/testing';
import { expect, describe, it } from 'vitest';

import { HelloWithProps } from '.';


describe("Componente Hello with props", function () {
  it("Debería representarse correctamente con prop `name`= `Anartz`", async () => {
    const { screen, render } = await createDOM();

    // Se añade con valor 'Anartz' en 'name'
    await render(<HelloWithProps name="Anartz" />);

    const principalDiv = screen.querySelector("div");

    // Comprobamos con el valor del prop `name` añadido
    expect(principalDiv?.textContent).toBe("Hello Anartz to work in Qwik!");
  });

  it("Debería representarse correctamente con prop `name`=`Qwik`", async () => {
      
    const { screen, render } = await createDOM();

    await render(<HelloWithProps name="Qwik" />);

    const principalDiv = screen.querySelector("div");

    expect(principalDiv?.textContent).toBe("Hello Qwik to work in Qwik!");
  });
});