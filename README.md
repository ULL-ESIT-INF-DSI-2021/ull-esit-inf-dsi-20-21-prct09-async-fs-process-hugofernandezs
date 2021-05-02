# Práctica 9 - Sistema de ficheros y creación de procesos en Node.js

<p align="center">
    <a href="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-hugofernandezs/actions/workflows/tests.yml">
        <img alt="Tests" src="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-hugofernandezs/actions/workflows/tests.yml/badge.svg">
    </a>
    <a href='https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-hugofernandezs?branch=main'>
        <img src='https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-hugofernandezs/badge.svg?branch=main' alt='Coverage Status' />
    </a>
    <a href='https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct09-async-fs-process-hugofernandezs'>
        <img src='https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct09-async-fs-process-hugofernandezs&metric=alert_status' alt='Quality Gate Status' />
    </a>
</p>


## EJERCICIO 1
### Enunciado:
Considere el siguiente ejemplo de código fuente TypeScript que hace uso del módulo fs de Node.js:
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
Realice una traza de ejecución de este programa mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores de Node.js, además de lo que se muestra por la consola. Para ello, simule que se llevan a cabo, como mínimo, dos modificaciones del fichero helloworld.txt a lo largo de la ejecución del programa anterior. ¿Qué hace la función access? ¿Para qué sirve el objeto constants?

### Desarrollo:
Hemos realizado la traza del ejercicio siguiendo los apuntes de clase y con la ayuda de recursos externos y el resultado ha sido el siguiente:

### Traza inicial:
**Se inician todas las colas vacías.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  |  |  |


### Primer paso:
**Se inicia la función anónima main entrando en la pila.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `mainAnonymous()` |  |  |  |


### Segundo paso:
**Se cargan las librerías y los argumentos y se introduce a acces en la API.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `mainAnonymous()` | `access()` |  |  |


### Tercer paso:
**La función main termina y acces sale de la API. Callback entra en la cola de tareas.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  | `callback()` |  |


### Cuarto paso:
**El callback se añade a la pila para ejecutar la función y retornar un valor.** 
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
| `console.log(Starting to watch file ${filename})` |  |  |  |


### Quinto paso:
**En el output se retorna el valor calculado por la función**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
|  |  |  | `Starting to watch file ${filename}` |


### Sexto paso:
**Entra la función *watch()* en la pila para ejecutarse.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
| `watch()` |  |  |  |


