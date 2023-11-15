import { Element } from "../../../element/Element.js";
import { buildings } from "../../../data/buildings.js";
import { mapObjects } from "../../../data/mapObjects.js";
import { MapObject, StoneObject, TreeObject, WaterObject } from "./MapObject.js";
import { database as db, ref, set, get } from "../../../../firebase.js";
import { MapGatheredNumber } from "../../_elements/GatheredNumber.js";
import { architectObjects } from "../../../data/architectObjects.js";

var map = [
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
];

var storedMapObjects = [];

class Map extends Element {
    constructor(game, menu) {
        super(game);

        this.menu = menu;
        this.TILE_SIZE = (this.game.canvas.width / 32) * this.game.playerManager.preferedZoom;
        this.MENU_SIZE = menu.MENU_SIZE;

        this.waterAnimation = setInterval(() => this.changeWater(), 800);
        this.waterState = 0;

        this.scrollable = false;

        this.zoom = this.game.playerManager.preferedZoom;
        this.MAX_ZOOM = 2;
        this.MIN_ZOOM = 0.6;

        this.time = 6;

        this.oldMapScroll = {
            x: this.game.playerManager.lastMapPos.x,
            y: this.game.playerManager.lastMapPos.y,
        };

        this.mapScroll = {
            x: this.game.playerManager.lastMapPos.x,
            y: this.game.playerManager.lastMapPos.y,
        };

        this.selectedTile = {
            x: 0,
            y: 0,
        };

        this.targetScroll = {};

        this.clicks = [];

        if (storedMapObjects.length === 0) {
            this.createMapObjects();
        }

        for (let i = 0; i < this.game.buildingsManager.buildings.length; i++) {
            let building = this.game.buildingsManager.buildings[i];
            this.changeMap(building.posX, building.posY, buildings[building.buildingId].size.x, buildings[building.buildingId].size.y, 2);
        }

        this.updateObjectsParent();

        this.updateSizes();
    }

