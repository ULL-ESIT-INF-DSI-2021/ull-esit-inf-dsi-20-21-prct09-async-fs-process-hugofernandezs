import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {FileManager} from './FileManager';


yargs.command( {
  command: 'info',
  describe: 'Returns the information of the file',
  builder: {
    file: {
      describe: 'File to analice',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Pipe to use',
      demandOption: true,
      type: 'string',
    },
    lines: {
      describe: 'User option',
      demandOption: false,
      type: 'string',
    },
    words: {
      describe: 'User option',
      demandOption: false,
      type: 'string',
    },
    chars: {
      describe: 'User option',
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
        console.log(/*chalk.red*/('Introduzca al menos una opción.'));
        return;
      }
      const fm = new FileManager(argv.file);
      switch (argv.pipe) {
        case "yes": {
          fm.getInfoPipe(options);
        }
        case "no": {
          fm.getInfo(options);
        }
      }
    } else {
      console.log(/*chalk.red*/(`Debe introducir el nombre del fichero.`));
    }
  },
});

yargs.argv;
