import type {Pet} from "../../types/pet";
import {useNavigate} from "react-router";

interface PetCardProps {
    pet: Pet;
}

export default function PetDetailCard({pet}: PetCardProps) {
    const navigate = useNavigate();

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
                        <input type="checkbox" className="toggle" />
                        Sold
                    </label>
                    <button className="btn btn-info" onClick={() => {
                        navigate(`/pet/edit/${pet.id}`);
                    }}>Edit</button>
                    <button className="btn btn-error">Delete</button>
                </div>
            </div>
        </div>
    )
}