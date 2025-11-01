import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../store/EventSlice";
import { Plus, Calendar, Clock } from "lucide-react";

const EventForm = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ title: "", startTime: "", endTime: "" });

    const submit = async (e) => {
        e.preventDefault();
        const formattedEvent = {
            ...form,
            startTime: new Date(form.startTime).toISOString(), // store in UTC
            endTime: new Date(form.endTime).toISOString(),
        };
        dispatch(createEvent(formattedEvent));
        setForm({ title: "", startTime: "", endTime: "" });
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Title
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            placeholder="Enter event title"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Time
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                type="datetime-local"
                                value={form.startTime}
                                onChange={e => setForm({ ...form, startTime: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Time
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                type="datetime-local"
                                value={form.endTime}
                                onChange={e => setForm({ ...form, endTime: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full sm:w-1/4 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Create Event
                </button>
            </form>
        </div>
    );
}

export default EventForm;