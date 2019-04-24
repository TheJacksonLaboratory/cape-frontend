import { BehaviorSubject, throwError } from 'rxjs';
import { ChildrenOutletContexts } from '@angular/router';
import { nodeChildrenAsMap } from '@angular/router/src/utils/tree';
import { TreeComponent } from './ct-selection/tree/tree.component';

/**
 * Node for phenotypes
 */
export class PhenotypeNode {

        // children: PhenotypeNode[];
        // parent: PhenotypeNode;
        // constructor(public name: string) {
        //         this.name = name;
        // }
        nodeid: number;
        parent: PhenotypeNode;
        children: BehaviorSubject<PhenotypeNode[]> = new BehaviorSubject<PhenotypeNode[]>([]);
        /**
         * Node constructor
         * @param name name of node
         * @param nodeIds Set of already created nodes
         * @param nodeid unique id for each node
         */
        constructor(public name: string, public nodeIds: Set<number>, nodeid?: number) {
                this.children = new BehaviorSubject([]);
                if (nodeid) {
                        this.setNodeId(nodeid);
                }
        }

        setNodeId(nodeid: number) {
                if (!this.nodeIds.has(nodeid)) {
                        this.nodeid = nodeid;
                        this.nodeIds.add(nodeid);
                } else {
                        throwError ('Node already exists!');
                }
        }

        addChild(child: any) {
                this.children.next(this.children.getValue().concat([child]));
        }

        setParent(parent: PhenotypeNode) {
                this.parent = parent;
        }

}

export class FileParameterData {

        /**
         * Data used to populate the File Parameter component
         */

        public static fileSelections = [
                ['Sex', 'Genotype', 'APP_grch37', 'PS1_grch37', 'PS1_mm10',
                'APP_mm10', 'X6.ELISA', 'X14..ELISA', 'ymaze.distance.4',
                'ymaze.totalarms.4', 'ymaze.SponAlt.4', 'ymaze.AAR.4', 'weight.4',
                'ymaze.distance.6', 'ymaze.totalarms.6', 'ymaze.SponAlt.6', 'ymaze.AAR.6',
                'weight.6', 'Narrow.beam.6', 'Incline.screen.6', 'Grip.strength.6',
                'Sensoritor.sum.6', 'Blood.glucose.6', 'EPM.distance.6', 'EPM.totalarms.6',
                'EPM.PercenOpenEntries.6', 'EPM.PercenOpenTime.6', 'ymaze.distance.8', 'ymaze.totalarms.8',
                'ymaze.SponAlt.8', 'ymaze.AAR.8', 'weight.8', 'ymaze.distance.12',
                'ymaze.totalarms.12', 'ymaze.SponAlt.12', 'ymaze.AAR.12', 'weight.12',
                'Blood.glucose.12', 'ymaze.distance.14', 'ymaze.totalarms.14', 'ymaze.SponAlt.14',
                'ymaze.AAR.14', 'weight.14', 'Narrow.beam.terminal', 'incline.screen.terminal',
                'grip.strength.terminal', 'Terminal.sensoritor.sum', 'Blood.glucose.terminal',
                'EPM.distance.terminal', 'EPM.total.entries.terminal', 'EPM.Perc.Open.Entries.terminal',
                'EPM.Percen.Open.Time.terminal', 'FC.6.BL', 'FC.6.PS1', 'FC.6.PS2',
                'FC6.PS3', 'FC.6.PS4', 'FC.6.CFM.Bin1', 'FC.6.CFM.Bin2', 'FC.6.CFM.Bin3',
                'FC.6.Bin4', 'FC.6.Bin5', 'FC.6.CFM.total', 'FC.14.BL', 'FC.14.PS1', 'FC.14.PS2',
                'FC14.PS3', 'FC.14.PS4', 'FC.14.CFM.Bin1', 'FC.14.CFM.Bin2', 'FC.14.CFM.Bin3',
                'FC.14.Bin4', 'FC.14.Bin5', 'FC.14.CFM.total', 'Narrow.beam.change',
                'incline.screen.change', 'grip.strength.change', 'change.sensoritor.sum',
                'Blood.glucose.change', 'EPM.distance.change', 'EPM.total.entries.change',
                'EPM.Perc.Open.Entries.change', 'EPM.Percen.Open.Time.change', 'Decline.score.WM',
                'Decline.Slope.WM.Intercept', 'Decline.Slope.WM', 'Decline.Slope.WM.R.squared', 'AAO'],

                ['Sex', 'Genotype', 'APP_grch37', 'PS1_grch37', 'PS1_mm10', 'APP_mm10',
                'ymaze.distance.4', 'ymaze.totalarms.4', 'ymaze.SponAlt.4', 'ymaze.AAR.4',
                'weight.4', 'ymaze.distance.6', 'ymaze.totalarms.6', 'ymaze.SponAlt.6',
                'ymaze.AAR.6', 'weight.6', 'Narrow.beam.6', 'Incline.screen.6', 'Grip.strength.6',
                'Sensoritor.sum.6', 'Blood.glucose.6', 'EPM.distance.6', 'EPM.totalarms.6',
                'EPM.PercenOpenEntries.6', 'EPM.PercenOpenTime.6', 'ymaze.distance.8',
                'ymaze.totalarms.8', 'ymaze.SponAlt.8', 'ymaze.AAR.8', 'weight.8',
                'ymaze.distance.12', 'ymaze.totalarms.12', 'ymaze.SponAlt.12', 'ymaze.AAR.12',
                'weight.12', 'Blood.glucose.12', 'ymaze.distance.14', 'ymaze.totalarms.14',
                'ymaze.SponAlt.14', 'ymaze.AAR.14', 'weight.14', 'Narrow.beam.terminal',
                'incline.screen.terminal', 'grip.strength.terminal', 'Terminal.sensoritor.sum',
                'Blood.glucose.terminal', 'EPM.distance.terminal', 'EPM.total.entries.terminal',
                'EPM.Perc.Open.Entries.terminal', 'EPM.Percen.Open.Time.terminal', 'FC.6.BL',
                'FC.6.PS1', 'FC.6.PS2', 'FC6.PS3', 'FC.6.PS4', 'FC.6.CFM.Bin1', 'FC.6.CFM.Bin2',
                'FC.6.CFM.Bin3', 'FC.6.Bin4', 'FC.6.Bin5', 'FC.6.CFM.total', 'FC.14.BL',
                'FC.14.PS1', 'FC.14.PS2', 'FC14.PS3', 'FC.14.PS4', 'FC.14.CFM.Bin1',
                'FC.14.CFM.Bin2', 'FC.14.CFM.Bin3', 'FC.14.Bin4', 'FC.14.Bin5', 'FC.14.CFM.total',
                'Narrow.beam.change', 'incline.screen.change', 'grip.strength.change',
                'change.sensoritor.sum', 'Blood.glucose.change', 'EPM.distance.change',
                'EPM.total.entries.change', 'EPM.Perc.Open.Entries.change', 'EPM.Percen.Open.Time.change',
                'Decline.score.WM', 'Decline.Slope.WM.Intercept', 'Decline.Slope.WM',
                'Decline.Slope.WM.R.squared', 'AAO'],

                ['Sex', 'Genotype', 'APP_grch37', 'PS1_grch37', 'PS1_mm10', 'APP_mm10',
                'ymaze.distance.4', 'ymaze.totalarms.4', 'ymaze.SponAlt.4', 'ymaze.AAR.4',
                'weight.4', 'ymaze.distance.6', 'ymaze.totalarms.6', 'ymaze.SponAlt.6',
                'ymaze.AAR.6', 'weight.6', 'Narrow.beam.6', 'Incline.screen.6', 'Grip.strength.6',
                'Sensoritor.sum.6', 'Blood.glucose.6', 'EPM.distance.6', 'EPM.totalarms.6',
                'EPM.PercenOpenEntries.6', 'EPM.PercenOpenTime.6', 'ymaze.distance.8',
                'ymaze.totalarms.8', 'ymaze.SponAlt.8', 'ymaze.AAR.8', 'weight.8',
                'ymaze.distance.12', 'ymaze.totalarms.12', 'ymaze.SponAlt.12', 'ymaze.AAR.12',
                'weight.12', 'ymaze.distance.14', 'ymaze.totalarms.14', 'ymaze.SponAlt.14',
                'ymaze.AAR.14', 'weight.14', 'Narrow.beam.terminal', 'incline.screen.terminal',
                'grip.strength.terminal', 'Terminal.sensoritor.sum', 'Blood.glucose.terminal',
                'EPM.distance.terminal', 'EPM.total.entries.terminal', 'EPM.Perc.Open.Entries.terminal',
                'EPM.Percen.Open.Time.terminal', 'FC.6.BL', 'FC.6.PS1', 'FC.6.PS2', 'FC6.PS3', 'FC.6.PS4',
                'FC.6.CFM.Bin1', 'FC.6.CFM.Bin2', 'FC.6.CFM.Bin3', 'FC.6.Bin4', 'FC.6.Bin5',
                'FC.6.CFM.total', 'FC.14.BL', 'FC.14.PS1', 'FC.14.PS2', 'FC14.PS3', 'FC.14.PS4',
                'FC.14.CFM.Bin1', 'FC.14.CFM.Bin2', 'FC.14.CFM.Bin3', 'FC.14.Bin4', 'FC.14.Bin5',
                'FC.14.CFM.total', 'Narrow.beam.change', 'incline.screen.change', 'grip.strength.change',
                'change.sensoritor.sum', 'Blood.glucose.change', 'EPM.distance.change',
                'EPM.total.entries.change', 'EPM.Perc.Open.Entries.change', 'EPM.Percen.Open.Time.change',
                'Decline.score.WM', 'Decline.Slope.WM.Intercept', 'Decline.Slope.WM',
                'Decline.Slope.WM.R.squared', 'AAO'],

                ['Row', 'Weight', 'InejectedVolume', 'C2', 'X2xC1', 'C1', 'PL', 'GFRFLAG', 'GFRnNA',
                'Sex', 'ACR6WK', 'ACR10WK', 'ACR15WK', 'Alb6WK', 'Creat6WK', 'Alb10WK', 'Creat10WK',
                'Alb15WK', 'Creat15WK '],

                ['ID', 'Mouse.ID', 'Strain', 'Generation', 'Coat.Color', 'Sex', 'Experimental.Group',
                'Group.1', 'Group.2', 'Group.3', 'Group.4', 'A.or.B', 'Dissection.Wt..g.',
                'Distance..cm..First.4.min', 'Total.Distance..cm.', 'Distance.Traveled.Slope',
                'Total.Time.Corner..s.', 'Percent.Time.in.Corner', 'Pct.Time.Corner.Slope',
                'Total.Time.Periphery..s.', 'Percent.Time.Periphery', 'Pct.Time.Periphery.Slope',
                'Total.Time.Center..s.', 'Percent.Time.Center', 'Pct.Time.Center.Slope',
                'Pct.Time.Corner.Total.Time.Center', 'Percent.Time.Mobile', 'Fecal.Boli.Count',
                'Arena.Assignment', 'Paraclique_1', 'Paraclique_2', 'Paraclique_3', 'Paraclique_4',
                'Paraclique_5', 'Paraclique_6', 'Paraclique_7', 'Paraclique_8', 'Paraclique_9',
                'Paraclique_10', 'Paraclique_11', 'Paraclique_12', 'Paraclique_13', 'Paraclique_14',
                'Paraclique_15', 'Paraclique_16', 'Paraclique_17', 'Paraclique_18', 'Paraclique_19',
                'Paraclique_20', 'Paraclique_21', 'Paraclique_22', 'Paraclique_23', 'Paraclique_24',
                'Paraclique_25', 'Paraclique_26', 'Paraclique_27', 'Paraclique_28', 'Paraclique_29',
                'Paraclique_30', 'Paraclique_31', 'Paraclique_32', 'Paraclique_33', 'Paraclique_34',
                'Paraclique_35', 'Paraclique_36', 'Paraclique_37', 'Paraclique_38', 'Paraclique_40',
                'Paraclique_41', 'Paraclique_42', 'Paraclique_43', 'Paraclique_44', 'Paraclique_45',
                'Paraclique_46', 'Paraclique_47', 'Paraclique_48', 'Paraclique_49', 'Paraclique_50',
                'Paraclique_51', 'Paraclique_52', 'Paraclique_53', 'Paraclique_54', 'Paraclique_55',
                'Paraclique_56', 'Paraclique_57', 'Paraclique_58', 'Paraclique_59', 'Paraclique_60',
                'Paraclique_61', 'Paraclique_62', 'Paraclique_63', 'Paraclique_64', 'Paraclique_65',
                'Paraclique_66', 'Paraclique_67', 'Paraclique_68', 'Paraclique_69', 'Paraclique_70',
                'Paraclique_71', 'Paraclique_72', 'Paraclique_73', 'Paraclique_74', 'Paraclique_75',
                'Paraclique_76', 'Paraclique_77', 'Paraclique_78', 'Paraclique_79', 'Paraclique_80',
                'Paraclique_81', 'Paraclique_82', 'Paraclique_83', 'Paraclique_84', 'Paraclique_85',
                'Paraclique_86', 'Paraclique_87', 'Paraclique_88', 'Paraclique_89', 'Paraclique_90',
                'Paraclique_91', 'Paraclique_92', 'Paraclique_93', 'Paraclique_94', 'Paraclique_95',
                'Paraclique_96', 'Paraclique_97', 'Paraclique_98', 'Paraclique_99', 'Paraclique_100',
                'Paraclique_101', 'Paraclique_102', 'Paraclique_103', 'Paraclique_104', 'Paraclique_105',
                'Paraclique_106', 'Paraclique_107', 'Paraclique_108', 'Paraclique_109', 'Paraclique_110',
                'Paraclique_111', 'Paraclique_112', 'Paraclique_113', 'Paraclique_114', 'Paraclique_115',
                'Paraclique_116', 'Paraclique_117', 'Paraclique_118', 'Paraclique_119', 'Paraclique_120',
                'Paraclique_121', 'Paraclique_122', 'Paraclique_123', 'Paraclique_124', 'Paraclique_125',
                'Paraclique_126', 'Paraclique_127', 'Paraclique_128', 'Paraclique_129', 'Paraclique_130',
                'Paraclique_131', 'Paraclique_132', 'Paraclique_133', 'Paraclique_134', 'Paraclique_135',
                'Paraclique_136', 'Paraclique_137', 'Paraclique_138', 'Paraclique_139', 'Paraclique_140',
                'Paraclique_141', 'Paraclique_142', 'Paraclique_143', 'Paraclique_144', 'Paraclique_145'],

                ['me1', 'me2', 'me3', 'ACR1', 'ACR2', 'B.Area1', 'B.Area2', 'BMC1', 'BMC2', 'BMD1', 'BMD2',
                'BUN1', 'BUN2', 'BW.3', 'BW.4', 'BW.5', 'BW.6', 'BW.7', 'BW.8', 'BW.9', 'BW.10', 'BW.11',
                'BW.12', 'BW.13', 'BW.14', 'BW.15', 'BW.16', 'BW.17', 'BW.18', 'BW.19', 'BW.20', 'BW.21',
                'BW.22', 'BW.23', 'BW.24', 'BW.25', 'BW.26', 'BW.27', 'BW.28', 'BW.29', 'BW.30', 'Calcium1',
                'Calcium2', 'CHCM1', 'CHCM2', 'cHGB1', 'cHGB2', 'CHOL1', 'CHOL2', 'ct.EOS1', 'ct.EOS2',
                'ct.LYM1', 'ct.LYM2', 'ct.MONO1', 'ct.MONO2', 'ct.NEUT1', 'ct.NEUT2', 'fat.g.mri', 'free.h20',
                'FRUC1', 'GLDH1', 'GLDH2', 'Glucose1', 'Glucose2', 'GTT.AUC', 'GTT.t0', 'GTT.t15', 'GTT.t30',
                'GTT.t60', 'GTTt.120', 'GTTt.180', 'HCT1', 'HCT2', 'HDLD1', 'HDLD2', 'HDW1', 'HDW2', 'heart.wt',
                'HR', 'HRV', 'INSULIN', 'kidney.wt.L', 'kidney.wt.R', 'Length1', 'Length2', 'LEPTIN', 'Lipase1',
                'LTM1', 'LTM2', 'MCH1', 'MCH2', 'MCHC1', 'MCHC2', 'MCV1', 'MCV2', 'mHGB1', 'mHGB2', 'MPV1',
                'MPV2', 'NEFA1', 'NEFA2', 'non.fast.ALB2', 'non.fast.Calcium', 'non.fast.CREX',
                'non.fast.Phosphorous', 'perc.EOS1', 'perc.EOS2', 'perc.Fat1', 'perc.Fat2', 'perc.LYM1',
                'perc.LYM2', 'perc.MONO1', 'perc.MONO2', 'perc.NEUT1', 'perc.NEUT2', 'Phosphorus1',
                'Phosphorus2', 'PLT1', 'PLT2', 'pNN50...6ms.', 'PQ', 'PR', 'QRS', 'QTC', 'QTc.dispersion',
                'RBC1', 'RBC2', 'RDW1', 'RDW2', 'Retic1', 'Retic2', 'rMSSD', 'RR', 'spleen.wt', 'ST',
                'T.Area1', 'T.Area2', 'TBIL1', 'TBIL2', 'TG1', 'TG2', 'tot.h20', 'TTM1', 'TTM2',
                'urine.creatinine1', 'urine.creatinine2', 'urine.Glucose1', 'urine.Glucose2',
                'urine.microalbumin1', 'urine.microalbumin2', 'WBC1', 'WBC2', 'Weight1', 'Weight2',
                'Adiponectin', 'Ghrelin', 'Sex', 'Diet', 'logFTM1', 'Gen1', 'Gen2', 'Gen3', 'Gen4',
                'Gen5', 'Gen6', 'Litter'],

                ['me1', 'me2', 'me3', 'ACR1', 'ACR2', 'B.Area1', 'B.Area2', 'BMC1', 'BMC2', 'BMD1', 'BMD2',
                'BUN1', 'BUN2', 'BW.3', 'BW.4', 'BW.5', 'BW.6', 'BW.7', 'BW.8', 'BW.9', 'BW.10', 'BW.11',
                'BW.12', 'BW.13', 'BW.14', 'BW.15', 'BW.16', 'BW.17', 'BW.18', 'BW.19', 'BW.20', 'BW.21',
                'BW.22', 'BW.23', 'BW.24', 'BW.25', 'BW.26', 'BW.27', 'BW.28', 'BW.29', 'BW.30', 'Calcium1',
                'Calcium2', 'CHCM1', 'CHCM2', 'cHGB1', 'cHGB2', 'CHOL1', 'CHOL2', 'ct.EOS1', 'ct.EOS2',
                'ct.LYM1', 'ct.LYM2', 'ct.MONO1', 'ct.MONO2', 'ct.NEUT1', 'ct.NEUT2', 'fat.g.mri', 'free.h20',
                'FRUC1', 'GLDH1', 'GLDH2', 'Glucose1', 'Glucose2', 'GTT.AUC', 'GTT.t0', 'GTT.t15', 'GTT.t30',
                'GTT.t60', 'GTTt.120', 'GTTt.180', 'HCT1', 'HCT2', 'HDLD1', 'HDLD2', 'HDW1', 'HDW2',
                'heart.wt', 'HR', 'HRV', 'INSULIN', 'kidney.wt.L', 'kidney.wt.R', 'Length1', 'Length2',
                'LEPTIN', 'Lipase1', 'LTM1', 'LTM2', 'MCH1', 'MCH2', 'MCHC1', 'MCHC2', 'MCV1', 'MCV2',
                'mHGB1', 'mHGB2', 'MPV1', 'MPV2', 'NEFA1', 'NEFA2', 'non.fast.ALB2', 'non.fast.Calcium',
                'non.fast.CREX', 'non.fast.Phosphorous', 'perc.EOS1', 'perc.EOS2', 'perc.Fat1', 'perc.Fat2',
                'perc.LYM1', 'perc.LYM2', 'perc.MONO1', 'perc.MONO2', 'perc.NEUT1', 'perc.NEUT2',
                'Phosphorus1', 'Phosphorus2', 'PLT1', 'PLT2', 'pNN50...6ms.', 'PQ', 'PR', 'QRS', 'QTC',
                'QTc.dispersion', 'RBC1', 'RBC2', 'RDW1', 'RDW2', 'Retic1', 'Retic2', 'rMSSD', 'RR',
                'spleen.wt', 'ST', 'T.Area1', 'T.Area2', 'TBIL1', 'TBIL2', 'TG1', 'TG2', 'tot.h20', 'TTM1', 'TTM2',
                'urine.creatinine1', 'urine.creatinine2', 'urine.Glucose1', 'urine.Glucose2',
                'urine.microalbumin1', 'urine.microalbumin2', 'WBC1', 'WBC2', 'Weight1', 'Weight2',
                'Adiponectin', 'Ghrelin', 'Sex', 'Diet', 'logFTM1', 'change_in_WBC', 'change_in_ct.NEUT',
                'change_in_ct.MONO', 'change_in_ct.LYM'],

                ['leptin', 'total_fat', 'sex'],

                ['dbGaP.SampID', 'SAMPID', 'ana', 'centromere', 'nucleolar', 'speckled', 'topo',
                'rna_ind', 'gender', 'dis_diagag', 'rayonset', 'nronsetage', 'limited', 'diffuse',
                'sine', 'lv_crei', 'hr_srci', 'hp_ildi', 'hc_pahi', 'ec_phi', 'ec_phed', 'ec_lvei',
                'ec_pei', 'pf1_date', 'pf1_fvcp', 'pf1_dlcp', 'pf1_fevp', 'pf1_tlcp', 'pf2_date',
                'pf2_fvcp', 'pf2_dlcp', 'pf2_fevp', 'pf2_tlcp', 'sex']];

        public static testSelection = ['this.is.a.test', 'hello2', 'hello.world', 'this.is.not', 'my.name.is.baha', 'my.name.is.jake'];

        private static getCleanString(str: string) {
                str = str.replace((/[[..]|[...]]+/), '.'); // replace .. or ... by .
                str = str.endsWith('.') ? str.substring(0, str.length - 2) : str; // remove . at the end of a string
                return str;
        }

        public static getPhenotypeTree(phenotypes: string[], nodeIds: Set<number>): PhenotypeNode[] {
                const result = [];
                let nodeid = 0;
                const root = new PhenotypeNode('Phenotypes', nodeIds, nodeid);
                for (let i = 0; i < phenotypes.length; i++) {
                        const cleaned = this.getCleanString(phenotypes[i]);
                        const node = cleaned.split(/[._]+/); // we split on . and/or _
                        let parent = root;
                        for (let j = 0; j < node.length; j++) {
                                let child = new PhenotypeNode(node[j], nodeIds);
                                child.setParent(parent);
                                const foundNode = FileParameterData.findNode(root, child);
                                if (foundNode === null) {
                                        if (j < node.length - 1) {
                                                child.setParent(parent);
                                                child.setNodeId(nodeid++);
                                                parent.addChild(child);
                                                parent = child;
                                        } else { // leaf node
                                                child = new PhenotypeNode(phenotypes[i], nodeIds);
                                                child.setParent(parent);
                                                child.setNodeId(nodeid++);
                                                parent.addChild(child);
                                        }
                                } else {
                                        if (j < node.length - 1) {
                                                parent = foundNode;
                                        }
                                }

                        }
                }
                for (const node of root.children.getValue()) {
                        result.push(node);
                }
                return result;
        }

