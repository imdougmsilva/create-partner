# Error Handler
> General error handler

## General Rules to Error Handler
1. **NEVER** pass status and message from an autonomous object. Always use an [mappedTag](#creating-a-new-Mapped-Tag ). If you need a new one, create it;
---
## How to use this Error Handler
1. Call next() from `express` to your function.
2. Return next() passing an new instance of _customized Error_ from this handler;
3. Call a mappedTag from this handler to the _customized Error_.

**Example**
```javascript
import { ErrorTypes, MappedTags } from 'path_to/error_handler';

const doSomething = (request, response, next) => {
  // ... do something
  if (error) {
    // something bad happend
    return next(new ErrorTypes.CustomizedError(MappedTags.SOMETHING_BAD));
  }
}
```
---
## Creating a new Mapped Tag
1. Inside mappedTags.js, create a new index with the new TAG, following THIS_FORMAT (see example);
2. Give a message and a status attributes. This information will be used on ErrorHandler.

**Example**
```javascript
{
  //... Other Tags
  EXAMPLE_TAG: {
    message: 'EXAMPLE_TAG',
    status: 500,
  }
}
```
---
## Creating a customized Error
1. Inside types folder, create a file with the name of customized Error. In this example we will create ExampleError.js
2. Use `Error.captureStackTrace` to catch stacktrace to this customized error.
3. You can give any extra information to `this.extra` as an object.
4. Inherits it to module.exports;

**Example**
```javascript
module.exports = function ExampleError(mappedTag) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  if (mappedTags[mappedTag.message] === mappedTag) {
    this.message = mappedTags[mappedTag.message].message;
    this.extra = { 
      status: mappedTags[mappedTag.message].status,
      somethingMore: null,// more data
    };
  } else {
    // Default value
    this.message = mappedTags.DEFAULT.message;
    this.extra = { status: mappedTags.DEFAULT.status };
  }
};

require('util').inherits(module.exports, Error);
```
---
