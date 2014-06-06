# models

Your [Mongoose](http://mongoosejs.com/) models go in here. They look like this:

```javascript
var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
	"title": String
});

module.exports = mongoose.model('MyModel', Schema);

```

I also included [mongoose-types](https://github.com/bnoguchi/mongoose-types) for Email & URL types.