### Séptimo paso:
**Tras ejecutarse la función *watch()*, esta llama a *watcher.on()* y se añade a la API.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` | `watcher.on()` |  |  |


### Octavo paso:
**Se ejecuta la siguiente función añadiéndola a la pila.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
| `console.log(File ${filename} is no longer watched)` |  |  |  |


### Noveno paso:
**La función se ejecuta y retorna el valor en el output.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
|  |  |  | `File ${filename} is no longer watched` |


### Décimo paso:
**La función *watcher.on()* se convierte en el callback y pasa a la cola para ejecutarse.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  | `callback()` |  |


### Onceavo paso:
**Se añade la siguiente función de la cola, *callback()* a la pila, pues la pila está vacía, y se ejecuta.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |


### Doceavo paso:
**Se ejecuta la siguiente función añadiéndola a la pila.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
| `callback()` |  |  |  |
| `console.log(File ${filename} has been modified somehow)` |  |  |  |


### Treceavo paso:
**La función ejecutada retorna un valor en el output.**
| **STACK** | **API** | **QUEUE** | **OUTPUT** |
| ---------------- | ---------------- | ---------------- | ---------------- |
|  |  |  | `File ${filename} has been modified somehow` |

#### La función acces nos permite probar los permisos que tenemos sobre un archivo o directorio. El objeto constant nos garantiza una manera predefinida de acceder al item, por ejemplo indicándole que qqueremos un archivo o que queremos entrar en modo lectura...


## EJERCICIO 2
### Enunciado:
Escriba una aplicación que proporcione información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. La ruta donde se encuentra el fichero debe ser un parámetro pasado a la aplicación desde la línea de comandos. Adicionalmente, también deberá indicarle al programa desde la línea de comandos si desea visualizar el número de líneas, palabras, caracteres o combinaciones de ellas. Puede gestionar el paso de parámetros desde la línea de comandos haciendo uso de yargs.

Lleve a cabo el ejercicio anterior de dos maneras diferentes:

1. Haciendo uso del método pipe de un Stream para poder redirigir la salida de un comando hacia otro.
2. Sin hacer uso del método pipe, solamente creando los subprocesos necesarios y registrando manejadores a aquellos eventos necesarios para implementar la funcionalidad solicitada.

Para lo anterior, se recomienda leer la documentación de Stream. Piense que la propiedad stdin de un objeto ChildProcess es un Stream de escritura, mientras que su propiedad stdout es un Stream de lectura.

Por último, programe defensivamente, es decir, trate de controlar los potenciales errores que podrían surgir a la hora de ejecutar su programa. Por ejemplo, ¿qué sucede si indica desde la línea de comandos un fichero que no existe o una opción no válida?

### Desarrollo:
Para este ejercicio hemos desarrollado una paqueña clase FileManager que contiene dos funciones al igual que un programa index.ts que se encagará de manejar la clase y los parámetros que le pasemos usango el módulo yargs. En la ejecución tendremos que introducir el parámetro info seguido de una serie de opciones de configuración y se nos mostará por pantalla la información de un archivo que pasemos como parámetro. Adicionalmente se puede hacer de dos métodos con el comando pipe.

#### Programa index.ts:
En este programa es en el que se reconocen los comandos y se invoca a la clase File manager.
```typescript
yargs.command( {
  command: 'info',
  describe: 'Returns the information of the file',
  builder: {
    file: {
      describe: 'Nombre del fichero a analizar',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Usar o no un pipe',
      demandOption: true,
      type: 'string',
    },
    lines: {
      describe: 'Contar lineas',
      demandOption: false,
      type: 'string',
    },
    words: {
      describe: 'Contar palabras',
      demandOption: false,
      type: 'string',
    },
    chars: {
      describe: 'Contar letras',
      demandOption: false,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.file === "string") && (typeof argv.pipe === "string")) {
      let options: string[] = [];
      if ((typeof argv.lines === "string") && (argv.lines === "yes")) {
        options.push('lines');
      }
      if ((typeof argv.words === "string") && (argv.words === "yes")) {
        options.push('words');
      }
      if ((typeof argv.chars === "string") && (argv.chars === "yes")) {
        options.push('chars');
      }
      if (options.length === 0) {
        console.log(chalk.red('Introduzca al menos una opción.'));
        return;
      }
      const fm = new FileManager(argv.file);
      switch (argv.pipe) {
        case "yes": {
          fm.getInfoPipe(options);
          break;
        }
        case "no": {
          fm.getInfo(options);
          break;
        }
        default: {
          console.log(chalk.red("Error en --pipe. Introduzca 'yes' o 'no'."));
          break;
        }
      }
    } else {
      console.log(chalk.red(`Debe introducir el nombre del fichero.`));
    }
  },
});

yargs.parse();
```

#### Clase FileManager:
Esta es la clase que se encargará de manejar y obtener la información del archivo.
```typescript
export class FileManager {
  private fs_ = require('fs');
  private fileName_: string;

  constructor(fileName: string) {
    this.fileName_ = fileName;
  }

