const {Router}=require("express")
const {getBookings,newBooking,updateBooking,deleteBooking,getBooking} =require("../controller/bookingsController")

const router=Router()

router.get('/',getBookings)
router.get('/:id',getBooking)
router.post('/',newBooking)
router.put('/:id',updateBooking)
router.delete('/:id',deleteBooking)


module.exports=router