import { useQuery } from "@tanstack/react-query";
import civicConnLogo from "../../public/civicconnect.png";
import useAuth from "../hooks/useAuth";
import useAxiosInstance from "../hooks/useAxios";
import { forwardRef, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Invoice = forwardRef(({ userInfo, payments }, ref) => {
    return (
        <div
            style={{
                backgroundColor: "gray",
            }}
        >
            <div
                ref={ref}
                className="w-4/5 p-10 mx-auto h-250"
                style={{
                    backgroundColor: "white",
                }}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-5xl font-bold">Invoice</h2>
                        <div className="mt-3">
                            <p>
                                Number: INV-{new Date().getFullYear()}-
                                {userInfo?._id?.slice(-3).toUpperCase()}
                            </p>
                            <p>Date: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* <img className="w-7 h-7" src={civicConnLogo} alt="" /> */}
                        <span className="text-xl font-semibold ">
                            Civic
                            <span
                                className="font-bold"
                                style={{
                                    color: "#1E88E5",
                                }}
                            >
                                Connect
                            </span>
                        </span>
                    </div>
                </div>
                <div className="mt-20 space-y-16">
                    <div>
                        <h3 className="font-semibold">Bill To:</h3>
                        <p>Name: {userInfo?.displayName}</p>
                        <p>Email: {userInfo?.email}</p>
                        <p>
                            User Type:{" "}
                            {userInfo?.isPremium ? "Premium" : "Regular"}
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table
                            style={{
                                width: "100%",
                            }}
                        >
                            {/* head */}
                            <thead
                                style={{
                                    backgroundColor: "#e6e6e6",
                                    color: "gray",
                                }}
                            >
                                <tr>
                                    <th
                                        style={{
                                            paddingTop: "10px",
                                            paddingBottom: "10px", paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    ></th>
                                    <th
                                        style={{
                                            paddingTop: "10px",
                                            paddingBottom: "10px", paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        Payment Type
                                    </th>
                                    <th
                                        style={{
                                            paddingTop: "10px",
                                            paddingBottom: "10px", paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        Payment Date
                                    </th>
                                    <th
                                        style={{
                                            paddingTop: "10px",
                                            paddingBottom: "10px", paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        Issue ID
                                    </th>
                                    <th
                                        style={{
                                            paddingTop: "10px",
                                            paddingBottom: "10px", paddingLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        Amount (৳)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {payments.map((payment, idx) => (
                                    <tr key={idx}>
                                        <td
                                            style={{
                                                paddingTop: "10px",
                                                paddingBottom: "10px", paddingLeft: "10px",
                                                borderBottom:
                                                    "1px solid #bfbfbf",
                                            }}
                                        >
                                            {idx + 1}
                                        </td>
                                        <td
                                            style={{
                                                paddingTop: "10px",
                                                paddingBottom: "10px", paddingLeft: "10px",
                                                borderBottom:
                                                    "1px solid #bfbfbf",
                                            }}
                                        >
                                            {payment.type}
                                        </td>
                                        <td
                                            style={{
                                                paddingTop: "10px",
                                                paddingBottom: "10px", paddingLeft: "10px",
                                                borderBottom:
                                                    "1px solid #bfbfbf",
                                            }}
                                        >
                                            {new Date(
                                                payment.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td
                                            style={{
                                                paddingTop: "10px",
                                                paddingBottom: "10px", paddingLeft: "10px",
                                                borderBottom:
                                                    "1px solid #bfbfbf",
                                            }}
                                        >
                                            {payment.issueId || "N/A"}
                                        </td>
                                        <td
                                            style={{
                                                paddingTop: "10px",
                                                paddingBottom: "10px", paddingLeft: "10px",
                                                borderBottom:
                                                    "1px solid #bfbfbf",
                                            }}
                                        >
                                            {payment.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <p>
                            Total: ৳{" "}
                            {payments.reduce(
                                (sum, item) => sum + parseFloat(item.amount),
                                0,
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Invoice;
