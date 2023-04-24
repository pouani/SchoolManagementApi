const express = require('express');
const { 
    CreateProgram,
    getPrograms,
    getProgram,
    updateProgram,
    deleteProgram,
} = require('../../controller/academics/programController');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const programRouter = express.Router();

// create academic Term route
// ProgramRouter.post("/", isLogin, isAdmin, CreateProgram);

// get academic Terms route
// ProgramRouter.get("/", isLogin, isAdmin, getPrograms);

programRouter.route("/")
                .get(isLogin, isAdmin, getPrograms)
                .post(isLogin, isAdmin, CreateProgram);

// ProgramRouter.get("/:id", isLogin, isAdmin, getProgram);

// update academic Term route
// ProgramRouter.put("/:id", isLogin, isAdmin, updateProgram);

// delete academic Term route
// ProgramRouter.delete("/:id", isLogin, isAdmin, deleteProgram);

programRouter.route("/:id")
                .get(isLogin, isAdmin, getProgram)
                .put(isLogin, isAdmin, updateProgram)
                .delete(isLogin, isAdmin, deleteProgram);

module.exports = programRouter;