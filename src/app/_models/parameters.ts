export class Parameters {
  id: number;
  title: string;
  select_plot: string;
  color_by: string;
  covariate_selection: string[];
  trait_selection: string[];
  normalize: boolean;
  mean_center: boolean;
  traits_to_scan: string;
  number_of_eigentraits: number;
  p_value_correction: string;
  sls_reference_allele: string;
  sls_number_of_permutations: number;
  sls_use_kinship: boolean;
  sls_kinship_type: string;
  ms_number_to_test: number;
  ms_method: string;
  ms_peak_density: number;
  ms_tolerance: number;
  ms_organism: string;
  ms_snp_filename: string;
  ps_null_size: number;
  ps_marker_pair_constraints: string;
  ps_max_marker_correlation: number;
  ps_min_individual_per_genotype: number;
  yaml_file: string;
  date_created: Date;
  user_id: number;
  datafile_id: number;

  constructor(id?: number, title?: string, selectPlot?: string, colorBy?: string, covariateSelection?: string[],
    traitSelection?: string[], normalize?: boolean, meanCenter?: boolean, traitsToScan?: string,
    numberOfEigentraits?: number, pValueCorrection?: string, slsReferenceAllele?: string,
    slsNumberOfPermutation?: number, slsUseKinship?: boolean, slsKinshipType?: string,
    msNumberToTest?: number, msMethod?: string, msPeakDensity?: number, msTolerance?: number,
    msOrganism?: string, msSnpFilename?: string, psNullSize?: number, psMarkerPairConstraints?: string,
    psMaxMarkerCorrelation?: number, psMinIndividualPerGenotype?: number, yamlFile?: string,
    dateCreated?: Date, userId?: number, dataFileId?: number) {
    this.id = id;
    this.select_plot = selectPlot;
    this.color_by = colorBy;
    this.covariate_selection = covariateSelection;
    this.trait_selection = traitSelection;
    this.normalize = normalize;
    this.mean_center = meanCenter;
    this.traits_to_scan = traitsToScan;
    this.number_of_eigentraits = numberOfEigentraits;
    this.p_value_correction = pValueCorrection;
    this.sls_reference_allele = slsReferenceAllele;
    this.sls_number_of_permutations = slsNumberOfPermutation;
    this.sls_use_kinship = slsUseKinship;
    this.sls_kinship_type = slsKinshipType;
    this.ms_number_to_test = msNumberToTest;
    this.ms_method = msMethod;
    this.ms_peak_density = msPeakDensity;
    this.ms_tolerance = msTolerance;
    this.ms_organism = msOrganism;
    this.ms_snp_filename = msSnpFilename;
    this.ps_null_size = psNullSize;
    this.ps_marker_pair_constraints = psMarkerPairConstraints;
    this.ps_max_marker_correlation = psMaxMarkerCorrelation;
    this.ps_min_individual_per_genotype = psMinIndividualPerGenotype;
    this.yaml_file = yamlFile;
    this.date_created = dateCreated;
    this.user_id = userId;
    this.datafile_id = dataFileId;
  }

  private static toParameters(obj: any): Parameters {
    const parameter = new Parameters();
    parameter.id = obj['id'];
    parameter.title = obj['title'];
    parameter.select_plot = obj['select_plot'];
    parameter.color_by = obj['color_by'];
    parameter.covariate_selection = obj['covariate_selection'] !== undefined ? obj['covariate_selection'].split(',') : undefined;
    parameter.trait_selection = obj['trait_selection'] !== undefined ? obj['trait_selection'].split(',') : undefined;
    parameter.normalize = obj['normalize'];
    parameter.mean_center = obj['mean_center'];
    parameter.traits_to_scan = obj['traits_to_scan'];
    parameter.number_of_eigentraits = obj['number_of_eigentraits'];
    parameter.p_value_correction = obj['p_value_correction'];
    parameter.sls_reference_allele = obj['sls_reference_allele'];
    parameter.sls_number_of_permutations = obj['sls_number_of_permutations'];
    parameter.sls_use_kinship = obj['sls_use_kinship'];
    parameter.sls_kinship_type = obj['sls_kinship_type'];
    parameter.ms_number_to_test = obj['ms_number_to_test'];
    parameter.ms_method = obj['ms_method'];
    parameter.ms_peak_density = obj['ms_peak_density'];
    parameter.ms_tolerance = obj['ms_tolerance'];
    parameter.ms_organism = obj['ms_organism'];
    parameter.ms_snp_filename = obj['ms_snp_filename'];
    parameter.ps_null_size = obj['ps_null_size'];
    parameter.ps_marker_pair_constraints = obj['ps_marker_pair_constraints'];
    parameter.ps_max_marker_correlation = obj['ps_max_marker_correlation'];
    parameter.ps_min_individual_per_genotype = obj['ps_min_individual_per_genotype'];
    parameter.yaml_file = obj['yaml_file'];
    parameter.user_id = obj['user_id'];
    parameter.datafile_id = obj['datafile_id'];
    return parameter;
  }

  /**
   * Parse an object and returns a Parameters object
   * @param obj a json object for instance
   */
  public static parse(params: any): Parameters {
    const param_string = params['parameters'];
    let paramsObj: Parameters;
    if (param_string === undefined) {
      paramsObj = new Parameters();
    } else {
      // parse into obj
      paramsObj = Parameters.toParameters(JSON.parse(param_string));
    }
    return paramsObj;
  }

}
