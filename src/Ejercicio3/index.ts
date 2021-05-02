import yargs from 'yargs';
import {FileManager} from './P8/models/FileManager';

const fm = new FileManager();

/**
 * Comando para observar un directorio.
 */
yargs.command( {
  command: 'watch',
  describe: 'Observa un fichero y sus cambios',
  builder: {
    route: {
      describe: 'Ruta al directorio',
      demandOption: true,
      type: 'string',
    },
    name: {
      describe: 'Nombre del fichero',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.route === "string" && typeof argv.name === "string") {
      fm.watch(argv.route);
    }
  },
});

yargs.parse();