// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates innpm 
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }))


// TODO: routes voor deze hallen applicatie..

app.get('/', function (request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((servicesDataUitDeAPI) => {
        response.render('home', { services: servicesDataUitDeAPI.data })
    });
})

app.get('/vraag-aanbod', function (request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((servicesDataUitDeAPI) => {
        response.render('vraag-aanbod', { services: servicesDataUitDeAPI.data })
    });
})

app.get('/vraag-aanbod/:projectId', function (request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/dh_services?filter={"id":' + request.params.projectId + '}').then((serviceDetail) => {
        response.render('detail', { service: serviceDetail.data[0] })
    })
})

app.get('/contact', function (request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((servicesDataUitDeAPI) => {
        response.render('contact', { services: servicesDataUitDeAPI.data })
    });
})

app.get('/about', function (request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((servicesDataUitDeAPI) => {
        response.render('about', { services: servicesDataUitDeAPI.data })
    });
})

app.get('/faq', function (request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((servicesDataUitDeAPI) => {
        response.render('faq', { services: servicesDataUitDeAPI.data })
    });
})


// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})