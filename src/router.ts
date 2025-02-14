import { Router } from "express";
const router=Router()

router.post("/",(_req,res)=>{
    res.json('Desde Post')})

router.get("/",(_req,res)=>{
    res.send({message:'Desde Get'})
})
router.put("/",(_req,res)=>{
    res.json("Desde PUT")
})
router.patch("/",(_req, res)=>{
    res.json("desde patch")
})
router.delete("/",(_req,res)=>{
    res.json("desde delete")
})

export default router