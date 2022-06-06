import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {
    messages;

    constructor(message) {
        super(message, HttpStatus.BAD_REQUEST);
        this.messages = message;
    }


}