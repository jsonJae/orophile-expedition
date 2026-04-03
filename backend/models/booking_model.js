import mongoose from 'mongoose';
import Hike from './hike_model.js';

function isValidSlots(value) {
    // 'value' is the slots_reserved number the user submitted.
    // The (this.companions ? this.companions.length : 0) safely checks if the array exists yet
    const companionCount = this.companions ? this.companions.length : 0;
    return value === companionCount + 1;
}

// function isValidSlots(value) {
//     // FIXED: Handle 'this' context for Mongoose updates
//     let companionArray = this.companions;
//     if (this.constructor.name === 'Query') {
//         companionArray = this.get('companions');
//     }
    
//     const companionCount = companionArray ? companionArray.length : 0;
//     return value === companionCount + 1;
// }

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
            validate: {
                validator: isValidSlots,
                message: 'Invalid number of slots'
            }
        },
        companions: [
            {
                name: {
                    first_name: {
                        type: String,
                        required: [true, 'First name is required']
                    },
                    last_name: {
                        type: String,
                        required: [true, 'Last name is required']
                    }
                },
                age: {
                    type: Number,
                    required: true
                },
                phone_number: {
                    type: String,
                    required: [true, 'Phone number is required'],
                    match: [/^(09|\+639)\d{9}$/, 'Please enter a valid Philippine mobile number (e.g., 09123456789 or +639123456789)']
                }
            }
        ],
        total_price: {
            type: Number,
        },
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
)

BookingSchema.pre('save', async function(next) {
    // We only want to auto-calculate if this is a brand new booking
    // or if the user changed the number of slots. 
    if (this.isNew || this.isModified('slots_reserved')) {
        try {
            const tripDoc = await Hike.findById(this.trip).select('price'); 

            if (!tripDoc) {
                throw new Error('Associated Trip not found.');
            }

            this.total_price = tripDoc.price * this.slots_reserved;
            next();
        } catch (error) {
            // If something goes wrong, pass the error to Mongoose
            next(error); 
        }
    } else {
        // If it's just an update (like changing 'Unconfirmed' to 'Confirmed'), skip the math
        next();
    }
});


// BookingSchema.pre('save', async function(next) {
//     if (this.isNew || this.isModified('slots_reserved')) {
//         try {
//             // Fetch price AND capacity
//             const tripDoc = await Hike.findById(this.trip).select('price capacity'); 

//             if (!tripDoc) {
//                 throw new Error('Associated Trip not found.');
//             }

//             // FIXED: Prevent Overbooking!
//             // Query the Booking model to see how many slots are already taken for this trip
//             const BookingModel = mongoose.model('Booking'); 
//             const existingBookings = await BookingModel.aggregate([
//                 { $match: { trip: this.trip, booking_status: { $ne: 'Cancelled' } } },
//                 { $group: { _id: null, totalBooked: { $sum: '$slots_reserved' } } }
//             ]);

//             const currentTotal = existingBookings.length > 0 ? existingBookings[0].totalBooked : 0;
            
//             // If updating an existing booking, subtract the old slots so we don't double count
//             const previouslyReserved = this.isNew ? 0 : (await BookingModel.findById(this._id)).slots_reserved;
//             const newTotalSlots = (currentTotal - previouslyReserved) + this.slots_reserved;

//             if (newTotalSlots > tripDoc.capacity) {
//                 const slotsLeft = tripDoc.capacity - (currentTotal - previouslyReserved);
//                 throw new Error(`Booking failed: Hike capacity exceeded. Only ${slotsLeft} slots remaining.`);
//             }

//             // If we pass the capacity check, calculate the price
//             this.total_price = tripDoc.price * this.slots_reserved;
//             next();
//         } catch (error) {
//             next(error); 
//         }
//     } else {
//         next();
//     }
// });

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;