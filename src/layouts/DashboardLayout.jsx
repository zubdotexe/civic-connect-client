import {
    HomeIcon,
    LucideUsersRound,
    MessageSquareWarning,
    ScrollText,
    SquareUserRound,
    UserRoundCheck,
} from "lucide-react";
import { GrSidebar } from "react-icons/gr";
import { Link, Outlet } from "react-router";

export default function DashboardLayout() {
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
                    <div className="px-4">CivicConnect</div>
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
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Homepage"
                            >
                                {/* Home icon */}
                                <HomeIcon size={16} />
                                <span className="is-drawer-close:hidden">
                                    Homepage
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
                                to="/dashboard/manage-staffs"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Manage Staffs"
                            >
                                {/* Home icon */}
                                <LucideUsersRound size={16} />
                                <span className="is-drawer-close:hidden">
                                    Manage Staffs
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/assign-staffs"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Assign Staffs"
                            >
                                {/* Home icon */}
                                <UserRoundCheck size={16} />
                                <span className="is-drawer-close:hidden">
                                    Assign Staffs
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
                                <SquareUserRound size={16} />
                                <span className="is-drawer-close:hidden">
                                    Profile
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
