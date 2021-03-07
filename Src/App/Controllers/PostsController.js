import Post from "../../Database/models/PostsModel.js";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

// create and Save New post

export const createPost = async (request, response) => {
  //   Create post input fields
  const posts = {
    title: request.body.title,
    description: request.body.description,
  };
  // saving data to database
  try {
    let createData = await Post.create(posts);
    if (!createData.title && !createData.description) {
      response.status(200).json({
        status: 200,
        message: "title and description are required ",
      });
    } else if (createData.title.length <= 3) {
      response.status(200).send({
        status: 200,
        message: "title is required atleast 5 characters",
      });
    } else if (createData.description.length <= 5) {
      response.status(200).send({
        status: 200,
        message: "description is required atleeast 6 characters",
      });
    } else {
      response.status(200).json({
        status: 200,
        message: "Post created Successfully",
        data: createData,
      });
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({
      status: 500,
      message: "oooops!!Something went wrong!!",
    });
  }
};

// Retrieve all posts

export const getPosts = async (request, response) => {
  const title = request.query.title;
  const condition = title;
  try {
    let getData = await Post.findAll({ where: condition });
    if (getData) {
      response.json({
        status: 200,
        message: "Retrieved all data",
        data: getData,
      });
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({
      status: 500,
      message: "oooops not able to fetch your data",
    });
  }
};

// retrieving a single post with id

export const getPostById = async (request, response) => {
  const id = request.params.id;
  try {
    let getData = await Post.findOne({ where: { id: id } });

    if (getData) {
      response.status(200).json({
        status: 200,
        message: `post with id ${id} fetched Successfully`,
        data: getData,
      });
    } else {
      response.status(404).json({
        status: 404,
        message: "post is not available",
      });
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({
      status: 500,
      message: "Something went wrong not able to fetch your request",
    });
  }
};
// Update post identified by id in request

export const updatePost = async (request, response) => {
  const id = request.params.id;
  try {
    let updateData = await Post.update(request.body, { where: { id: id } });
    if (updateData) {
      response.status(200).json({
        status: 200,
        message: `Post withid ${id} updated Successfully`,
      });
    } else {
      response.status(404).send({
        status: 404,
        message: "post not found to update",
      });
      // } else {
      //   response.status(200).send({
      //     status: 200,
      //     message: "post not found to update",
      //   });
      // }
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({
      status: 500,
      message: `failed to update pst with id ${id}`,
    });
  }
};
// delete a post with the specified id

export const deletePost = async (request, response) => {
  const id = request.params.id;
  try {
    let deleteData = await Post.destroy({ where: { id: id } });
    if (deleteData) {
      response.status(200).json({
        status: 200,
        message: `Delete Post with id ${id} was Successful`,
        data: deleteData,
      });
    } else {
      response.status(404).json({
        status: 404,
        message: "oooops!! post not found to be deleted",
      });
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({
      status: 500,
      nessage: "something went wrong",
    });
  }
};

// find all posts by
