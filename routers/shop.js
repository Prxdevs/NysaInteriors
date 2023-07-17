const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { User } = require("../models/user");

const mongoose = require("mongoose");
const multer = require("multer");
const { Product } = require("../models/product");
const { subCategory } = require("../models/subcategory");
const { Category } = require("../models/category");
const { Blog } = require("../models/blog");
const {Heading} = require ("../models/heading");
const {Review} = require ("../models/review");
var nodemailer = require('nodemailer');

const apiKey = process.env.API_KEY;


router.get(`/`, async (req, res) => {
	// const product = await Product.find().limit(8);
	const category = await Category.find();
	const blog = await Blog.find();
	const heading = await Heading.find();
	const review = await Review.find();
	const popular = await Category.find({ tag: 'popular' });
	const interior = await Category.find({ tag: 'interior' });
	const top = await Category.find({ tag: 'construction' });
	
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerinterior = await Category.find({ tag: 'interior' }).limit(5);
	const footerconstruction = await Category.find({ tag: 'construction' }).limit(5);
    // const subcategory = await subCategory.find().select("name");
	res.render("home", {
		// product: product,
        // subcategory: subcategory,
		activePage: 'home',
		footerpopular:footerpopular,
		footerinterior:footerinterior,
		footerconstruction:footerconstruction,
		category: category,
		blog: blog,
		heading: heading,
		review: review,
		popular:popular,
		interior:interior,
		top:top,
		sessionId: req.session._id,
		anAdmin: req.session.anAdmin,
		
	});
});


router.get("/alltours",  async (req, res) => {
	const category = await Category.find();
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerconstruction = await Category.find({ tag: 'construction' }).limit(5);
	res.render("alltours", {
		activePage: 'alltours',
		category: category,
		footerpopular:footerpopular,
		footerconstruction:footerconstruction,
		
	});
});

router.get("/popular",  async (req, res) => {
	const popular = await Category.find({ tag: 'popular' });
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerconstruction = await Category.find({ tag: 'construction' }).limit(5);
	res.render("popular", {
		activePage: 'popular',
		popular: popular,
		footerpopular:footerpopular,
		footerconstruction:footerconstruction,

	});
});


router.get("/about", async(req, res)=>{
	
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerconstruction = await Category.find({ tag: 'construction' }).limit(5);
	res.render("about",{
		activePage:'about',
			
		footerpopular:footerpopular,
		footerconstruction:footerconstruction,
	});
}); 


router.get("/projects", async(req, res)=>{
	const category = await Category.find();
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerinterior = await Category.find({ tag: 'interior' }).limit(5);
	const footerconstruction = await Category.find({ tag: 'construction' }).limit(5);
	res.render("projects",{
		activePage:'projects',
		category: category,
		footerpopular:footerpopular,
		footerinterior:footerinterior,
		footerconstruction:footerconstruction,
	});
}); 

router.get("/construction", async(req, res)=>{
	const category = await Category.find();
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerinterior = await Category.find({ tag: 'interior' }).limit(5);
	const footerconstruction = await Category.find({ tag: 'construction' }).limit(5);
	res.render("construction",{
		activePage:'construction',
		category: category,
		footerpopular:footerpopular,
		footerinterior:footerinterior,
		footerconstruction:footerconstruction,
	});
}); 

router.get("/videos", async(req, res)=>{
	const category = await Category.find();
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerinterior = await Category.find({ tag: 'interior' }).limit(5);
	const footerconstruction = await Category.find({ tag: 'construction' }).limit(5);
	res.render("videos",{
		activePage:'videos',
		category: category,
		footerpopular:footerpopular,
		footerinterior:footerinterior,
		footerconstruction:footerconstruction,
	});
}); 

router.get("/blog", async(req, res)=>{
	const category = await Category.find();
	const blog = await Blog.find();
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerinterior = await Category.find({ tag: 'interior' }).limit(5);
	const footerconstruction = await Category.find({ tag: 'construction' }).limit(5);
	res.render("blog",{
		activePage:'blog',
		category: category,
		blog: blog,
		footerpopular:footerpopular,
		footerinterior:footerinterior,
		footerconstruction:footerconstruction,
	});
}); 


router.get("/ticket",  async (req, res) => {
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerinterior = await Category.find({ tag: 'interior' }).limit(5);
	const footerconstruction = await Category.find({ tag: 'construction' }).limit(5);
	res.render("ticket", {
		activePage:'ticket',
		footerpopular:footerpopular,
		footerinterior:footerinterior,
		footerconstruction:footerconstruction,
	});
});




router.get(`/contact`, async (req, res) => {
	const footerpopular = await Category.find({ tag: 'popular' }).limit(5);
	const footerinterior = await Category.find({ tag: 'interior' }).limit(5);
	const footerconstruction = await Category.find({ tag: 'construction' }).limit(5);

	res.render("contact", {
	activePage:'contact',
		sessionId: req.session._id,
		anAdmin: req.session.anAdmin,
		footerpopular:footerpopular,
		footerinterior:footerinterior,
		footerconstruction:footerconstruction,
		// logocategory: logocategory,
	});
});

router.post("/contact", (req,res)=>{
	var mailContent = {
		name: req.body.name,
		email: req.body.email,
		message:req.body.message,
		phone: req.body.phone,
		
	}
  
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
		  user: 'prxdevs@gmail.com',
		  pass: 'vbcroaneimvmimaq',
		}
	});
	var mailOptions = {
		from: mailContent.email,
		to: 'nysainteriors2019@gmail.com',
		subject: "NysaInteriors Contact Us Message",
		// subject: "mailContent.subject",
		text:  "Contact Us Message \n" +
		"\n Name :" + mailContent.name +
		 "\n Message :"+mailContent.message  + 
		  "\n Email id: " + mailContent.email 
		
		
	  };
  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		  res.redirect("/contact");
		}
	  });  
  
	  transporter.close();
	  
  });
  

  router.post("/sendemail", (req,res)=>{
	var mailContent = {
	
		email: req.body.email,
		
		
	}
  
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
		  user: 'prxdevs@gmail.com',
		  pass: 'vbcroaneimvmimaq',
		}
	});
	var mailOptions = {
		from: mailContent.email,
		to: 'prxdevs@gmail.com',
		subject: "NysaInterior Contact Us Message",
		// subject: "mailContent.subject",
		text:  "Just Received Email \n" +
		  "\n Email id: " + mailContent.email 
		
		
	  };
  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		  res.redirect("/contact");
		}
	  });  
  
	  transporter.close();
	  
  });





module.exports = router;
