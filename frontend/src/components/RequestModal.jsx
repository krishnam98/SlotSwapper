import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestSwap } from "../store/SwapSlice";
import { fetchEvents } from "../store/EventSlice";
import { X, Calendar, Clock } from "lucide-react";

const RequestModal = ({ theirSlot, onClose }) => {
    const dispatch = useDispatch();
    const myEvents = useSelector(s => s.events.items.filter(e => e.status === "SWAPPABLE"));
    useEffect(() => { dispatch((fetchEvents())); }, [dispatch]);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    async function offer(mySlotId) {
        dispatch(requestSwap({ mySlotID: mySlotId, theirSlotID: theirSlot._id }));
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between p-4 sm:p-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex-1 min-w-0 pr-3">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 break-words">
                            Request swap for: {theirSlot.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span>{new Date(theirSlot.startTime).toLocaleDateString()}</span>
                            <Clock className="w-4 h-4 text-blue-500 ml-2" />
                            <span>{new Date(theirSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-gray-50">
                    <p className="text-xs sm:text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        Select a slot to offer:
                    </p>
                    <div className="space-y-2">
                        {myEvents.length === 0 ? (
                            <div className="text-center py-8 px-4 bg-white rounded-lg">
                                <div className="text-gray-400 mb-3">
                                    <Calendar className="w-12 h-12 mx-auto" />
                                </div>
                                <p className="text-sm font-medium text-gray-700 mb-1">No swappable slots available</p>
                                <p className="text-xs text-gray-500">Create one in your dashboard first</p>
                            </div>
                        ) : (
                            myEvents.map(me => (
                                <div
                                    key={me._id}
                                    className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm text-gray-900 mb-1.5 break-words">
                                                {me.title}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="w-3.5 h-3.5 text-blue-500" />
                                                <span>{new Date(me.startTime).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => offer(me._id)}
                                            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm flex-shrink-0"
                                        >
                                            Offer
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 sm:p-5 border-t bg-white">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RequestModal;