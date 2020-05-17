const express = require("express");
const router = express.Router();
const Joi = require("Joi");

const courses = [
    {id:1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
];

router.get("/", (req, res) => {
    res.send(courses);
});

router.post("/", (req, res) => {
    let {error} = validata(req.body);
    if (error) {
        res.send(error.details[0].message);
    }

    let course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});

router.get("/:id", (req, res) => {
    let course = searchid(req.params.id);
    res.send(course);
});


router.put("/:id", (req, res) => {
    searchid(req.params.id);

    let {error} = validata(req.body);
    if (error) {
        res.send(error.details[0].message);
    }

    courses.forEach(e =>  {
        if (e.id === parseInt(req.params.id))
            e.name = req.body.name;
    });
    res.send(courses);
});

router.delete("/:id", (req, res) => {
    let course = searchid(req.params.id);
    let index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(courses);
});

function validata(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

function searchid(courseId){
    let course = courses.find(e => e.id === parseInt(courseId));
    if(!course) {
        return res.send("該当idのコースが見つかりません");
    }
    return course;
}

module.exports = router;