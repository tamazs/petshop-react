import {createBrowserRouter} from "react-router";
import Layout from "../layout/Layout.tsx";
import PetList from "../components/PetList/PetList.tsx";
import PetDetails from "../components/PetDetails/PetDetails.tsx";
import PetEdit from "../components/PetEdit/PetEdit.tsx";
import PetCreate from "../components/PetCreate/PetCreate.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {index: true, element: <PetList />},
            {path: "/pet/:petId", element: <PetDetails />},
            {path: "/pet/edit/:petId", element: <PetEdit />},
            {path: "/pet/create", element: <PetCreate />}
        ]
    }
])