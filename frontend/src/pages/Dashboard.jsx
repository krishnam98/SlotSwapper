import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/EventSlice";
import { Calendar, Loader2 } from "lucide-react";
import EventForm from "../components/EventForm";
import EventItem from "../components/EventItem";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector(s => s.events);

    useEffect(() => { dispatch(fetchEvents()); }, [dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-600 rounded-lg">
                        <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Calendar</h1>
                </div>

                <EventForm />

                <div className="mt-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12 bg-white rounded-xl shadow-sm">
                            <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                            <span className="ml-2 text-gray-600">Loading events...</span>
                        </div>
                    ) : items?.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No events scheduled yet</p>
                            <p className="text-sm text-gray-400 mt-1">Create your first event above</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {items?.map(ev => <EventItem key={ev._id} ev={ev} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;