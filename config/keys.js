module.exports = {
    passport_jwt:{
        secretOrKey : "asecretstringthatnooneknowsexceptme"
    },
    mongodb: {
        URI: "mongodb://35.237.89.50:27017/wc_shiksha",
    },
    emailKey:{
        key: "qwerty@123"
    },
    collections:{
        board:"boards",
        classes:"classes",
        question:"questions",
        user:"user"
    },
    database:"wc_shikhsa"
};