const { json } = require('express');
const Joi = require('joi');


module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: {
          url:Joi.string().required(),
          filename:Joi.string()
        },
        country: Joi.string().required(),
        category:Joi.string(),
    }).required()

});

  module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
  });


  module.exports.userSchema=Joi.object({
    user:Joi.object({
      email:Joi.string().required(),
      fullName:Joi.string().required(),
      username:Joi.string().required(),
      password:Joi.string().required().min(8),
      address:Joi.string().required(),
      addressnew:Joi.string(),
      city:Joi.string().required(),
      country:Joi.string().required(),
      zip:Joi.string().required(),
    }).required()
  });