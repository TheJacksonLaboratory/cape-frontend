import { Parameters } from 'src/app/_models/parameters';

export class DataFile {
    id: number;
    filename: string;
    parameter_files: Parameters[];

    constructor(id?: number, filename?: string, parameterFiles?: Parameters[]) {
        this.id = id;
        this.filename = filename;
        this.parameter_files = parameterFiles;
    }

    private static toDataFile(obj: any): DataFile {
        const datafile = new DataFile();
        datafile.id = obj['id'];
        datafile.filename = obj['filename'];
        datafile.parameter_files = obj['parameter_files'];
        return datafile;
    }

    /**
     * Parse an object and returns a Data file object
     * @param obj a json object for instance
     */
    public static parse(params: any): DataFile {
        const datafile_string = params['datafile'];
        let dataFileObj: DataFile;
        if (datafile_string === undefined) {
            dataFileObj = new DataFile();
        } else {
            // parse into obj
            dataFileObj = DataFile.toDataFile(JSON.parse(datafile_string));
        }
        return dataFileObj;
    }
}
