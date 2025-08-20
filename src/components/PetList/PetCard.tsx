import type {Pet} from "../../types/pet";
import {useNavigate} from "react-router";

interface PetCardProps {
    pet: Pet;
}

export default function PetCard({pet}: PetCardProps) {
    const navigate = useNavigate();

    return (
        <div key={pet.id} className="card bg-base-100 w-96 h-96 shadow-sm">
            <figure>
                <img
                    src={pet.imgurl}
                    alt="Animal picture" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {pet.name}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <div className="card-actions gap-4 items-center justify-end">
                    <div className="badge badge-outline">{pet.breed}</div>
                    <button onClick={() => {
                        navigate(`/pet/${pet.id}`);
                    }} className="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
    )
}