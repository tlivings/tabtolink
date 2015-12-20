'use strict';

import {Readable} from 'stream';
import Readlines from '../lib/readlines';
import Map from '../lib/map';

class Reader extends Readable {
    constructor(source, options = { objectMode: true }) {
        super(options);
        this._source = Map(Readlines(source));
    }
    _read() {
        const self = this;

        self._source.subscribe(
            (obj) => {
                self.push(obj);
            },
            (error) => {
                self.emit('error', error);
            },
            () => {
                self.push(null);
            }
        );
    }
}

const api = {
    create(stream) {
        return new Reader(stream, { objectMode: true });
    }
};

export default api;
