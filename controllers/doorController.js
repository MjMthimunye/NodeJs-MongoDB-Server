const db = require("../models");
var DoorModel = db.mongoose.model('Doors');

DoorsController = {

    //Controller function to save one door item to mongo DB
    saveOne : function(req, res){
       
        console.log('Insert One');

        // Create a Door Model
        const doorModel = new DoorModel({
            _id : req.body.UniqueId,
            FamilyType: req.body.FamilyType,
            Mark: req.body.Mark,
            DoorFinish: req.body.DoorFinish, 
        });

        DoorModel.create(doorModel, (err, door) => {
           if (err) return console.log(err);
           return res.send(door);
        });

    },

    //Controller function to get all door entries
    getAll : function(req, res){
        console.log('Get All');

        DoorModel.find({},(err, results) => {
            if (err) return console.log(err);
            return res.send(results);
        });
    },

    //Controller function to batch save door entries
    batchSave : function(req, res) {
        console.log('Insert batch');

            // To Count Documents of a Doors collection
            db.mongoose.connection.db.collection("Doors").count((err, count) => {

                console.dir(count);

                if(count == 0) {
                    console.log("Found No Records.");

                    DoorModel.insertMany(req.body, (err, door) => {
                        if (err) return console.log(err);
                        return res.send(door);
                    });

                }
                else {
                    console.log("Found Records : " + count);

                    const writeOperations = req.body.map((item) => {
                        return {
                        updateOne: {
                            filter: { _id: item._id },
                            update: { DoorFinish: item.DoorFinish , Mark: item.Mark}
                        }
                        };
                    });
            
                    DoorModel.bulkWrite(writeOperations, (err, door) => {
                        if (err) return console.log(err);
                        return res.send(door);
                    });

                }
            });
               
    },
        
    //Controller function to update one door item
    updateOne : function(req, res) {
        console.log('Update One');
        var id = req.body._id;

        DoorModel.updateOne({'_id': id}, {$set: {DoorFinish: req.body.DoorFinish}}, (err, result) => {
            if (err) return console.log(err);
            return res.send(result);
        })
    },

    //Controller function to delete one door item
    delete : function(req, res){
        console.log('Delete One');
        var id = req.body._id;

        DoorModel.deleteOne({'_id':id}, (err,result) => {
            if (err) return console.log(err);
            return res.send(result);
        });
    }

};
  
module.exports = DoorsController;