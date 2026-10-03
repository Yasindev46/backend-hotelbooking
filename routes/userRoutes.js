const {Router}=require('express')
const {getUsers,getUser,createUser,updateUser,deleteUser, loginUser} =require("../controller/userController")

const router=Router()

// get all users
router.get('/',getUsers)

//create user
router.post('/',createUser)

//find user
router.get('/:id',getUser)

//update user
router.put('/:id',updateUser)

//delete user
router.delete('/:id',deleteUser)

// login user
router.post("/login",loginUser)

//logout user
// router.get("/logout",logoutUser)


module.exports=router