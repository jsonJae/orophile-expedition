import Hike from '../models/hike_model.js';

const createHike = async (req,res) => {

    try{
        const newHike =  new Hike(
            {
                title: req.body.title,
                description: req.body.description,
                diff_level: req.body.diff_level,
                location: req.body.location,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                price: req.body.price,
                max_capacity: req.body.max_capacity,
                curr_capacity: req.body.curr_capacity,
                status: req.body.status,
                itinerary: req.body.itinerary,
                pickup: req.body.pickup,
                inclusions: req.body.inclusions,
                exclusions: req.body.exclusions
            }
        )

        await newHike.save()
        res.status(200).json({ created_hike: true, hike: newHike });

    }catch(error){
        res.status(500).json({ created_hike: false, error: error.message});
    }

}

const getAllHikes = async (req,res) => {

    try{
        if(await Hike.countDocuments() === 0){
            return res.status(200).json({message: 'No hikes available'});
        }

        const hikes = await Hike.find().select('title diff_level diff_label hike_type location.place start_date end_date price curr_capacity max_capacity').lean();

        res.status(200).json({ hikes: hikes });

    }catch(error){
        res.status(500).json({error: error.message});
    }

}

const getHike = async (req,res) => {
    try{

        const { id } = req.params;

        const hike = await Hike.findById(id);

        if(!hike){
            return res.status(500).json({success: false, message: "No hike available. "});
        }

        res.status(200).json({success: true, hike: hike })

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const deleteHike = async (req,res) => {

    try{

        const { id } = req.params;
    
        const hike = await Hike.findById(id);

        if(!hike){
            return res.status(400).json({message: "No hike available"});
        }

        const deletedHike = await Hike.findByIdAndDelete(id);

        res.status(200).json({success: true, deleted_hike: {
            title: deletedHike.title,
            start_date: deletedHike.start_date,
            end_date: deletedHike.end_date,
            }
        });

    }catch(error){
        res.status(500).json({error: error})
    }
    
}

const updateHike = async (req, res) => {
    try {
        const { id } = req.params;

        const hike = await Hike.findById(id);

        if (!hike){
            return res.status(404).json({ updated: false, message: "No hike available." });
        }
        
        hike.title = req.body.new_title;
        hike.description = req.body.new_description;
        hike.diff_level = req.body.new_diff_level;
        hike.location = req.body.new_location;
        hike.start_date = req.body.new_start_date;
        hike.end_date = req.body.new_end_date;
        hike.price = req.body.new_price;
        hike.max_capacity = req.body.new_max_capacity;
        hike.curr_capacity = req.body.new_curr_capacity;
        hike.status = req.body.new_status;
        hike.itinerary = req.body.new_itinerary;
        hike.pickup = req.body.new_pickup;
        hike.inclusions = req.body.new_inclusions;
        hike.exclusions = req.body.new_exclusions;

        const updatedHike = await hike.save();

        res.status(200).json({ updated: true, hike: updatedHike });

    } catch (error) {
        res.status(500).json({ updated: false, error: error.message });
    }
}



export { getAllHikes, createHike, getHike, updateHike, deleteHike };