import express from "express";
import Employee from "../model/employeeModel.js";
import validFields from "../utils.js";


const router = express.Router();
//route for getting all  posts
const limitPage = 5;
router.get("/all", async (req, res) => {
  try{

    const skipped = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0
    const data = await Employee.find({}).skip(skipped*limitPage).limit(5).sort({createdAt:-1})
    const dataTotal = await Employee.find({}).count();

    if(data.length<=0){
      return res.status(200).json({ "success":true, "posts": data, dataEmpty:true });    
    }

    return res.status(200).json({ "success":true, size:dataTotal, "posts": data });

  }catch(err){
    return res.status(200).json({ "success":"false", "errorMessage":err.message });

  }
});


//route for getting a specific employee
router.get("/:id", async (req, res) => {

  try{
    const postId = req.params.id;
    const postData = await Employee.findById(postId);
    if (postData) {
      return res.status(200).json({ success:true, Post: postData });
    } else {
      return res.status(404).send({ success:false, msg: "Post Not Found" });
    }
  }catch(err){
    return res.status(404).send({ success:false, msg: err.message });
  }
});

//route for creating a new employee
router.post("/", async (req, res) => {

  try{
    let {  fullname,
      address,
      State,
      city} = req.body;
  
    fullname = fullname.trim();

    // if (!fullname || !address || !State || !city ) {
    //   return res
    //     .status(400)
    //     .json({ success:false, errorMessage:"Please fill complete fields !" });
    // }

    validFields(res,fullname,
      address,
      State,
      city);

    // if (!State) {
    //   return res
    //     .status(400)
    //     .json({ success:false, errorMessage:"Please fill state name !" });
    // }

    // if (!city) {
    //   return res
    //     .status(400)
    //     .json({ success:false, errorMessage:"Please fill city name !" });
    // }

    // if(fullname.length<4){
    //   return res
    //     .status(400)
    //     .json({ success:false, errorMessage:"Fullname should have atleast 4 character!" });
    // }
    // if(fullname.length>20){
    //   return res
    //   .status(400)
    //   .json({ success:false, errorMessage:"Fullname should have atmost 20 character !" });
    // }

    // if(address.length<6){
    //   return res
    //   .status(400)
    //   .json({ success:false, errorMessage:"Address should have atleast 6 character !" });
    // }
    // if(address.length>50){
    //   return res
    //   .status(400)
    //   .json({ success:false, errorMessage:"Address should have atmost 50 character !" });
    // }
    
  
    const employeePost = await Employee.create(req.body);
  
    if (employeePost) {
      return res
        .status(201)
        .send({ message: "New employee Created", data: employeePost });
    }
    return res.status(500).send({ success:false, errorMessage: " Error in Creating Employee." });

  }catch(err){
    return res.status(500).send({ success:false, errorMessage: err.message });

  }
});

//route for a user who can removing a employee with id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Employee.findByIdAndDelete({_id:id});
    if (deletedProduct) {
      return res.status(202).send({success:true, message: "Post Deleted" });
    } else {
      return res.status(404).send({success:false, err:"Error in Deletion."});
    }
  } catch (err) {
    return res.status(404).send({success:false, errorMessage: "Post not found" });
  }
});

//route for updating the employee
router.put("/:id", async (req, res) => {

  let updatePost = req.body;
  console.log("without",updatePost);
  
  try {

    let {  fullname,
      address,
      State,
      city} = req.body;
      
    fullname = fullname.trim();

    validFields(res,fullname,
      address,
      State,
      city);

    let updatePost = req.body;
  
    console.log({updatePost});
    const updatedPost = await Employee.updateOne(
      { _id: req.params.id },
      updatePost
    );
    return res.status(201).json({ status:true, "Data updated ": updatedPost });
  } catch (err) {
    return res.status(404).json({ success:false, errorMessage: err.message });
  }
});


export default router;
