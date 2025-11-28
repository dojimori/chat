import express, { Response, Request } from 'express'

const router = express.Router();

router.get('/getme', async (req: Request, res: Response) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(404).json(null)
        }

        return res.status(200).json({ user })
    } catch(err) {
        console.log(err)
    }
})


export default router;