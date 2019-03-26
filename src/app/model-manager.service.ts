import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Customer} from './customer-detail/datatypes/customer';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class ModelManagerService {
    _model: Model = new Model();

    constructor(private storage: Storage) {
    }

    getModel(): Model {
        return this._model;
    }

    storeModel(): Promise<void> {
        return this.storage.set(LocalStorageKey.Model, this.getModel());
    }

    loadModel(): Promise<void> {
        return new Promise<void>(resolve => {
            this.storage.get(LocalStorageKey.Model).then(
                data => {
                    if (!_.isNil(data)) {
                        this._model = data;
                    } else {
                        this._model = new Model();
                        this._model.customers = [];
                        this.storeModel();
                    }
                    resolve();
                },
                () => {
                    this._model = new Model();
                    this._model.customers = [];
                    this.storeModel();
                    resolve();
                }
            );
        });
    }

    removeModel(): Promise<void> {
        this._model = new Model();
        return this.storage.remove(LocalStorageKey.Model);
    }
}

export class Model {
    customers: Customer[];
}

export enum LocalStorageKey {
    Model = 'model'
}
