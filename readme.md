## webdevetc browser dump

[![npm version](https://badge.fury.io/js/%40webdevetc%2Fbrowser-dump.svg)](https://badge.fury.io/js/%40webdevetc%2Fbrowser-dump)   [![GitHub version](https://badge.fury.io/gh/WebDevEtc%2Fbrowser-dump-js.svg)](https://badge.fury.io/gh/WebDevEtc%2Fbrowser-dump-js)
  [![NPM downloads](https://img.shields.io/npm/dm/@webdevetc/browser-dump?style=social)](https://www.npmjs.com/package/@webdevetc/browser-dump)
  


Have you ever found it hard to debug tests, looking at output in your command line console?

Just add `await browserDump(yourDataToDebug)` and it will load that data in a web browser for you to easily inspect using Chrome's inspector tools.

```ts
import { browserDump } from '@webdevetc/browser-dump';

it('should test something', async () => {
    const apiResponseData = someServiceOfYours(123, true);

    // debug the data in your browser:
    await browserDump({
       apiResponseData,
       arrayOfIds: [442, 541, 441,],
       userName: 'admin',
       userIds: new Set([4814,424,235]),
       aFunction: () => console.log('you can run this with window.data.aFunction()'),
    });
    // (Your browser will automatically open, and you can
    // debug whatever data you send to it there!)
 
    // JSON output is shown in browser, but you can also use Chrome's
    // inspector to view the raw objects (works with Set, functions etc)

    // The node server will automatically close as soon as it 
    // receives a visit from your browser.
})
```

## FAQ/More info

For more info please see my site - [JS browser dump](https://webdevetc.com)


## TODO

 - [x] Support more than JSON for serialisation.
 - [ ] Handle cyclic JSON
 - [ ] Handle primatives such as string/number, do not JSON.stringify them
 - [ ] Handle port not free (find an available port)
 - [ ] Support jest when `silent=true` (console.log messages will be hidden)
 - [ ] Test on non Mac OS/non Chrome
 - [ ] Create a nice interactive interface on the web browser view (such as Laravel/Symfony's [var dumper](https://symfony.com/doc/current/components/var_dumper.html)
 - [ ] Organise file structure better
 - [ ] Handle server errors, reject the awaited Promise
 - [ ] Set defaults with env
 - [ ] Add tests
 - [ ] Add nicer stack trace info
 


