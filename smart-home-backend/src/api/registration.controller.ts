import { Router, Request, Response } from 'express';
import { UserRecord } from '../models/userRecord';
import { logger } from '../services/logging.service';
import { UserTableService } from '../services/usertable.service';

const router = Router();

const userTable = new UserTableService();

router.post('/', (req: Request, res: Response) => {
      let user : UserRecord = req.body;

      const ip = req.ip;
      logger.info(ip, "Request to register " + user.name);

      userTable.RegisterUser(user)
      .then((user) => {

            logger.info(user.name, "New Registration");
            
            res.status(200).send(user);
      })
      .catch((error) =>{
            res.status(500).send();
      });
});

export const registrationController: Router = router;
