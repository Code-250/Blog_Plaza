 module.exports = (sequelize, Sequelize) =>{
     const Posts = sequelize.define("posts",{
         title:{
             type:Sequelize.STRING
         },
         description:{
             type:Sequelize.STRING
         },
         published:{
             type:Sequelize.BOOLEAN
         }
     });

     return Posts;
 }