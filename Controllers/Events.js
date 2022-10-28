const mongoose = require('mongoose');
const express = require('express');
const eventSchema = require('../models/events');

module.exports = {
    AddEvent,
    DeleteEvent,
    GetAllEvents,
    GetSpecificEvent,
    UpdateEvent
}

async function AddEvent(req, res, next) {
    var objId = mongoose.Types.ObjectId();
    try {
        const body = req.body;
        if (!body.Title || !body.Description) {
            return res.status(400).json({ message: "Please provide all the fields" });
        }
        else {
            const data = await eventSchema.create({
                _id: objId,
                Title: body.Title,
                Description: body.Description,
                Body: body.Body,
                Upcoming: body.Upcoming,
                Date: new Date()
            });
            console.log("data->", data);
        }
        return res.status(200).json("Event Added Succesfully , object id: " + objId);
    } catch (error) {
        console.log("error : ", error);
        return next(error);
    }
}

async function DeleteEvent(req, res, next) {
    const id = req.params.EventId;
    try {
        const data = await eventSchema.deleteOne({
            _id: id
        })
        console.log("data->", data);
        return res.status(200).json("Event Deleted Succesfully");
    } catch (error) {
        console.log("error : ", error);
        return next(error);
    }
}

async function GetAllEvents(req, res, next) {
    
    try {
        const data = await eventSchema.find().sort({ Date: -1 });
        console.log("data->", data);
        return res.status(200).json(data);
    } catch (error) {
        console.log("error : ", error);
        return next(error);
    }
}

async function GetSpecificEvent(req, res, next) {
    const id = req.params.EventId;
    try {
        const data = await eventSchema.find({
            _id: id
        });
        console.log("data->", data);
        return res.status(200).json(data);
    } catch (error) {
        console.log("error : ", error);
        return next(error);
    }
}

async function UpdateEvent(req, res, next) {
    const id = req.params.EventId;
    try {
        const data = await eventSchema.updateOne({
            _id: id
        }, {
            Title: req.body.Title,
            Description: req.body.Description,
            Body: req.body.Body,
            Upcoming: req.body.Upcoming,
        });
        console.log("data->", data);
        return res.status(200).json("Event Updated Succesfully");
    } catch (error) {
        console.log("error : ", error);
        return next(error);
    }
}