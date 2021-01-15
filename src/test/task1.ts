const testMatematicas = {
  id: 1,
  nombre: 'EVALUACION DE MATEMATICAS',
  tiempo: 5000, // tiempo en minutos
  tipo: 'EXAMEN',
  puntaje_maximo: 5.0, // float
  codigo: '#34324re',
  fecha_activacion: 'string fromat YYYY-MM-DD HH:mm',
  fecha_cierre: 'string fromat YYYY-MM-DD HH:mm',
  observaciones: 'TIENES 15 MINUTOS PARA TERMINAR ESTE EXAMEN, ESTE EXAMEN ES INDIVIDUAL Y ANTE CUALQUIER INDICIO DE COPIA ESTE SERA ANULADO.',
  preguntas: [{
    indice: 0,
    descripcion: '¿CUANTOS HUESOS TIENE EL CUERPO HUMANO?',
    imagen: false,
    ayuda: '',
    multiple: false,
    numero_respuestas: 1,
    tipo_valor: '%', // va pegado
    valor: 20, //
    tipo: 'ICFES', // por ahora pegado
    opciones: [{
      descripcion: '266 huesos',
      valor: 266
    }, {
      descripcion: '206 huesos',
      valor: 206
    }, {
      descripcion: '208 huesos',
      valor: 208
    }, {
      descripcion: '123 huesos',
      valor: 123
    }]
  }, {

    indice: 1,
    descripcion: '¿CUANTOS HUESOS TIENE EL CUERPO HUMANO?',
    imagen: false,
    ayuda: '',
    multiple: false,
    numero_respuestas: 1,
    tipo_valor: '%',
    valor: 20,
    tipo: 'ICFES',
    opciones: [{
      descripcion: '266 huesos',
      valor: 266
    }, {
      descripcion: '206 huesos',
      valor: 206
    }, {
      descripcion: '208 huesos',
      valor: 208
    }, {
      descripcion: '123 huesos',
      valor: 123
    }]
  }, {

    indice: 2,
    descripcion: '¿CUANTOS HUESOS TIENE EL CUERPO HUMANO?',
    imagen: false,
    ayuda: '',
    multiple: false,
    numero_respuestas: 1,
    tipo_valor: '%',
    valor: 20,
    tipo: 'ICFES',
    opciones: [{
      descripcion: '266 huesos',
      valor: 266
    }, {
      descripcion: '206 huesos',
      valor: 206
    }, {
      descripcion: '208 huesos',
      valor: 208
    }, {
      descripcion: '123 huesos',
      valor: 123
    }]
  }, {
    indice: 3,
    descripcion: '¿CUANTOS HUESOS TIENE EL CUERPO HUMANO?',
    imagen: false,
    ayuda: '',
    multiple: false,
    numero_respuestas: 1,
    tipo_valor: '%',
    valor: 20,
    tipo: 'ICFES',
    opciones: [{
      descripcion: '266 huesos',
      valor: 266
    }, {
      descripcion: '206 huesos',
      valor: 206
    }, {
      descripcion: '208 huesos',
      valor: 208
    }, {
      descripcion: '123 huesos',
      valor: 123
    }]
  }, {

    indice: 4,
    descripcion: '¿CUANTOS HUESOS TIENE EL CUERPO HUMANO?',
    imagen: false,
    ayuda: '',
    multiple: true,
    numero_respuestas: 2,
    tipo_valor: '%',
    valor: 10,
    tipo: 'ICFES',
    opciones: [{
      descripcion: '266 huesos',
      valor: 266
    }, {
      descripcion: '206 huesos',
      valor: 206
    }, {
      descripcion: '208 huesos',
      valor: 208
    }, {
      descripcion: '123 huesos',
      valor: 123
    }]
  }, {

    indice: 5,
    descripcion: '¿SI PUDIERAS QUITAR UNA PARTE DE TU CUERPO, CUAL SERIA?',
    imagen: false,
    ayuda: '',
    multiple: false,
    numero_respuestas: 1,
    tipo_valor: '%',
    valor: 10,
    tipo: 'ABIERTA',
    opciones: []
  }, {
    indice: 6,
    descripcion: 'CUAL ES EL NOMBRE DE LA REGION QUE ESTA SEÑALADA EN EL MAPA DE COLOMBIA',
    imagen: true,
    ayuda: '',
    multiple: true,
    numero_respuestas: 2,
    tipo_valor: '%',
    valor: 10,
    tipo: 'ICFES',
    opciones: [{
      descripcion: 'REGION AMAZONIA',
      valor: 266
    }, {
      descripcion: 'REGION ANDINA',
      valor: 206
    }, {
      descripcion: 'REGION CARIBE',
      valor: 208
    }, {
      descripcion: 'REGION CARIBE',
      valor: 123
    }]
  }]
}

export default testMatematicas
