import { getDMMF } from '@prisma/internals';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

type EnumType = {
  name: string;
  values: string[];
};

type ModelField = {
  name: string;
  type: string;
  isRequired: boolean;
  isList: boolean;
  isId: boolean;
  hasDefaultValue: boolean;
};

type Model = {
  tableName: string;
  fields: ModelField[];
};

const GenerateSchemaObject = async (
  schemaPath: string,
): Promise<{ model: Model[]; enums: EnumType[] }> => {
  const dmmf = await getDMMF({ datamodel: schemaPath });
  const ModelDataBase: Model[] = [];
  const EnumDataBase: EnumType[] = [];

  dmmf.datamodel.enums.forEach((enumType) => {
    EnumDataBase.push({
      name: enumType.name,
      values: enumType.values.map((value) => value.name),
    });
  });

  dmmf.datamodel.models.forEach((table) => {
    const fields = table.fields.filter((field) => field.kind !== 'object');

    ModelDataBase.push({
      tableName: table.name,
      fields: fields.map((field) => ({
        name: field.name,
        type: field.type,
        isRequired: field.isRequired,
        isList: field.isList,
        isId: field.isId,
        hasDefaultValue: field.hasDefaultValue,
      })),
    });
  });

  return { model: ModelDataBase, enums: EnumDataBase };
};
const GenerateEnumFiles = (enums: EnumType[], outputDir: string) => {
  fs.mkdirSync(outputDir, { recursive: true });
  enums.forEach((e) => {
    const lines = [
      `export enum ${e.name} {`,
      ...e.values.map((v) => `  ${v} = '${v}',`),
      `}`,
    ];
    fs.writeFileSync(path.join(outputDir, `${e.name}.ts`), lines.join('\n'));
  });
};
const ToTypescriptType = (prismaType: string, isEnum: boolean): string => {
  if (isEnum) {
    return prismaType;
  }
  switch (prismaType) {
    case 'String':
      return 'string';
    case 'Int':
      return 'number';
    case 'Float':
    case 'Decimal':
      return 'number';
    case 'Boolean':
      return 'boolean';
    case 'DateTime':
      return 'Date';
    case 'Json':
      return 'Record<string, any>';
    default:
      return prismaType; // Para enums
  }
};
const getValidatorDecorator = (
  prismaType: string,
  isEnum: boolean,
  enumType: string,
): string => {
  if (isEnum) return `@IsEnum(${enumType})`;
  switch (prismaType) {
    case 'String':
      return '@IsString()';
    case 'Int':
    case 'Float':
    case 'Decimal':
      return '@IsNumber()';
    case 'Boolean':
      return '@IsBoolean()';
    case 'DateTime':
      return `@IsDate()
  @Transform(({ value }) => new Date(value))`;
    case 'Json':
      return '@IsJSON()';
    default:
      return '';
  }
};
const GenerateDtoFiles = (
  enums: EnumType[],
  models: Model[],
  outputDir: string,
) => {
  models.forEach((model) => {
    const lines = [
      `import { ApiProperty,PartialType } from '@nestjs/swagger';`,
      `import { IsString, IsNumber, IsBoolean, IsDate, IsEnum, IsOptional, IsArray, IsUUID, IsJSON, IsNotEmpty } from 'class-validator';`,
      `import { Transform } from 'class-transformer';`,
    ];

    const importsEnums: string[] = [];

    model.fields.forEach((field) => {
      const enumType = enums.find((e) => e.name === field.type);
      if (enumType && !importsEnums.includes(enumType.name)) {
        importsEnums.push(enumType.name);
        lines.push(
          `import { ${enumType.name} } from './enums/${enumType.name}';`,
        );
      }
    });

    lines.push(``, `export class Create${model.tableName}Dto {`);
    model.fields.forEach((field) => {
      const isEnum = enums.some((e) => e.name === field.type);
      const tsType = ToTypescriptType(field.type, isEnum);
      const decorator = getValidatorDecorator(field.type, isEnum, field.type);
      const isOptional =
        !field.isRequired || field.hasDefaultValue || field.isId;
      const isList = field.isList;
      const typeDeclaration = `${tsType}${isList ? '[]' : ''}`;
      const nameDeclaration = `${field.name}${isOptional ? '?' : ''}`;

      lines.push(
        `  @ApiProperty({ name: '${field.name}', description: '${field.name}.' })`,
      );

      if (isOptional) {
        lines.push(`  @IsOptional()`);
      } else {
        lines.push(`  @IsNotEmpty()`);
      }

      if (isList) {
        lines.push(`  @IsArray()`);
      }

      if (decorator) {
        lines.push(`  ${decorator}`);
      }

      lines.push(`  ${nameDeclaration}: ${typeDeclaration};`);
      lines.push(``);
    });

    lines.push(`}`);
    lines.push(
      `export class Update${model.tableName}Dto extends PartialType(Create${model.tableName}Dto) {}`,
    );
    fs.writeFileSync(
      path.join(outputDir, `${model.tableName}.dto.ts`),
      lines.join('\n'),
    );
  });
};

async function main() {
  console.clear();
  console.log(chalk.cyan('[PROCESS] Inciando geração de DTOs...'));
  try {
    const schemaPath = path.resolve(__dirname, '../schema.prisma');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    const { model, enums } = await GenerateSchemaObject(schema);
    const outputDir = path.resolve(__dirname, '../../src/dto');
    GenerateEnumFiles(enums, outputDir + '/enums');
    GenerateDtoFiles(enums, model, outputDir);
    console.log(chalk.green('[OK] DTO gerado com sucesso'));
  } catch (e) {
    console.error('Error generating DTOs and Enums:', e);
  }
}

(async () => await main())();
