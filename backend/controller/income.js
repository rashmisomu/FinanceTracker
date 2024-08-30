const incomeSchema = require("../models/incomeModel");

exports.addIncome=async(req,res)=>{
   const{ title,amount,category,description,date}=req.body;
   const income = incomeSchema({
    title,amount,category,description,date
   })
try{
    if(!title ||!category || !description||!date){
        return res.status(400).json({msg:'All field are required'})
    }
    if(amount<=0 || isNaN(amount)){
        return res.status(400).json({msg:'Amount must bea positive number'})
    }
    await income.save()
     console.log(income)
    res.status(200).json({msg:'Income added'})
}
catch(error){
 console.error(error);
        res.status(500).json({ msg: 'Server error' });
}
  

}

exports.getIncomes=async(req,res)=>{
try{
   const incomes=await incomeSchema.find().sort({createdAt:-1});
   res.status(200).json(incomes)
}
catch(error){
    res.status(500).json({message:'Server Error'})
}
}

exports.deleteIncome=async(req,res)=>{
const {id}=req.params;

incomeSchema.findByIdAndDelete(id).then((income)=>{
    res.status(200).json({message:'Income Deleted'});
}).catch((err)=>{
    res.status(500).json({message:'Server Error'})
})

}