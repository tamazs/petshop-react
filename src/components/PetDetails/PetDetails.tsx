import {useParams} from "react-router";
import {usePet} from "../../hooks/usePet.ts";
import PetDetailCard from "./PetDetailCard.tsx";
import {useEffect} from "react";
import toast from "react-hot-toast";

export default function PetDetails() {
    const params = useParams();
    const {getPetById} = usePet();
    const pet = getPetById(params.petId!);

    useEffect(() => {
        if (pet) {
            toast.success("Pet details loaded!");
        } else {
            toast.error("Pet details could not be loaded!");
        }
    }, [pet])

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <PetDetailCard pet={pet!} />
        </div>
    )
}