  public getInfo(options: string[]) {
    if (this.fs_.existsSync(this.fileName_)) {
      const wc = spawn('wc', [this.fileName_]);
      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);

      wc.on('close', () => {
        const wcArray = wcOutput.split(/\s+/);
        options.forEach((option) => {
          switch (option) {
            case 'lines':
              console.log(chalk.green(`El archivo contiene ${parseInt(wcArray[1]) + 1} lineas.`));
              break;
            case 'words':
              console.log(chalk.green(`El archivo contiene ${wcArray[2]} palabras.`));
              break;
            case 'chars':
              console.log(chalk.green(`El archivo contiene ${wcArray[3]} letras.`));
              break;
            default:
              console.log(chalk.red(`No se reconoce el argumento ${option}.`));
          }
        })
      });
    } else {
      console.error(chalk.red(`No se encuentra el archivo ${this.fileName_}.`));
    }
  }

  getInfoPipe(options: string[]) {
    if (this.fs_.existsSync(this.fileName_)) {
      const wc = spawn('wc', [this.fileName_]);
      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);
  
      wc.on('close', () => {
        const wcArray = wcOutput.split(/\s+/);
        options.forEach((option) => {
          switch (option) {
            case 'lines':
              const echoLines = spawn('echo', [(chalk.green(`El archivo contiene ${parseInt(wcArray[1]) + 1} lineas`))]);
              echoLines.stdout.pipe(process.stdout);
              break;
            case 'words':
              const echoWords = spawn('echo', [(chalk.green(`El archivo contiene ${parseInt(wcArray[2])} palabras`))]);
              echoWords.stdout.pipe(process.stdout);
              break;
            case 'chars':
              const echoChars = spawn('echo', [(chalk.green(`El archivo contiene ${parseInt(wcArray[3])} letras`))]);
              echoChars.stdout.pipe(process.stdout);
              break;
          }
        })
      });
    } else {
      console.error(chalk.red(`No se encuentra el fichero ${this.fileName_}`));
    }
  }
}
```


## EJERCICIO 3
### Enunciado:
A partir de la aplicación de procesamiento de notas desarrollada en la Práctica 8, desarrolle una aplicación que reciba desde la línea de comandos el nombre de un usuario de la aplicación de notas, así como la ruta donde se almacenan las notas de dicho usuario. Puede gestionar el paso de parámetros desde la línea de comandos haciendo uso de yargs. La aplicación a desarrollar deberá controlar los cambios realizados sobre todo el directorio especificado al mismo tiempo que dicho usuario interactúa con la aplicación de procesamiento de notas. Nótese que no hace falta modificar absolutamente nada en la aplicación de procesamiento de notas. Es una aplicación que se va a utilizar para provocar cambios en el sistema de ficheros.

Para ello, utilice la función watch y no la función watchFile, dado que esta última es más ineficiente que la primera. La función watch devuelve un objeto Watcher, que también es un objeto EventEmitter. ¿Qué evento emite el objeto Watcher cuando se crea un nuevo fichero en el directorio observado? ¿Y cuando se elimina un fichero existente? ¿Y cuando se modifica?

Con cada cambio detectado en el directorio observado, el programa deberá indicar si se ha añadido, modificado o borrado una nota, además de indicar el nombre concreto del fichero creado, modificado o eliminado para alojar dicha nota.

Programe defensivamente, es decir, trate de controlar los potenciales errores que podrían surgir a la hora de ejecutar su aplicación.

Por último, trate de contestar a las siguientes preguntas:

- ¿Cómo haría para mostrar, no solo el nombre, sino también el contenido del fichero, en el caso de que haya sido creado o modificado?
- ¿Cómo haría para que no solo se observase el directorio de un único usuario sino todos los directorios correspondientes a los diferentes usuarios de la aplicación de notas?

### Desarrollo:
Para este ejercicio hemos reutilizado la clase de notas de la práctica 8 y hemos añadido alguna funcionalidad.
El principal cambio es un nuevo programa principal que solo maneja la opción watch y se le pasará un directorio como parámetro y comenzará a analizar dicho directorio en busca de modificaciones. Mostrado cada vez que una suceda.

```typescript
const fm = new FileManager();

yargs.command( {
  command: 'watch',
  describe: 'Observa un fichero y sus cambios',
  builder: {
    route: {
      describe: 'Ruta al directorio',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.route === "string") {
      fm.watch(argv.route);
    }
  },
});

yargs.parse();
```

El segundo cambio ha sido añadir esta función a la clase FileManager de la Práctica 8. Se ha añadido como una función adicional y se llamará cuando el programa inicie. Esta función iniciará con watch un análisis del directorio y continuará mostrando los cambios hasta que se cierre el programa.

```typescript
public watch(path: string) {
    const existRoute: boolean = this.fs_.existsSync(path);
    const dir: string = path;
    const file = this.fs_.readdirSync(dir);

    if (existRoute == true) {
      console.log(chalk.blue(`Contenido inicial de ${path}: \n` + file + '\n'));

      this.fs_.watch(dir, (event: any, content: string) => {
        console.log(chalk.green('Se han producido cambios en el directorio!:'));
        switch (event) {
          case 'rename':
            const existFile: boolean = this.fs_.existsSync(`${path}/${content}`);
            if (existFile == true) {
              console.log(chalk.green('Se ha añadido el fichero ' + content + '\n'));
            } else {
              console.log(chalk.green('Se ha eliminado el fichero ' + content + '\n'));
            }
            break;
          case 'change':
            console.log(chalk.green('Se ha modificado el fichero ' + content + '\n'));
            break;
        }

        const file = this.fs_.readdirSync(dir);
        console.log(chalk.green(`El contenido del directorio es: \n` + file + '\n'));
      });
    } else {
      console.error(chalk.red(`${path} no existe en el sistema de ficheros!`));
    }
  }
