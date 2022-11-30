## City3D software features

|    |                                            |                     |
|:--:| :-----                                     | :-----                    |
| **Geometry<br>features** | ___current___ *(as of March 2020)* | ___future___ |
|    | Shapes:<br>~ lines<br>~ polygonal slabs with holes<br>~ inclined slabs | ~ puffy trees<br>~ curved arches    
|    | ~ Rotated objects<br>~ Mirrored objects                  | ~ Scaled objects
|    | Levels of Detail *(LOD)*                     | Materials & textures
|    | Animation & path-following                  | Shadows
|    | Layers                                      | Light bulbs
|    | Instanced features                          | make a big instanced feature version of the lattice district, like Suburbia and Manhattan
|    |                                            |                     |
| **Architectural<br>modeling<br>features** | ___current___ | ___future___ |
|    | Basic components:<br>~ walls<br>~ floors<br>~ roofs<br>~ pavement<br>~ window & door openings<br>~ stairs | More components:<br>~ railings & fences <br>~ elevators<br>~ ceilings<br>~ light fixtures<br>~ window panes<br>~ door panels<br>~ skylights & atriums
|    | Roof features:<br>~ gables<br>~ pitched<br>~ shed<br>~ living roofs | Complex roof solver *(via straight skeletons)*
|    | Parcels & districts                         |
|    | Repeat patterns                             | Building materials & textures
|    | Randomness                                  | Paint colors
|    | JSON spec file formats |
|    |                                            |                     |
| **Content<br>models** | ___current___ | ___future___ |
|    | Bicycles, vehicles, and routes           |
|    | Landscape elements: canals, trees        |
|    | Structures:<br>~ SwingSet<br>~ EiffelTower<br>~ Pyramid<br>~ UtilityPole<br>~ Table |
|    | Districts & buildings:<br>~ suburbia: house_353<br>~ rural: house_1127<br>~ urban: highrise<br>~ kinematic: lattice & midrise<br>~ campus: Wurster Hall |
|    |                                            |                     |
| **Traffic<br>simulation** | ___current___ | ___future___ |
|    | Animated bicycles                        | Traffic flow simulation   |
|    |                                          | Conjestion heatmaps       |
|    |                                          | Analysis & reporting      |
|    |                                          | Kinematic range reporting |
|    |                                            |                     |
| **Output<br>rendering** | ___current___ | ___future___ |
|    | Web browser *(via Three.js & WebGL)*       | VR headset                |
|    |                                            |                     |
| **UI<br>features** | ___current___ | ___future___ |
|    | First-person camera controls via keyboard | Vehicles as camera dollies |
|    | Orbit controls via mouse                  | Time-of-day & time-of-year lighting
|    | Save & restore camera location            | Fog, rain, and other weather visual effects
|    | Menus *(via dat.gui)*                     |
|    | Section cut views                         |
|    | Model-switcher UI                         | 
|    |                                            |                     |
| **Metrics<br>&<br>reporting** | ___current___ | ___future___ |
|    | Table views for reporting metrics        | ~ Graphs<br>~ Charts          |
|    | Simple metrics like floor area           | More metrics:<br>~ Floor Area Ratio (FAR)<br>~ Daylight Factor Estimates<br>~ Kinematic Range Estimates |
|    |                                            |                     |
| **Software<br>Dev<br>Infrastructure** | ___current___ | ___future___ |
|    | Unit tests *(via mocha, chai, & standard)* |                           |
|    | Build step *(via rollup)*                  | minification *(via terser)* |
|    | Schema validation *(via Ajv)*              |                           |
|    | Online demo page                           | posted on a web page that people can visit on the web, using their own computers -- versus the current setup where the only way to visit sandbox.html is to first download all the source code and launch your own web server                          |

## Other things to work on

### 2020-02-28

#### (1) Instanced repeats in JSON

In district.js (and in the district schemas & specs), have the
properties for "parcels:" and "contents:" take advantage of
InstancedFeature. For example, in suburbia.json.js, the 'Utility pole'
on line 68 could be an InstancedFeature instead of 5 individual model
objects. Likewise, the two 'Parcel 353' entries could be a single entry
with a "repeat:" value, like how 'Utility pole' is done.


#### (2) Bigger cities

If the new Instanced Feature trick lets us get away with having more objects in the scene without running out of memory, then it would be great to see how much we can take advantage of that. Could we expand suburbia to be a grid that's 5 blocks by 5 blocks, with hundreds of houses, utility poles, trees, etc? Could we expand the lattice district to be a grid that's 5 by 5?


