import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSwappableSlots } from "../store/SwapSlice";
import { Store, Calendar, Clock, User, ArrowRightLeft } from "lucide-react";
import RequestModal from "../components/RequestModal";

export default function Marketplace() {
    const dispatch = useDispatch();
    const { swappables } = useSelector(s => s.swaps);
    const [openSlot, setOpenSlot] = useState(null);

    useEffect(() => { dispatch(getSwappableSlots()); }, [dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 md:p-6 lg:p-8 ">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-md flex-shrink-0">
                        <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                            Marketplace
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                            Browse and request available time slots
                        </p>
                    </div>
                </div>

                {/* Slots Grid */}
                <div className="space-y-3">
                    {swappables.length === 0 ? (
                        <div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-center mb-3">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <Store className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
                                </div>
                            </div>
                            <p className="text-base sm:text-lg font-medium text-gray-700 mb-1">
                                No available slots right now
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 px-4">
                                Check back later for swappable time slots
                            </p>
                        </div>
                    ) : (
                        swappables.map(s => (
                            <div
                                key={s._id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all p-4 sm:p-5"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                                    {/* Slot Info */}
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words">
                                            {s.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-600">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                <span>{new Date(s.startTime).toLocaleDateString()}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                <span>{new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                <span>{s.owner?.name || "User"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => setOpenSlot(s)}
                                        className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 flex-shrink-0"
                                    >
                                        <ArrowRightLeft className="w-4 h-4" />
                                        Request Swap
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {openSlot && (
                <RequestModal
                    theirSlot={openSlot}
                    onClose={() => {
                        setOpenSlot(null);
                        dispatch(getSwappableSlots());
                    }}
                />
            )}
        </div>
    );
}