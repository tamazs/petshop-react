import {createBrowserRouter} from "react-router";
import Layout from "../layout/Layout.tsx";
import PetList from "../components/PetList/PetList.tsx";
import PetDetails from "../components/PetDetails/PetDetails.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {index: true, element: <PetList />},
            {path: "/pet/:petId", element: <PetDetails />}
        ]
    }
])