'use strict';

import {Observable} from 'rx';

const map = (lines) => {
    return lines.take(1).concatMap((cols) => {
        return lines.concatMap((line) => {
            return Observable.range(0, cols.length).reduce((obj, i) => {
                obj[cols[i]] = line[i];
                return obj;
            }, {});
        });
    });
};

export default map;
