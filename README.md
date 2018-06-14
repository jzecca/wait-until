# waitUntil

[![Build Status](https://travis-ci.com/zed-k/wait-until.svg?branch=master)](https://travis-ci.com/zed-k/wait-until)

Waits for a function result to be truthy.<br>
Keeps trying until it happens or timeout is reached.

Similar to [async-wait-until](https://www.npmjs.com/package/async-wait-until) but with support for functions that returns a `Promise`.

## Installation

```bash
$ npm install node-wait-until
```

## Usage

```js
const waitUntil = require('node-wait-until');

const startTime = Date.now();

function enoughTimeHasPassed() {
    const elapsedTime = Date.now() - startTime;

    return (elapsedTime > 500)
        ? 'some value'
        : false;
}

waitUntil(enoughTimeHasPassed, 600)
    .then(result => console.log(`Operation succeeded with result: ${result}`))
    .catch(error => console.log(`Operation failed with error: ${error}`));
```

## API

### waitUntil(function, [timeout], [delay])

Returns a `Promise` that resolves when function returns a truthy result.

Rejects if function throws or returns a `Promise` that rejects, or if timeout is reached.

#### function

Type: `Function`

Expected to return a truthy result or a `Promise` for a truthy result.

#### timeout

Type: `Number`<br>
Default: `5000`

Number of milliseconds to wait before rejecting.

#### delay

Type: `Number`<br>
Default: `20`

Number of milliseconds to wait before retrying `function`.

## License

MIT © [Zed-K](https://zed-k.com)
