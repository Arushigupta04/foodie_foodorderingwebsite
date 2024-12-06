const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true,
    },
    action: {
        type: String,
        enum: ['created', 'updated', 'deleted', 'received', 'accepted', 'prepared', 'out for delivery', 'delivered'],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: String,
        required: true,
    },
});

const Tracking = mongoose.model('Tracking', trackingSchema);

module.exports = Tracking;