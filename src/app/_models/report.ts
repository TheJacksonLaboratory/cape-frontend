export class Report {
    id: number;
    date_created: Date;
    title: string;
    author: string;
    job_id: number;
    description: string;
    paths: string[];
    root_url: string;
    result_page: string;

    constructor(id?: number, date_created?: Date, title?: string, author?: string, job_id?: number, description?: string, paths?: string[], root_url?: string, result_page?: string) {
        this.id = id;
        this.date_created = date_created;
        this.title = title;
        this.author = author;
        this.job_id = job_id;
        this.description = description;
        this.paths = paths;
        this.root_url = root_url;
        this.result_page = result_page;
    }

    private static toReport(obj: any): Report {
        const report = new Report();
        report.id = obj['id'];
        report.title = obj['title'];
        report.date_created = obj['date_created'];
        report.author = obj['author'];
        report.job_id = obj['job_id'];
        report.description = obj['description'];
        report.paths = obj['paths'];
        report.root_url = obj['root_url'];
        report.result_page = obj['result_page'];
        return report;
    }

    /**
     * Parse an object and returns a Report object
     * @param obj a json object for instance
     */
    public static parse(params: any): Report {
        const report_string = params['report'];
        let reportObj: Report;
        if (report_string === undefined) {
            reportObj = new Report();
        } else {
            // parse into obj
            reportObj = Report.toReport(JSON.parse(report_string));
        }
        return reportObj;
    }
}
