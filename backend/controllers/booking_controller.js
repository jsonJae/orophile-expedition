import Booking from '../models/booking_model.js';
import Hike from '../models/hike_model.js';

const createBooking = async (req,res) => {
    try{
        const newBooking = new Booking(
            {
                user: req.user.id,
                trip: req.params.hike_id,
                booking_date: req.body.booking_date,
                slots_reserved: req.body.slots_reserved,
                companions: req.body.companions
            }
        );

    await newBooking.save();
    res.status(200).json({
        success: true, 
        message: "Successfully created booking. ",
        booking_id: newBooking._id,
        total_price: newBooking.total_price
    });
    
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const cancelBooking = async (req,res) => {
    try{
        const booking = await Booking.findById(req.params.booking_id);

        if(!booking){
            return res.status(400).json({success: false, message: "Booking not found"});
        }

        if (booking.booking_status === 'Cancelled') {
            return res.status(400).json({success: false, message: "Booking is already cancelled."});
        }
        // Update booking status without running validators
        await Booking.findByIdAndUpdate(
            req.params.booking_id,
            { booking_status: 'Cancelled' },
            { runValidators: false }
        );

        const hike = await Hike.findById(booking.trip);

        if(!hike){
            return res.status(400).json({success: false, message: "Hike not found"});
        }

        hike.curr_capacity -= booking.slots_reserved;
        await hike.save();

        res.status(200).json({
            success: true, 
            message: "Successfully cancelled booking", 
            booking: booking._id, 
            hike: hike.title
        });

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export { createBooking, cancelBooking };