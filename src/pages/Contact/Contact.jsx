import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosInstance from "../../hooks/useAxios";
import { toast } from "react-toastify";

export default function Contact() {
    const { register, handleSubmit, reset } = useForm();
    const axiosInstance = useAxiosInstance();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSendMessage = async (data) => {
        setIsSubmitting(true);

        const newMessage = {
            name: data.name,
            email: data.email,
            message: data.message,
        };

        try {
            const response = await axiosInstance.post("/messages", newMessage);

            if (response.data.success) {
                toast.success("Message received! We'll get back to you soon.");
                reset(); // Clear the form
            } else {
                toast.error(response.data.error || "Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(
                error.response?.data?.error ||
                    "Error occurred! Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        document.title = "Contact";
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div className="bg-base-100 text-base-content">
            <div className="max-w-6xl mx-auto px-6 py-20 space-y-16">
                {/* Page Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Contact Us</h1>
                    <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
                        Have questions, suggestions, or need assistance? We’re
                        here to help. Reach out and our team will respond as
                        soon as possible.
                    </p>
                </div>

                {/* Main Section */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-base-200 p-8 rounded-md shadow">
                        <h2 className="text-2xl font-semibold mb-6">
                            Send Us a Message
                        </h2>

                        <form
                            className="space-y-6"
                            onSubmit={handleSubmit(handleSendMessage)}
                        >
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Full Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    placeholder="Your full name"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Email Address
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder="you@example.com"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full h-32"
                                    {...register("message")}
                                    placeholder="Write your message here..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                className="btn btn-primary w-full flex items-center gap-2"
                                disabled={isSubmitting}
                            >
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-base-200 p-6 rounded-md shadow flex gap-4">
                            <Mail className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-base-content/70">
                                    support@civicconnect.com
                                </p>
                            </div>
                        </div>

                        <div className="bg-base-200 p-6 rounded-md shadow flex gap-4">
                            <Phone className="w-6 h-6 text-secondary mt-1" />
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-base-content/70">
                                    +880 1234 567890
                                </p>
                            </div>
                        </div>

                        <div className="bg-base-200 p-6 rounded-md shadow flex gap-4">
                            <MapPin className="w-6 h-6 text-accent mt-1" />
                            <div>
                                <h3 className="font-semibold">
                                    Office Address
                                </h3>
                                <p className="text-base-content/70">
                                    Civic Technology Center
                                    <br />
                                    Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>

                        <div className="bg-base-200 p-6 rounded-md shadow flex gap-4">
                            <Clock className="w-6 h-6 text-success mt-1" />
                            <div>
                                <h3 className="font-semibold">Support Hours</h3>
                                <p className="text-base-content/70">
                                    Sunday – Thursday
                                    <br />
                                    9:00 AM – 5:00 PM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Note */}
                <div className="text-center border-t pt-10">
                    <p className="text-base-content/60 text-sm">
                        For urgent infrastructure emergencies, please contact
                        your local municipal authority directly.
                    </p>
                </div>
            </div>
        </div>
    );
}
