'use strict';

import Readline from 'readline';
import {Observable} from 'rx';

export default function (readable) {

    let stream = Readline.createInterface({
        input: readable
    });

    return Observable.create((observer) => {

        let onLine = (line) => observer.onNext(line.split(','));
        let onError = (error) => observer.onError(error);
        let onEnd = () => observer.onCompleted();

        stream.on('line', onLine);
        stream.on('error', onError);
        stream.on('close', onEnd);

        return () => {
            stream.removeListener('line', onLine);
            stream.removeListener('error', onError);
            stream.removeListener('close', onEnd);
        };
    });

};
