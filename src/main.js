import { HomePage } from "./pages/home-page.js";
import { PostPage } from "./pages/post-page.js";
import { PostsPage } from "./pages/posts-page.js";
import router from "./router.js";

router.use('/', HomePage)
router.use('/posts', PostsPage)
router.use('/post/:id', PostPage)

router.start()