const routes = require('next-routes')();

routes
.add("/newsubject","/newsubject")
.add("/Subjects/:address","/Subjects/display")

module.exports = routes;