# bikeway.py
#
# <pep8-80 compliant>

# UNLICENSE
# This is free and unencumbered software released into the public domain.
# For more information, please refer to <http://unlicense.org>
#
# Authored in 2019 by Nicky Nym <https://github.com/nicky-nym>

from typing import Tuple, Sequence, Iterable, Any, List, Optional, Union
from random import randint
from importlib import reload

from xyz import Num, Xyz, X, Y, Z, xy2xyz, yzwh2rect, nudge
from compass_facing import CompassFacing as Facing
from place import Place
from plato import Plato, rotate

# in feet
BLOCK_LENGTH = 660

PARCEL = [(0, 0, 0),
          (BLOCK_LENGTH, 0, 0),
          (BLOCK_LENGTH, BLOCK_LENGTH, 0),
          (0, BLOCK_LENGTH, 0)]

EXIT_DOWN = [(25, 0, 0.1),
             (25, 45, 0.1),
             (30, 90, 0.1),
             (40, 90, 0.1),
             (30, 0, 0.1)]
RAMP_DOWN_TO_LANDING = [(30, 90, 0),
                        (30, 270, -7.5),
                        (40, 270, -7.5),
                        (40, 90, 0)]
LANDING = [(30, 270, -7.5),
           (30, 390, -7.5),
           (50, 390, -7.5),
           (50, 270, -7.5)]
LANDING_PARKING = [(50, 270, -7.5),
                   (50, 390, -7.5),
                   (55, 390, -7.5),
                   (55, 270, -7.5)]
LANDING_PLAZA = [(55, 270, -7.5),
                 (55, 390, -7.5),
                 (70, 390, -7.5),
                 (70, 270, -7.5)]
LANDING_NORTH_WALKWAY = [(70, 381, -7.5),
                         (129, 381, -5),
                         (129, 375, -5),
                         (70, 375, -7.5)]
LANDING_SOUTH_WALKWAY = [(70, 285, -7.5),
                         (129, 285, -5),
                         (129, 279, -5),
                         (70, 279, -7.5)]

RAMP_UP_FROM_LANDING = [(30, 390, -7.5),
                        (30, 570, 0),
                        (40, 570, 0),
                        (40, 390, -7.5)]
ENTRANCE_FROM_BELOW = [(30, 570, 0.1),
                       (25, 615, 0.1),
                       (25, 660, 0.1),
                       (30, 660, 0.1),
                       (40, 570, 0.1)]
RAMP_DOWN_FROM_LANDING = [(40, 390, -7.5),
                          (40, 570, -15),
                          (50, 570, -15),
                          (50, 390, -7.5)]
RIGHT_TURN_TO_ENTER = [(40, 570, -15),
                       (55, 620, -14.9),
                       (100, 635, -14.9),
                       (100, 625, -14.9),
                       (64, 612, -15),
                       (50, 570, -15)]
ENTRANCE_FROM_ABOVE = [(100, 635, -14.9),
                       (170, 635, -14.9),
                       (100, 625, -14.9)]
EXIT_UP = [(170, 25, -14.9),
           (100, 25, -14.9),
           (100, 35, -14.9)]
RIGHT_TURN_FROM_EXIT = [(100, 25, -14.9),
                        (55, 40, -14.9),
                        (40, 90, -15),
                        (50, 90, -15),
                        (64, 48, -15),
                        (100, 35, -14.9)]
RAMP_UP_TO_LANDING = [(40, 90, -15),
                      (40, 270, -7.5),
                      (50, 270, -7.5),
                      (50, 90, -15)]
LOWER_PLAZA = [(170, 30, -14.9),
               (170, 45, -14.9),
               (490, 45, -14.9),
               (490, 30, -14.9)]

WALKWAY_SPACING = 96
WALKWAY_WIDTH = 6
WALKWAY_XA = 183
LOWER_PLAZA_WALKWAY_A = [(WALKWAY_XA, 45, -15),
                         (WALKWAY_XA, 129, -15),
                         (WALKWAY_XA + WALKWAY_WIDTH, 129, -15),
                         (WALKWAY_XA + WALKWAY_WIDTH, 45, -15)]
WALKWAY_XB = WALKWAY_XA + WALKWAY_SPACING
LOWER_PLAZA_WALKWAY_B = [(WALKWAY_XB, 45, -15),
                         (WALKWAY_XB, 129, -15),
                         (WALKWAY_XB + WALKWAY_WIDTH, 129, -15),
                         (WALKWAY_XB + WALKWAY_WIDTH, 45, -15)]
