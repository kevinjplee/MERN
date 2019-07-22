const Grade = require('./models/Grade');

exports.create = async(ctx) => {
    const {
        name,
        credit,
        type,
        grade
    }= ctx.request.body;

    const grade = new Grade({
        name,
        credit,
        type,
        grade
    }); 

    try{
        await book.save();
    } catch(e) {
        return ctx.throw(500,e);
    }

    ctx.body = book;
};