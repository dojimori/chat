import express, { Request, Response } from 'express'
import { prisma } from '../../lib/prisma';
import bcrypt from "bcryptjs"

const router = express.Router(); 

router.get('/auth-test', async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                username: 'test-user',
                password: '123123'
            }
        })

        res.status(201).send('created')
    } catch(err) {
        console.log(err)
    }
})

router.post('/register', async (req: Request, res: Response) => {
    try {
        // await prisma.user.create({
        //     data: {
        //         username: 'test-user',
        //         password: '123123'
        //     }
        // })

        // res.status(201).send('created')
        const { username, password } = req.body;
        
        if (username.trim() == '' || password.trim() == '') {
            return res.status(409).json({ message: 'Please fill in missing fields.'})
        }

        if (password.length < 6) {
            return res.status(409).json({ message: 'Password must be atleast 6 characters.'})
        }

        const userNameExists = await prisma.user.findFirst({
            where: { 
                username: username
            }
        })

        if (userNameExists) {
            return res.status(409).json({ message: 'Username already taken.'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: 'Registered successfully, please login.'})
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: `${err}`})
    }
})

export default router;