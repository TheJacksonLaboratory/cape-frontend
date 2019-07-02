import { Parameters } from 'src/app/_models/parameters';

export class DataFile {
    id: number;
    filename: string;
    parameter_files: Parameters[];

    constructor(id: number, filename: string, parameterFiles: Parameters[]) {
        this.id = id;
        this.filename = filename;
        this.parameter_files = parameterFiles;
    }
}
