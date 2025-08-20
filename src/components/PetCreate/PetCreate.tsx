import toast from "react-hot-toast";
import {usePet} from "../../hooks/usePet.ts";
import {useState} from "react";
import type {Pet} from "../../types/pet";
import {useNavigate} from "react-router";

export default function PetCreate() {

    const [newPetState, setNewPetState] = useState<Pet>({
        id: "",
        name: "",
        breed: "",
        imgurl: "",
        sold: false
    });

    const {setPets} = usePet();
    const navigate = useNavigate();

    async function createPet(newPet: Pet) {
        const res = await fetch("https://api-divine-grass-2111.fly.dev/CreatePet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPet),
        });

        if (!res.ok) {
            throw new Error("Failed to create pet");
        }

        return await res.json();
    }

    async function handleCreate() {
        try {
            const newPet = await createPet(newPetState);
            toast.success("Pet created!");
            setPets((prev) => [...prev, newPet]);
            navigate("/");
        } catch (err: any) {
            toast.error(err.message);
        }
    }

    return (
        <form className='flex justify-center items-center p-4' onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
        }}>
        <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Add a pet</h2>
                <input value={newPetState.name} onChange={e => setNewPetState({...newPetState, name: e.target.value})} type="text" required placeholder="Name" className="input" />
                <input value={newPetState.breed} onChange={e => setNewPetState({...newPetState, breed: e.target.value})} type="text" required placeholder="Breed" className="input" />
                <input value={newPetState.imgurl} onChange={e => setNewPetState({...newPetState, imgurl: e.target.value})} type="text" required placeholder="Image URL" className="input" />
                <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary">Add pet</button>
                </div>
            </div>
        </div>
        </form>
    )
}