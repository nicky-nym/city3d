/** @file three_output_scene.js
 * @author Authored in 2020 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import * as THREE from '../../node_modules/three/build/three.module.js'
import { Feature, FeatureGroup, FeatureInstance, FeatureLODGroup, InstancedFeature } from '../core/feature.js'
import { Geometry } from '../core/geometry.js'

// TODO: remove dependency on non-core /architecture/ code
import { LAYER } from '../architecture/layer.js'

import { xyzSubtract } from '../core/util.js'
import { BufferGeometryUtils } from '../../node_modules/three/examples/jsm/utils/BufferGeometryUtils.js'

/* global requestIdleCallback */

const ONE_MILE = 5280
const FIXME_FUCHSIA = 0xff00ff // used as a default so it's obvious when a color is missing
const COLOR_GREY = 0x808080
const BLUE = 0x0000ff

class ThreeOutputScene extends THREE.Scene {
  constructor (textures) {
    super()

    this._animatedComponents = []
    this._materials = {
      lowest: { [THREE.FrontSide]: {}, [THREE.DoubleSide]: {} },
      medium: { [THREE.FrontSide]: {}, [THREE.DoubleSide]: {} },
      high: { [THREE.FrontSide]: {}, [THREE.DoubleSide]: {} }
    }

    this.background = new THREE.Color(0xcce0ff)
    this.fog = new THREE.Fog(0xcce0ff, 500, 10000)

    // XYZ axes
    const axesHelper = new THREE.AxesHelper(ONE_MILE)
    this.add(axesHelper)

    // grid
    const gridHelper = new THREE.GridHelper(ONE_MILE, 8, COLOR_GREY, COLOR_GREY)
    gridHelper.geometry.rotateX(Math.PI / 2)
    gridHelper.traverseVisible(node => node.layers.set(LAYER.GRID.index))
    this.add(gridHelper)

    // ground
    let groundMaterial
    if (textures && textures.has('ground')) {
      const texture = textures.get('ground')
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(100, 100) // 25, 25)
      texture.anisotropy = 16
      groundMaterial = new THREE.MeshLambertMaterial({ map: texture })
    } else {
      groundMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    }
    const ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(ONE_MILE, ONE_MILE), groundMaterial)
    ground.geometry.rotateX(Math.PI / 2)
    ground.position.y = -250
    ground.position.z = -0.1
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    ground.userData.noHighlight = true
    ground.traverseVisible(node => node.layers.set(LAYER.GROUND.index))
    this.add(ground)

