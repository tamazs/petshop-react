import {useAtom} from "jotai";
import {PetListAtom} from "../atom/petatom.ts";

export function usePet() {
    const [pets, setPets] = useAtom(PetListAtom);

    return {pets, setPets};
}