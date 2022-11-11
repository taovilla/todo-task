handleError = (error) => {
    
    if (error.errors['title']) {
        return error.errors["title"].message
    }
    else if (error.errors['description']) {
        return error.errors["description"].message
    }
    else if (error.errors['timestamp']) {
        return error.errors["timestamp"].message
    }

}

module.exports = handleError