        public static createTestTree(): PhenotypeNode[] {
                let nodeid = 0;
                const nodeIds = new Set();
                const root = [];
                const simulation = new PhenotypeNode('Simulation', nodeIds);
                simulation.addChild(new PhenotypeNode('Factorio', nodeIds));
                simulation.addChild(new PhenotypeNode('Oxygen not included', nodeIds));
                root.push(simulation);
                const indie = new PhenotypeNode('Indie', nodeIds);
                const dontStarve = new PhenotypeNode('Dont starve', nodeIds);
                dontStarve.addChild(new PhenotypeNode('Region of Giants', nodeIds));
                dontStarve.addChild(new PhenotypeNode('Together', nodeIds));
                dontStarve.addChild(new PhenotypeNode('Shipwrecked', nodeIds));
                indie.addChild(dontStarve);
                indie.addChild(new PhenotypeNode('Terraria', nodeIds));
                indie.addChild(new PhenotypeNode('Starbound', nodeIds));
                indie.addChild(new PhenotypeNode('Dungeon of Endless', nodeIds));
                root.push(indie);
                const action = new PhenotypeNode('action', nodeIds);
                action.addChild(new PhenotypeNode('Overcooked', nodeIds));
                root.push(action);
                const strategy = new PhenotypeNode('Strategy', nodeIds);
                strategy.addChild(new PhenotypeNode('Rise to Ruins', nodeIds));
                root.push(strategy);
                const rpg = new PhenotypeNode('RPG', nodeIds);
                const magicka = new PhenotypeNode('Magicka', nodeIds);
                magicka.addChild(new PhenotypeNode('magicka1', nodeIds));
                magicka.addChild(new PhenotypeNode('magicka2', nodeIds));
                rpg.addChild(magicka);
                root.push(rpg);
                return root;

        }

        /**
         * Finds a given node if it exists in the tree
         * @param n root or parent node to look for node
         * @param s node to look for
         */
        public static findNode(n: PhenotypeNode, s: PhenotypeNode): PhenotypeNode {
                if (n.name === s.name && n.parent.nodeid === s.parent.nodeid) {
                        return n;
                } else {
                        for (const child of n.children.value) {
                                const result = this.findNode(child, s);
                                if (result != null) {
                                        return result;
                                }
                        }
                }
                return null;
        }
}
