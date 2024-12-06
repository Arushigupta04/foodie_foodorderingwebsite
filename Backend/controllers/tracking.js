const Tracking = require('../models/tracking');
const Item = require('../models/item');

// Function to log a tracking action
const logAction = async (item_id, action, user) => {
    try {
        const tracking = new Tracking({
            item_id,
            action,
            user,
        });
        await tracking.save();
        return tracking;
    } catch (error) {
        throw new Error('Error logging action: ' + error.message);
    }
};

// Function to get tracking information for an item
const getTrackingByItemId = async (item_id) => {
    try {
        const trackingRecords = await Tracking.find({ item_id }).sort({ timestamp: -1 });
        return trackingRecords;
    } catch (error) {
        throw new Error('Error retrieving tracking information: ' + error.message);
    }
};

// Controller functions for item actions
const createItem = async (req, res) => {
    try {
        console.log("efedf")
        const item = new Item(req.body);
        await item.save();
        await logAction(item._id, 'created', req.user.username);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await logAction(item._id, 'updated', req.user.username);
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await logAction(item._id, 'deleted', req.user.username);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTracking = async (req, res) => {
    try {
        const trackingRecords = await getTrackingByItemId(req.params.id);
        res.json(trackingRecords);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller functions for specific tracking actions
const Received = async (req, res) => {
    console.log("sdf")
    try {
        console.log("wsdf")
        console.log(req.user)
        const tracking = await logAction(req.params.id, 'received', req.user.fullName);
        console.log("tracking", tracking)
        res.status(201).json(tracking);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

const Accepted = async (req, res) => {
    try {
        const tracking = await logAction(req.params.id, 'accepted', req.user.fullName);
        res.status(201).json(tracking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const Prepared = async (req, res) => {
    try {
        const tracking = await logAction(req.params.id, 'prepared', req.user.fullName);
        res.status(201).json(tracking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logOutForDelivery = async (req, res) => {
    try {
        const tracking = await logAction(req.params.id, 'out for delivery',req.user.fullName);
        res.status(201).json(tracking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logDelivered = async (req, res) => {
    try {
        const tracking = await logAction(req.params.id, 'delivered', req.user.fullName);
        res.status(201).json(tracking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    getTracking,
    Received,
    Accepted,
   
    Prepared,
    logOutForDelivery,
    logDelivered,
};