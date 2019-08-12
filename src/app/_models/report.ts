export class Report {
    id: number;
    title: string;
    author: string;
    description: string;
    image: any;

    constructor(id?: number, title?: string, author?: string, description?: string, image?: any) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.image = image;
    }
}
