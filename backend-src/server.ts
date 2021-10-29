import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import FunkcionalniRouter from './routes/funkcionalni';
import NekretnineRouter from './routes/nekretnine';
import IznajmljivanjaKupovineRouter from './routes/iznajmljivanjaKupovine';
import PorukeRouter from './routes/poruke';
import BlokiranjaRouter from './routes/blokiranja';

 
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Odbrana');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo ok')
});
 
const router = express.Router();
router.use('/funkcionalni', FunkcionalniRouter);
router.use('/nekretnine', NekretnineRouter);
router.use('/iznajmljivanjaKupovine', IznajmljivanjaKupovineRouter);
router.use('/poruke', PorukeRouter);
router.use('/blokiranja', BlokiranjaRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));