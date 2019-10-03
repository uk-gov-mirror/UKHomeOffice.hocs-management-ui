export default class ErrorMessage {
    title: string;
    description: string;

    constructor(description: string, title: string) {
        this.title = title;
        this.description = description;
    }
}
