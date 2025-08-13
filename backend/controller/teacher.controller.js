const TeacherModel = require('../model/teacher.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
//    res.status(200).json({ msg: "Registration endpoint is working" });
    const { firstName, lastName, email, password, phoneNumber, country,ShortBio, professionalTitle, subjectsTaught, yearsOfExperience, highestQualification } = req.body;

    try {
        // Check all fields exist
        if (!firstName ||
             !lastName || !email 
             || !password || !phoneNumber 
             || !professionalTitle || !subjectsTaught 
             || !country  ||
              !yearsOfExperience || !highestQualification || !ShortBio) {
            return res.status(400).json({ msg: "Please provide all required fields" });
        }
        // Check if user exists
        const findTeacherExisted = await TeacherModel.findOne({ email });
        if (findTeacherExisted) {
            return res.status(400).json({ msg: "User already registered !!!" });
        }
        // Password hashing
        const gensalt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, gensalt);
        // Save teacher
        const newTeacher = new TeacherModel({
            firstName,
            lastName,
            email,
            password: passwordHashed,
            phoneNumber,
            country,
          
            professionalTitle,
            subjectsTaught,
            yearsOfExperience,
            highestQualification
            , ShortBio
        });
        await newTeacher.save();
        res.status(200).json({ msg: "Teacher registered successfully", teacher: newTeacher });
    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ msg: "Server error, please try again later" });
    }



};








const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide email and password" });
        }

        // Find the teacher by email
        const teacher = await TeacherModel.findOne({ email });
        if (!teacher) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, teacher.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        // Generate JWT and respond
        const token = jwt.sign({ id: teacher._id }, process.env.SECREAT_KEY,{ expiresIn: '1h' });
        res.status(200).json({ msg: "Login successful", token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ msg: "Server error, please try again later" });
    }
};

// const changePassword=async(req,res)=>{
//     const teachearexitsed= await teachermodel.findById(req.Teachear._id)
//     const [oldpassword,newpassword]=req.body

//     if(!teachearexitsed){
//         return res.status(400).json({msg:"teachear is not existed ...Please Sign up !"})

//     }
//     if(!oldpassword || !newpassword){
//         return res.status(400).json({msg:"Please Provide all rquired fileds"})

//     }
//     //validate password is mached within existed 

//     const ismacthed=bcrypt.compare(oldpassword,teachearexitsed.Password)
    
//     if (teachearexitsed && ismacthed){
//         teachearexitsed.password=newpassword
//         await teachearexitsed.save()

//     res.status(200).json({msg:"password updated sucessfuly!"})
//     }else{
//          return res.status(400).json({msg: "Old password is not correct"})
//     }

// }
// const getAllTeachers= async(req,res)=>{
//  try {
//        const allteachears= await teachermodel.find().populate('Teachearid','firstname,email,ProfessionalTitle ')

//     return res.status(200).json({
//         allteachears
//     })
    
//  } catch (error) {
//  console.error('Error fetching employees:', error);
//         res.status(500).json({ message: 'Internal server error' });

    
//  }
// }







module.exports ={
    register,
    
    login,
    // changePassword,
    // getAllTeachers
}