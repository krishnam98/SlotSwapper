import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncomingRequests, getOutgoingRequests, respondSwap } from "../store/SwapSlice";
import { Bell, Calendar, User, ArrowRightLeft } from "lucide-react";

const Notifications = () => {
    const dispatch = useDispatch();
    const { incomingRequests, outgoingRequests } = useSelector(s => s.swaps);

    useEffect(() => {
        dispatch(getIncomingRequests());
        dispatch(getOutgoingRequests());
    }, [dispatch]);

    const respond = async (requestId, accept) => {
        await dispatch(respondSwap({ requestId, accept })).unwrap();
        await dispatch(getIncomingRequests());
        dispatch(getOutgoingRequests());
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-md flex-shrink-0">
                        <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                        Notifications
                    </h1>
                </div>

                {/* Incoming Requests */}
                <div className="mb-6">
                    <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3">Incoming Requests</h2>

                    <div className="space-y-2 sm:space-y-3">
                        {incomingRequests?.length === 0 ? (
                            <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                                <p className="text-sm sm:text-base text-gray-600">No incoming requests</p>
                            </div>
                        ) : (
                            incomingRequests?.map(r => (
                                <div key={r._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        <div className="font-semibold text-sm sm:text-base text-gray-800">{r.fromUser?.name}</div>
                                    </div>

                                    <div className="space-y-2 mb-3">
                                        <div className="flex items-start gap-2">
                                            <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-xs sm:text-sm text-gray-600">
                                                    Your slot: <span className="font-medium">{r.theirSlot?.title}</span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(r.theirSlot?.startTime).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <ArrowRightLeft className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-xs sm:text-sm text-gray-600">
                                                    Their slot: <span className="font-medium">{r.mySlot?.title}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {r.status === "PENDING" ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => respond(r._id, true)}
                                                className="flex-1 px-3 py-2 bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => respond(r._id, false)}
                                                className="flex-1 px-3 py-2 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-xs sm:text-sm text-gray-500 italic">Already responded</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Outgoing Requests */}
                <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3">Outgoing Requests</h2>

                    <div className="space-y-2 sm:space-y-3">
                        {outgoingRequests?.length === 0 ? (
                            <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                                <p className="text-sm sm:text-base text-gray-600">No outgoing requests</p>
                            </div>
                        ) : (
                            outgoingRequests?.map(r => (
                                <div key={r._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        <div className="font-semibold text-sm sm:text-base text-gray-800">
                                            To: {r.toUser?.name}
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-3">
                                        <div className="flex items-start gap-2">
                                            <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-xs sm:text-sm text-gray-600">
                                                    Your slot: <span className="font-medium">{r.mySlot?.title}</span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(r.mySlot?.startTime).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <ArrowRightLeft className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-xs sm:text-sm text-gray-600">
                                                    Their slot: <span className="font-medium">{r.theirSlot?.title}</span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(r.theirSlot?.startTime).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-xs sm:text-sm text-gray-600 bg-blue-100 p-2 rounded-md">
                                        Status: <span className={`font-medium ${r.status === "PENDING" ? "text-yellow-500" : r.status === "ACCEPTED" ? "text-green-500" : "text-red-500"}`}>{r.status}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications;