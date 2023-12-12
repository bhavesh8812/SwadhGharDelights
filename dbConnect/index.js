import express, { response } from 'express';
import mongoose from 'mongoose';
import { CustomerLists } from './order.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
/*
app.get('/hello', async(request, response)=>{
  try{
    console.log("hELLO woRD");
    response.send("Hello");

  }catch(error){
    console.log(error);
  }
})*/

const connectDb = async()=>{
  try{
      await mongoose.connect('mongodb://127.0.0.1:27017/SwaadhGharDelights',); 
      console.log("connected to database...!");
  } catch(error){
      console.log("Error db not connected");
  }
}

app.post("/order",async(request,response)=>{
  try{
    console.log('request.body',request.body)
      const reqData=request.body;
      const Details = new CustomerLists(reqData);
      await Details.save();
      response.send({message:'Details Inserted'})
  } catch(error){
      response.send({message:"Something went wrong..!"});
  }
})
app.get("/order",async(request,response)=>{
  try{
      const Details = await CustomerLists.find();
      response.send({Details:Details});
  } catch(error){
      response.send({message:'Something went wrong..!'});
  }
})
app.get("/order/:FullName",async(request,response)=>{
  try{
      const Details = await CustomerLists.findOne({FullName:request.params.FullName});
      if(Details==null){
          response.send({message:"Details Not Found"});
      }
      else{
          response.send({Details:Details});
      }
  } catch(error){
      response.send({message:'Something went wrong'});
  }
})
app.delete("/order/:id",async(req,res)=>{
  const id = req.params.id
  const data = await CustomerLists.deleteOne({_id:id})
  res.send({success: true, message :"data delete successfully",data:data})
})
// app.delete("/order",async(request,response)=>{
//   try{
//       await CustomerLists.deleteOne({FullName:request.params.FullName});
//       response.send({message:'Student deleted'});
//   } catch(error){
//       response.send({message:'something went wrong...!'})
//   }
// })
app.delete("/order/:FullName",async(request,response)=>{
  try{
      await CustomerLists.deleteOne({FullName:request.params.FullName});
      response.send({message:'Student deleted'});
  } catch(error){
      response.send({message:'something went wrong...!'})
  }
})
app.put("/order/:FullName",async(request,response)=>{
  try{
      await CustomerLists.updateOne({FullName:request.params.FullName},request.body);
      response.send({message:"ok updated"})
  } catch(error){
      response.send('something went again wrong')
  }
})
// app.post('/enter', async (request, response) => {
//   try {
//     const reqData = request.body;
//     const Details = new SwaadhGharDelights(reqData);
//     await Details.save();
//     response.send({ message: 'Details Inserted' });
//   } catch (error) {
//     console.error('Error:', error);
//     response.send({ message: 'Something went wrong..!' });
//   }
// });

// ... (Other routes)

const PORT = process.env.PORT || 4333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
