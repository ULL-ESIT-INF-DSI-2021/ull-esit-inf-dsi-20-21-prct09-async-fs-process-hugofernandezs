# Traza de ejecución del programa.


## Enunciado

Realice una traza de ejecución de este programa mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores de Node.js, además de lo que se muestra por la consola. Para ello, simule que se llevan a cabo, como mínimo, dos modificaciones del fichero helloworld.txt a lo largo de la ejecución del programa anterior. ¿Qué hace la función access? ¿Para qué sirve el objeto constants?


## Código

```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```


## Traza del programa


### Traza inicial:
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  |  |  |

### Primer paso:
#### Introducimos el main del programa en la pila, la cual inicialmente es anónima.
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `mainAnonymous()` |  |  |  |

### Segundo paso:
#### Tras cargarse las librerias y los argumentos, se pasa el access a la API.
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `mainAnonymous()` | `access()` |  |  |

### Tercer paso:
#### La función principal sale de la pila, sale el access de la **API** y entra el callback en la cola de tareas.
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  | `callback()` |  |

### Cuarto paso:
#### El callback es añadido a la pila, se invoca y retorna un valor. 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
| `console.log(Starting to watch file ${filename})` |  |  |  |

### Quinto paso:
#### Una vez retorna el valor, la llamada sale de la pila. 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
|  |  |  | `console.log(Starting to watch file ${filename})` |

### Sexto paso:
#### Una vez retorna el valor, la llamada sale de la pila. 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
|  |  |  | `Starting to watch file ${filename}` |

### Séptimo paso:
#### Entra la función watch() en la pila. 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
| `watch()` |  |  |  |

### Octavo paso:
#### La función watch() pasa a la **API**, pero llamando a watcher.on(). 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` | `watcher.on()` |  |  |

### Noveno paso:
#### Se llama a la función y se retorna un valor. 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
| `console.log(File ${filename} is no longer watched)` |  |  |  |

### Décimo paso:
#### Una vez retorna el valor, la llamada sale de la pila. 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
|  |  |  | `File ${filename} is no longer watched` |

### Onceavo paso:
#### Ahora nuestro callback() que será la función watcher.on() pasará a la cola de tareas. 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  | `callback()` |  |

### Doceavo paso:
#### Como la pila esta vacia, pasaremos a ejecutar el callback(). 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |

### Treceavo paso:
#### El callback es añadido a la pila, se invoca y retorna un valor. 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
| `console.log(File ${filename} has been modified somehow)` |  |  |  |

### Catorceavo paso:
#### El callback es añadido a la pila, se invoca y retorna un valor. 
| **LIFO** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  |  | File ${filename} has been modified somehow |

.
Esto lo repetiremos hasta que termine nuestro proceso, que según el código proporcionado es cuando cuando el tamaño del mismo sea igual a 2, o más bien, distinto de 3, mientras va incrementando.