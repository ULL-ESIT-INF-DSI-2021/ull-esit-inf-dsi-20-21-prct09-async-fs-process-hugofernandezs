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
    if (this.fs_.acces(this.filePath_)) {
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
      return undefined;
    } else {
      this.fs_.watchFile(this.filePath_, (curr: any, prev: any) => {
        const cat = cp.spawn('cut', ['-d', '\',\'', '-f', `${column}`]);
        cat.stdout.pipe(process.stdout);
      });
    }
  }
}
