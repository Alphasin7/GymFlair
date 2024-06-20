import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute.js';
import equipRoutes from './routes/equipRoute.js';
import UserModel from './models/User.js';
import courRoutes from './routes/courRoute.js';
import coachRoutes from './routes/coachRoute.js';
import abonnRoutes from './routes/abonnementRoute.js'
import abonnerRoutes from './routes/abonnerRoute.js'
import reservationRoutes from './routes/reservationRoute.js'
import eventRoutes from './routes/eventRoute.js'
import jwt from 'jsonwebtoken';
import viewRoutes from './routes/viewRoutes.js'
import http from 'http'
import { Server } from 'socket.io';
import CountModel from './models/Count.js';

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:  {
        origin: "*",
        methods:['GET','POST','PUT','DELETE']
    }
});
app.use(cors({

}));

io.on('connection', async (socket) => {
    const count = await CountModel.find().populate('user')
    io.emit('count', count.length)
    io.emit('data', count)
    io.emit('admin', {count: count.length, user: ''})
    console.log('a user connected');
      socket.on('scanCode', async ({code, token}) => {
        const decodedToken = jwt.verify(token,'your_secret_key');
        const userId = decodedToken.userId
        try {
            const user = await CountModel.findOne({ user: userId })
            if (code === 'enter') {
                if(!user)  {
                    const user = new CountModel({user: userId})
                    await user.save()
                    const scannedUser = await UserModel.findById(userId)
                    const count = await CountModel.find().populate('user')
                    
                    io.emit('admin', {count: count.length, user: scannedUser.username + " Entered the gym"})
                    io.emit('data', count)
                    io.emit('count', count.length)
                }
            } else if(code === 'out'){
                if(user) {
                    await CountModel.deleteOne({_id: user._id})
                    const count = await CountModel.find().populate('user')
                    const scannedUser = await UserModel.findById(userId)
                    io.emit('admin', {count: count.length, user: scannedUser.username + " Left the gym"})
                    io.emit('data', count)
                    io.emit('count', count.length)
                }
            }
    
        } catch(e) {
            console.log(e)
        }
      })
  });

app.set('view engine', 'ejs')
app.use(express.json());
app.use(cookieParser())
app.use('/image', express.static('uploads'));
app.use(express.static('public'))

app.use('/views', viewRoutes)
app.use('/user',userRoutes);
app.use('/event', eventRoutes);
app.use('/equipment',equipRoutes);
app.use('/cour',courRoutes);
app.use('/coach',coachRoutes);
app.use('/abonnement',abonnRoutes);
app.use('/subscribe',abonnerRoutes);
app.use('/reservation',reservationRoutes);


//connect to the database
mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log('connected to the database')
    server.listen(PORT,()=>{
        console.log("server is running")
    })
}).catch(err=>{
    console.log('Error connecting to database:',err.message)
})






