    // add an origin marker for debugging purposes
    const ORIGIN_MARKER_HEIGHT = 100
    const ORIGIN_SIGN_LENGTH = 30
    const geometry = new THREE.BoxGeometry(4, 4, ORIGIN_MARKER_HEIGHT)
    const material = this._material('high', BLUE, false)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = 'origin marker'
    mesh.position.z = ORIGIN_MARKER_HEIGHT / 2
    this.add(mesh)
    const geometryX = new THREE.BoxGeometry(ORIGIN_SIGN_LENGTH, 1, 8)
    const materialX = this._material('high', 0xff0000, false)
    const meshX = new THREE.Mesh(geometryX, materialX)
    meshX.name = '+X axis (East)'
    meshX.position.x = ORIGIN_SIGN_LENGTH / 2
    meshX.position.z = ORIGIN_MARKER_HEIGHT * 0.7
    this.add(meshX)
    const geometryY = new THREE.BoxGeometry(1, ORIGIN_SIGN_LENGTH, 8)
    const materialY = this._material('high', 0x00ff00, false)
    const meshY = new THREE.Mesh(geometryY, materialY)
    meshY.name = '+Y axis (North)'
    meshY.position.y = ORIGIN_SIGN_LENGTH / 2
    meshY.position.z = ORIGIN_MARKER_HEIGHT * 0.7
    this.add(meshY)
  }

  _doSomeTasks (deadline) {
    // const tr = deadline.timeRemaining()
    let count = 0
    while (deadline.timeRemaining() > 0 || (deadline.didTimeout && count < 100)) {
      count++
      const obj = this.queuedTaskGeneratorObject.next()
      if (obj.done) {
        return
      }
    }
    // console.log(`------- ${count} steps ---------- ${Math.floor(tr)} ------------`)
    requestIdleCallback(this._doSomeTasks.bind(this), { timeout: 500 })
  }

  queueBuildFrom (feature) {
    const queuedGenerators = []
    const mainFeatureGeneratorObject = this._featureGenerator(feature, this)
    queuedGenerators.push([mainFeatureGeneratorObject, '_featureGenerator'])

    if (feature.getRoutes && feature.getRoutes().length > 0) {
      const routeGeneratorObject = feature.populateRoutes(this.queueBuildFrom.bind(this))
      queuedGenerators.push([routeGeneratorObject, 'populateRoutes'])

      // TODO: use a Layer for this
      const SHOW_PATH = true
      if (SHOW_PATH) {
        const pathGeneratorObject = this._pathGenerator(feature)
        queuedGenerators.push([pathGeneratorObject, '_pathGenerator'])
      }
    }

    this.queuedTaskGeneratorObject = (function * () {
      for (const [gen, generatorFunctionName] of queuedGenerators) {
        const str = `Generator ${generatorFunctionName}() for feature ${feature.fullName()}`
        console.time(str)
        console.log(`Starting ${str}`)
        yield * gen
        console.timeEnd(str)
      }
    })()
    requestIdleCallback(this._doSomeTasks.bind(this), { timeout: 500 })
  }

  buildSynchronouslyFrom (feature) {
    this._traverse(feature, this)
  }

  * _pathGenerator (model) {
    const material = new THREE.LineBasicMaterial({ color: 0xFF00FF })
    for (const route of model.getRoutes()) {
      const geometry = new THREE.Geometry()
      geometry.vertices.push(...route.waypoints().map(p => new THREE.Vector3(p.x, p.y, p.z)))
      const line = new THREE.Line(geometry, material)
      const layer = route.layerIndex()
      line.traverseVisible(node => node.layers.set(layer))
      this.add(line)
    }
  }

  _traverse (feature, threeObject) {
    for (const _ of this._featureGenerator(feature, threeObject)); // eslint-disable-line no-unused-vars
  }

  * _featureGenerator (feature, threeObject) {
    if (!(feature instanceof Feature)) {
      // TODO: should Routes also be Features?
      return
    }

    let object

    if (feature instanceof FeatureGroup) {
      if (feature instanceof FeatureLODGroup) {
        const lod = yield * this._LODGroupGenerator(feature)
        threeObject.add(lod)
        object = lod
        yield
      } else {
        const group = new THREE.Group()
        group.userData.feature = feature
        threeObject.add(group)
        for (const child of feature.children) {
          yield * this._featureGenerator(child, group)
        }
        object = group
      }
    } else if (feature.threeComponent) {
      object = feature.threeComponent()
      threeObject.add(object)
      if (object.update) {
        this._animatedComponents.push(object)
      }
    } else if (feature instanceof FeatureInstance) {
      const material = this._material('high', feature.hexColor, true)
      const mesh = this.makeMeshFromInstanceGeometry(feature.geometry, material, feature.hexColor, feature.p0)
      mesh.userData.feature = feature
      threeObject.add(mesh)
      object = mesh
      yield
    } else if (feature instanceof InstancedFeature) {
      const mesh = this.makeInstancedMesh(feature)
      mesh.userData.feature = feature.feature
      threeObject.add(mesh)
      object = mesh
      yield
    } else {
      // TODO
    }

    const layer = feature.layerIndex()
    if (object && layer > 0) {
      // NOTE: Object3D.layers does not apply to the object's children, so we must traverse
      // the children here.
      // TODO: could use enable() instead of set() to allow multiple layers to be set
      // in the case where feature is in Layer B but has an ancestor in Layer A.
      // Alternatively, set(layer) could be called only if the current Layer is 0;
      // that would mean that object would end up in Layer B (instead of Layer A).
      object.traverseVisible(node => node.layers.set(layer))
    }
  }

  * _LODGroupGenerator (lodGroup) {
    const lod = new THREE.LOD()
    if (lodGroup.offset) {
      lod.translateX(lodGroup.offset.x)
      lod.translateY(lodGroup.offset.y)
      lod.translateZ(lodGroup.offset.z)
    }
    const group = new THREE.Group()
    group.userData.feature = lodGroup
    for (const child of lodGroup.children) {
      yield * this._featureGenerator(child, group)
    }
    lod.addLevel(group, 0)

    const levels = lodGroup.getLevelsOfDetail()

    // Sort so highest threshold (= lowest resolution) is first.
    levels.sort(level => -level.distanceThreshold)

    let materialCost = 'lowest'
    for (const level of levels) {
      const object = yield * this.makeLowResObject(level.feature, materialCost)
      lod.addLevel(object, level.distanceThreshold)
      materialCost = 'medium'
    }
    return lod
  }

  * makeLowResObject (feature, materialCost) {
    if (feature instanceof FeatureGroup) {
      const group = new THREE.Group()
      group.userData.feature = feature
      for (const child of feature.children) {
        group.add(yield * this.makeLowResObject(child, materialCost))
      }
      return group
    }
    if (feature instanceof FeatureInstance) {
      const material = this._material(materialCost, feature.hexColor, true)
      return this.makeMeshFromInstanceGeometry(feature.geometry, material, feature.hexColor, feature.p0)
    }
    console.warn('Warning: feature is neither a FeatureGroup nor a FeatureInstance, so an empty Group will be returned.')
    const group = new THREE.Group()
    group.userData.feature = feature
    return group
  }

  makeMeshFromInstanceGeometry (instanceGeometry, material, color, p0) {
    if (instanceGeometry instanceof Geometry.ThickPolygon) {
      return this.makeThickPolygonMesh(instanceGeometry, material, p0)
    }
    if (instanceGeometry instanceof Geometry.TriangularPolyhedron) {
      return this.makeTriangularPolyhedronMesh(instanceGeometry, material, p0)
    }
    if (instanceGeometry instanceof Geometry.OutlinePolygon) {
      return this.makeOutlinePolygonLines(instanceGeometry, color, p0)
    }
    if (instanceGeometry instanceof Geometry.Line) {
      return this.makeLines(instanceGeometry, material, p0)
    }
    console.error('unknown geometry')
  }

  makeLines (line, material, p0 = { x: 0, y: 0, z: 0 }) {
    const geometry = this.makeMergedCylinderGeometriesFromLines(line)
    geometry.translate(p0.x, p0.y, p0.z)
    return new THREE.Mesh(geometry, material)
  }

  makeMergedCylinderGeometriesFromLines (line) {
    const inputVertices = line.xyzWaypoints
    const verticesTranslatedToOrigin = inputVertices.map(v => xyzSubtract(v, inputVertices[0]))
    const vectors = verticesTranslatedToOrigin.map(v => new THREE.Vector3(v.x, v.y, v.z))
    const geometries = []
    const initCylinderVector = new THREE.Vector3(0, 1, 0)
    const segmentVector = new THREE.Vector3()
    const matrix = new THREE.Matrix4()
    const quaternion = new THREE.Quaternion()
    const r = line.radius
    vectors.forEach((v, i) => {
      if (i < vectors.length - 1) {
        segmentVector.subVectors(vectors[i + 1], v)
        const len = segmentVector.length()
        const cylinder = new THREE.CylinderBufferGeometry(r, r, len, 3, 1, true)
        cylinder.translate(0, len / 2, 0)
        quaternion.setFromUnitVectors(initCylinderVector, segmentVector.normalize())
        matrix.makeRotationFromQuaternion(quaternion)
        cylinder.applyMatrix4(matrix)
        cylinder.translate(v.x, v.y, v.z)
        geometries.push(cylinder)
      }
    })
    return BufferGeometryUtils.mergeBufferGeometries(geometries, true)
  }

  makeOutlinePolygonLines (outlinePolygon, hexColor, p0 = { x: 0, y: 0, z: 0 }) {
    const material = new THREE.LineBasicMaterial({ color: hexColor })
    const geometry = new THREE.Geometry()
    const xyInputVertices = outlinePolygon.xyPolygon
    const xyVerticesTranslatedToOrigin = xyInputVertices.map(v => xyzSubtract(v, xyInputVertices[0]))
    const vectors = xyVerticesTranslatedToOrigin.map(v => new THREE.Vector3(v.x, v.y, 0))
    geometry.vertices.push(...vectors)
    geometry.translate(p0.x, p0.y, p0.z)
    const line = new THREE.Line(geometry, material)
    return line
  }

  makeThickPolygonMesh (thickPolygon, material, p0 = { x: 0, y: 0, z: 0 }) {
    const xyPolygon = thickPolygon.xyPolygon
    const x0 = xyPolygon[0].x
    const y0 = xyPolygon[0].y
    const shape = new THREE.Shape(xyPolygon)
    shape.closePath()

    for (const opening of thickPolygon.openings) {
      const points = opening.map(xy => new THREE.Vector2(xy.x, xy.y))
      const path = new THREE.Path(points)
      shape.holes.push(path)
    }

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickPolygon.depth,
      bevelEnabled: false
    })
    geometry.translate(-x0, -y0, 0)

    const mesh = new THREE.Mesh(geometry, material)
    if (thickPolygon.incline) {
      const x1 = xyPolygon[1].x
      const y1 = xyPolygon[1].y
      const edge = new THREE.Vector3(x1 - x0, y1 - y0, 0)
      const hypotenuse = edge.length()
      const angle = Math.asin(thickPolygon.incline / hypotenuse)

      // want to rotate around axis perpendicular to edge and in x-y plane
      const axis = new THREE.Vector3().crossVectors(edge, new THREE.Vector3(0, 0, 1))
      axis.normalize()
      const R = new THREE.Matrix4().makeRotationAxis(axis, angle)
      mesh.applyMatrix4(R)
    }
    if (thickPolygon.zRotation) {
      const R2 = new THREE.Matrix4().makeRotationZ(thickPolygon.zRotation)
      mesh.applyMatrix4(R2)
    }
    const T = new THREE.Matrix4().setPosition(p0.x, p0.y, p0.z)
    mesh.applyMatrix4(T)
    mesh.castShadow = true
    return mesh
  }

  /**
   * Returns a THREE.Mesh() with a geometry that matches the given spec
   * @param {Object} triangularPolyhedron - an object like { vertices: [xyz, xyz...], indicesOfFaces: [3, 8, 2...] }
   * @param {THREE.Material} material - the material for the new Mesh
   * @param {xyz} p0 - desired position of first vertex
   * @returns {THREE.Mesh}
   */
  makeTriangularPolyhedronMesh (triangularPolyhedron, material, p0) {
    const v0 = triangularPolyhedron.vertices[0]
    const verticesTranslatedToOrigin = triangularPolyhedron.vertices.map(v => xyzSubtract(v, v0))
    const geometry = new THREE.Geometry()
    geometry.vertices = verticesTranslatedToOrigin.map(v => new THREE.Vector3(v.x, v.y, v.z))

    geometry.translate(p0.x, p0.y, p0.z)
    geometry.faces = triangularPolyhedron.indicesOfFaces.map(abc => new THREE.Face3(...abc))
    geometry.computeBoundingSphere()
    geometry.computeFaceNormals()
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
  }

  makeInstancedMesh (instancedFeature) {
    const feature = instancedFeature.feature
    const poses = instancedFeature.poses
    const materialCost = instancedFeature.materialCost
    const useNormals = instancedFeature.useNormals
    const geometries = []
    const materials = []

    const visitor = feature => {
      if (feature instanceof FeatureInstance) {
        let geometry
        const offset = feature.p0
        for (let p = feature.parent; p !== instancedFeature; p = p.parent) {
          if (p.offset) {
            offset.x += p.offset.x
            offset.y += p.offset.y
            offset.z += p.offset.z
          }
        }

        if (feature.geometry instanceof Geometry.TriangularPolyhedron) {
          geometry = new THREE.BufferGeometry()
          const positions = []
          const vertices = feature.geometry.vertices
          vertices.forEach(v => positions.push(v.x, v.y, v.z))
          geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
          if (useNormals) {
            geometry.computeVertexNormals() // not indexed, so computes normals per triangle
          }
        } else if (feature.geometry instanceof Geometry.ThickPolygon) {
          const thickPolygon = feature.geometry
          const xyPolygon = thickPolygon.xyPolygon
          const x0 = xyPolygon[0].x
          const y0 = xyPolygon[0].y
          const shape = new THREE.Shape(xyPolygon)
          shape.closePath()

          for (const opening of thickPolygon.openings) {
            const points = opening.map(xy => new THREE.Vector2(xy.x, xy.y))
            const path = new THREE.Path(points)
            shape.holes.push(path)
          }

          geometry = new THREE.ExtrudeBufferGeometry(shape, {
            depth: thickPolygon.depth,
            bevelEnabled: false
          })
          geometry.deleteAttribute('uv')
          if (!useNormals) {
            geometry.deleteAttribute('normal')
          }
          geometry.translate(-x0, -y0, 0)

          if (thickPolygon.incline) {
            const x1 = xyPolygon[1].x
            const y1 = xyPolygon[1].y
            const edge = new THREE.Vector3(x1 - x0, y1 - y0, 0)
            const hypotenuse = edge.length()
            const angle = Math.asin(thickPolygon.incline / hypotenuse)

            // want to rotate around axis perpendicular to edge and in x-y plane
            const axis = new THREE.Vector3().crossVectors(edge, new THREE.Vector3(0, 0, 1))
            axis.normalize()
            const R = new THREE.Matrix4().makeRotationAxis(axis, angle)
            geometry.applyMatrix4(R)
          }
          if (thickPolygon.zRotation) {
            const R2 = new THREE.Matrix4().makeRotationZ(thickPolygon.zRotation)
            geometry.applyMatrix4(R2)
          }
          geometry.translate(offset.x, offset.y, offset.z)
        } else if (feature.geometry instanceof Geometry.OutlinePolygon) {
          console.warn('makeInstancedMesh() currently ignores outlines')
        } else if (feature.geometry instanceof Geometry.Line) {
          geometry = this.makeMergedCylinderGeometriesFromLines(feature.geometry)
          geometry.deleteAttribute('uv')
          if (!useNormals) {
            geometry.deleteAttribute('normal')
          }
          geometry = geometry.toNonIndexed()
          geometry.translate(offset.x, offset.y, offset.z)
        } else {
          console.error('unknown geometry')
        }
        // TODO:
        // const side = feature.side == 'front' ? THREE.FrontSide : THREE.DoubleSide
        if (geometry) {
          materials.push(this._material(materialCost, feature.hexColor, true))
          geometries.push(geometry)
        }
      }
    }

    if (feature.accept) {
      feature.accept(visitor)
    } else {
      visitor(feature)
    }

    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, true)

    // Clone one copy of each unique material, and redo material indices to use them.
    const clonedMaterials = []
    let materialIndex = 0
    materials.forEach((mat, i) => {
      if (mat) {
        clonedMaterials.push(mat.clone())
        mergedGeometry.groups[i].materialIndex = materialIndex
        for (let j = i + 1; j < materials.length; j++) {
          if (materials[j] === materials[i]) {
            mergedGeometry.groups[j].materialIndex = materialIndex
            materials[j] = null
          }
        }
        materialIndex++
      }
    })

    const mesh = new THREE.InstancedMesh(mergedGeometry, clonedMaterials, poses.length)
    const dummy = new THREE.Object3D()
    poses.forEach((p, i) => {
      dummy.scale.x = p.mirrored ? -1 : 1
      dummy.rotation.z = (p.rotated || 0) * Math.PI / 180
      dummy.position.set(p.x, p.y, p.z)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    // mesh.onBeforeRender = (renderer, scene, camera, mergedGeometry, material, group) => {
    //   console.log(material)
    // }
    return mesh
  }

  _material (materialCost, color, twoSided = false) {
    if (isNaN(color)) {
      color = FIXME_FUCHSIA
    }
    const side = twoSided ? THREE.DoubleSide : THREE.FrontSide
    if (!(color in this._materials[materialCost][side])) {
      if (materialCost === 'lowest') {
        this._materials[materialCost][side][color] = new THREE.MeshBasicMaterial({ color, side })
      } else if (materialCost === 'medium') {
        this._materials[materialCost][side][color] = new THREE.MeshLambertMaterial({ color, side })
      } else if (materialCost === 'high') {
        this._materials[materialCost][side][color] = new THREE.MeshPhongMaterial({ color, side })
      } else {
        console.error('unknown materialCost', materialCost)
      }
    }
    return this._materials[materialCost][side][color]
  }
}

export { ThreeOutputScene }