#### (3) Lazy loading

Right now in sandbox.html and sandbox.js, we instantiate all of the
1,000+ model objects right when the page loads, and we generate high LOD
for all of them. But at page load the only thing we actually show is
'River Tethys'. If we're giving a demo of the car-free city, then
Manhattan and Suburbia might never be shown. Would we save a lot of
memory if we didn't load things until the user asked for them, and would
that allow for bigger demos and better orbit and render performance?


#### (4) Better trees

It'd be great to have better looking trees and bushes, maybe with some
variety to them. And then lots and lots of them, sprinkled all over the
lattice highline. (Maybe find public domain low-poly trees available
online, and write code to both load those files and to associate names
with them in SpecReader, so that the JSON spec files can include
references to them?)


#### (5) Parked bikes, plus cars and pedestrians

Add parked bikes in longhouse_ramps.json.js, on the "lower plaza" at
rect XYVW, and on the "landing" at rect "JKkj".

In suburbia, replace the bicycles with cars. And add parked cars along
the curbs.

Figure out how to make person.json.js be a Mover that follows routes
along sidewalks and along the pedestrian access walkway ramps in
longhouse_ramps.json.js


### 2020-02-23

It would be great if we had unit tests that actually
ensured the validity of all the spec examples in storey.schema.json.js
and the other schema files. What's the best way to do that? Maybe have
the unit tests just read the "examples:" array from the the
storey.schema.json.js file itself and then iterate through the array and
run tests on each example? One test for the schema validation, and
another test to for makeModelFromSpec()?

Also, speaking of validation, right now we only do schema validation
when the unit tests are run, and the unit tests only cover a fraction of
the spec files in the content directory. Would it be good to have the
unit tests automatically cover 100% of the content specs?

Or, alternatively, in package.json, should we move the schema validation
tool (ajv version 6.10.2) so that it's listed in "dependencies" instead
of "devDependencies"? That would increase our build file size (once we
set up a build step), but it would allow us to have a schema validation
error-check step every time some content models are loaded, regardless
of where they are loaded from (e.g. model files loaded over HTTP, vs.
built-in pre-compiled model files, vs. model files that a user copies
and pastes into a text field in the UI.)

### 2020-02-21

Our existing code base seems to have developed a few different idioms:


#### (1) "placement"

In the JSON schemas (and the declarative JSON spec files), I introduced
a schema called "placement.schema.json.js", which is used (indirectly)
by a number of other schemas, like the parcel.schema, district.schema,
and city.schema.

In practice, I've found the syntax that "placement" defines to be
convenient, so I'm inclined to keep it. Here are a few examples of valid
placements:
```
  { x: 10, y: 20, z: 0 }
  { x: 10, y: 20, z: 0, rotated: 90 }
  { x: 10, y: 20, z: 0, rotated: 90, mirrored: true }
```

#### (2) "Ray"

On the JavaScript side of things, we have the Ray class. We make new
instances of Ray to represent the "placement" entries in the JSON. But
the constructor for Ray does not accept a placement object, and instead
takes two or three positional args:
```
  new Ray (90, { x: 10, y: 20, z: 0  })
  new Ray (90, { x: 10, y: 20, z: 0  }, { mirror: true })
```

#### (3) "xyz"

In util.js, we also have an xyz() function, which returns objects that
can look somewhat similar to "placements" and like partial Ray instances:
```
 { x: 10, y: 20, z: 0 }
```

#### (4) "at"

In the JavaScript code, we often have local variables named "at", and in
the JSON schemas I also introduced schema properties called "at" in the
schemas for doors and windows, and in the copy.schema (which is used by
parcel, district, city, etc.).

Unfortunately, in some files, an "at" property or an "at" variable is
expected to be a simple xyz() value, and in other files an "at" property
will be a "placement" that includes values for rotated and mirrored.


---

Ideally, I'd like to try to do some refactoring to bring all of this
into better alignment, but I'm not sure what the best approach is.

Here are some of the things I'm thinking about:


#### (A) Ray constructor

If the JSON spec files are full of placement objects, it would be
convenient if the Ray constructor accepted placement objects, like this:
```
  new Ray({ x: 10, y: 20, z: 0, rotated: 90, mirrored: true })
```
That would mean getting rid of the current constructor syntax that we've
got now:
```
  new Ray (90, { x: 10, y: 20, z: 0  })
  new Ray (90, { x: 10, y: 20, z: 0  }, { mirror: true })
```

#### (B) rename: "Ray" and/or "placement" => ???

