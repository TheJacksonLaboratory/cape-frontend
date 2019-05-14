import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParametersService {

  private paramFileIdxSubject = new Subject<number>();
  private traitSelectionSubject = new Subject<any>();
  private covariateSelectionSubject = new Subject<any>();
  private fileNameSubject = new Subject<string>();
  private selectPlotSubject = new Subject<string>();
  private colorBySubject = new Subject<any>();
  private normalizeSubject = new Subject<boolean>();
  private meanCenterSubject = new Subject<boolean>();
  private traitsToScanSubject = new Subject<string>();
  private numberOfEigentraitsSubject = new Subject<number>();
  private pValueCorrectionSubject = new Subject<string>();
  private referenceAlleleSubject = new Subject<string>();
  private numberOfPermutationsSubject = new Subject<number>();
  private useKinshipSubject = new Subject<boolean>();
  private kinshipTypeSubject = new Subject<string>();
  private msNumberToTestSubject = new Subject<number>();
  private msMethodSubject = new Subject<string>();
  private msPeakDensitySubject = new Subject<number>();
  private msToleranceSubject = new Subject<number>();
  private msOrganismSubject = new Subject<string>();
  private msSnpFileNameSubject = new Subject<string>();
  private psNullSizeSubject = new Subject<number>();
  private psMarkerPairConstraintsSubject = new Subject<string>();
  private psMaxMarkerCorrelationSubject = new Subject<number>();
  private psMinIndPerGenotypeSubject = new Subject<number>();

  setParameterFileIdxSelected(fileIdxSelected: number) {
    this.paramFileIdxSubject.next(fileIdxSelected);
  }
  getParameterFileIdxSelected(): Observable<any> {
    return this.paramFileIdxSubject.asObservable();
  }
  setFileName(fileName: string) {
    this.fileNameSubject.next(fileName);
  }
  getFileName() {
    return this.fileNameSubject.asObservable();
  }
  setSelectPlot(selectPlot: string) {
    this.selectPlotSubject.next(selectPlot);
  }
  getSelectPlot() {
    return this.selectPlotSubject.asObservable();
  }
  setColorBy(colorBy: any) {
    this.colorBySubject.next(colorBy);
  }
  getColorBy() {
    return this.colorBySubject.asObservable();
  }
  setTraitSelection(checkedNode: Set<string>) {
    this.traitSelectionSubject.next(checkedNode);
  }
  getTraitSelection(): Observable<any> {
    return this.traitSelectionSubject.asObservable();
  }
  setCovariateSelection(checkedNode: Set<string>) {
    this.covariateSelectionSubject.next(checkedNode);
  }
  getCovariateSelection(): Observable<any> {
    return this.covariateSelectionSubject.asObservable();
  }
  setNormalize(normalize: boolean) {
    this.normalizeSubject.next(normalize);
  }
  getNormalize() {
    return this.normalizeSubject.asObservable();
  }
  setMeanCenter(meanCenter: boolean) {
    this.meanCenterSubject.next(meanCenter);
  }
  getMeanCenter() {
    return this.meanCenterSubject.asObservable();
  }
  setTraitsToScan(traitsToScan: string) {
    this.traitsToScanSubject.next(traitsToScan);
  }
  getTraitsToScan() {
    return this.traitsToScanSubject.asObservable();
  }
  setNumOfEignentraits(numOfEignenTraits: number) {
    this.numberOfEigentraitsSubject.next(numOfEignenTraits);
  }
  getNumOfEigentraits() {
    return this.numberOfEigentraitsSubject.asObservable();
  }
  setPValueCorrection(pValueCorrection: string) {
    this.pValueCorrectionSubject.next(pValueCorrection);
  }
  getPValueCorrection() {
    return this.pValueCorrectionSubject.asObservable();
  }
  setReferenceAllele(referenceAllele: string) {
    this.referenceAlleleSubject.next(referenceAllele);
  }
  getReferenceAllele() {
    return this.referenceAlleleSubject.asObservable();
  }
  setNumberOfPermutations(numberOfPermutations: number) {
    this.numberOfPermutationsSubject.next(numberOfPermutations);
  }
  getNumberOfPermutations() {
    return this.numberOfPermutationsSubject.asObservable();
  }
  setUseKinship(useKinship: boolean) {
    this.useKinshipSubject.next(useKinship);
  }
  getUseKinship() {
    return this.useKinshipSubject.asObservable();
  }
  setKinshipType(kinshipType: string) {
    this.kinshipTypeSubject.next(kinshipType);
  }
  getKinshipType() {
    return this.kinshipTypeSubject.asObservable();
  }
  setMsNumberToTest(msNumberToTest: number) {
    this.msNumberToTestSubject.next(msNumberToTest);
  }
  getMsNumberToTest() {
    return this.msNumberToTestSubject.asObservable();
  }
  setMsMethod(msMethod: string) {
    this.msMethodSubject.next(msMethod);
  }
  getMsMethod() {
    return this.msMethodSubject.asObservable();
  }
  setMsPeakDensity(msPeakDensity: number) {
    this.msPeakDensitySubject.next(msPeakDensity);
  }
  getMsPeakDensity() {
    return this.msPeakDensitySubject.asObservable();
  }
  setMsTolerance(msTolerance: number) {
    this.msToleranceSubject.next(msTolerance);
  }
  getMsTolerance() {
    return this.msToleranceSubject.asObservable();
  }
  setMsOrganism(msOrganism: string) {
    this.msOrganismSubject.next(msOrganism);
  }
  getMsOrganism() {
    return this.msOrganismSubject.asObservable();
  }
  setMsSnpFileName(msSnpFileName: string) {
    this.msSnpFileNameSubject.next(msSnpFileName);
  }
  getMsSnpFileName() {
    return this.msSnpFileNameSubject.asObservable();
  }
  setPsNullSize(psNullSize: number) {
    this.psNullSizeSubject.next(psNullSize);
  }
  getPsNullSize() {
    return this.psNullSizeSubject.asObservable();
  }
  setPsMarkerPairConstraints(psMarkerPairConstraints: string) {
    this.psMarkerPairConstraintsSubject.next(psMarkerPairConstraints);
  }
  getPsMarkerPairConstraints() {
    return this.psMarkerPairConstraintsSubject.asObservable();
  }
  setPsMaxMarkerCorrelation(psMaxMarkerCorrelation: number) {
    this.psMaxMarkerCorrelationSubject.next(psMaxMarkerCorrelation);
  }
  getPsMaxMarkerCorrelation() {
    return this.psMaxMarkerCorrelationSubject.asObservable();
  }
  setPsMinIndPerGenotype(psMinIndPerGenotype: number) {
    this.psMinIndPerGenotypeSubject.next(psMinIndPerGenotype);
  }
  getPsMinIndPerGenotype() {
    return this.psMinIndPerGenotypeSubject.asObservable();
  }
}
