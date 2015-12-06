'use strict';

require('babel-polyfill');

import {Readable} from 'stream';
import Readlines from '../lib/readlines';
import Map from '../lib/map';

export default {
    createReader(stream) {
        return new Reader(stream, { objectMode: true });
    }
};

export class Reader extends Readable {

    constructor(source, options = {}) {
        super(options);

        this._source = Map(Readlines(source));
    }

    _read() {
        let self = this;

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
