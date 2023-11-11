import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const createListing = async(req, res, next) => {
    try {
        console.log(req.body)
        const listing = await Listing.create(req.body);

        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}
export const deleteListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id) 
    if(!listing){
        return next(errorHandler(401,"Listing not found"))
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(403,'You are unauthorized to perform this action'))
    
    }
    try {
        const listingg = await Listing.findByIdAndDelete( req.params.id)
        res.status(200).json("listing has been deleted")
    } catch (error) {
        next(error)
    }
}   

export const updateListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(404, "listing not found!"));
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(403,"Unauthorize : You can only update your own listing"));
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new : true});
        return res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}
export const getListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'));
          }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}
