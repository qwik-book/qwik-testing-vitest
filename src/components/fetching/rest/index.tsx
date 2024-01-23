import {
  component$,
  useStore,
  Resource,
  useResource$,
  $,
  useStyles$,
} from '@builder.io/qwik';

import styles from './../index.css?inline';

export const DataFetchingRestBreakingBad = component$(() => {
  useStyles$(styles);
  const store = useStore({
    // personaje seleccionado
    idCharacter: '1',
    // Botones para seleccionar ids de personajes (50 y -1 no existen)
    idsButton: ['1', '2', '3', '4', '50', '-1'],
  });

  const API_URL = 'http://localhost:3000';

  // http://localhost:3000/character/<ID>
  const getSelectCharacter = $(
    async (id: string, controller?: AbortController): Promise<Array<any>> => {
      const data = await fetch(`${API_URL}/character/${id}`, {
        method: 'GET',
        signal: controller?.signal,
      });
      const json = await data.json();

      return json ? json : [Promise.reject(json)];
    }
  );

  const selectCharacterResource = useResource$<any>(({ track, cleanup }) => {
    // Usamos `track` para realizar nuevas consultas cuando cambia el personaje seleccionado
    track(() => store.idCharacter);

    // La función `cleanup` se ejecuta cuando se está re-ejecutando y
    // el controlador `AbortController` puede abortar la operación anterior porque se ha interrumpido.
    const abortController = new AbortController();
    cleanup(() => abortController.abort());

    // Se obtiene la información del personaje seleccionado.
    return getSelectCharacter(store.idCharacter, abortController);
  });

  return (
    <div class='center'>
      {store.idsButton.map((id) => (
        <button
          key={`btn-${id}`}
          onClick$={() => (store.idCharacter = id)}
          class={`btn-${id} ${id === store.idCharacter ? 'select' : ''}`}
        >
          {id}
        </button>
      ))}

      <div id='data'>
        <Resource
          value={selectCharacterResource}
          onPending={() => <div class='text-left'>Loading...</div>}
          onRejected={(error) => (
            <div class='text-center' id='error-message'>
              Error: {error.message}
            </div>
          )}
          onResolved={(result) => {
            return (
              <>
                <div class='mr-4 season-data'>
                  <h3 id='instructions-title'>Instrucciones a seguir</h3>
                  <p id='instructions-data'>
                    Haciendo click en uno de los botones se va a cargar la
                    información del personaje seleccionado. En la{' '}
                    <a
                      href='https://github.com/qwik-book/qwik-book-api/tree/master'
                      target='_blank'
                    >
                      API
                    </a>{' '}
                    tenemos información de 21 personajes, del 1 al 21
                    (incluidos) por lo que las opciones <b>-1</b> y <b>50</b> no
                    tendrá información de un personaje
                  </p>
                  {result.hasOwnProperty('name') ? (
                    <>
                      <h4>{result.name}</h4>
                      <ul>
                        <li>Descripción: {result.description}</li>
                        <li>Nº Episodios: {result.episodes}</li>
                        <li>
                          Más información:{' '}
                          <a href={result.url} target='_parent'>
                            {result.url}
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <h4 id='alert-warning'>{result.message}</h4>
                  )}
                </div>
              </>
            );
          }}
        />
      </div>
    </div>
  );
});
