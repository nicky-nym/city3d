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

> I really like "pose". I think it's the best of the bunch, and it's short. I might want to use it in FeatureInstance, too (instead of p0), because I'd like to clean up some of the incoherency in ThreeOutputScene around that.

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

> I tried something like this (because I wanted to make it so that a layer would only be added if something with that layer had actually been constructed), but the problem is that layers need to be registered before the GUI is constructed - either that, or you need a way to regenerate the GUI. Just keep that in mind. 

I might also experiment with making a few other changes while I'm at it,
like:
 + adding keyboard shortcuts to toggle some of the layers,
 + maybe having a separate "name" vs "displayName" for each layer
 + maybe assigning layers to categories as a separate step from
assigning features to layers

> The third point could be a problem if you have layers with the same name (e.g. "copies") in two different categories. However, the second point might fix that problem. I don't object to any changes you want to make, and hopefully the few tests I wrote will catch at least some problems. It'd be nice to have tests that actually test whether something is visible, but that's probably hard, especially because of the tree structure - e.g. a THREE.Group might itself be visible, but none of its children are. One more thing to remember is that there's a three.js limit of 31 layers.

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
    
---

## Feedback about the [Impossible Cities](https://nicky-nym.github.io/cities/) paper


### A
One initial comment: I like the Impossible City Design Summary section you now have at the end.   I think you should move that compiled information to the start, like an introduction before your current chapter One. I was having trouble understanding the big picture and was overwhelmed until I got to that section near the end.

### B

There are a couple of important things that I don’t understand. First, I
don’t understand how the ramp system to get the bikes up to the second
floor works. Where is it located in your cutaway image? Either it has to
be to the side of the bike lane (in which case it would take up part of
the ground level sidewalk) or underneath the bike lane (in which case it
would take up the area that seems to be a theater or classroom). Are
there entrance and exit ramps on every block? That seems like a lot of
area to occupy, particularly if they are no steeper than a typical
wheelchair ramp. You have likely thought of this in some way (the
Koolhaas library in Seattle comes to mind), but it needs explaining and
illustrating since it's not intuitive (at least to me).


Also, aren’t one set of bikeways actually on the third floor, since they
are stacked? This makes the ramp question somewhat harder, and has
implications for the pedestrian experience on both the upper and ground
floor levels (see below, about shade and separation).

> Sorry about the lack of info on the ramp system. I left the whole ramp
system out of the cutaway image since there was too much going on in the
cutaway image already, but I should make a new section just about the ramps.
> 
> I've made a 3D model of the entire structure (including ramps), which
would definitely help to clarify, but I didn't have a good way to
include the model in the write-up, so I left it out. I'll work on either
making drawings of the ramps or on including the entire interactive 3D
model within the web page for the write-up.
> 
> Anyway, to answer your question, in my 3D model the ramps are to the
sides of bike lanes (as opposed to underneath it). That makes the whole
bikeway structure wider, so the "sidewalk" space to the side is pushed
out another 20 or 30 feet or so. There's also some space for parking and
for retail shops integrated into the landings of the ramp system.
> 
> There are entrance and exit ramps on every block. They are not steep, so
they are quite long. They do take up an unfortunate amount of space, but
the whole design still manages to be fairly space efficient. I'm working
on compiling a set of statistics about Floor Area Ratio, circulation
overhead, etc.
> 
> The ramps actually run *only* between the third floor north-south
bikeways and the second floor east-west bikeways. The ground level is
intended to be a pedestrian only zone, without regular bike access, so
there are no bike ramps down to the ground level, just pedestrian ramps
(or, alternatively, stairs, elevators, or escalators). Likewise for the
top level (the highline). The pedestrian ramps are not part of the
bikeway buildings, but are instead integrated into the other buildings
(at the edges of the drawings).



My second point of mystification is how bicycle intersections would
work. That is, if NS and EW lanes are on separate levels, what happens
when I’m going south and want to turn east? This may relate to the ramp
question above.  I’m concerned again that any ramp system connecting the
two levels is either very steep or very long, occupying a lot of space
you haven’t accounted for. Also, how tight are the turns at the
“intersections”, especially for bikes moving at a good clip, or cargo
vehicles?

