// Returns true when there's a property with `undefined` value in obj
function hasUndefinedProps(obj) {
	for (property in obj) {
		if (obj[property] === undefined) return true;
	}

	return false;
}

exports.hasUndefinedProps = hasUndefinedProps;
