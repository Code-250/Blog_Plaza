module.exports = {
    HOST:'localhost',
    USER:'root',
    PASSWORD:'',
    DB: 'Blog_Plaza Database',
    dialect:'mysql',
    pool: {
        max:5,
        min:0,
        acquire:4000,
        idle:2000
    }
};