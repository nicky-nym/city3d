# city3d
3D architectural building models made using the three.js JavaScript API

## Status
In 2019 and 2020 we wrote enough code to give a rough sense of where this project could go, but the project has been dormant since then.

## To-do
If you want to pick up from where we left off, see the list of [open issues](https://github.com/nicky-nym/city3d/issues) and the [Roadmap document](https://github.com/nicky-nym/city3d/blob/master/ROADMAP.md).

## Build steps
Our package.json has "rollup" in "devDependencies", so you'll want
to download the rollup node module by doing:
```
npm install
```
And then invoke the package.json "scripts" entry for doing a rollup build:
```
npm run rollup
```

## Testing
To run unit test, do:
```
npm test
```
To test out the rollup-based build target, rather than open the old
`examples/sandbox.html`, you can instead open `examples/city3d.html`
