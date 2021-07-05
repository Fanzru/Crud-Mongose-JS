const User = require('../models/user')
const response = require('../_helper/response')

const UserController = {
    create: (req,res)=> {
        const userid = (req.body.userid)
        User.findOne({userid:userid},async(err,doc) => {
            if(err) return response(res,500,err)
            if(doc) return response(res,400,false,'Username ID Sudah Ada')
            if(!doc){
                const userData = req.body

                const newUser = new User(userData)

                // validasi error
                let error = await newUser.validateSync()
                if(error) return response(res,400,false,error)

                const saveUser = await newUser.save()
                return response(res,200,true,'Username berhasil di input')
            }
        })
    }
}

module.exports = UserController