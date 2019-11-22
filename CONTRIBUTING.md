# How to contribute

Thanks for considering contributing to City3d.

[How Can I Contribute?](#how-can-i-contribute)
<!-- TODO: add this back to the table of contents once these sections are more than one-liners
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Git Commits and Pull Requests](#git-commits-and-pull-requests)
-->

[Styleguides](#styleguides)
  * [JavaScript Styleguide](#javascript-styleguide)
  * [Documentation Styleguide](#documentation-styleguide)

## Code of Conduct

We don't yet have a Code of Conduct, but would be happy to add one if you'd like, perhaps the [Contributor Covenant v2.0](https://www.contributor-covenant.org/).

## How Can I Contribute?

### Reporting Bugs

Please report bugs using our [github issues tracker](https://github.com/nicky-nym/city3d/issues).

### Suggesting Enhancements

For feature requests, please also use our [github issues tracker](https://github.com/nicky-nym/city3d/issues).

### Your First Code Contribution

There's lots of work to do, and lots of easy low-hanging fruit that make for good starter projects. 
Send us mail and we can offer a few suggestions.

### Git Commits and Pull Requests

Someday we will have unit tests, and then we'll require that all new code passes the unit tests. 
For now, we welcome any code that works.

## Styleguides

### JavaScript Styleguide

All JavaScript must adhere to [JavaScript Standard Style](https://standardjs.com/).

* Explicit `export` instead of default `export`
  ```js
  // Use this:
  class Foo {}
  export { Foo } 

  // Instead of:
  class Foo {}
  export default Foo
  ```
* Only ONE `export` per file
  ```js
  // Use this:
  class Foo {}
  class Bar {}
  const FOO = { Foo, Bar }
  export { FOO } 

  // Instead of:
  class Foo {}
  class Bar {}
  export { Foo, Bar } 
  ```
* TODO: add more standards!

### Documentation Styleguide

* Use [Markdown](https://daringfireball.net/projects/markdown).
* Reference methods and classes in markdown with the custom `{}` notation:
    * Reference classes with `{ClassName}`
    * Reference instance methods with `{ClassName::methodName}`
    * Reference class methods with `{ClassName.methodName}`


