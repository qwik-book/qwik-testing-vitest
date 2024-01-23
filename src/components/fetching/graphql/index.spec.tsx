// 1.- Imports
import { createDOM } from '@builder.io/qwik/testing';
import { describe, expect, vi, beforeAll, afterAll, it} from 'vitest';
import { DataFetchingGraphQLBreakingBad } from '.';
import { BREAKING_BAD_CHARACTERS_DATA, BREAKING_BAD_CHARACTERS_NO_DATA, INSTRUCTIONS_DATA_BREAKING_BAD_API } from '../../../data/breaking-bad';

// D2.- Datos mock, ahora a continuación 
// creamos el fichero con los datos


// 3.- Gestión del estado que vamos a mockear en las pruebas `it`
// Para renderizar bien los estados de componentes
const store = {
  idCharacter: '1',
  idsButton: ['1', '2', '3', '4', '50', '-1'],
};

// 4.- Pruebas unitarias
describe('Componente - Obtener mediante `fetch`', function () {
    it('Personaje - ID 1 - Walter White', async () => {
        // 1 Mock de datos de la API
        // Mockeamos con una respuesta igual a la que recibiríamos si hacemos la llamada real.
        const FetchMock = vi.fn(() => ({
          json: vi.fn(() => Promise.resolve({
            data: {
              character: {
                ...BREAKING_BAD_CHARACTERS_DATA[0],
                "message": null
              }
            }
          })),
        }));

        // Cuando efectua la llamada a fetch esto es lo que recibe
        vi.stubGlobal('fetch', FetchMock);
    
        // 2.- Primera carga antes de interactuar
        const { render, screen, userEvent } = await createDOM();
    
        await render(<DataFetchingGraphQLBreakingBad />);
        
        // Comprobando cantidad de botones
        expect(screen.querySelectorAll('button').length).toBe(6);
        // Mientras obtiene los datos el estado que se muestra
        expect(screen.querySelector('.text-left')?.textContent).toBe('Loading...');
    
        // 3.- Acción de click para seleccionar un personaje
        await userEvent("button.btn-1", "click");
    
        // Esperamos 100ms
        await new Promise((resolve) => setTimeout(resolve, 100));
    
        // Comprobar que el boton está seleccionado con "select" solo para el "1"
        const btnSelectTxtContent = 
            screen.querySelector('.select')?.textContent;
        expect(btnSelectTxtContent).toContain(`1`);
        expect(btnSelectTxtContent).not.toContain(`2`);
        expect(btnSelectTxtContent).not.toContain(`3`);
        expect(btnSelectTxtContent).not.toContain(`4`);
    
    
        // 4.- Comprobamos Contenido de las instrucciones a seguir
        expect(screen.querySelector('#instructions-title')?.textContent)
          .toBe('Instrucciones a seguir');
        expect(screen.querySelector('#instructions-data')?.textContent)
          .toBe(INSTRUCTIONS_DATA_BREAKING_BAD_API);
    
        // Comprobar nombre del personaje seleccionado  
        expect(screen.querySelector('h4')?.textContent)
          .toBe('Walter White');
          
        // 5.- Comprobar las características <li> del personaje
        const characterInfo = screen.querySelectorAll('ul li');
    
        // Datos del personaje
        expect(characterInfo.length).toBe(3);
    
        // Lo que se espera en cada punto
        const checkInfoDetails = [
          'Descripción: Profesor de química convertido en fabricante de metanfetaminas.',
          'Nº Episodios: 62',
          'Más información: https://breakingbad.fandom.com/wiki/Walter_White'
        ];
    
        for (let i = 0; i < characterInfo.length; i++) {
          expect(characterInfo[i].textContent).toBe(checkInfoDetails[i]);
        }
    
        // 6.- Mockear el estado para seleccionar 
        // el id 2 para la siguiente prueba 
        // (actividad práctica)
        store.idCharacter = '2'
        vi.mock('@builder.io/qwik', async () => {
          const qwik = await vi.importActual<typeof import('@builder.io/qwik')>('@builder.io/qwik');
          return {
            ...qwik,
            useContext: () => ({}),
            useStore: () => ({
              ...store,
            }),
          };
        });
      });

  it('Personaje - ID 2 - Jesse Pinkman', async () => {
    const FetchMock = vi.fn(() => ({
      json: vi.fn(() => Promise.resolve({
        data: {
          character: {
            ...BREAKING_BAD_CHARACTERS_DATA[1],
            "message": null
          }
        }
      })),
    }));

    // Cuando efectua la llamada a fetch esto es lo que recibe
    vi.stubGlobal('fetch', FetchMock);
      const { render, screen, userEvent } = await createDOM();
  
      await render(<DataFetchingGraphQLBreakingBad />);
  
      expect(screen.querySelectorAll('button').length).toBe(6);
      expect(screen.querySelector('.text-left')?.textContent).toBe('Loading...');
      // 5.- pasamos un selector que coincida con el botón de incremento como primer parámetro 
      // y el nombre del evento que queremos desencadenar ("click") como segundo parámetro
      await userEvent("button.btn-2", "click");
  
      const btnSelectTxtContent = 
          screen.querySelector('.select')?.textContent;
      expect(btnSelectTxtContent).toContain(`2`);
      expect(btnSelectTxtContent).not.toContain(`1`);
      expect(btnSelectTxtContent).not.toContain(`3`);
      expect(btnSelectTxtContent).not.toContain(`4`);
  
      // Wait for the fetch to be called.
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(screen.querySelector('#instructions-title')?.textContent)
        .toBe('Instrucciones a seguir');
      expect(screen.querySelector('#instructions-data')?.textContent)
        .toBe(INSTRUCTIONS_DATA_BREAKING_BAD_API);
  
      // Select character info
      expect(screen.querySelector('h4')?.textContent).toBe('Jesse Pinkman');
      const characterInfo = screen.querySelectorAll('ul li');
  
      expect(characterInfo.length).toBe(3);
  
      const checkInfoDetails = [
        'Descripción: Exestudiante de Walter y fabricante de metanfetaminas.',
        'Nº Episodios: 62',
        'Más información: https://breakingbad.fandom.com/wiki/Jesse_Pinkman'
      ];
  
      for (let i = 0; i < characterInfo.length; i++) {
        console.log(characterInfo[i].textContent)
        expect(characterInfo[i].textContent).toBe(checkInfoDetails[i]);
      }
      store.idCharacter = '-1'
      vi.mock('@builder.io/qwik', async () => {
        const qwik = await vi.importActual<typeof import('@builder.io/qwik')>('@builder.io/qwik');
        return {
          ...qwik,
          useContext: () => ({}),
          useStore: () => ({
            ...store,
          }),
        };
      });
  });

  it('Renderizar cuando NO encuentra un personaje seleccionado', async () => {
    it('Renderizar cuando NO encuentra un personaje seleccionado', async () => {
        
        const FetchMock = vi.fn(() => ({
          json: vi.fn(() => Promise.resolve({
            data: {
              character: {
                "message": "Personaje no encontrado"
              }
            }
          })),
        }));

        // Cuando efectua la llamada a fetch esto es lo que recibe
        vi.stubGlobal('fetch', FetchMock);
    
        // Cuando efectua la llamada a fetch (// api/f1.ts en la línea 12 y esto es lo que se recibiría para luego tratarlo)
        vi.stubGlobal('fetch', FetchMock);
        const { render, screen, userEvent } = await createDOM();
    
        await render(<DataFetchingGraphQLBreakingBad />);
    
        expect(screen.querySelectorAll('button').length).toBe(6);
        expect(screen.querySelector('.text-left')?.textContent).toBe('Loading...');
    
        await userEvent("button.btn--1", "click");
    
        // Esperamos 100ms
        await new Promise((resolve) => setTimeout(resolve, 100));
    
        // Comprobar el botón seleccionado que es '-1'
        const btnSelectTxtContent = 
            screen.querySelector('.select')?.textContent;
        expect(btnSelectTxtContent).toContain(`-1`);
        expect(btnSelectTxtContent).not.toContain(`50`);
    
        const alertInfo = screen.querySelector('#alert-warning');
        expect(alertInfo?.outerHTML).toContain('<h4 id="alert-warning">');
        expect(alertInfo?.textContent).toBe('Personaje no encontrado');
      });
  });
});