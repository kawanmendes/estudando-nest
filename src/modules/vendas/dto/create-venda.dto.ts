import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateVendaDto {
  @IsUUID()
  produtoId!: string;

  @IsInt()
  @Min(1)
  quantidade!: number;
}
