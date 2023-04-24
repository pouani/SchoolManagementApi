const express = require('express');
const { 
    CreateYearGroup,
    getYearGroups,
    getYearGroup,
    updateYearGroup,
    deleteYearGroup,
} = require('../../controller/academics/yearGroupController');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const yearGroupRouter = express.Router();

yearGroupRouter.route("/")
                .get(isLogin, isAdmin, getYearGroups)
                .post(isLogin, isAdmin, CreateYearGroup);

yearGroupRouter.route("/:id")
                .get(isLogin, isAdmin, getYearGroup)
                .put(isLogin, isAdmin, updateYearGroup)
                .delete(isLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;