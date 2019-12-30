/** @file door_tests.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { Door } from '../../../src/architecture/door.js'
import { xy } from '../../../src/core/util.js'

/* global describe, it, beforeEach */

describe('Door', function () {
  describe.skip('accessor methods', function () {
    let hingedDoor
    let doubleLeafDoor
    let doubleActionDoor
    let dutchDoor
    let biFoldDoor
    let accordianDoor
    let pocketDoor
    let slidingDoor
    let revolvingDoor
    let garageDoor

    const hingedDoorSpec = {
      name: 'Regular hinged door',
      door: {
        shape: { type: 'arched', data: xy(2.5, 6.5) },
        motion: 'swinging', // default (also: 'accordian', 'sliding', 'revolving', 'overhead')
        knobSide: 'right', // default (also: 'left')
        moves: 'inward', // default (also: 'outward')
        hardware: ['lever', 'doorplate', 'mailslot', 'screendoor'],
        surface: 'flat' // default (also: 'glazed', 'louvered', 'batten', 'paneled')
      },
      frame: {
        width: 0.5, // default
        leftSidelight: false, // default
        rightSidelight: false, // default
        transom: false // default
      }
    }

    const doubleLeafDoorSpec = {
      name: 'Double-leaf door (like a french door)',
      door: {
        xLeafCount: 2,
        shape: { type: 'rectangle', data: xy(5, 6.5) },
        hardware: ['panicbar']
      }
    }

    const doubleActionDoorSpec = {
      name: 'Double-action door (swings both inward and outward)',
      door: {
        xLeafCount: 1, // default
        shape: { type: 'rectangle', data: xy(2.5, 6.5) },
        moves: ['inward', 'outward']
      }
    }

    const dutchDoorSpec = {
      name: 'Dutch door',
      door: {
        yLeafCount: 2,
        shape: { type: 'rectangle', data: xy(2.5, 6.5) },
        hardware: 'knob'
      }
    }

    const biFoldDoorSpec = {
      name: 'Bi-fold door',
      door: {
        xLeafCount: 2,
        motion: 'accordian',
        shape: { type: 'rectangle', data: xy(3, 6.5) }
      }
    }

    const accordianDoorSpec = {
      name: 'Accordian door door',
      door: {
        xLeafCount: 8,
        motion: 'accordian',
        shape: { type: 'rectangle', data: xy(6, 6.5) }
      }
    }

    const pocketDoorSpec = {
      name: 'Pocket door',
      door: {
        motion: 'sliding',
        shape: { type: 'rectangle', data: xy(2.5, 6.5) }
      }
    }

    const slidingDoorSpec = {
      name: 'Sliding door',
      door: {
        xLeafCount: 2,
        motion: 'sliding',
        shape: { type: 'rectangle', data: xy(6, 6.5) }
      }
    }

    const revolvingDoorSpec = {
      name: 'Revolving door',
      door: {
        xLeafCount: 2,
        motion: 'revolving',
        shape: { type: 'rectangle', data: xy(6, 7) }
      }
    }

    const garageDoorSpec = {
      name: 'Garage door (overhead track)',
      door: {
        yLeafCount: 5,
        motion: 'overhead',
        shape: { type: 'rectangle', data: xy(10, 7.5) }
      }
    }

    beforeEach(function () {
      hingedDoor = new Door(hingedDoorSpec)
      doubleLeafDoor = new Door(doubleLeafDoorSpec)
      doubleActionDoor = new Door(doubleActionDoorSpec)
      dutchDoor = new Door(dutchDoorSpec)
      biFoldDoor = new Door(biFoldDoorSpec)
      accordianDoor = new Door(accordianDoorSpec)
      pocketDoor = new Door(pocketDoorSpec)
      slidingDoor = new Door(slidingDoorSpec)
      revolvingDoor = new Door(revolvingDoorSpec)
      garageDoor = new Door(garageDoorSpec)
    })

    describe('#getClearOpening()', function () {
      it('should return the number of faces on the roof', function () {
        hingedDoor.getClearOpening().should.equal(xy(2.5, 6.5))
        doubleLeafDoor.getClearOpening().should.equal(xy(5, 6.5))
        doubleActionDoor.getClearOpening().should.equal(xy(2.5, 6.5))
        dutchDoor.getClearOpening().should.equal(xy(2.5, 6.5))
        biFoldDoor.getClearOpening().should.equal(xy(3 - 0.25, 6.5))
        accordianDoor.getClearOpening().should.equal(xy(6 - 1, 6.5))
        pocketDoor.getClearOpening().should.equal(xy(2.5, 6.5))
        slidingDoor.getClearOpening().should.equal(xy(6 / 2, 6.5))
        revolvingDoor.getClearOpening().should.equal(xy((6 - 0.5) / 2, 7))
        garageDoor.getClearOpening().should.equal(xy(10, 7.5))
      })
    })
  })
})
