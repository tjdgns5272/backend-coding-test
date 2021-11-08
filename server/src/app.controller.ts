import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Store} from "./models/stores.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}

