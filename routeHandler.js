import routes from './routes/routes'

function routeHandler(app){
    app.use('/', routes)
}

export default routeHandler