WALKWAY_XC = WALKWAY_XB + WALKWAY_SPACING
LOWER_PLAZA_WALKWAY_C = [(WALKWAY_XC, 45, -15),
                         (WALKWAY_XC, 129, -15),
                         (WALKWAY_XC + WALKWAY_WIDTH, 129, -15),
                         (WALKWAY_XC + WALKWAY_WIDTH, 45, -15)]
WALKWAY_XD = WALKWAY_XC + WALKWAY_SPACING
LOWER_PLAZA_WALKWAY_D = [(WALKWAY_XD, 45, -15),
                         (WALKWAY_XD, 129, -15),
                         (WALKWAY_XD + WALKWAY_WIDTH, 129, -15),
                         (WALKWAY_XD + WALKWAY_WIDTH, 45, -15)]


class Bikeway:
    """Bikeway objects know how to describe the Kinematic city bikeways."""

    def __init__(self, plato: Plato):
        self._plato = plato

    def add_boulevard(self, x: Num=0, y: Num=0, z: Num=0, facing=Facing.NORTH):
        NUM_LANES = 4
        LANE_WIDTH = 5
        LANE = [(0, 0, 0),
                (LANE_WIDTH, 0, 0),
                (LANE_WIDTH, BLOCK_LENGTH, 0),
                (0, BLOCK_LENGTH, 0)]
        self._plato.goto(x=x, y=y, z=z, facing=facing)
        self._plato.add_place(Place.BARE, shape=LANE)  # median strip
        delta = 0
        for i in range(NUM_LANES):
            delta += LANE_WIDTH
            (dx, dy, dz) = rotate((delta, 0, 0), facing)
            self._plato.goto(x=x+dx, y=y+dy, z=z+dz, facing=facing)
            self._plato.add_place(Place.BIKEPATH, shape=LANE)
        delta += LANE_WIDTH
        (dx, dy, dz) = rotate((delta, 0, 0), facing)
        self._plato.goto(x=x+dx, y=y+dy, z=z+dz, facing=facing)
        self._plato.add_place(Place.BARE, shape=LANE)  # shoulder
        return self

    def add_ramps(self):
        self._plato.add_place(Place.BIKEPATH, shape=EXIT_DOWN)
        self._plato.add_place(Place.BIKEPATH, shape=RAMP_DOWN_TO_LANDING)
        self._plato.add_place(Place.BIKEPATH, shape=LANDING)

        self._plato.add_place(Place.BARE, shape=LANDING_PARKING)
        self._plato.add_place(Place.WALKWAY, shape=LANDING_PLAZA)
        self._plato.add_place(Place.WALKWAY, shape=LANDING_NORTH_WALKWAY)
        self._plato.add_place(Place.WALKWAY, shape=LANDING_SOUTH_WALKWAY)

        self._plato.add_place(Place.BIKEPATH, shape=RAMP_UP_FROM_LANDING)
        self._plato.add_place(Place.BIKEPATH, shape=ENTRANCE_FROM_BELOW)
        self._plato.add_place(Place.BIKEPATH, shape=RAMP_DOWN_FROM_LANDING)
        self._plato.add_place(Place.BIKEPATH, shape=RIGHT_TURN_TO_ENTER)
        self._plato.add_place(Place.BIKEPATH, shape=ENTRANCE_FROM_ABOVE)
        self._plato.add_place(Place.BIKEPATH, shape=EXIT_UP)
        self._plato.add_place(Place.BIKEPATH, shape=RIGHT_TURN_FROM_EXIT)
        self._plato.add_place(Place.BIKEPATH, shape=RAMP_UP_TO_LANDING)

        self._plato.add_place(Place.WALKWAY, shape=LOWER_PLAZA)
        self._plato.add_place(Place.WALKWAY, shape=LOWER_PLAZA_WALKWAY_A)
        self._plato.add_place(Place.WALKWAY, shape=LOWER_PLAZA_WALKWAY_B)
        self._plato.add_place(Place.WALKWAY, shape=LOWER_PLAZA_WALKWAY_C)
        self._plato.add_place(Place.WALKWAY, shape=LOWER_PLAZA_WALKWAY_D)
        return self

    def add_highline(self, x: Num=0, y: Num=0, z: Num=0, facing=Facing.NORTH):
        HIGHLINE = [(0, 0, 0),
                    (0, 630, 0),
                    (30, 630, 0),
                    (30, 0, 0)]
        self._plato.goto(x=x, y=y, z=z, facing=facing)
        self._plato.add_place(Place.PARCEL, shape=HIGHLINE)
        self._plato.add_wall(shape=[(30, 630, 0), (30, 30, 0)], height=3, cap=False)
        return self

    def add_longhouse(self, x: Num=0, y: Num=0, z: Num=0, height: Num=10, facing=Facing.NORTH):
        LONGHOUSE = [(0, 35, 0),
                     (0, 625, 0),
                     (30, 625, 0),
                     (30, 35, 0)]
        WINDOWS = [(2, [yzwh2rect(y, 3, 4, height-2) for y in range(5, 585, 5)])]
        self._plato.goto(x=x, y=y, z=z, facing=facing)
        self._plato.add_place(Place.ROOM, shape=LONGHOUSE, wall=height, openings=WINDOWS)
        return self

    def add_block(self, row: Num=0, col: Num=0, buildings: bool=True):
        x = row * BLOCK_LENGTH
        y = col * BLOCK_LENGTH
        EAST_WEST_ALTITUDE = 7.5
        NORTH_SOUTH_ALTITUDE = 22.5
        HIGHLINE_ALTITUDE = 37.5

        self._plato.goto(x=x, y=y, z=-0.1, facing=Facing.NORTH)
        self._plato.add_place(Place.PARCEL, shape=PARCEL)

        self.add_boulevard(x=x, y=y, z=NORTH_SOUTH_ALTITUDE, facing=Facing.NORTH)
        if buildings:
            self.add_highline(x=x, y=y, z=HIGHLINE_ALTITUDE, facing=Facing.NORTH)
            self.add_longhouse(x=x, y=y, z=0, height=11.25, facing=Facing.NORTH)
            self.add_longhouse(x=x, y=y, z=11.25, height=11.25, facing=Facing.NORTH)
        self._plato.goto(x=x, y=y, z=NORTH_SOUTH_ALTITUDE, facing=Facing.NORTH)
        self.add_ramps()

        self.add_boulevard(x=x+BLOCK_LENGTH, y=y+BLOCK_LENGTH, z=NORTH_SOUTH_ALTITUDE, facing=Facing.SOUTH)
        if buildings:
            self.add_highline(x=x+BLOCK_LENGTH, y=y+BLOCK_LENGTH, z=HIGHLINE_ALTITUDE, facing=Facing.SOUTH)
            self.add_longhouse(x=x+BLOCK_LENGTH, y=y+BLOCK_LENGTH, z=0, height=11.25, facing=Facing.SOUTH)
            self.add_longhouse(x=x+BLOCK_LENGTH, y=y+BLOCK_LENGTH, z=11.25, height=11.25, facing=Facing.SOUTH)
        self._plato.goto(x=x+BLOCK_LENGTH, y=y+BLOCK_LENGTH, z=NORTH_SOUTH_ALTITUDE, facing=Facing.SOUTH)
        self.add_ramps()

        self.add_boulevard(x=x, y=y+BLOCK_LENGTH, z=EAST_WEST_ALTITUDE, facing=Facing.EAST)
        if buildings:
            self.add_highline(x=x, y=y+BLOCK_LENGTH, z=HIGHLINE_ALTITUDE, facing=Facing.EAST)
            self.add_longhouse(x=x, y=y+BLOCK_LENGTH, z=0, height=7.5, facing=Facing.EAST)
            self.add_longhouse(x=x, y=y+BLOCK_LENGTH, z=NORTH_SOUTH_ALTITUDE, height=15, facing=Facing.EAST)
        self._plato.goto(x=x, y=y, z=EAST_WEST_ALTITUDE, facing=Facing.EAST)

        self.add_boulevard(x=x+BLOCK_LENGTH, y=y, z=EAST_WEST_ALTITUDE, facing=Facing.WEST)
        if buildings:
            self.add_highline(x=x+BLOCK_LENGTH, y=y, z=HIGHLINE_ALTITUDE, facing=Facing.WEST)
            self.add_longhouse(x=x+BLOCK_LENGTH, y=y, z=0, height=7.5, facing=Facing.WEST)
            self.add_longhouse(x=x+BLOCK_LENGTH, y=y, z=NORTH_SOUTH_ALTITUDE, height=15, facing=Facing.WEST)
        self._plato.goto(x=x+BLOCK_LENGTH, y=y+BLOCK_LENGTH, z=EAST_WEST_ALTITUDE, facing=Facing.WEST)

        return self

    def add_bikeways(self, num_rows: Num=0, num_cols: Num=0, buildings: bool=True):
        for row in range(num_rows):
            for col in range(num_cols):
                self.add_block(row, col, buildings=buildings)
        return self
