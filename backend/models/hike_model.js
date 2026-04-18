import mongoose from 'mongoose';

function isValidEndDate(value) {
    if (!this.start_date) return true;
    return value >= this.start_date;
}

function isValidCurrCapacity(value) {
    
    if (!this.max_capacity) return true;
    return value <= this.max_capacity;
}

const HikeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        diff_level: {
            type: Number,
            required: true,
            min: 1,
            max: 9
        },
        diff_label: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced']
        },
        hike_type: {
            type: String,
            enum: ['Minor', 'Major']
        },
        location: {
                place: {
                    type: String,
                    required: true
                },
                latitude: {
                    type: String,
                    required: true
                },
                longitude: {
                    type: String,
                    required: true
                }
            },
        start_date: {
            type: Date,
            required: true
        },
        end_date: {
            type: Date,
            required: true,
            validate: {
                validator: isValidEndDate,
                message: 'End date cannot be before the start date!'
            }
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        max_capacity: {
            type: Number,
            required: true,
            min: 0,
            max: 14
        },
        curr_capacity: {
            type: Number,
            required: true,
            min: 0,
            max: 14,
            validate: {
                validator: isValidCurrCapacity,
                message: "Curr capacity cannot be higher than max capacity"
            }
        },
        status: {
            type: String,
            required: true,
            enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
            default: 'Upcoming'
        },
        itinerary: [
            {
                day_number: {
                    type: Number,
                    required: true
                },
                activities : [
                    {
                        time: {
                            type: String,
                            required: true,
                            match: [/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, 'Please use the HH:MM AM/PM format (e.g., 02:00 AM)']
                        },
                        details: {
                            type: String,
                            required: true
                        }
                    }
                ]
            }
        ],
        pickup: [
            {
                place: {
                    type: String,
                    required: true
                },
                latitude: {
                    type: String,
                    required: true
                },
                longitude: {
                    type: String,
                    required: true
                }
            }
        ],
        inclusions: [String],
        exclusions: [String],
    },
    {
        timestamps: true
    }
)



HikeSchema.pre('save', function (){
    if (this.diff_level >= 1 && this.diff_level <=3){
        this.diff_label = 'Beginner';
    } else if (this.diff_level >= 4 && this.diff_level <=6){
        this.diff_label = 'Intermediate';
    } else if (this.diff_level >= 7 && this.diff_level <=9){
        this.diff_label = 'Advanced';
    }

    if(this.diff_level >= 5){
        this.hike_type = 'Major'
    }else {
        this.hike_type = 'Minor'
    }
});

const Hike = mongoose.model('Hike', HikeSchema);
export default Hike;