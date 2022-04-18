require('dotenv').config({ path: './.env' });

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (isEmpty(event.body)) {
    return callback(null, createErrorResponse(400, 'Missing details'));
  }
  const { name, email } = JSON.parse(event.body);

  const userObj = new User({
    name,
    email,
  });

  if (userObj.validateSync()) {
    return callback(null, createErrorResponse(400, 'Incorrect user details'));
  }

  try {
    await connectToDatabase();
    console.log(userObj);
    const user = await User.create(userObj);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(user),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.update = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);

  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect Id.'));
    return;
  }

  if (isEmpty(data)) {
    return callback(null, createErrorResponse(400, 'Missing details'));
  }
  const { name, email } = data;

  try {
    await connectToDatabase();

    const user = await User.findById(event.pathParameters.id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
    }

    const newUser = await user.save();

    callback(null, {
      statusCode: 204,
      body: JSON.stringify(newUser),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.delete = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  if (!validator.isAlphanumeric(id)) {
    callback(null, createErrorResponse(400, 'Incorrect Id.'));
    return;
  }
  try {
    await connectToDatabase();
    const user = await User.findByIdAndRemove(id);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Removed user with id: ${user._id}`,
        user,
      }),
    });
  } catch (error) {
    returnError(error);
  }
};
