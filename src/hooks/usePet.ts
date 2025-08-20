import {useAtom} from "jotai";
import {PetListAtom} from "../atom/petatom.ts";

export function usePet() {
    const [pets, setPets] = useAtom(PetListAtom);

    const getPetById = (id: string) => pets.find(pet => pet.id === id);

    return {pets, setPets, getPetById};
}