> Yes, making turns requires the ramps. To turn from a third floor
northbound bikeway to a second floor eastbound bikeway, you exit the
third floor bikeway, go down a pair of straight ramps and then around a
curved-but-level 90-degree turn.
> 
> The turn has a roughly 40-foot centerline radius. A bicycle should be
able to go around the curve at 15 mph, if the rider has a leaning angle
of 20 degrees, but I had a 10-mph speed limit in mind. The curve could
also be banked slightly. The 40-foot centerline radius is intended to be
large enough to accommodate a school bus, truck, or medium-size
tractor-trailer semi-truck.


Then I have some concerns about the experience that this plan would
create. This may sound trivial but I don’t think it is: you’ve
engineered out scenery, impulse, and serendipity, which are some of the
main pleasures of city living. The bike paths are very efficient from
getting from A to B, but along the way a cyclist is not going to be able
to notice a new restaurant (presumably on the ground floor), or see a
friend on the sidewalk (above or below), or be attracted to stop by a
shop window, or really see much of anything (especially if she is using
the inner lane). And even if you do end up with, say, display windows on
the second or third floor, the cyclist isn’t going to be able to just
stop to take a closer look. This makes the bike experience much more
like the car experience (e.g., getting from A to B without much caring
what’s in between) which I think is fundamentally anti-urban.

> Yes, I agree, the bikeways mostly just serve as efficient thoroughfares,
without offering pleasant scenery or serendipitous stops. I'm hoping to
make a few small changes in my next version to try improve that a
little, by curving the bikeways, and by adding bikeway-level storefronts
that you could stop at. But I don't want to sacrifice throughput, so I'm
not sure how successful I'll be. In the end, the bikeway experience will
be a commuter experience, not a new-urbanism experience. But, once
you're off your bike, the pedestrian experience has the potential to be
quite good, with lots and lots of pedestrian-mall streets, entirely free
of both cars and bikes. I'm cautiously optimistic that the net
experience could be quite a bit better than our current cities, while
still having higher commuter throughput and zero cars.


These same problems apply for the people utilizing the path on the top
level. This makes the length of the blocks particularly problematic. One
of things that’s great for walking in New York is exactly the shortness
of the blocks, which give you a sense of movement. Having long blocks,
and separation from shops and other amenities, makes walking quite
tedious. Although this looks a lot more attractive than walking in, say,
Fresno (especially if it’s not 110 degrees out, wherever it is), I think
the experience would be similar: long blocks that make you feel as if
you’re not getting anywhere, and a discouraging separation (in Fresno,
by seas of parking lots) from anything you might want on the way. The
High Line works in part because it’s special, not an everyday
experience. The distance it provides works as a sort of respite from
constant connection and stimulation. But it doesn't remove you entirely
-- and I also think the High Line is lower than the walkway level in
your plan (especially if the bikeways are actually taking up 2 floors),
which is important for a feeling of connectedness to the street. Anyway,
respite is nice if you have that constant connection, but you don't want
it as the norm.

> Yes, the top level High Line space is intentionally disconnected from
the city's street life. My goal would be to have the lively pedestrian
street life not at the High Line level, nor along the bikeways, but
rather on separate pedestrian streets. The High Line level would be a
place to go for a respite. It might have playgrounds, hiking trails, hot
dog carts, etc.

Which brings me to your street level. I’m worried that the street level
will be in near constant shade, and also have the potential to be wind
tunnels. The shade could be something of a feature, depending on the
climate. In Fresno, you might want the shade, and in rainy areas you
could do something with awnings (I recall downtown Melbourne did a great
job with them). But in general I think constant shade is more of a bug. 
It would almost certainly make things like sidewalk cafe seating less
attractive, again reducing street life.

> My current drawings are misleading, in that they make it look like the
pedestrian street life (shops, restaurants, etc.) all has to happen down
on that lowest level, in the dark and narrow little gap between the
bikeway buildings and the neighboring buildings. It doesn't need to be
like that. The super-blocks made by the bikeways are quite large, with
each block having a land area of about 7 acres. I'm imagining that space
being divided up into a separate grid of smaller-scale pedestrian street
and pedestrian malls. I'll work on making drawings!
