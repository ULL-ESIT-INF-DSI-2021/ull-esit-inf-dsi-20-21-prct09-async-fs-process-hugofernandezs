import * as fs from 'fs';
import * as chalk from 'chalk';
import {spawn} from 'child_process';


export class FileManager {
  private fileName_: string;

  constructor(fileName: string) {
    this.fileName_ = fileName;
  }

  /**
   * Method without using pipe, giving file information to the user.
   * @param options User option wanted.
   */
  public getInfo(options: string[]) {
    if (fs.existsSync(this.fileName_)) {
      const wc = spawn('wc', [this.fileName_]);
      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);

      wc.on('close', () => {
        const wcArray = wcOutput.split(/\s+/);
        options.forEach((option) => {
          switch (option) {
            case 'lines':
              console.log(/*chalk.green*/(`El archivo contiene ${parseInt(wcArray[1]) + 1} lineas.`));
              break;
            case 'words':
              console.log(/*chalk.green*/(`El archivo contiene ${wcArray[2]} palabras.`));
              break;
            case 'chars':
              console.log(/*chalk.green*/(`El archivo contiene ${wcArray[3]} letras.`));
              break;
            default:
              console.log(/*chalk.red*/(`No se reconoce el argumento ${option}.`));
          }
        })
      });
    } else {
      console.error(/*chalk.red*/(`No se encuentra el archivo ${this.fileName_}.`));
    }
  }


  /**
   * Method using pipe, giving file information to the user.
   * @param options User option wanted.
   */
  public getInfoPipe(options: string[]) {
    if (fs.existsSync(this.fileName_)) {
      const wc = spawn('wc', [this.fileName_]);
      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);
  
      wc.on('close', () => {
        const wcArray = wcOutput.split(/\s+/);
        options.forEach((option) => {
          switch (option) {
            case 'lines':
              const echoLines = spawn('echo', [`El archivo contiene ${parseInt(wcArray[1]) + 1} lineas`]);
              echoLines.stdout.pipe(process.stdout);
              break;
            case 'words':
              const echoWords = spawn('echo', [`El archivo contiene ${parseInt(wcArray[2])} palabras`]);
              echoWords.stdout.pipe(process.stdout);
              break;
            case 'chars':
              const echoChars = spawn('echo', [`El archivo contiene ${parseInt(wcArray[3])} letras`]);
              echoChars.stdout.pipe(process.stdout);
              break;
          }
        })
      });
    } else {
      console.error(/*chalk.red*/(`${this.fileName_} note, doesnt exists!`));
    }
  }
}
 