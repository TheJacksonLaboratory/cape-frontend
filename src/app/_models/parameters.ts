export class Parameters {
    filename: string;
    covariateSelection: string[];
    traitSelection: string[];
    plotType: string;
    colorByType: string;
    useNormalize: boolean;
    useMeanCenter: boolean;
    traitsToScan: string;
    numberOfEts: number;
    pValueCorrection: string;
    referenceAllele: string;
    numberOfPermutation: number;
    useKinshipCorrection: boolean;
    numberOfMarkersToTest: number;
    markerSelectionMethod: string;
    peakDensity: number;
    tolerance: number;
    organism: string;
    snpFilename: string;
    nullSize: number;
    markerPairConstraints: string;
    minIndividualsPerGenotype: number;
    maxMarkerCorrelation: number;
}
