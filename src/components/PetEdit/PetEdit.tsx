import toast from "react-hot-toast";
import {usePet} from "../../hooks/usePet.ts";
import {useState} from "react";
import type {Pet} from "../../types/pet";
import {useNavigate, useParams} from "react-router";

export default function PetEdit() {

    const params = useParams();
    const {getPetById} = usePet();
    const pet = getPetById(params.petId!);
    const navigate = useNavigate();

    const [editPetState, setEditPetState] = useState<Pet>({
        id: pet!.id,
        name: pet!.name,
        breed: pet!.breed,
        imgurl: pet!.imgurl,
        sold: pet!.sold
    });

    const {setPets} = usePet();

    async function editPet(editPet: Pet) {
        const res = await fetch("https://api-divine-grass-2111.fly.dev/UpdatePet", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editPet),
        });

        if (!res.ok) {
            throw new Error("Failed to edit pet");
        }

        return await res.json();
    }

    async function handleEdit() {
        try {
            const updatedPet = await editPet(editPetState);
            toast.success("Pet edited!");
            setPets((prev) =>
                prev.map((p) => (p.id === updatedPet.id ? updatedPet : p))
            );
            navigate("/");
        } catch (err: any) {
            toast.error(err.message);
        }
    }

    return (
        <form className='flex justify-center items-center p-4' onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
        }}>
            <div className="card bg-base-100 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Edit {pet!.name}</h2>
                    <input value={editPetState.name} onChange={e => setEditPetState({...editPetState, name: e.target.value})} type="text" required placeholder="Name" className="input" />
                    <input value={editPetState.breed} onChange={e => setEditPetState({...editPetState, breed: e.target.value})} type="text" required placeholder="Breed" className="input" />
                    <input value={editPetState.imgurl} onChange={e => setEditPetState({...editPetState, imgurl: e.target.value})} type="text" required placeholder="Image URL" className="input" />
                    <div className="card-actions justify-end">
                        <button type="submit" className="btn btn-primary">Edit pet</button>
                    </div>
                </div>
            </div>
        </form>
    )
}