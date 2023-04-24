const express = require('express');
const { 
    CreateClassLevel,
    getClassLevels,
    getClassLevel,
    updateClassLevel,
    deleteClassLevel,
} = require('../../controller/academics/classLevelController');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const classLevelRouter = express.Router();

// create academic Term route
// ClassLevelRouter.post("/", isLogin, isAdmin, CreateClassLevel);

// get academic Terms route
// ClassLevelRouter.get("/", isLogin, isAdmin, getClassLevels);

classLevelRouter.route("/")
                .get(isLogin, isAdmin, getClassLevels)
                .post(isLogin, isAdmin, CreateClassLevel);

// ClassLevelRouter.get("/:id", isLogin, isAdmin, getClassLevel);

// update academic Term route
// ClassLevelRouter.put("/:id", isLogin, isAdmin, updateClassLevel);

// delete academic Term route
// ClassLevelRouter.delete("/:id", isLogin, isAdmin, deleteClassLevel);

classLevelRouter.route("/:id")
                .get(isLogin, isAdmin, getClassLevel)
                .put(isLogin, isAdmin, updateClassLevel)
                .delete(isLogin, isAdmin, deleteClassLevel);

module.exports = classLevelRouter;