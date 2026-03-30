const Employee = require('../models/empmodel.js')
const fs = require('fs')
const uploadOnCloudinary = require("../services/cloudinary")
const cloudinary = require("cloudinary").v2



class EmployeeControllers {
    async index(req, res) {
        try {
            const data = await Employee.find()

            return res.render('employee/list', {
                title: "Employee list",
                total: data.length,
                data: data
            })

        }
        catch (err) {
            console.log(err)
        }
    }
    async addEmployee(req, res) {
        res.render('employee/add')
    }
    async storeEmployee(req, res) {
        try {
            const { name, empid, salary, contact, department } = req.body;

            let image = {
                url: "default.jpg",
                public_id: null
            };

            if (req.file) {
                // Upload directly from buffer to Cloudinary
                const uploadimage = await uploadOnCloudinary(req.file.buffer, "mern-images");

                image = {
                    url: uploadimage.url,
                    public_id: uploadimage.public_id
                };

                // ❌ Do NOT use fs.unlinkSync(req.file.path) here — file is in memory only
            }

            console.log(req.file);

            const data = new Employee({
                name,
                empid,
                salary,
                contact,
                department,
                image
            });

            await data.save();
            res.redirect('/employee/list');

        } catch (err) {
            console.log(err);
            res.status(500).send("Error: " + err.message);
        }
    }
    async editEmployee(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.redirect('/employee/list')
            }

            const data = await Employee.findById(id)
            if (!data) {
                return res.redirect('/employee/list')
            }
            res.render('employee/edit', {
                title: "Edit Employee",
                data: data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    async updateEmployee(req, res) {
        try {
            const id = req.params.id;
            if (!id) return res.redirect('/employee/list');

            const prev = await Employee.findById(id);
            if (!prev) return res.redirect('/employee/list');

            const updatedData = {
                name: req.body.name,
                empid: req.body.empid,
                salary: req.body.salary,
                contact: req.body.contact,
                department: req.body.department
            };

            if (req.file) {
                // Upload new image directly from buffer to Cloudinary
                const uploadimage = await uploadOnCloudinary(req.file.buffer, "mern-images");

                // Delete previous image from Cloudinary if exists
                if (prev.image?.public_id) {
                    await cloudinary.uploader.destroy(prev.image.public_id);
                }

                // Update image fields in database
                updatedData.image = {
                    url: uploadimage.url,
                    public_id: uploadimage.public_id
                };
            }

            // Update employee in DB
            await Employee.findByIdAndUpdate(id, updatedData, { new: true });
            res.redirect('/employee/list');

        } catch (err) {
            console.log(err);
            res.status(500).send("Error: " + err.message);
        }
    }
    async deleteEmployee(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.redirect('/employee/list')
            }
            const data = await Employee.findById(id)
            if (!data) {
                return res.redirect('/employee/list')
            }
            if (data.image?.public_id) {
                await cloudinary.uploader.destroy(data.image.public_id)
            }

            await Employee.findByIdAndDelete(id)

            res.redirect('/employee/list')

        }
        catch (err) {
            console.log(err)
        }
    }
    async softdeleteEmployee(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.redirect('/employee/list');
            }

            // Find employee
            const emp = await Employee.findById(id);
            if (!emp) {
                return res.redirect('/employee/list');
            }

            // Toggle isdeleted
            emp.isdeleted = !emp.isdeleted;

            // Set deletedAt if inactive, else null
            emp.deletedAt = emp.isdeleted ? new Date() : null;

            await emp.save();

            res.redirect("/employee/list");
        } catch (err) {
            console.log(err);
        }
    }
    async activeEmployee(req, res) {
        try {
            const data = await Employee.find({ isdeleted: false })

            res.render('employee/list', {
                title: "active employee list",
                total: data.length,
                data: data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    async inactiveEmployee(req, res) {
        try {
            const data = await Employee.find({ isdeleted: true })
            res.render('employee/list', {
                title: "inactive employee list",
                total: data.length,
                data: data
            })

        }
        catch (err) {
            console.log(err)

        }
    }
}

module.exports = new EmployeeControllers()




