export class Parameters {
    private _id: number;
    private _title: string;
    private _filename: string;
    private _selectPlot: string;
    private _colorBy: string;
    private _covariateSelection: string[];
    private _traitSelection: string[];
    private _normalize: boolean;
    private _meanCenter: boolean;
    private _traitsToScan: string;
    private _numOfEigentraits: number;
    private _pValueCorrection: string;
    private _slsReferenceAllele: string;
    private _slsNumberOfPermutations: number;
    private _slsUseKinship: boolean;
    private _slsKinshipType: string;
    private _msNumberToTest: number;
    private _msMethod: string;
    private _msPeakDensity: number;
    private _msTolerance: number;
    private _msOrganism: string;
    private _msSnpFileName: string;
    private _psNullSize: number;
    private _psMarkerPairConstraints: string;
    private _psMaxMarkerCorrelation: number;
    private _psMinIndPerGenotype: number;
    private _dateCreated: Date;
    private _yamlFile: string;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get filename(): string {
        return this._filename;
    }
    public set filename(value: string) {
        this._filename = value;
    }
    public get selectPlot(): string {
        return this._selectPlot;
    }
    public set selectPlot(value: string) {
        this._selectPlot = value;
    }
    public get colorBy(): string {
        return this._colorBy;
    }
    public set colorBy(value: string) {
        this._colorBy = value;
    }
    public get covariateSelection(): string[] {
        return this._covariateSelection;
    }
    public set covariateSelection(value: string[]) {
        this._covariateSelection = value;
    }
    public get traitSelection(): string[] {
        return this._traitSelection;
    }
    public set traitSelection(value: string[]) {
        this._traitSelection = value;
    }
    public get normalize(): boolean {
        return this._normalize;
    }
    public set normalize(value: boolean) {
        this._normalize = value;
    }
    public get meanCenter(): boolean {
        return this._meanCenter;
    }
    public set meanCenter(value: boolean) {
        this._meanCenter = value;
    }
    public get traitsToScan(): string {
        return this._traitsToScan;
    }
    public set traitsToScan(value: string) {
        this._traitsToScan = value;
    }
    public get numOfEigentraits(): number {
        return this._numOfEigentraits;
    }
    public set numOfEigentraits(value: number) {
        this._numOfEigentraits = value;
    }
    public get pValueCorrection(): string {
        return this._pValueCorrection;
    }
    public set pValueCorrection(value: string) {
        this._pValueCorrection = value;
    }
    public get slsReferenceAllele(): string {
        return this._slsReferenceAllele;
    }
    public set slsReferenceAllele(value: string) {
        this._slsReferenceAllele = value;
    }
    public get slsNumberOfPermutations(): number {
        return this._slsNumberOfPermutations;
    }
    public set slsNumberOfPermutations(value: number) {
        this._slsNumberOfPermutations = value;
    }
    public get slsUseKinship(): boolean {
        return this._slsUseKinship;
    }
    public set slsUseKinship(value: boolean) {
        this._slsUseKinship = value;
    }
    public get slsKinshipType(): string {
        return this._slsKinshipType;
    }
    public set slsKinshipType(value: string) {
        this._slsKinshipType = value;
    }
    public get msNumberToTest(): number {
        return this._msNumberToTest;
    }
    public set msNumberToTest(value: number) {
        this._msNumberToTest = value;
    }
    public get msMethod(): string {
        return this._msMethod;
    }
    public set msMethod(value: string) {
        this._msMethod = value;
    }
    public get msPeakDensity(): number {
        return this._msPeakDensity;
    }
    public set msPeakDensity(value: number) {
        this._msPeakDensity = value;
    }
    public get msTolerance(): number {
        return this._msTolerance;
    }
    public set msTolerance(value: number) {
        this._msTolerance = value;
    }
    public get msOrganism(): string {
        return this._msOrganism;
    }
    public set msOrganism(value: string) {
        this._msOrganism = value;
    }
    public get msSnpFileName(): string {
        return this._msSnpFileName;
    }
    public set msSnpFileName(value: string) {
        this._msSnpFileName = value;
    }
    public get psNullSize(): number {
        return this._psNullSize;
    }
    public set psNullSize(value: number) {
        this._psNullSize = value;
    }
    public get psMarkerPairConstraints(): string {
        return this._psMarkerPairConstraints;
    }
    public set psMarkerPairConstraints(value: string) {
        this._psMarkerPairConstraints = value;
    }
    public get psMaxMarkerCorrelation(): number {
        return this._psMaxMarkerCorrelation;
    }
    public set psMaxMarkerCorrelation(value: number) {
        this._psMaxMarkerCorrelation = value;
    }
    public get psMinIndPerGenotype(): number {
        return this._psMinIndPerGenotype;
    }
    public set psMinIndividualPerGenotype(value: number) {
        this._psMinIndPerGenotype = value;
    }
    public get dateCreated(): Date {
        return this._dateCreated;
    }
    public set dateCreated(value: Date) {
        this._dateCreated = value;
    }
    public get yamlFile(): string {
        return this._yamlFile;
    }
    public set yamlFile(value: string) {
        this._yamlFile = value;
    }
}
