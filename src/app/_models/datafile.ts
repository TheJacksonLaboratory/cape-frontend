import { Parameters } from 'src/app/_models/parameters';

export class DataFile {
    id: number;
    filename: string;
    parameter_files: Parameters[];
}
