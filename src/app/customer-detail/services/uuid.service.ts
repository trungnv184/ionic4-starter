import {Injectable} from '@angular/core';
import {UUID} from 'angular2-uuid';

@Injectable({
    providedIn: 'root'
})
export class UUIDService {

    constructor() {
    }

    generateUUID(): string {
        return UUID.UUID();
    }
}
