import {usePet} from "../../hooks/usePet.ts";
import {useEffect} from "react";
import toast from "react-hot-toast";
import PetCard from "./PetCard.tsx";

export default function PetList() {
    const {pets, setPets} = usePet();

    useEffect(() => {
        fetch("https://api-divine-grass-2111.fly.dev/GetPets")
            .then(res => {
                res.json().then(pet => {
                    setPets(pet);
                    toast.success("Pet list loaded successfully!");
                })
                    .catch(() => toast.error("Error getting pets!"));
            })
    }, []);

    return (
        <div className='flex flex-row flex-wrap justify-around items-center p-4'>
            {
                pets.map((pet) => {
                    return (
                        <PetCard pet={pet} />
                    )
                })
            }
        </div>
    )
}