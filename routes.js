const routes = require('next-routes')();

routes
.add('/newsubject','/newsubject')
.add('/Subjects/:address','/Subjects/display')
.add('/Subjects/:address/upload','/Subjects/upload')

module.exports = routes;