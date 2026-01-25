import {
    BriefcaseBusiness,
    ChartNoAxesCombined,
    ClipboardList,
    HandCoins,
    ListChecks,
    LogOut,
    LucideUsersRound,
    MessageSquareWarning,
    ScrollText,
    SquareUserRound,
    UserRoundCog,
} from "lucide-react";
import { GrSidebar } from "react-icons/gr";
import { Link, Outlet, useNavigate } from "react-router";
import civicConnLogo from "/civicConnect.png";
import useAuth from "../hooks/useAuth";
import useBlockChecker from "../hooks/useBlockChecker";

export default function DashboardLayout() {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();
    const handleLogOut = () => {
        logoutUser().then(navigate("/login"));
    };
    const { isBlocked } = useBlockChecker();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="open sidebar"
                        className="btn btn-square btn-ghost"
                    >
                        {/* Sidebar toggle icon */}
                        <GrSidebar />
                    </label>
                    <div className="w-full px-4 flex justify-end">
                        <button
                            onClick={handleLogOut}
                            className="btn btn-ghost btn-error"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </nav>
                {/* Page content here */}
                <Outlet />
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link
                                to="/"
                                className="flex items-center gap-3 transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Homepage"
                            >
                                <img
                                    src={civicConnLogo}
                                    alt="Civic Connect Logo"
                                    className="transition-all duration-300 is-drawer-open:w-12 is-drawer-open:h-12 w-4 h-4"
                                />
                                <span className="transition-all duration-300 overflow-hidden is-drawer-close:w-0 is-drawer-close:opacity-0 is-drawer-open:w-auto is-drawer-open:opacity-100">
                                    <span className="text-xl font-semibold whitespace-nowrap">
                                        Civic
                                        <span className="font-bold text-primary">
                                            Connect
                                        </span>
                                    </span>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Dashboard"
                            >
                                {/* Home icon */}
                                <ChartNoAxesCombined size={16} />
                                <span className="is-drawer-close:hidden">
                                    Dashboard
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/dashboard/report-issue"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Report Issue"
                            >
                                {/* Home icon */}
                                <MessageSquareWarning size={16} />
                                <span className="is-drawer-close:hidden">
                                    Report Issue
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/my-issues"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="My Issues"
                            >
                                {/* Home icon */}
                                <ScrollText size={16} />
                                <span className="is-drawer-close:hidden">
                                    My Issues
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/manage-users"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Manage Users"
                            >
                                {/* Home icon */}
                                <LucideUsersRound size={16} />
                                <span className="is-drawer-close:hidden">
                                    Manage Users
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/manage-staffs"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Manage Staffs"
                            >
                                {/* Home icon */}
                                <UserRoundCog size={16} />
                                <span className="is-drawer-close:hidden">
                                    Manage Staffs
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/manage-issues"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Manage Issues"
                            >
                                {/* Home icon */}
                                <BriefcaseBusiness size={16} />
                                <span className="is-drawer-close:hidden">
                                    Manage Issues
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/assigned-issues"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Assigned Issues"
                            >
                                {/* Home icon */}
                                <ClipboardList size={16} />
                                <span className="is-drawer-close:hidden">
                                    Assigned Issues
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/completed-issues"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Completed Issues"
                            >
                                {/* Home icon */}
                                <ListChecks size={16} />
                                <span className="is-drawer-close:hidden">
                                    Completed Issues
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/all-payments"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="All Payments"
                            >
                                {/* Home icon */}
                                <HandCoins size={16} />
                                <span className="is-drawer-close:hidden">
                                    All Payments
                                </span>
                            </Link>
                        </li>

                        {/* List item */}
                        <li>
                            <Link
                                to="/dashboard/my-profile"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Profile"
                            >
                                {/* Settings icon */}
                                <SquareUserRound
                                    className="relative"
                                    size={16}
                                />{" "}
                                {isBlocked && (
                                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
                                )}
                                <span className="is-drawer-close:hidden">
                                    Profile{" "}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
