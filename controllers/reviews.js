const Listing = require("../models/listing");
const Review = require("../models/review");
module.exports.createReview = async (req, res) => {
    console.log(req.params.id); // Logs the listing ID
    let listing = await Listing.findById(req.params.id); // Find the listing by ID
    let newReview = new Review(req.body.review); // Create a new review with the data
    newReview.author = req.user._id; // Set the author of the review
    
    listing.reviews.push(newReview); // Push the new review to the listing's reviews array
    await newReview.save(); // Save the new review
    await listing.save(); // Save the listing with the new review
    
    req.flash("success", "New Review Created"); // Flash a success message
    
    res.redirect(`/listings/${listing._id}`); // Redirect back to the listing page
}


module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params; // Extract listing ID and review ID from params
    
    // Remove the review from the listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    
    // Delete the review
    await Review.findByIdAndDelete(reviewId);
    
    req.flash("success", "Review Deleted"); // Flash a success message
    
    res.redirect(`/listings/${id}`); // Redirect back to the listing page
}