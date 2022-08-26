module.exports = (app) => {

    const DoorsController = require("../controllers/doorController");
    var router = require("express").Router();

    //Retrieve all doors
    router.get("/", DoorsController.getAll);  
    
    // Create a new Door Document
    router.post("/add", DoorsController.saveOne);

    // Create a new Door Document
    router.post("/batch", DoorsController.batchSave);

    //Update one door finish value
    router.patch("/update", DoorsController.updateOne);  
 
    //Delete one Door element
    router.delete("/delete", DoorsController.delete);
  
    app.use("/api/doors", router);
};