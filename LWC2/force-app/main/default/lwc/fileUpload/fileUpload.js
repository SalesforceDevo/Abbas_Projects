import { LightningElement, track, api } from 'lwc';

export default class FileUploader extends LightningElement {
    @api recordId; // Record ID where files are uploaded
    @track uploadedFiles = [];
    @track error;

    acceptedFormats = ['.pdf', '.png', '.jpg'];

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.uploadedFiles = uploadedFiles.map(file => ({
            documentId: file.documentId,
            name: file.name,
            size: file.size
        }));
    }
}
