

exports.handler = async(event) => {
	//sendGmail(JSON.parse(event.body));
	let msg = {
		mailSent:true
	};
	return {
		statusCode: 200,
        body: JSON.stringify(msg)
	};
};