If "Ray" and "placement" are really the same concept, then it might be
good to change the name of one of them (or both of them!) so that they
share the same name. I feel like the term "placement" better describes
the semantics, but I'm bummed that the word "placement" is so long,
which is why I end up using the word "at" so often in the code. I feel
like "Ray" isn't a good term, since our representation of it (and our
semantics and uses for it) don't quite match the mathematical notion of
a Ray.

Ideally I'd like to come up with some better new word, but I can't think
of anything good. Here's my brainstorming so far:

```
  "placement" (too long?)
  "position"  (sounds too much like just an xyz, without an angle)
  "pose"   (e.g. a parcel spec has buildings placed in different poses)
  "socket" (e.g. a parcel spec has buildings placed in sockets)
  "mark"   (e.g. a building is placed at a mark, like a stage mark)
  "spike"  (e.g. a building is placed at a spike, like a stage spike)
           https://en.wikipedia.org/wiki/Spike_(stagecraft)
  "place"  (???)
```

#### (C) "at" considered harmful

I've used the name "at" all through the code and the JSON specs, but now
I find it confusing because often when I come across an "at" without any
context I don't know whether it represents an xyz() or a "placement".

I'm halfway tempted to try to purge all the "at" properties and "at"
variables in all of the code and all the spec files, and replace them
with either "xyz" or "placement", but maybe I'm overreacting.



### 2020-02-18

I'd like to change the code for registering layers so that it does a "lazy loading" style of layer registration.

I like the new "layer registration in JSON" found in tree.json.js, but
as a result tree.json.js now requires an import statement, which means
it would break if we moved the file from tree.json.js to plain old
tree.json. Also, having the import statement means that we can't rely on
other JSON standard features, like JSON.parse(), JSON.stringify(), and
JSON schema validation.

So, in tree.json.js, I propose to change line 8 from being this:
```
  layer: Feature.registerLayer(
    'trees & plants', { category: 'Landscape' }
  ),
```
to being this:
```
  layer: { name: 'trees & plants', category: 'Landscape' },
```
And then in SpecReader.js I'll add the code that notices the "layer:"
property and calls Feature.registerLayer().

I might also experiment with making a few other changes while I'm at it,
like:
 + adding keyboard shortcuts to toggle some of the layers,
 + maybe having a separate "name" vs "displayName" for each layer
 + maybe assigning layers to categories as a separate step from
assigning features to layers


### 2020-02-07

We could use the model-switcher feature for on-demand model
additions, so that none of the Manhattan objects are even created until
the user selects the "Manhattan" drop-down.


### 2020-02-06

..starting at the Building level
seems like the most promising approach for instancing. I can also
imagine using instancing at the Parcel level (for example, for a grid of
city blocks each with 20 identical parcels), or at the Block level (for
a city district with a big grid of identical blocks).

I think Storeys in Highrise is a less promising idea for instancing, for
a couple reasons. For one thing, Highrise is probably the building we
care about least; it's really just there to serve as a basic
counter-example for Lattice and Midrise (both as a visual aid, and so
that we can generate comparison metrics). And, if we did ever start
investing more time and effort into Manhattan, then one of the first
things I would want to do is start making many of the Highrise buildings
look less like a giant cube and more like the Empire State Building or
the Chrysler Building, with different set-backs at different floors, so
that Storeys get smaller as the building rises, which means we'd have
more different Storey types and less instance sharing.

... I added mirroring last month in placement.schema.json.js, but
there are no content files that use it yet, and there's no code written
to support it. If we do add mirroring as a feature, then I think we need
to add a "mirrored" instance variable flag to Ray, or, if we leave Ray
as is, then maybe we need to subclass Ray and add the "mirrored" flag there?

Scaling seems way less important than mirroring, but if it's easy to
add, I do think there are use cases. We might want to use it for things
like trees, bushes, birds, etc. And we could use it for things like
bicycles, people, etc. Scaling could go in Ray too, or in the new Ray
subclass.


### 2020-01-10

I was worried about the issue with "center: xy(a,b)" as distances
vs. "lites: xy(a, b)" as integer counts. In these JSON spec files, it
seems like 90% of values are distances, but then occasionally there will
be an integer count. Maybe we should only use xy() for distance values,
and then for "lites:" we would use something else, like "lites: {rows:
3, columns: 2}"

