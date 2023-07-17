const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
	{
		
		
		date: {
			type: String,
		},
		title: {
			type: String,
		},
		content: {
			type: String,
		},
		image: {
			type: String,
			// default:"https://res.cloudinary.com/dfsixliv3/image/upload/v1658858519/upload/medi_ryt5uc.jpg",
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		updated_at: {
			type: Date,
			default: Date.now,
		},
		
	},
	{
		versionKey: false,
	}
);

exports.Blog = mongoose.model("Blog", blogSchema);
