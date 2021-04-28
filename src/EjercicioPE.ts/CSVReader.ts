import * as cp from 'child_process';

/**
 * Reads a file in CSV format.
 */
export class CSVReader {
  private fs_ = require('fs');
  private filePath_: string;
  private dataArray_: string[];
  
  /**
   * Constructor.
   * @param file File to read from.
   */
  constructor(file: string) {
    this.filePath_ = file;
    this.dataArray_ = [];
  }


  /**
   * Checks if the file exists.
   * @returns true if the fil Exists. False if not.
   */
  private fileExists(): boolean {
    if (this.fs_.existsSync(this.filePath_)) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Starts analizing the file.
   */
  public start(column: number): void {
    if (!this.fileExists()) {
      console.log("El fichero no existe.");
      return;
    } else {
      console.log(`Analizando el fichero ${this.filePath_}`);
      this.fs_.watchFile(this.filePath_, () => {
        const cut = cp.spawn('cut', ['-d', ',', '-f', `${column}`, `${this.filePath_}`]);

        cut.on('close', () => {
          return;
        });

        // cut.stdout.pipe(process.stdout);
        let cutOutput: string = '';
        cut.stdout.on('data', (line) => cutOutput += line);
        console.log(`Salida: ${cutOutput}`);
        const cutArray = cutOutput.split(/\s/);
        console.log(`\n\nValores tras modificación: ${cutArray}`);
      });
    }
  }
}


//const reader = new CSVReader('/home/usuario/ull-esit-inf-dsi-20-21-prct09-async-fs-process-hugofernandezs/data/data.csv');
//reader.start(2);

