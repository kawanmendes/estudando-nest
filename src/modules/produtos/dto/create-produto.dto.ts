import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  descricao!: string;

  @IsNumber()
  @Min(0)
  preco!: number;

  @IsInt()
  @Min(0)
  estoque!: number;
}
