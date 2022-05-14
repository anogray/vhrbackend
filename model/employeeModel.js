  
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  fullname: { type: String, required: true, unique:true},
  address : { type: String, required: true },
  State :{type:String, required: true},
  city :{type:String, required: true},
},
{
  timestamps:true
});

const Employee = mongoose.model('employee', employeeSchema);

export default Employee ;