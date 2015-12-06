'use strict';

import {Observable} from 'rx';

export default function (lines) {

    return lines.take(1).concatMap((cols) => {
        return lines.map((line) => {
            let obj = {};

            for (let i = 0; i < cols.length; i++) {
                obj[cols[i]] = line[i];
            }

            return obj;
        });;
    });

};
