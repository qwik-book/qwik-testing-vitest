import { component$, useStore, useStyles$, $, useResource$, Resource } from '@builder.io/qwik';

export const GET_CHARACTER_DETAILS = `
query getSelectCharacter($id: Int!) {
  character(id: $id) {
    name
    description
    episodes
    url
    votes
    message
  }
}

`;

interface CharacterDetails {
  data: {
    character: object;
  };
}

import styles from './../index.css?inline';

export const DataFetchingGraphQLBreakingBad = component$(() => {
  useStyles$(styles);
  const store = useStore({
    idCharacter: '1',
    idsButton: ['1', '2', '3', '4', '50', '-1'],
  });

  const fetchGraphQL = $(
    async (
      id: string = "",
      abortController?: AbortController
    ): Promise<CharacterDetails> => {

      const resp = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortController?.signal,
        body: JSON.stringify({
          query: GET_CHARACTER_DETAILS,
          variables: { id: +id },
        }),
      });


      return (await resp.json())['data']['character'];
    }
  );

  const selectCharacterResource = useResource$<any>(({ track, cleanup }) => {
    // Usamos `track` para realizar nuevas consultas cuando cambia el año
    track(() => store.idCharacter);

    // La función `cleanup` se ejecuta cuando se está re-ejecutando y
    // el controlador `AbortController` puede abortar la operación anterior porque s ha interrumpido.
    const abortController = new AbortController();
    cleanup(() => abortController.abort());

    // Se obtiene el lista de carreras con el año seleccionado.
    return fetchGraphQL(store.idCharacter, abortController);
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
          onPending={() => (
            <div class='grow animate-pulse rounded-md bg-gray-200 text-left'>
              Loading...
            </div>
          )}
          onRejected={(error) => (
            <div
              class='grow rounded border border-solid border-red-300 bg-red-100 p-4 text-center text-red-500'
              id='error-message'
            >
              Error: {error.message}
            </div>
          )}
          onResolved={(result) => {
            console.log(result)
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
                  {result['message'] === null ? (
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