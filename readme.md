## webdevetc browser dump

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
    });
    // (Your browser will automatically open, and you can
    // debug whatever data you send to it there!)
})
```


## TODO

 - [ ] Support more than JSON for serialisation.
 - [ ] Support jest when `silent=true` (console.log messages will be hidden)
 - [ ] Test on non Mac OS/non Chrome
 - [ ] Create a nice interactive interface on the web browser view
 - [ ] Organise file structure better
 - [ ] Handle server errors, reject the awaited Promise
 - [ ] Set defaults with env
 - [ ] Add tests
 

