'use strict';



import Test from 'tape';
import Tabtolink from '../lib';
import Readlines from '../lib/readlines';
import Map from '../lib/map';
import {Observable} from 'rx';
import Fs from 'fs';

Test('test mapping', (t) => {

    t.test('map', (t) => {
        t.plan(3);

        Map(Readlines(Fs.createReadStream('./test/fixtures/testreadline.csv'))).doOnNext(t.ok).doOnCompleted(t.pass).subscribe();
    });

    // t.test('readline', (t) => {
    //     t.plan(3);
    //
    //     let lines = Readlines(Fs.createReadStream('./test/fixtures/testreadline.csv'));
    //
    //     Map(lines).subscribe(
    //         (x) => console.log(x),
    //         () => {},
    //         () => {
    //         }
    //     );
    // });

});

Test.only('test', (t) => {
    t.plan(3);

    let reader = Tabtolink.createReader(Fs.createReadStream('./test/fixtures/testreadline.csv'));

    reader.on('readable', () => {
        let obj;

        while((obj = reader.read()) !== null) {
            console.log(obj);
            t.ok(obj);
        }
    });

    reader.on('end', () => {
        t.pass();
    });

});
