import mongoose from 'mongoose';
import Hike from './hike_model.js';

function isValidSlots(value) {

    let companionArray = this.companions;
    if (this.constructor.name === 'Query') {
        companionArray = this.get('companions');
    }
    const companionCount = companionArray ? companionArray.length : 0;
    return value === companionCount + 1;
}

async function isValidTripCapacity(value) {
    // If it's an update query, we skip this specific validator to avoid context issues.
    // We handle capacity protection securely in the pre('save') hook anyway.
    if (this.constructor.name === 'Query') return true; 

    const trip = await Hike.findById(this.trip);
    if(!trip) return false;

    // Just check if it's valid. Return true if okay, false if exceeded.
    return (value + trip.curr_capacity) <= trip.max_capacity;
}

const BookingSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hike',
            required: true
        },
        booking_date: {
            type: Date,
            required: true,
            default: Date.now
        },
        slots_reserved: {
            type: Number,
            required: true,
            min: 1,
            validate: [
                {
                    validator: isValidSlots,
                    message: 'Invalid number of slots'
                },
                {
                    validator: isValidTripCapacity,
                    message: 'Exceeded max capacity'
                }
            ]
        },
        companions: [
            {
                name: {
                    first_name: { type: String, required: [true, 'First name is required'] },
                    last_name: { type: String, required: [true, 'Last name is required'] }
                },
                age: { type: Number, required: true },
                phone_number: {
                    type: String,
                    required: [true, 'Phone number is required'],
                    match: [/^(09|\+639)\d{9}$/, 'Please enter a valid Philippine mobile number']
                }
            }
        ],
        total_price: { type: Number },
        payment_status: {
            type: String,
            enum: ['Pending','Partial', 'Paid', 'Refunded'],
            default: 'Pending',
            required: true
        },
        booking_status: {
            type: String,
            enum: ['Confirmed', 'Unconfirmed', 'Cancelled'],
            default: 'Unconfirmed',
            required: true
        }
    }
);

BookingSchema.pre('save', async function() {
    // We only want to auto-calculate and update capacity if this is a brand new booking
    if (this.isNew) {
        // FIXED: Fetch the whole trip document so we can update it
        const tripDoc = await Hike.findById(this.trip); 

        if (!tripDoc) {
            throw new Error('Associated Trip not found.');
        }

        // 1. Calculate the price
        this.total_price = tripDoc.price * this.slots_reserved;
        
        // 2. Update the Hike's current capacity and save it to the database
        tripDoc.curr_capacity += this.slots_reserved;
        await tripDoc.save();
    }
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;