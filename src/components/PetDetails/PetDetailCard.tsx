import type {Pet} from "../../types/pet";
import {useNavigate} from "react-router";
import toast from "react-hot-toast";
import {usePet} from "../../hooks/usePet.ts";

interface PetCardProps {
    pet: Pet;
}

export default function PetDetailCard({pet}: PetCardProps) {
    const navigate = useNavigate();

    const {setPets} = usePet();

    async function toggleSold(updated: boolean) {
        try {
            const updatedPet = { ...pet, sold: updated };

            const res = await fetch("https://api-divine-grass-2111.fly.dev/UpdatePet", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPet),
            });

            if (!res.ok) throw new Error("Failed to update pet");

            const savedPet = await res.json();

            setPets((prev) =>
                prev.map((p) => (p.id === savedPet.id ? savedPet : p))
            );

            toast.success(`Marked ${pet.name} as ${updated ? "sold" : "available"}`);
        } catch (err: any) {
            toast.error(err.message);
        }
    }

    async function deletePet(id: string) {
        try {
            const res = await fetch(`https://api-divine-grass-2111.fly.dev/DeletePet?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            console.log(id)
            if (!res.ok) throw new Error("Failed to delete pet");

            setPets((prev) => prev.filter((p) => p.id !== id));

            toast.success("Pet deleted!");
            navigate("/");
        } catch (err: any) {
            toast.error(err.message);
        }
    }

    return (
        <div key={pet.id} className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={pet.imgurl}
                    alt="Animal picture" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {pet.name}
                    <div className="badge badge-outline">{pet.breed}</div>
                </h2>
                <div className="card-actions gap-4 items-center justify-between">
                    <label className="label">
                        <input onChange={e => toggleSold(e.target.checked)} checked={pet.sold} type="checkbox" className="toggle" />
                        Sold
                    </label>
                    <button className="btn btn-info" onClick={() => {
                        navigate(`/pet/edit/${pet.id}`);
                    }}>Edit</button>
                    <button onClick={() => {
                        deletePet(pet.id);
                    }} className="btn btn-error">Delete</button>
                </div>
            </div>
        </div>
    )
}