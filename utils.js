const validFields = (res,fullname,
    address,
    State,
    city)=>{

    if (!State) {
        return res
          .status(400)
          .json({ success:false, errorMessage:"Please fill state name !" });
      }
  
      if (!city) {
        return res
          .status(400)
          .json({ success:false, errorMessage:"Please fill city name !" });
      }
  
      if(fullname.length<4){
        return res
          .status(400)
          .json({ success:false, errorMessage:"Fullname should have atleast 4 character!" });
      }
      if(fullname.length>20){
        return res
        .status(400)
        .json({ success:false, errorMessage:"Fullname should have atmost 20 character !" });
      }
  
      if(address.length<6){
        return res
        .status(400)
        .json({ success:false, errorMessage:"Address should have atleast 6 character !" });
      }
      if(address.length>50){
        return res
        .status(400)
        .json({ success:false, errorMessage:"Address should have atmost 50 character !" });
      }
}

export default validFields;