Plain old numbers might be the right answer, but then when you see a "2"
in the file, it may not be obvious whether it represents a distance (2
feet), a count (2 doors), an identifier (door #2), or some other value.

I thought it would make the file more readable if the value itself
contained a little bit of data-type info (distance vs. count vs. id), so
you don't have to guess the data type based on the property name:
"doorCount: 6" vs. "doorHeight: 6" vs. "destinationDoor: 6".

Also, I think it might be useful to set a default unit of distance for
an entire file. Our overall default base unit for distance is "feet",
and most of our spec files are in feet, but for the EiffelTower and
Kalpana I really wanted to specify the default as "meters", and for
SoccerField I wanted to specify "yards" as the default, and for
PyramidOfKhufu I actually wanted "cubits".

If a file has a default unit specified at the top of the file (e.g.
"yards"), then we could automatically convert all the distance values in
the file: "doorHeight: 2" becomes "doorHeight: 6", but that only works
if we know which numbers are distances (vs. counts or identifiers).

See: [issue 27](https://github.com/nicky-nym/city3d/issues/27)


### 2020-01-09

I added x() to util a few days ago, but now I'm having second thoughts.

In order to use x(), you of course have to
```
  import { x } from 'util.js'
```
and then you've just globally defined the "x" identifier through the
whole file. But the problem is that you then can't conveniently use "x"
as a local identifier in, for example, code that does destructuring
assignments:
```
  const { x, y, z } = ray.xyz
```
So far, the x() function is only used in a couple places, Cottage and
Garage, so it would be easy to delete it again.

We could replace the name x() with something else, like d(), or
even feet() or ft().


### 2019-12-27

Okay, how about this proposal...

Right now we have:

```
    >       src/core/facing.js
    >       src/core/geometry.js
    >       src/core/ray.js
    >       src/core/unit.js
    >       src/core/util.js
    >                  array()
    >                  cornersFromShape()
    >                  count()
    >                  countTo()
    >                  hypotenuse()
    >                  length()
    >                  randomInt()
    >                  randomPseudoGaussian()
    >                  xy()
    >                  xyz()
    >                  xyzAdd()
    >                  xyzSubtract()
    >                  xyRotate()
    >                  xywh2rect()
    >                  rectangleOfSize()
    >                  fullName()
```

What do you think about a proposal where we move things to end up with this:
```
    >       src/util.js
    >                  array()
    >                  count()
    >                  countTo()
    >                  randomInt()
    >                  randomPseudoGaussian()
    >
    >       src/metrics/unit.js
    >
    >       src/xyz/facing.js
    >       src/xyz/geometry.js
    >       src/xyz/ray.js
    >       src/xyz/helper.js
    >                  cornersFromShape()
    >                  hypotenuse()
    >                  length()
    >                  xy()
    >                  xyz()
    >                  xyzAdd()
    >                  xyzSubtract()
    >                  xyRotate()
    >                  xywh2rect()
    >                  rectangleOfSize()
    >       src/xyz/feature.js
    >                  fullName()
```

Alternatively, the directory "src/xyz/" could be named something like "src/geometry/". The file "helper.js" could be named "helpers", "util", or something else.

I think Ray and XYPolygon both probably belong in the same place.
Meaning, they probably belong in the same directory ("geometry/" or
"xyz/"), and they probably belong in the same namespace ("Geometry." or
"xyz.").

My vote would be take all the classes that are in geometry.js (Line,
XYPolygon, ThickPolygon, etc), and move them out so that they're each in
their own file, with each file exporting exactly one named thing at the
bottom of the file, so that it's more like the rest of the code. And
then whatever directory those files are in, I think the name of that
directory should match the name of the namespace the classes are in. So,
if we have geometry/thick_polygon.js, then we also have
Geometry.ThickPolygon.

I'm worried that "Geometry." is a little long for a namespace name,
especially if we end up moving a lot of simple helper functions into it,
so that we have Geometry.xyRotate() and Geometry.xyzAdd(). I like "xyz."
just because it's so short, and you then the helper functions could just
be things like xyz.rotate() and xyz.add(), with the classes as xyz.Line
and xyz.ThickPolygon.

... In the spirit
of brainstorming, I also came across the word "xylograph", which I think
is a cool word because it's both a noun and a verb, and it describes the
object (and process) used for recording a geometric design and making
instances of it. The prefix "xylo" means wood, which ties in to the idea
of architecture, and ties in to the idea of "xy" axes, while also being
short for "xylograph".

So, "xylo" could be the name of our geometry library, and we use the
classes in xylo to make models of the architectural content objects like
MidriseComplex, and then the xylo models serve as engraved woodcuts to
"print" the designs into Outputs like ThreeOutput.
    
