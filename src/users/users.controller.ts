import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { URL_PREFIX } from 'common';

@Controller(URL_PREFIX)
export class UsersController {
   
   @Get('/user')
   getName(@Res() response: Response): Response {
 
     return response.send('hello user');
   }
}
