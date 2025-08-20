import {atom} from "jotai";
import type {Pet} from "../types/pet";

export const PetListAtom = atom<Pet[]>([])