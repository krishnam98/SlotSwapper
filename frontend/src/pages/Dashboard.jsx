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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-md flex-shrink-0">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                        My Dashboard
                    </h1>
                </div>

                {/* Event Form */}
                <div className="mb-4 sm:mb-6">
                    <EventForm />
                </div>

                {/* Events List */}
                <div className="mt-4 sm:mt-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12 sm:py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                            <span className="ml-2 text-sm sm:text-base text-gray-600">Loading events...</span>
                        </div>
                    ) : items?.length === 0 ? (
                        <div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-center mb-3">
                                <div className="p-3 bg-gray-100 rounded-full">
                                    <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                                </div>
                            </div>
                            <p className="text-base sm:text-lg font-medium text-gray-700 mb-1">
                                No events scheduled yet
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 px-4">
                                Create your first event using the form above
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2 sm:space-y-3">
                            {items?.map(ev => <EventItem key={ev._id} ev={ev} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;