import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';

@Controller()
export class StoresController {
  constructor(private readonly storesService: StoresService) {}
}