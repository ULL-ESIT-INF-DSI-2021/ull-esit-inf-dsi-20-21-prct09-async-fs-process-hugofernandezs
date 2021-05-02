import chalk from 'chalk';
import {spawn} from 'child_process';


/**
 * Maneja un fichero.
 */
export class FileManager {
  private fs_ = require('fs');
  private fileName_: string;

  /**
   * Constructor.
   * @param fileName Nombre del archivo a inspeccionar.
   */
  constructor(fileName: string) {
    this.fileName_ = fileName;
  }


  /**
   * Imprime la información del archivo.
   * @param options Opciónes de infromación.
   */
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


  /**
   * Imprime la información del archivo usando una pipe.
   * @param options Opciónes de infromación.
   */
  public getInfoPipe(options: string[]) {
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
 