```

##### Para mostrar el contenido de un fichero modificado se podría llamar a alguna función que lea este contenido y lo muestre cada vez que se detecte el cambio en el fichero. Actualmente solo se muestra el fichero que se ha modificado, pero añadir elnuevocambio no sería demasiado complejo.
##### Para mostrar todos los directorios a la vez se podría iniciar un watch en cada uno de los directorios y así analizarlos todos, aunque esto no sería muy eficiente.


## EJERCICIO 4
### Enunciado:
Desarrolle una aplicación que permita hacer de wrapper de los distintos comandos empleados en Linux para el manejo de ficheros y directorios. En concreto, la aplicación deberá permitir:

1. Dada una ruta concreta, mostrar si es un directorio o un fichero.
2. Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro.
3. Listar los ficheros dentro de un directorio.
4. Mostrar el contenido de un fichero (similar a ejecutar el comando cat).
5. Borrar ficheros y directorios.
6. Mover y copiar ficheros y/o directorios de una ruta a otra. Para este caso, la aplicación recibirá una ruta origen y una ruta destino. En caso de que la ruta origen represente un directorio, se debe copiar dicho directorio y todo su contenido a la ruta destino.

Para interactuar con la aplicación a través de la línea de comandos, puede hacer uso de yargs.

Programe defensivamente, esto es, trate de controlar todos los potenciales errores que podrían surgir a la hora de ejecutar su programa.

### Desarrollo:
Para este ejercicio también tenemos un programa principal que se encargará de analizar los comandos e invocar a las funciones necesarias para que el programa funcione.
```typescript
const linuxCommands = new LinuxCommands;

yargs.command( {
  command: 'check',
  describe: 'Checks if the passed route is a file or a directory',
  builder: {
    route: {
      describe: 'Route to check',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.route === "string") {
      const result: string | undefined = linuxCommands.check(argv.route);
      if (typeof result === "undefined") {
        console.log(chalk.red(`Error al evaluar la ruta ${argv.route}`));
      } else {
        console.log(chalk.green(`La ruta corresponde a un ${result}.`));
      }
    }
  },
});

yargs.command( {
  command: 'mkdir',
  describe: 'Creates a new directory',
  builder: {
    route: {
      describe: 'Route to the new directory',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.route === "string") {
      if (linuxCommands.mkdir(argv.route)) {
        console.log(chalk.green("Directory created."));
      } else {
        console.log(chalk.red("Something went wrong."));
      }
    }
  },
});

yargs.command( {
  command: 'list',
  describe: 'List all the content of a directory',
  builder: {
    route: {
      describe: 'Route to list.',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.route === "string") {
      console.log(linuxCommands.ls(argv.route));
    }
  },
});

yargs.command( {
  command: 'cat',
  describe: 'Shows the content of a file.',
  builder: {
    route: {
      describe: 'Route to the file',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.route === "string") {
      console.log(linuxCommands.cat(argv.route));
    }
  },
});

yargs.command( {
  command: 'remove',
  describe: 'Removes the passed file or directory.',
  builder: {
    route: {
      describe: 'Route to the file or directory',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.route === "string") {
      if (typeof argv.route === "string") {
        if (linuxCommands.remove(argv.route)) {
          console.log(chalk.green("Directory removed."));
        } else {
          console.log(chalk.red("Something went wrong."));
        }
      }
    }
  },
});

yargs.command( {
  command: 'move',
  describe: 'Moves an item from one place to another.',
  builder: {
    source: {
      describe: 'Route to the item to move',
      demandOption: true,
      type: 'string',
    },
    destiny: {
      describe: 'Destination rute of the item',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.source === "string" && typeof argv.destiny === "string") {
      if (linuxCommands.move(argv.source, argv.destiny)) {
        console.log(chalk.green("Directory moved."));
      } else {
        console.log(chalk.red("Something went wrong."));
      }
    }
  },
});

yargs.command( {
  command: 'copy',
  describe: 'Copies an item from one place to another.',
  builder: {
    source: {
      describe: 'Route to the item to move',
      demandOption: true,
      type: 'string',
    },
    destiny: {
      describe: 'Destination rute of the item',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.source === "string" && typeof argv.destiny === "string") {
      if (linuxCommands.copy(argv.source, argv.destiny)) {
        console.log(chalk.green("Directory copied."));
      } else {
        console.log(chalk.red("Something went wrong."));
      }
    }
  },
});

