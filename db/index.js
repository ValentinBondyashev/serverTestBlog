const mongoose = require('mongoose');

mongoose.promise = global.Promise;

mongoose.connect('mongodb://localhost/passport-tutorial');

mongoose.set('debug', true);
