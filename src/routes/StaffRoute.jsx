import Forbidden from "../components/Forbidden";
import useRole from "../hooks/useRole";

export default function StaffRoute({ children }) {
    const { role } = useRole();

    if (!role || role !== "staff") {
        return <Forbidden />;
    }

    return children;
}
