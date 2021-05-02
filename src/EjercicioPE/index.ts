import yargs from 'yargs';
import {CSVReader} from './CSVReader'

let file: string = "";
let column: number = -1;
yargs.command({
  command: 'cut',
  describe: 'Listar la columna del fichero.',
  builder: {
    file: {
      describe: 'Fichero a analizar',
      demandOption: true,
      type: 'string',
    },
    column: {
      describe: 'Columna dentro del fichero a leer.',
      demandOption: true,
      type: 'number',
    },
  },
  handler(argv) {
    if (typeof argv.file === 'string' && typeof argv.column === 'number') {
      console.log(`${argv.file} - ${argv.column}`)
      file = argv.file;
      column = argv.column
      const reader = new CSVReader(file);
      reader.start(column);
    }
  },
});

if (file === "" || column === -1) {
  console.log("Introduzca un comando correcto");
} else {
}

yargs.parse();
