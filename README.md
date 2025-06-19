# eslint-plugin-remove-duplicates

This ESLint plugin removes duplicate strings in arrays that are specially marked with a `// @remove-duplicates` comment.

## Installation

You'll first need to install [ESLint](https://eslint.org):

```sh
npm i eslint --save-dev
# or
yarn add eslint --dev
```

Next, install `eslint-plugin-remove-duplicates`:

```sh
npm install eslint-plugin-remove-duplicates --save-dev
# or
yarn add eslint-plugin-remove-duplicates --dev
```

## Usage

Add `remove-duplicates` to the plugins section of your `.eslintrc.js` configuration file. You can omit the `eslint-plugin-` prefix:

```js
module.exports = {
  plugins: [
    'remove-duplicates'
  ]
};
```

Then, in any JavaScript file, you can use the `// @remove-duplicates` comment to mark an array for duplicate removal:

```js
// @remove-duplicates
const myArray = ['a', 'b', 'a', 'c', 'b', 'a'];

// After running ESLint with this plugin, myArray will be:
// const myArray = ['a', 'b', 'c'];
```

## Example

Here's an example of how the plugin works:

**Before:**

```js
// @remove-duplicates
const myList = ["apple", "banana", "apple", "orange", "banana", "grape"];
```

**After running ESLint:**

```js
// @remove-duplicates
const myList = ["apple", "banana", "orange", "grape"];
```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
