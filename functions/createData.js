exports.handler = async (event, context, callback) => {
	let msg={
		test:123,
		hello:"World"
	}
    return {
        statusCode: 200,
        body: JSON.stringify(msg)
    };
};