yargs.parse();
```
Este main analiza cada uno de los posibles comandos y se vale de una clase LinuxComands a la que invocará y esta ejecutará el comando correspondiente.
Esta clase contiene una función por cada comando implementado y se llamará a esta función cada vez que se quiera ejecutar dicho comando.

Los comandos posibles son:
1. **check:** Comprueba si el destino es un directorio o un archivo obteniendo las estadísticas y devolviendo un string con elresultado o undefined si se produce algún error.
```typescript
public check(path: string): string | undefined {
  if (this.fs_.existsSync(path)) {
    if (this.fs_.lstatSync(path).isDirectory()) {
      return "directory";
    } else {
      return "file";
    }
  } else {
    return undefined
  }
}
```

2. **mkdir:** Crea un nuevo directorio en la ruta especificada. Devuelve un valor true si todo ha ido bien y false si ha ocurrido algún error.
```typescript
public mkdir(path: string): boolean {
  if (this.fs_.existsSync(path)) {
    return false;
  } else {
    this.fs_.mkdirSync(path);
    return true;
  }
}
```

3. **ls:** Muestra el contenido de un directorio. Para ello primero se aegura que el path es de un directorio y luego invoca a un proceso hijo que llama a ls de linux. Se almacena el resultado del comando en una variable y se devuelve.
```typescript
public ls(path: string): string {
  let result = "";
  switch (this.check(path)) {
    case "directory": {
      const ls = spawn('ls', [path]);
      ls.stdout.on('data', (piece) => result += piece);
      ls.stdout.on('close', () => {
        return result;
      });
      break;
    }
    case "file": {
      result = "No se puede hacer un ls sobre un fichero.";
      break;
    }
    case undefined: {
      result = "No existe la ruta destino.";
      break;
    }
    default: {
      result = "Error inesperado.";
      break;
    }
  }
  return result;
}
```

4. **cat:** Muy similar al anterior pero en vez de mostrar el contenido de un directorio muestra al de un fichero.
```typescript
public cat(path: string): string {
  let result: string = "";
  switch (this.check(path)) {
    case "file": {
      const cat = spawn('cat', [path]);
      cat.stdout.on('data', (piece) => result += piece);
      cat.stdout.on('close', () => {
        return result;
      });
      break;
    }
    case "directory": {
      result = "No se puede hacer un cat sobre un directorio.";
      break;
    }
    case undefined: {
      result = "No existe la ruta destino.";
      break;
    }
    default: {
      result = "Error inesperado.";
      break;
    }
  }
  return result;
}
```

5. **remove:** Elimina un directorio o archivo especificado. Primero comprueba cuál de los dos es y luego los elimina. Devuelve true si todo va bien. False si hay algún error.
```typescript
public remove(path: string): boolean {
  switch (this.check(path)) {
    case "file": {
  this.fs_.rmSync(path);
  return true;
    }
    case "directory": {
  this.fs_.rmdirSync(path);
  return true;
    }
    default: {
  return false;
    }
  }
}
```

6. **move:** Cambia un archivo o directorio de ubicación. Para ello crea un proceso hijo que ejecuta el comando mv con los parámetros correspondientes. Devuelve true si todo va bien. False si hay algún error.
```typescript
public move(source: string, dest: string): boolean {
  if (this.fs_.existsSync(source)) {
    const mv = spawn('mv', [source, dest]);
    mv.on('close', () => {
  return true;
    });
    return true;
  } else {
    return false;
  }
}
```

7. **copy:** Muy similar a move, pero en vez de cambiar de ubicación, hace una copia del mismo en la nueva ubicación.
```typescript
public copy(source: string, dest: string): boolean {
  if (this.fs_.existsSync(source)) {
    const cp = spawn('cp', [source, dest]);
    cp.on('close', () => {
    return true;
    });
    return true;
  } else {
    return false;
  }
}
```

## **Conclusión**

Node.js nos proporciona una manera eficaz y sencilla de trabajar con ficheros. SI añadimos esto a los paquetes de chalk y yargs descubrimos un montón de posibilidades a la hora de trabajar con los archivos y la linea de comandos. Además el formato JSON nos proporciona una forma sencilla de almacenar nuestros objetos y exportarlos rápidamente. Además el poder ejecutar comandos propios de linux como procesos hijos da mucha versatilidad y te permite hace casi cualquer cosa.