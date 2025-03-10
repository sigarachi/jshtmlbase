import { MainPage } from './main-page.js'
import { router } from './router.js'

router.use('/', MainPage)

router.start();