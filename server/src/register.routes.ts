/* routes */
import authRoutes from './modules/auth/auth.route'
import usersRoutes from './modules/users/users.route'
import chatsRoutes from './modules/chats/chats.route'
import postsRoutes from './modules/posts/posts.route'
/* end routes */

/* middlware */
import { errorHandler } from "./middleware/error.middleware"
/* end middlware */

import { Express } from 'express'

export default function registerRoutes(app: Express) {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/chats', chatsRoutes);
  app.use('/api/posts', postsRoutes);
  app.use(errorHandler)
}