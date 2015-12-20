'use strict';

import Readline from 'readline';
import {Observable} from 'rx';

export default function (readable) {
    const stream = Readline.createInterface({
        input: readable
    });

    return Observable.create((observer) => {
        const onLine = (line) => observer.onNext(line.split(','));
        const onError = (error) => observer.onError(error);
        const onEnd = () => observer.onCompleted();

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
