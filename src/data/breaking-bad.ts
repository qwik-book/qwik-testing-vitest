export const BREAKING_BAD_CHARACTERS_DATA = [
    {
      id: 1,
      name: 'Walter White',
      description:
        'Profesor de química convertido en fabricante de metanfetaminas.',
      episodes: 62,
      url: 'https://breakingbad.fandom.com/wiki/Walter_White',
      votes: 10,
    },
    {
      id: 2,
      name: 'Jesse Pinkman',
      description: 'Exestudiante de Walter y fabricante de metanfetaminas.',
      episodes: 62,
      url: 'https://breakingbad.fandom.com/wiki/Jesse_Pinkman',
      votes: 8,
    },
    {
      id: 3,
      name: 'Saul Goodman',
      description: 'Abogado astuto y poco convencional.',
      episodes: 43,
      url: 'https://breakingbad.fandom.com/wiki/Saul_Goodman',
      votes: 7,
    },
    {
      id: 4,
      name: 'Hank Schrader',
      description: 'Agente de la DEA y cuñado de Walter White.',
      episodes: 62,
      url: 'https://breakingbad.fandom.com/wiki/Hank_Schrader',
      votes: 9,
    },
  ];
  
  export const BREAKING_BAD_CHARACTERS_NO_DATA = {
    message: 'Personaje no encontrado',
  };
  
  export const INSTRUCTIONS_DATA_BREAKING_BAD_API =
    'Haciendo click en uno de los botones se va a cargar la información del personaje seleccionado. En la API tenemos información de 21 personajes, del 1 al 21 (incluidos) por lo que las opciones -1 y 50 no tendrá información de un personaje';
  