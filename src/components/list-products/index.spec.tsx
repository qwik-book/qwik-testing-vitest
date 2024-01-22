import { createDOM } from '@builder.io/qwik/testing';
import { expect, describe, it, beforeAll } from 'vitest';

import { List } from '.';
import { PRODUCTS } from '~/data/products';

let screenElement: HTMLElement;

describe("Componente List", function () {
  beforeAll(async() => {
      const { screen, render } = await createDOM();
      screenElement = screen;
      await render(<List list={PRODUCTS} />);
  });
  it("Obtenemos el título y comprobamos que es correcto", async () => {
      
    const h1 = screenElement.querySelector("h1");
    
    expect(h1?.textContent).toContain("Lista de productos en venta");
    expect(h1?.textContent).toEqual(`Lista de productos en venta (${PRODUCTS.length})`);
      
  });

  it("Comprobamos la lista y miramos si todo es correcto", async () => {

    const productsList = screenElement.querySelectorAll('[item-type="product"]');

    expect(productsList).toHaveLength(PRODUCTS.length);

    for (let i = 0; i < PRODUCTS.length; i++) {
        expect(productsList[i].textContent).toContain(PRODUCTS[i].name);
        expect(productsList[i].textContent).toContain(PRODUCTS[i].price);
        expect(productsList[i].textContent).toEqual(`${PRODUCTS[i].name} - ${PRODUCTS[i].price}`);
    }
  });
});