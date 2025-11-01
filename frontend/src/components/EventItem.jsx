import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Calendar, Clock, ArrowRightLeft, Edit2, X, Check } from "lucide-react";
import { updateEvent } from "../store/EventSlice";

const EventItem = ({ ev }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        title: ev.title,
        startTime: ev.startTime,
        endTime: ev.endTime
    });

    const makeSwappable = () => {
        dispatch(updateEvent({ id: ev._id, payload: { status: ev.status === "SWAPPABLE" ? "BUSY" : "SWAPPABLE" } }));
    };

    const handleUpdate = () => {
        dispatch(updateEvent({ id: ev._id, payload: editForm }));
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setEditForm({
            title: ev.title,
            startTime: ev.startTime,
            endTime: ev.endTime
        });
        setIsEditing(false);
    };

    const isSwappable = ev.status === "SWAPPABLE";

    // Format datetime-local input value
    const formatDateTimeLocal = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Start Time</label>
                                    <input
                                        type="datetime-local"
                                        value={formatDateTimeLocal(editForm.startTime)}
                                        onChange={(e) => setEditForm({ ...editForm, startTime: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">End Time</label>
                                    <input
                                        type="datetime-local"
                                        value={formatDateTimeLocal(editForm.endTime)}
                                        onChange={(e) => setEditForm({ ...editForm, endTime: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start gap-3">
                            <div className={`mt-1 p-2 rounded-lg ${isSwappable ? 'bg-green-100' : 'bg-indigo-100'}`}>
                                <Calendar className={`w-5 h-5 ${isSwappable ? 'text-green-600' : 'text-indigo-600'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 text-lg truncate">{ev.title}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-2">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                        <Clock className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{new Date(ev.startTime).toLocaleString()}</span>
                                    </div>
                                    <span className="hidden sm:inline text-gray-400">→</span>
                                    <span className="text-sm text-gray-600 truncate pl-5 sm:pl-0">
                                        {new Date(ev.endTime).toLocaleString()}
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isSwappable
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {ev.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap sm:flex-col gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleUpdate}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all bg-green-600 hover:bg-green-700 text-white shadow-sm"
                            >
                                <Check className="w-4 h-4" />
                                <span className="whitespace-nowrap">Save</span>
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all bg-gray-100 hover:bg-gray-200 text-gray-700"
                            >
                                <X className="w-4 h-4" />
                                <span className="whitespace-nowrap">Cancel</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                            >
                                <Edit2 className="w-4 h-4" />
                                <span className="whitespace-nowrap">Edit</span>
                            </button>
                            {!(ev.status === "SWAP_PENDING") && (
                                <button
                                    onClick={makeSwappable}
                                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${isSwappable
                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                                        }`}
                                >
                                    <ArrowRightLeft className="w-4 h-4" />
                                    <span className="whitespace-nowrap">
                                        {isSwappable ? "Unset Swappable" : "Make Swappable"}
                                    </span>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventItem;