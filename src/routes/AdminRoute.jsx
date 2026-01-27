import Forbidden from "../components/Forbidden";
import useRole from "../hooks/useRole";

export default function AdminRoute({ children }) {
    const { role } = useRole();

    if (!role || role !== "admin") {
        return <Forbidden />;
    }

    return children;
}
