import yargs from 'yargs';
import chalk from 'chalk';
import {FileManager} from './FileManager';


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

yargs.argv;