    draw() {
        let overlap = 1 / this.zoom;
        let construction = this.game.constructionManager;

        let startX = Math.floor(-this.mapScroll.x / this.TILE_SIZE);
        let startY = Math.floor(-this.mapScroll.y / this.TILE_SIZE);
        let endX = Math.ceil((this.game.canvas.width - this.MENU_SIZE - this.mapScroll.x) / this.TILE_SIZE);
        let endY = Math.ceil((this.game.canvas.height - this.mapScroll.y) / this.TILE_SIZE);

        startX = Math.max(0, startX);
        startY = Math.max(0, startY);
        endX = Math.min(map[0].length, endX);
        endY = Math.min(map.length, endY);

        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                let xPos = this.MENU_SIZE + x * this.TILE_SIZE + this.mapScroll.x;
                let yPos = y * this.TILE_SIZE + this.mapScroll.y;
                let size = this.TILE_SIZE + overlap;

                this.game.ctx.drawImage(this.getTileImage(map[y][x], y, x), xPos, yPos, size, size);
            }
        }

        for (let i = 0; i < storedMapObjects.length; i++) {
            storedMapObjects[i].draw();
        }

        for (let i = 0; i < this.game.buildingsManager.buildings.length; i++) {
            let building = this.game.buildingsManager.buildings[i];
            if (
                this.game.sceneManager.currentScene?.data?.changePosition === true &&
                this.game.sceneManager.currentScene?.data?.progress === 1 &&
                this.game.sceneManager.currentScene?.data?.clickedBuilding === i
            ) {
                if (building.upgrading === false) {
                    this.game.ctx.drawImage(
                        this.game.assetsManager.images[buildings[building.buildingId].image],
                        this.MENU_SIZE + this.mapScroll.x + this.selectedTile.x * this.TILE_SIZE,
                        this.mapScroll.y + this.selectedTile.y * this.TILE_SIZE,
                        building.width,
                        building.height
                    );

                    this.game.ctx.globalCompositeOperation = "source-atop";
                    this.game.ctx.fillStyle = this.checkElementPos(building.buildingId, "building") ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)";

                    this.game.ctx.fillRect(
                        this.MENU_SIZE + this.mapScroll.x + this.selectedTile.x * this.TILE_SIZE,
                        this.mapScroll.y + this.selectedTile.y * this.TILE_SIZE,
                        buildings[building.buildingId].size.x * this.TILE_SIZE,
                        buildings[building.buildingId].size.y * this.TILE_SIZE
                    );

                    this.game.ctx.globalCompositeOperation = "source-over";
                }
            } else {
                if (typeof building.x === "undefined") {
                    this.updateSizes();
                }

                if (building.upgrading === false) {
                    this.game.ctx.drawImage(
                        this.game.assetsManager.images[buildings[building.buildingId].image],
                        building.x,
                        building.y,
                        building.width,
                        building.height
                    );

                    this.game.strokeText("Poziom " + building.lvl, building.x + building.width / 2, building.y + building.height / 2, this.TILE_SIZE * 0.8);
                    this.game.writeText("Poziom " + building.lvl, building.x + building.width / 2, building.y + building.height / 2, this.TILE_SIZE * 0.8);
                }
            }
        }

        if (this.game.sceneManager.currentScene?.data?.placeObject === true) {
            let object = architectObjects[this.game.sceneManager.currentScene.data.objectId];
            this.game.ctx.drawImage(
                this.game.assetsManager.images[object.image],
                this.MENU_SIZE + this.mapScroll.x + this.selectedTile.x * this.TILE_SIZE,
                this.mapScroll.y + this.selectedTile.y * this.TILE_SIZE,
                object.sizeX * this.TILE_SIZE,
                object.sizeY * this.TILE_SIZE
            );

            this.game.ctx.globalCompositeOperation = "source-atop";
            this.game.ctx.fillStyle = this.checkElementPos(object.id, "object") ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)";

            this.game.ctx.fillRect(
                this.MENU_SIZE + this.mapScroll.x + this.selectedTile.x * this.TILE_SIZE,
                this.mapScroll.y + this.selectedTile.y * this.TILE_SIZE,
                object.sizeX * this.TILE_SIZE,
                object.sizeY * this.TILE_SIZE
            );

            this.game.ctx.globalCompositeOperation = "source-over";
        }

        if (construction.constructionState === 0) {
            this.game.ctx.drawImage(
                this.game.assetsManager.images[buildings[construction.buildingId].image],
                this.MENU_SIZE + this.mapScroll.x + this.selectedTile.x * this.TILE_SIZE,
                this.mapScroll.y + this.selectedTile.y * this.TILE_SIZE,
                buildings[construction.buildingId].size.x * this.TILE_SIZE,
                buildings[construction.buildingId].size.y * this.TILE_SIZE
            );
            this.game.ctx.globalCompositeOperation = "source-atop";
            this.game.ctx.fillStyle = this.checkElementPos(construction.buildingId, "building") ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)";

            this.game.ctx.fillRect(
                this.MENU_SIZE + this.mapScroll.x + this.selectedTile.x * this.TILE_SIZE,
                this.mapScroll.y + this.selectedTile.y * this.TILE_SIZE,
                buildings[construction.buildingId].size.x * this.TILE_SIZE,
                buildings[construction.buildingId].size.y * this.TILE_SIZE
            );

            this.game.ctx.globalCompositeOperation = "source-over";
        } else if (construction.constructionState === 1) {
            this.game.ctx.shadowColor = "#339966";
            this.game.ctx.shadowBlur = this.TILE_SIZE;
            this.game.ctx.fillStyle = "#33996666";
            this.game.ctx.fillRect(
                this.MENU_SIZE + this.mapScroll.x + construction.constructionX * this.TILE_SIZE - this.TILE_SIZE / 8,
                this.mapScroll.y + construction.constructionY * this.TILE_SIZE - this.TILE_SIZE / 8,
                buildings[construction.buildingId].size.x * this.TILE_SIZE + this.TILE_SIZE / 4,
                buildings[construction.buildingId].size.y * this.TILE_SIZE + this.TILE_SIZE / 4
            );
            this.game.ctx.drawImage(
                this.game.assetsManager.images[buildings[construction.buildingId].image],
                this.MENU_SIZE + this.mapScroll.x + construction.constructionX * this.TILE_SIZE,
                this.mapScroll.y + construction.constructionY * this.TILE_SIZE,
                buildings[construction.buildingId].size.x * this.TILE_SIZE,
                buildings[construction.buildingId].size.y * this.TILE_SIZE
            );

            this.game.ctx.shadowColor = "rgba(0, 0, 0, 0)";
            this.game.ctx.shadowBlur = 0;

            this.game.strokeText(
                construction.clickProgress + "/" + construction.neededClicks,
                this.MENU_SIZE +
                    this.mapScroll.x +
                    construction.constructionX * this.TILE_SIZE +
                    (buildings[construction.buildingId].size.x * this.TILE_SIZE) / 2,
                this.mapScroll.y + construction.constructionY * this.TILE_SIZE + (buildings[construction.buildingId].size.y * this.TILE_SIZE) / 2,
                this.TILE_SIZE * 0.8
            );
            this.game.writeText(
                construction.clickProgress + "/" + construction.neededClicks,
                this.MENU_SIZE +
                    this.mapScroll.x +
                    construction.constructionX * this.TILE_SIZE +
                    (buildings[construction.buildingId].size.x * this.TILE_SIZE) / 2,
                this.mapScroll.y + construction.constructionY * this.TILE_SIZE + (buildings[construction.buildingId].size.y * this.TILE_SIZE) / 2,
                this.TILE_SIZE * 0.8
            );
        }

        for (let i = this.clicks.length - 1; i >= 0; i--) {
            this.clicks[i].draw();
            this.clicks[i].updatePos(this.mapScroll.x, this.mapScroll.y, this.TILE_SIZE);
        }

        this.drawDayCycle();

        this.menu.draw();

        let hours = Math.floor(this.game.time / 60);
        hours = hours < 10 ? "0" + hours : hours;
        let minutes = Math.floor(this.game.time % 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;

        this.game.strokeText(
            `${hours}:${minutes}`,
            this.game.canvas.width * 0.99,
            this.game.canvas.width * 0.01,
            this.game.canvas.width / 50,
            "#000",
            "right",
            "top"
        );
        this.game.writeText(
            `${hours}:${minutes}`,
            this.game.canvas.width * 0.99,
            this.game.canvas.width * 0.01,
            this.game.canvas.width / 50,
            "#fff",
            "right",
            "top"
        );

        if (construction.constructionState === 0) {
            this.drawTopInfoText("Wybierz miejsce dla budynku");
        }

        if (this.game.sceneManager.currentScene?.data?.changePosition === true) {
            if (this.game.sceneManager.currentScene?.data?.progress === 0) {
                this.drawTopInfoText("Wybierz budynek do przeniesienia");
            } else if (this.game.sceneManager.currentScene?.data?.progress === 1) {
                this.drawTopInfoText("Wybierz miejsce dla budynku");
            }
        } else if (this.game.sceneManager.currentScene?.data?.removeObject === true) {
            if (this.game.sceneManager.currentScene?.data?.progress === 0) {
                this.drawTopInfoText("Wybierz obiekty do usunięcia");
            }
        } else if (this.game.sceneManager.currentScene?.data?.placeObject === true) {
            this.drawTopInfoText("Wybierz miejsce dla obiektu");
        }
    }

    drawTopInfoText(text) {
        this.game.strokeText(text, (this.game.canvas.width - this.MENU_SIZE) / 2 + this.MENU_SIZE, this.game.canvas.height / 25, this.game.canvas.height / 25);
        this.game.writeText(text, (this.game.canvas.width - this.MENU_SIZE) / 2 + this.MENU_SIZE, this.game.canvas.height / 25, this.game.canvas.height / 25);
    }

    drawDayCycle() {
        let colorStops = {
            night: "rgba(0, 0, 50, ",
            sun: "rgba(255, 100, 50, ",
        };

        let gradient = this.game.ctx.createLinearGradient(0, this.mapScroll.y, 0, map.length * this.TILE_SIZE + this.mapScroll.y);

        if (this.game.time >= 360 && this.game.time < 420) {
            let progress = ((this.game.time - 360) / (420 - 360)) * 0.5;
            gradient.addColorStop(0, colorStops.sun + progress / 2 + ")");
            gradient.addColorStop(progress * 2, colorStops.night + "0.5)");
            gradient.addColorStop(1, colorStops.night + "0.5)");
        } else if (this.game.time >= 420 && this.game.time < 480) {
            let progress = ((this.game.time - 420) / (480 - 420)) * 0.5;
            gradient.addColorStop(0, colorStops.sun + (0.5 - progress) / 2 + ")");
            gradient.addColorStop(1, colorStops.night + (0.5 - progress) + ")");
        } else if (this.game.time >= 1200 && this.game.time < 1260) {
            let progress = ((this.game.time - 1200) / (1260 - 1200)) * 0.5;
            gradient.addColorStop(0, colorStops.night + progress + ")");
            gradient.addColorStop(1, colorStops.sun + progress / 2 + ")");
        } else if (this.game.time >= 1260 && this.game.time < 1320) {
            let progress = ((this.game.time - 1260) / (1320 - 1260)) * 0.5;
            gradient.addColorStop(0, colorStops.night + "0.5)");
            gradient.addColorStop(progress * 2, colorStops.night + "0.5)");
            gradient.addColorStop(1, colorStops.sun + "0.25)");
        } else if (this.game.time >= 1320 || this.game.time < 360) {
            gradient.addColorStop(0, colorStops.night + "0.5)");
            gradient.addColorStop(1, colorStops.night + "0.5)");
        }

        this.game.ctx.fillStyle = gradient;
        this.game.ctx.fillRect(0, this.mapScroll.y, this.game.canvas.width, map.length * this.TILE_SIZE);
    }

    unload() {
        clearInterval(this.waterAnimation);
    }

    getTileImage(id, y, x) {
        let num = ((Math.abs(Math.sin(x) * y * Math.cos(y) * (x + y)) % 3) + 1) | 0;
        return this.game.assetsManager.images["grassTile" + (num > 1 ? num : "")];
    }

    changeWater() {
        if (this.waterState > 0) {
            this.waterState = 0;
        } else {
            this.waterState++;
        }
    }

    onMouseDown(mouseX) {
        if (mouseX >= this.MENU_SIZE) {
            this.scrollable = true;

            this.oldMapScroll.x = this.mapScroll.x;
            this.oldMapScroll.y = this.mapScroll.y;
        }
    }

    onMouseDrag(mouseLastPos, event) {
        if (this.scrollable) {
            if (Math.abs(mouseLastPos.x - event.clientX) > 7 || Math.abs(mouseLastPos.y - event.clientY) > 7) {
                let mapPosition = {
                    x: this.oldMapScroll.x + (event.clientX - mouseLastPos.x) * this.zoom,
                    y: this.oldMapScroll.y + (event.clientY - mouseLastPos.y) * this.zoom,
                };

                let maxScroll = {
                    x: (this.TILE_SIZE * map[0].length - window.innerWidth + this.MENU_SIZE) * -1,
                    y: (this.TILE_SIZE * map.length - window.innerHeight) * -1,
                };

                this.mapScroll.x = Math.max(Math.min(mapPosition.x, 0), maxScroll.x);
                this.mapScroll.y = Math.max(Math.min(mapPosition.y, 0), maxScroll.y);
            }
        }

        this.updateSizes();
    }

    onMouseMove(mouseLastPos, event) {
        if (
            this.game.constructionManager.constructionState === 0 ||
            (this.game.sceneManager.currentScene?.data?.changePosition === true && this.game.sceneManager.currentScene?.data?.progress === 1) ||
            this.game.sceneManager.currentScene?.data?.placeObject === true
        ) {
            if (event.clientX >= this.MENU_SIZE) {
                this.selectedTile = {
                    x: Math.floor((event.clientX - this.mapScroll.x - this.MENU_SIZE) / this.TILE_SIZE),
                    y: Math.floor((event.clientY - this.mapScroll.y) / this.TILE_SIZE),
                };
            }
        }
    }

    onMouseUp() {
        this.oldMapScroll.x = this.mapScroll.x;
        this.oldMapScroll.y = this.mapScroll.y;

        this.scrollable = false;

        this.updateSizes();
    }

    onClick(mouseX, mouseY) {
        if (mouseX >= this.MENU_SIZE) {
            let tileX = Math.floor((mouseX - this.mapScroll.x - this.MENU_SIZE) / this.TILE_SIZE);
            let tileY = Math.floor((mouseY - this.mapScroll.y) / this.TILE_SIZE);

            if (this.game.sceneManager.currentScene?.data?.changePosition === true) {
                let id = this.game.buildingsManager.getClickedBuilding(mouseX, mouseY);
                if (typeof id !== "number") {
                    id = this.game.sceneManager.currentScene?.data?.clickedBuilding;
                }
                let building = this.game.buildingsManager.buildings[id];
                if (this.game.sceneManager.currentScene.data.progress === 0) {
                    if (typeof id === "number") {
                        if (building.upgrading === false) {
                            this.selectedTile = {
                                x: tileX,
                                y: tileY,
                            };
                            this.game.sceneManager.currentScene.data.clickedBuilding = id;
                            this.game.sceneManager.currentScene.data.progress = 1;
                            this.changeMap(building.posX, building.posY, buildings[building.buildingId].size.x, buildings[building.buildingId].size.y, 0);
                        }
                    }
                } else if (this.game.sceneManager.currentScene.data.progress === 1) {
                    if (this.checkElementPos(building.buildingId, "building")) {
                        building.posX = tileX;
                        building.posY = tileY;
                        this.game.buildingsManager.saveBuilding(id);
                        this.changeMap(tileX, tileY, buildings[building.buildingId].size.x, buildings[building.buildingId].size.y, 2);
                        delete this.game.sceneManager.currentScene.data;
                    }
                }
                return;
            } else if (this.game.sceneManager.currentScene?.data?.removeObject === true) {
                for (let i = 0; i < storedMapObjects.length; i++) {
                    if (storedMapObjects[i].isMouseOver(mouseX, mouseY)) {
                        this.handleDestroyedObject(storedMapObjects[i].tileX, storedMapObjects[i].tileY, storedMapObjects[i].sizeX, storedMapObjects[i].sizeY);
                        return;
                    }
                }
                return;
            } else if (this.game.sceneManager.currentScene?.data?.placeObject === true) {
                let obj = architectObjects[this.game.sceneManager.currentScene.data.objectId];
                if (
                    this.game.playerManager.wood >= obj.cost.wood &&
                    this.game.playerManager.stone >= obj.cost.stone &&
                    this.game.playerManager.gold >= obj.cost.gold
                ) {
                    this.game.playerManager.wood -= obj.cost.wood;
                    this.game.playerManager.stone -= obj.cost.stone;
                    this.game.playerManager.gold -= obj.cost.gold;
                    obj.x = this.selectedTile.x;
                    obj.y = this.selectedTile.y;
                    this.handleCreateObject(obj, true);
                }
                return;
            }

            if (this.game.constructionManager.constructionState === 0) {
                this.selectedTile = {
                    x: tileX,
                    y: tileY,
                };
                if (this.checkElementPos(this.game.constructionManager.buildingId, "building")) {
                    this.game.constructionManager.setBuild(this.selectedTile.x, this.selectedTile.y);
                    this.selectedTile.x = 0;
                    this.selectedTile.y = 0;
                }
                return;
            } else if (this.game.constructionManager.constructionState === 1) {
                if (this.game.constructionManager.isMouseOver(mouseX, mouseY)) {
                    let progress = this.game.constructionManager.addProgress("click");
                    this.clicks.push(new MapGatheredNumber(this.game, this.clicks.length, progress.critic, progress.amount, this.clicks, this.TILE_SIZE));
                    return;
                }
            }

            if (this.game.buildingsManager.onClick(mouseX, mouseY)) {
                this.game.playerManager.lastMapPos = {
                    x: this.mapScroll.x,
                    y: this.mapScroll.y,
                };
                this.game.assetsManager.playAudio("click2", true);
                return;
            }

            for (let i = 0; i < storedMapObjects.length; i++) {
                if (storedMapObjects[i].onClick(mouseX, mouseY)) {
                    return;
                }
            }
        }
    }

    addWorkerClick(critic, amount) {
        this.clicks.push(new MapGatheredNumber(this.game, this.clicks.length, critic, amount, this.clicks, this.TILE_SIZE, "worker"));
    }

    onRightClick(mouseX, mouseY) {
        if (this.game.sceneManager.currentScene?.data?.changePosition === true) {
            if (this.game.sceneManager.currentScene?.data?.progress === 1) {
                let id = this.game.sceneManager.currentScene.data.clickedBuilding;
                let building = this.game.buildingsManager.buildings[id];

                this.changeMap(building.posX, building.posY, buildings[building.buildingId].size.x, buildings[building.buildingId].size.y, 2);
            }
            delete this.game.sceneManager.currentScene?.data;
            return;
        }

        if (this.game.sceneManager.currentScene?.data?.removeObject === true || this.game.sceneManager.currentScene?.data?.placeObject === true) {
            delete this.game.sceneManager.currentScene?.data;
            return;
        }

        if (mouseX >= this.MENU_SIZE && this.game.playerManager.gem === "max") {
            if (this.game.constructionManager.constructionState === 1) {
                if (this.game.constructionManager.isMouseOver(mouseX, mouseY)) {
                    this.game.constructionManager.addProgress("worker", 10000);
                    return;
                }
            }
        }
    }

    onScroll(event) {
        if (event.clientX > this.MENU_SIZE) {
            let newZoom = this.zoom - Math.sign(event.deltaY) * 0.1;
            newZoom = Math.max(this.MIN_ZOOM, Math.min(this.MAX_ZOOM, newZoom));

            let zoomFactor = newZoom / this.zoom;

            let cursorPos = {
                x: event.clientX - this.MENU_SIZE,
                y: event.clientY,
            };

            this.mapScroll.x -= cursorPos.x * (zoomFactor - 1);
            this.mapScroll.y -= cursorPos.y * (zoomFactor - 1);

            let maxScroll = {
                x: Math.min(0, (this.TILE_SIZE * map[0].length - window.innerWidth + this.MENU_SIZE) * -1),
                y: (this.TILE_SIZE * map.length - window.innerHeight) * -1,
            };

            this.mapScroll.x = Math.max(maxScroll.x, Math.min(0, this.mapScroll.x));
            this.mapScroll.y = Math.max(maxScroll.y, Math.min(0, this.mapScroll.y));

            this.zoom = newZoom;
            this.game.playerManager.preferedZoom = this.zoom;
            this.TILE_SIZE = (this.game.canvas.width / 32) * this.zoom;

            this.updateSizes();
        }
    }

    onHover(mouseX, mouseY) {
        if (this.game.sceneManager.currentScene?.data?.changePosition === true) {
            if (this.game.sceneManager.currentScene?.data?.progress === 0) {
                let id = this.game.buildingsManager.getClickedBuilding(mouseX, mouseY);
                let cursor = typeof id === "number" && this.game.buildingsManager.buildings[id].upgrading === false ? "pointer" : "default";
                this.game.canvas.style.cursor = cursor;
                return;
            } else if (this.game.sceneManager.currentScene?.data?.progress === 1) {
                let id = this.game.sceneManager.currentScene?.data?.clickedBuilding;
                let building = this.game.buildingsManager.buildings[id];
                let cursor = this.checkElementPos(building.buildingId, "building") ? "pointer" : "default";
                this.game.canvas.style.cursor = cursor;
                return;
            }
        } else if (this.game.sceneManager.currentScene?.data?.removeObject === true) {
            for (let i = 0; i < storedMapObjects.length; i++) {
                if (storedMapObjects[i].isMouseOver(mouseX, mouseY)) {
                    this.game.canvas.style.cursor = "pointer";
                    return;
                }
            }
            this.game.canvas.style.cursor = "default";
            return;
        }
        this.game.constructionManager.onHover(mouseX, mouseY);

        for (let i = 0; i < this.game.buildingsManager.buildings.length; i++) {
            if (this.game.buildingsManager.buildings[i].onHover(mouseX, mouseY)) {
                return;
            }
        }

        for (let i = 0; i < storedMapObjects.length; i++) {
            if (storedMapObjects[i].onHover(mouseX, mouseY)) {
                return;
            }
        }
    }

    updateSizes() {
        let construction = this.game.constructionManager;
        if (construction.constructionState === 1) {
            construction.x = this.MENU_SIZE + this.mapScroll.x + construction.constructionX * this.TILE_SIZE;
            construction.y = this.mapScroll.y + construction.constructionY * this.TILE_SIZE;
            construction.width = buildings[construction.buildingId].size.x * this.TILE_SIZE;
            construction.height = buildings[construction.buildingId].size.y * this.TILE_SIZE;
        }

        for (let i = 0; i < this.game.buildingsManager.buildings.length; i++) {
            let building = this.game.buildingsManager.buildings[i];
            building.x = this.MENU_SIZE + this.mapScroll.x + building.posX * this.TILE_SIZE;
            building.y = this.mapScroll.y + building.posY * this.TILE_SIZE;
            building.width = buildings[building.buildingId].size.x * this.TILE_SIZE;
            building.height = buildings[building.buildingId].size.y * this.TILE_SIZE;
        }

        for (let i = 0; i < storedMapObjects.length; i++) {
            //change
            storedMapObjects[i].updatePos(this.MENU_SIZE, this.TILE_SIZE, this.mapScroll.x, this.mapScroll.y);
        }

        for (let i = 0; i < this.clicks.length; i++) {
            this.clicks[i].updateRelativePos(this.TILE_SIZE);
        }
    }

    updateObjectsParent() {
        for (let i = 0; i < storedMapObjects.length; i++) {
            storedMapObjects[i].parent = this;
        }
    }

    handleDestroyedObject(tileX, tileY, sizeX, sizeY) {
        set(ref(db, `players/${this.game.playerManager.playerId}/mapObjects/o${tileY}_${tileX}`), null);
        storedMapObjects = storedMapObjects.filter((obj) => obj.id !== `${tileY}_${tileX}`);
        this.changeMap(tileX, tileY, sizeX, sizeY, 0);
    }

    checkElementPos(id, type) {
        let size = {
            x: (type === "building" ? buildings[id].size.x : architectObjects[id].sizeX) - 1,
            y: (type === "building" ? buildings[id].size.y : architectObjects[id].sizeY) - 1,
        };

        let isFree = true;

        for (let y = this.selectedTile.y; y <= this.selectedTile.y + size.y; y++) {
            for (let x = this.selectedTile.x; x <= this.selectedTile.x + size.x; x++) {
                if (map[y]?.[x] !== 0) {
                    isFree = false;
                    break;
                }
            }
        }

        return isFree;
    }

    onResize() {
        this.MENU_SIZE = this.menu.MENU_SIZE;
    }

    createMapObjects() {
        this.loadMapObjects()
            .then((objectsData) => {
                if (Array.isArray(objectsData)) {
                    for (let i = 0; i < objectsData.length; i++) {
                        this.handleCreateObject(objectsData[i]);
                    }
                } else {
                    for (let key in objectsData) {
                        this.handleCreateObject(objectsData[key]);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleCreateObject(mapObject, save = false) {
        if (mapObject.image === "water" || mapObject.image === "lava") {
            storedMapObjects.push(new WaterObject(this.game, this, mapObject.x, mapObject.y, mapObject.sizeX, mapObject.sizeY, mapObject.image));
        } else if (mapObject.image === "tree" || mapObject.image === "tree2") {
            storedMapObjects.push(
                new TreeObject(
                    this.game,
                    this,
                    mapObject.x,
                    mapObject.y,
                    mapObject.sizeX,
                    mapObject.sizeY,
                    mapObject.image,
                    mapObject.clicks ? mapObject.clicks : 5
                )
            );
        } else if (mapObject.image === "stone" || mapObject.image === "stone2") {
            storedMapObjects.push(
                new StoneObject(
                    this.game,
                    this,
                    mapObject.x,
                    mapObject.y,
                    mapObject.sizeX,
                    mapObject.sizeY,
                    mapObject.image,
                    mapObject.clicks ? mapObject.clicks : 15
                )
            );
        } else {
            storedMapObjects.push(new MapObject(this.game, this, mapObject.x, mapObject.y, mapObject.sizeX, mapObject.sizeY, mapObject.image));
        }

        if (save) {
            let saveObject = {
                x: mapObject.x,
                y: mapObject.y,
                sizeX: mapObject.sizeX,
                sizeY: mapObject.sizeY,
                image: mapObject.image,
            };
            set(ref(db, `players/${this.game.playerManager.playerId}/mapObjects/o${mapObject.y}_${mapObject.x}`), saveObject);
        }
        this.changeMap(mapObject.x, mapObject.y, mapObject.sizeX, mapObject.sizeY, 2);
    }

    loadMapObjects() {
        return new Promise((resolve, reject) => {
            get(ref(db, `players/${this.game.playerManager.playerId}/mapObjects/`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let objectsData = snapshot.val();
                        resolve(objectsData);
                    } else {
                        resolve(mapObjects);
                        let saveObjects = mapObjects.reduce((acc, cur) => {
                            let key = "o" + cur.y + "_" + cur.x;
                            acc[key] = cur;
                            return acc;
                        }, {});
                        set(ref(db, `players/${this.game.playerManager.playerId}/mapObjects/`), saveObjects);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    changeMap(tileX, tileY, sizeX, sizeY, value) {
        for (let y = tileY; y <= tileY + sizeY - 1; y++) {
            for (let x = tileX; x <= tileX + sizeX - 1; x++) {
                map[y][x] = value;
            }
        }
    }
}

export { Map, map };
